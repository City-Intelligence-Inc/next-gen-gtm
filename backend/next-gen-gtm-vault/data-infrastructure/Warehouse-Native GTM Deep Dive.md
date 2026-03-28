---
tags: [data-infrastructure, warehouse, reverse-etl, dbt, deep-dive]
aliases: [Warehouse-Native GTM Deep Dive, Reverse ETL, Data Activation]
---

# Warehouse-Native GTM — Deep Dive

Warehouse-native GTM uses the cloud data warehouse (Snowflake, BigQuery) as the single source of truth for all customer and prospect data, with dbt for transformation and reverse ETL tools (Hightouch, Census) to push modeled data back into operational GTM tools.

## The Architecture

```
DATA INGESTION (Fivetran / Airbyte)
├── CRM data (Attio, HubSpot, Salesforce)
├── Product analytics (Amplitude, Mixpanel, Segment)
├── Marketing tools (Google Ads, LinkedIn, Marketo)
├── Finance (Stripe, QuickBooks)
├── Support (Intercom, Zendesk)
├── Outbound tools (Instantly, Outreach)
└── Signal sources (Common Room, G2, Bombora)
         │
         ▼
DATA WAREHOUSE (Snowflake / BigQuery)
   Single source of truth
   360-degree customer view
         │
         ▼
TRANSFORMATION (dbt)
├── Staging models (clean raw data)
├── Intermediate models (business logic)
├── Mart models (ready for activation)
│   ├── mart_qualified_accounts
│   ├── mart_lead_scores
│   ├── mart_expansion_signals
│   └── mart_attribution
         │
         ▼
ACTIVATION (Hightouch / Census)
├── → CRM (enriched records, scores)
├── → Outbound (qualified lists, personalization)
├── → Ads (suppression lists, lookalike audiences)
├── → Product (in-app messaging, feature flags)
├── → Slack (team alerts, deal intelligence)
└── → Clay (enrichment triggers)
```

## Why Warehouse-Native Beats Tool-Native

### The Problem with Tool-Native GTM

Traditional approach: data lives in each tool, synced via point-to-point integrations.

```
HubSpot ←→ Salesforce ←→ Outreach
    ↕           ↕           ↕
  Stripe     LinkedIn    Intercom
```

**Problems:**
- Data inconsistencies (which record is "truth"?)
- N^2 integration complexity (every new tool needs connections to every existing tool)
- No single view of the customer
- Scoring models limited to what's in each individual tool
- Can't combine product data + CRM data + financial data for holistic scoring

### The Warehouse-Native Advantage

- **Single source of truth** — All data in one place
- **Unlimited joins** — Combine any data sources for scoring and segmentation
- **Version-controlled logic** — dbt models in Git, reviewed like code
- **Tested and audited** — dbt tests ensure data quality before activation
- **Decoupled architecture** — Swap any operational tool without losing data or logic
- **ML-ready** — Train models on complete customer data
- **Cost effective** — Modern warehouses are cheap; no per-record pricing

## Hightouch vs. Census — Comparison

| Feature | Hightouch | Census |
|---------|-----------|--------|
| **Pricing** | $350-$800+/mo | $300-$700+/mo |
| **Destinations** | 60+ | 50+ |
| **dbt integration** | Native (pull models via Git) | Native |
| **Visual audience builder** | Yes | Yes |
| **SQL support** | Yes | Yes |
| **Warehouse support** | Snowflake, BigQuery, Redshift, Databricks | Snowflake, BigQuery, Redshift, Databricks |
| **Differentiator** | Customer Studio (visual segments), larger ecosystem | Entity resolution, data observability |
| **Best for** | Marketing + sales activation | Data teams wanting observability |

Both are excellent. Hightouch has slightly more market share and a larger integration catalog. Census has stronger entity resolution. Either works for warehouse-native GTM.

## dbt Modeling for GTM — Practical Examples

### Project Structure

```
models/
├── staging/
│   ├── stg_attio_contacts.sql
│   ├── stg_attio_deals.sql
│   ├── stg_stripe_subscriptions.sql
│   ├── stg_amplitude_events.sql
│   ├── stg_instantly_campaigns.sql
│   └── stg_common_room_signals.sql
├── intermediate/
│   ├── int_contact_enriched.sql
│   ├── int_account_signals.sql
│   ├── int_product_usage_scores.sql
│   └── int_lead_scoring.sql
└── marts/
    ├── mart_qualified_accounts.sql
    ├── mart_expansion_targets.sql
    ├── mart_attribution.sql
    └── mart_funnel_metrics.sql
```

