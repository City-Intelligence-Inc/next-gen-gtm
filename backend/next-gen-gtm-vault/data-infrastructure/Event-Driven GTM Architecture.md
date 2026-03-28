---
tags: [data-infrastructure, events, real-time, architecture]
aliases: [Event-Driven GTM Architecture, Event-Driven GTM]
---

# Event-Driven GTM Architecture

Real-time event processing for GTM — moving from batch sync to **instant signal detection and action**.

## The Shift

| Traditional | Event-Driven |
|------------|-------------|
| Nightly CRM sync | Real-time event stream |
| Weekly lead scoring batch | Score updates in seconds |
| Daily enrichment runs | Enrich on event trigger |
| Manual handoffs | Automated routing on signal |

## Core Patterns

### Webhooks
- Tool A fires an HTTP event when something happens → Tool B receives and acts
- Example: [[Common Room]] detects a GitHub star → webhook to [[Clay]] → enrich → push to CRM
- Simple, widely supported, but can be unreliable (no retry, no ordering)

### Event Streaming (Kafka/Confluent)
- High-volume, ordered, durable event processing
- Example: Product events → Kafka → real-time scoring → alerts
- Used by larger companies (Datadog, Ramp-scale)
- Overkill for most startups

### Change Data Capture (CDC)
- Detect and stream changes from databases in real time
- Example: New row in product DB → event → Snowflake → dbt model update → [[Hightouch]] sync
- Tools: Debezium, Fivetran CDC, Airbyte CDC

### Server-Side Tracking
- Moving away from client-side pixels (blocked by ad blockers, iOS privacy)
- Server-side event collection captures 100% of events
- Google Tag Manager moved to unified tag system (April 2025)
- Tools: Segment, RudderStack, Snowplow

## Latency Targets

| Action | Acceptable Latency |
|--------|-------------------|
| Website visitor de-anonymization | <1 second |
| Inbound lead routing | <5 minutes |
| PQL score update | <1 hour |
| CRM data refresh | <1 hour |
| Weekly reporting | Daily batch OK |

## Related

- [[Signal-Based Selling]] — Requires real-time signal detection
- [[Warehouse-Native GTM]] — Event data flows into warehouse
- [[Modern Data Stack for GTM]] — Event collection as first layer
- [[Architecture - Core Layers]] — Data Integration Layer
