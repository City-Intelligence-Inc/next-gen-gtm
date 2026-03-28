import React from "react";

type IconProps = {
  className?: string;
  size?: number;
};

const defaults = { size: 20 };

// Helper for real SVG logo files in /logos/
function LogoImg({ src, alt, className, size = defaults.size }: IconProps & { src: string; alt: string }) {
  return <img src={src} alt={alt} width={size} height={size} className={className} style={{ objectFit: "contain" }} />;
}

// === REAL LOGOS (from /logos/) ===

export function XIcon({ className, size = defaults.size }: IconProps) {
  return <LogoImg src="/logos/x-twitter.svg" alt="X / Twitter" className={className} size={size} />;
}

export function OpenAIIcon({ className, size = defaults.size }: IconProps) {
  return <LogoImg src="/logos/openai.svg" alt="OpenAI" className={className} size={size} />;
}

export function AWSIcon({ className, size = defaults.size }: IconProps) {
  return <LogoImg src="/logos/aws.svg" alt="AWS" className={className} size={size} />;
}

export function GitHubIcon({ className, size = defaults.size }: IconProps) {
  return <LogoImg src="/logos/github.svg" alt="GitHub" className={className} size={size} />;
}

export function HubSpotIcon({ className, size = defaults.size }: IconProps) {
  return <LogoImg src="/logos/hubspot.svg" alt="HubSpot" className={className} size={size} />;
}

export function SalesforceIcon({ className, size = defaults.size }: IconProps) {
  return <LogoImg src="/logos/salesforce.svg" alt="Salesforce" className={className} size={size} />;
}

export function SlackIcon({ className, size = defaults.size }: IconProps) {
  return <LogoImg src="/logos/slack.svg" alt="Slack" className={className} size={size} />;
}

export function StripeIcon({ className, size = defaults.size }: IconProps) {
  return <LogoImg src="/logos/stripe.svg" alt="Stripe" className={className} size={size} />;
}

export function LinkedInIcon({ className, size = defaults.size }: IconProps) {
  return <LogoImg src="/logos/linkedin.svg" alt="LinkedIn" className={className} size={size} />;
}

export function SnowflakeIcon({ className, size = defaults.size }: IconProps) {
  return <LogoImg src="/logos/snowflake.svg" alt="Snowflake" className={className} size={size} />;
}

export function MetaIcon({ className, size = defaults.size }: IconProps) {
  return <LogoImg src="/logos/meta.svg" alt="Meta" className={className} size={size} />;
}

export function GoogleAdsIcon({ className, size = defaults.size }: IconProps) {
  return <LogoImg src="/logos/google-ads.svg" alt="Google Ads" className={className} size={size} />;
}

// === GENERATED ICONS (no public SVG available) ===

export function ChromaDBIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="7" cy="7" r="4" fill="#FF6B6B" opacity="0.85" />
      <circle cx="13" cy="7" r="4" fill="#4ECDC4" opacity="0.85" />
      <circle cx="10" cy="13" r="4" fill="#FFE66D" opacity="0.85" />
    </svg>
  );
}

export function LumaIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <defs>
        <linearGradient id="lumaGrad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="18" height="18" rx="5" fill="url(#lumaGrad)" />
      <path d="M7.5 5.5V14.5H13.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ClayIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="2" y="2" width="16" height="16" rx="4" fill="#2563EB" />
      <path d="M12.5 7C11.5 5.8 10 5.5 8.5 6C6.5 7 6 9.5 7 11.5C8 13.5 10.5 14 12.5 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function ApolloIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="9" fill="#2563EB" />
      <path d="M10 4L7 14H9L10 10L11 14H13L10 4Z" fill="#fff" />
    </svg>
  );
}

export function InstantlyIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="9" fill="#3B82F6" />
      <path d="M11 3L6 11H10L9 17L14 9H10L11 3Z" fill="#fff" />
    </svg>
  );
}

export function AttioIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="2" y="2" width="16" height="16" rx="4" fill="#7C3AED" />
      <path d="M6 14L10 6L14 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="7.5" y1="11" x2="12.5" y2="11" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CommonRoomIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="9" fill="#22C55E" />
      <path d="M5 9.5C5 6.7 7.2 5 10 5C12.8 5 15 6.7 15 9.5C15 12.3 12.8 13.5 10 13.5V16L7.5 13.5C6 12.5 5 11.2 5 9.5Z" fill="#fff" />
    </svg>
  );
}

export function UnifyIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="2" y="2" width="16" height="16" rx="4" fill="#2563EB" />
      <path d="M6 6V12C6 14.2 7.8 16 10 16C12.2 16 14 14.2 14 12V6" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function PocusIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="9" fill="#9333EA" />
      <circle cx="10" cy="10" r="4" stroke="#fff" strokeWidth="1.5" fill="none" />
      <circle cx="10" cy="10" r="1.5" fill="#fff" />
      <line x1="10" y1="3" x2="10" y2="6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="14" x2="10" y2="17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="10" x2="6" y2="10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="10" x2="17" y2="10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function HightouchIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="2" y="2" width="16" height="16" rx="4" fill="#0EA5E9" />
      <path d="M10 15V6M6 9L10 5L14 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SegmentIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="9" fill="#52BD95" />
      <path d="M12.5 5.5C11 5 8.5 5.2 7 6.5C5.5 7.8 5.8 9.5 7.5 10C9.2 10.5 11.5 10 12.5 10.5C14 11.2 13.8 12.8 12.5 13.8C11 15 8.5 15.2 7 14.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function GongIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="9" fill="#7C3AED" />
      <path d="M13 6C11.5 5 8.5 5 7 6.5C5.5 8 5.5 11 7 13C8.5 14.5 11 15 13 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M13 10H10.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CoframeIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="2" y="2" width="16" height="16" rx="4" fill="#0D9488" />
      <rect x="5" y="5" width="5.5" height="5.5" rx="1" stroke="#fff" strokeWidth="1.3" fill="none" />
      <rect x="9.5" y="9.5" width="5.5" height="5.5" rx="1" stroke="#fff" strokeWidth="1.3" fill="none" />
    </svg>
  );
}