### Staging Model: Clean Raw CRM Data

```sql
-- stg_attio_contacts.sql
-- Purpose: Standardize raw Attio contact data

with source as (
    select * from {{ source('attio', 'contacts') }}
),

renamed as (
    select
        id as contact_id,
        lower(trim(email)) as email,
        first_name,
        last_name,
        company_id as account_id,
        title as job_title,
        created_at,
        updated_at,

        -- Normalize job titles to levels
        case
            when title ilike '%chief%' or title ilike '%cro%'
                or title ilike '%cto%' or title ilike '%cmo%'
                then 'C-Suite'
            when title ilike '%vp%' or title ilike '%vice president%'
                then 'VP'
            when title ilike '%director%'
                then 'Director'
            when title ilike '%manager%' or title ilike '%head of%'
                then 'Manager'
            else 'Individual Contributor'
        end as seniority_level

    from source
    where email is not null
)

select * from renamed
```

### Intermediate Model: Lead Scoring

```sql
-- int_lead_scoring.sql
-- Purpose: Calculate composite lead score from multiple signals

with contacts as (
    select * from {{ ref('stg_attio_contacts') }}
),

account_signals as (
    select * from {{ ref('int_account_signals') }}
),

product_usage as (
    select * from {{ ref('int_product_usage_scores') }}
),

email_engagement as (
    select
        contact_email,
        count(case when event = 'opened' then 1 end) as emails_opened_30d,
        count(case when event = 'clicked' then 1 end) as emails_clicked_30d,
        count(case when event = 'replied' then 1 end) as emails_replied_30d
    from {{ ref('stg_instantly_campaigns') }}
    where event_date >= current_date - interval '30 days'
    group by 1
),

scored as (
    select
        c.contact_id,
        c.email,
        c.account_id,
        c.seniority_level,

        -- Firmographic score (0-25)
        case
            when a.employee_count between 50 and 500 then 20
            when a.employee_count between 500 and 2000 then 15
            when a.employee_count between 20 and 50 then 10
            else 5
        end
        + case
            when a.funding_stage in ('Series A', 'Series B', 'Series C') then 5
            else 0
        end as firmographic_score,

        -- Title score (0-25)
        case
            when c.seniority_level = 'C-Suite' then 25
            when c.seniority_level = 'VP' then 20
            when c.seniority_level = 'Director' then 15
            when c.seniority_level = 'Manager' then 10
            else 5
        end as title_score,

        -- Intent signal score (0-30)
        coalesce(a.pricing_page_visits_7d * 10, 0)
        + coalesce(a.g2_comparison_activity * 8, 0)
        + coalesce(a.job_postings_score, 0)
        + case when a.recent_funding then 5 else 0 end
        + case when a.leadership_change_90d then 8 else 0 end
        as intent_score,

        -- Product usage score (0-20)
        coalesce(p.usage_score, 0) as product_score,

        -- Engagement score (0-15) (email only in this model)
        least(coalesce(e.emails_opened_30d * 2, 0)
            + coalesce(e.emails_clicked_30d * 5, 0)
            + coalesce(e.emails_replied_30d * 8, 0), 15
        ) as engagement_score

    from contacts c
    left join account_signals a on c.account_id = a.account_id
    left join product_usage p on c.contact_id = p.contact_id
    left join email_engagement e on c.email = e.contact_email
)

select
    *,
    firmographic_score + title_score + intent_score
        + product_score + engagement_score as total_score,
    case
        when firmographic_score + title_score + intent_score
            + product_score + engagement_score >= 70 then 'Hot'
        when firmographic_score + title_score + intent_score
            + product_score + engagement_score >= 40 then 'Warm'
        else 'Cool'
    end as lead_temperature
from scored
```

### Mart Model: Qualified Accounts

```sql
-- mart_qualified_accounts.sql
-- Purpose: Final qualified account list synced to CRM via Hightouch

with scored_contacts as (
    select * from {{ ref('int_lead_scoring') }}
),

account_rollup as (
    select
        account_id,
        max(total_score) as max_contact_score,
        count(case when lead_temperature = 'Hot' then 1 end) as hot_contacts,
        count(case when lead_temperature = 'Warm' then 1 end) as warm_contacts,
        count(*) as total_contacts,
        max(total_score) as account_score
    from scored_contacts
    group by 1
),

final as (
    select
        a.*,
        case
            when a.hot_contacts >= 2 then 'Multi-Thread Ready'
            when a.hot_contacts >= 1 then 'Single Champion'
            when a.warm_contacts >= 3 then 'Warming Account'
            else 'Monitor'
        end as account_stage,
        current_timestamp as scored_at
    from account_rollup a
    where a.max_contact_score >= 40  -- Only sync qualified accounts
)

select * from final
```

