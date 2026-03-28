import {
  XIcon,
  OpenAIIcon,
  ChromaDBIcon,
  AWSIcon,
  GitHubIcon,
  LumaIcon,
  HubSpotIcon,
  SalesforceIcon,
  SlackIcon,
  ClayIcon,
  ApolloIcon,
  InstantlyIcon,
  AttioIcon,
  CommonRoomIcon,
  UnifyIcon,
  PocusIcon,
  HightouchIcon,
  SnowflakeIcon,
  SegmentIcon,
  StripeIcon,
  LinkedInIcon,
  GongIcon,
  GoogleAdsIcon,
  CoframeIcon,
} from "../../icons";

type IconComponent = React.ComponentType<{ className?: string; size?: number }>;

interface LiveEnvironment {
  name: string;
  desc: string;
  detail: string;
  icon: IconComponent;
}

interface ComingSoonEnvironment {
  name: string;
  cat: string;
  desc: string;
  icon: IconComponent;
}

const liveEnvironments: LiveEnvironment[] = [
  {
    name: "X / Twitter",
    desc: "Mention detection + auto-reply via OAuth 1.0a",
    detail: "Polls every 60s, dedupes, checks for existing replies",
    icon: XIcon,
  },
  {
    name: "OpenAI (GPT-4o)",
    desc: "GTM analysis + intelligence generation",
    detail: "RAG-augmented prompts with domain knowledge",
    icon: OpenAIIcon,
  },
  {
    name: "ChromaDB (RAG)",
    desc: "60+ vault notes indexed (441 chunks)",
    detail: "all-MiniLM-L6-v2 embeddings, cosine similarity, top-8 retrieval",
    icon: ChromaDBIcon,
  },
  {
    name: "AWS App Runner",
    desc: "Backend compute + worker polling",
    detail: "0.25 vCPU, auto-scales, health-checked",
    icon: AWSIcon,
  },
  {
    name: "GitHub",
    desc: "Repo creation from tweets, CI/CD via Actions",
    detail: "GitHub App integration with private key auth",
    icon: GitHubIcon,
  },
  {
    name: "Luma",
    desc: "Event creation, hackathon management",
    detail: "Attendee tracking, event scheduling",
    icon: LumaIcon,
  },
];

const comingSoonEnvironments: ComingSoonEnvironment[] = [
  { name: "HubSpot", cat: "CRM", desc: "Bi-directional contact/deal sync, push lead scores", icon: HubSpotIcon },
  { name: "Salesforce", cat: "CRM", desc: "Enterprise CRM sync, opportunity tracking", icon: SalesforceIcon },
  { name: "Slack", cat: "Notifications", desc: "Signal alerts to sales channels, deal room updates", icon: SlackIcon },
  { name: "Clay", cat: "Enrichment", desc: "Waterfall enrichment across 50+ data providers", icon: ClayIcon },
  { name: "Apollo", cat: "Data + Outbound", desc: "275M+ contacts, email sequences, Vibe GTM agents", icon: ApolloIcon },
  { name: "Instantly", cat: "Cold Email", desc: "Multi-mailbox outbound, deliverability optimization", icon: InstantlyIcon },
  { name: "Attio", cat: "Modern CRM", desc: "Relational CRM for composable GTM stacks", icon: AttioIcon },
  { name: "Common Room", cat: "Signals", desc: "50+ signal sources, Person360 identity resolution", icon: CommonRoomIcon },
  { name: "Unify", cat: "Signal Outbound", desc: "25+ signal types, automated plays", icon: UnifyIcon },
  { name: "Pocus", cat: "PLS", desc: "Product-qualified lead scoring from usage data", icon: PocusIcon },
  { name: "Hightouch", cat: "Reverse ETL", desc: "Warehouse-to-CRM sync, composable CDP", icon: HightouchIcon },
  { name: "Snowflake", cat: "Data Warehouse", desc: "Source of truth for all GTM data", icon: SnowflakeIcon },
  { name: "Segment", cat: "Events", desc: "Product event collection and routing", icon: SegmentIcon },
  { name: "Stripe", cat: "Billing", desc: "Revenue events, expansion/churn signals", icon: StripeIcon },
  { name: "LinkedIn", cat: "Outbound", desc: "Connection requests, InMail, engagement tracking", icon: LinkedInIcon },
  { name: "Gong", cat: "Conversation Intel", desc: "Call analysis, MEDDIC scoring, deal risk", icon: GongIcon },
  { name: "Google Ads + Meta", cat: "Paid", desc: "Audience sync from warehouse segments", icon: GoogleAdsIcon },
  { name: "Coframe", cat: "AI Growth", desc: "Autonomous A/B testing, personalization, and website optimization", icon: CoframeIcon },
];

export default function EnvironmentsPage() {
  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-6xl">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Dashboard
        </p>
        <h1 className="mt-1 font-serif text-3xl italic tracking-tight text-neutral-900">
          Environments
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">
          Every GTM system is an environment to connect. Here&apos;s what Stardrop
          integrates with.
        </p>
      </div>

      {/* Live environments */}
      <div className="mb-12">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-green-600">
          Live
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liveEnvironments.map((env) => {
            const Icon = env.icon;
            return (
              <div
                key={env.name}
                className="rounded-xl border border-neutral-200 bg-white p-5 transition hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-50 border border-neutral-100">
                    <Icon size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-neutral-900 truncate">
                        {env.name}
                      </p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-700 border border-green-100 shrink-0">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                        Live
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {env.desc}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                  {env.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coming soon environments */}
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
          Coming soon &mdash; {comingSoonEnvironments.length} environments
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comingSoonEnvironments.map((env) => {
            const Icon = env.icon;
            return (
              <div
                key={env.name}
                className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100/80 border border-neutral-100 opacity-70">
                    <Icon size={22} className="grayscale-[30%]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-neutral-700 truncate">
                        {env.name}
                      </p>
                      <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium uppercase text-neutral-400 shrink-0">
                        {env.cat}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {env.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