### dbt Tests for Data Quality

```yaml
# schema.yml
models:
  - name: int_lead_scoring
    columns:
      - name: contact_id
        tests:
          - unique
          - not_null
      - name: total_score
        tests:
          - not_null
          - accepted_values:
              values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
              # Actually use dbt_utils.accepted_range
      - name: lead_temperature
        tests:
          - accepted_values:
              values: ['Hot', 'Warm', 'Cool']
```

## Ramp's Stack — The Case Study

### Background
Ramp is a finance automation platform that built a warehouse-native GTM engine using Snowflake + dbt + Hightouch.

### The Problem
Anytime Ramp wanted to move data out of Snowflake, they were forced to manually build and replace various Python scripts. Business teams wanted data in Salesforce and HubSpot for personalization but couldn't get it.

### The Solution

**Stack:**
- **Snowflake** — Data warehouse (all customer, product, and financial data)
- **dbt** — Data transformation (scoring models, segments, attribution)
- **Hightouch** — Reverse ETL (push modeled data to operational tools)

**Results:**
- Created an entirely new **Outbound Automation Team (OAT)**
- OAT drives **25% of all sales pipeline** — the single lowest-cost customer acquisition channel
- Transformation jobs complete **33% faster** after migration
- **20% decrease in overall data platform cost**
- Can go from ideation to fully functional campaign in **less than a day**

### How It Works

1. **Data ingestion** — All product usage, financial data, and marketing data flows into Snowflake via Fivetran
2. **dbt modeling** — Data engineers build models for prospect scoring, segmentation, and personalization
3. **Hightouch activation** — Modeled data synced to Salesforce and HubSpot automatically
4. **OAT execution** — Outbound team collaborates with marketers to identify targets and deliver customized emails at scale
5. **Feedback loop** — Campaign results flow back to Snowflake, dbt models improve, cycle repeats

### Key Insight

The OAT team is staffed by **data engineers**, not traditional SDRs. They collaborate with marketers to identify target prospects and deliver customized emails at scale. This is the ultimate GTM engineering model — data-driven outbound run by engineers.

## When to Go Warehouse-Native

### You Need Warehouse-Native GTM If:
- You have 10,000+ contacts and multiple data sources
- Your scoring needs to combine product data + CRM data + intent data
- You want to decouple your GTM logic from any specific tool
- You have (or can hire) a data engineer or analytics engineer
- Data quality and auditability matter to your leadership
- You're spending significant money on GTM tooling and need optimization

### You Don't Need It Yet If:
- You're under 50 employees with a simple sales motion
- You have fewer than 5,000 contacts
- You don't have any data engineering capacity
- Your CRM (HubSpot/Attio) scoring is sufficient
- You're still figuring out your ICP

## Sources

- [dbt Labs: Ramp Case Study](https://www.getdbt.com/success-stories/ramp/)
- [Hightouch + Ramp Customer Story](https://hightouch.com/customers/ramp)
- [Snowflake: Ramp Case Study](https://www.snowflake.com/en/customers/all-customers/case-study/ramp/)
- [dbt Labs: dbt and Hightouch](https://www.getdbt.com/blog/dbt-and-hightouch-are-putting-transformed-data-to-work)
- [Hightouch: Reverse ETL Platform](https://hightouch.com/platform/reverse-etl)
- [Attio + Hightouch Integration](https://attio.com/blog/attio-hightouch-all-your-user-and-product-data-inside-your-crm)
- [Heyreach: Best GTM Tools 2026](https://www.heyreach.io/blog/best-gtm-tools)
- [Wired Messenger: Warehouse-Native Lifecycle Marketing](https://www.wiredmessenger.com/blogs/warehouse-native-lifecycle-marketing-from-data-to-revenue-without-replatforming)

## Related

- [[Composable GTM Stack Deep Dive]] — How warehouse-native fits in the full stack
- [[GTM Engineering Deep Dive]] — Who builds and maintains warehouse-native GTM
- [[Signal-Based Selling Deep Dive]] — Signal data flows into the warehouse
- [[Death of Traditional CRM Deep Dive]] — Warehouse-native reduces CRM dependency
