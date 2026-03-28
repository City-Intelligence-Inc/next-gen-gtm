import React from "react";

type IconProps = {
  className?: string;
  size?: number;
};

const defaults = { size: 20 };

// Twitter / X
export function XIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M3 3L8.5 10.5L3 17H4.5L9.25 11.5L13 17H17.5L11.5 9L16.5 3H15L10.75 8L7.5 3H3Z" fill="#000" />
    </svg>
  );
}

// OpenAI — simplified spiral/flower
export function OpenAIIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M10 2C10 2 12.5 4 12.5 7C14.5 5 17.5 5.5 17.5 8C17.5 10 15.5 11 13.5 10.5C16 12 16 15 13.5 16C11 17 9.5 15 9.5 13C8 15.5 5 15.5 4 13C3 10.5 5 9 7 9.5C4.5 8 4.5 5 7 4C9.5 3 10.5 5 10.5 7"
        stroke="#000"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// ChromaDB — colorful
export function ChromaDBIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="7" cy="7" r="4" fill="#FF6B6B" opacity="0.85" />
      <circle cx="13" cy="7" r="4" fill="#4ECDC4" opacity="0.85" />
      <circle cx="10" cy="13" r="4" fill="#FFE66D" opacity="0.85" />
    </svg>
  );
}

// AWS — orange smile/arrow
export function AWSIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="2" y="4" width="16" height="12" rx="2" fill="#FF9900" />
      <path d="M5 12C7 14 13 14 15 12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 11L15.5 12L13 13" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// GitHub — octocat silhouette simplified
export function GitHubIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M10 1.5C5.3 1.5 1.5 5.3 1.5 10C1.5 13.8 3.9 16.9 7.3 17.9C7.7 18 7.8 17.7 7.8 17.5V16C5.4 16.5 4.9 14.8 4.9 14.8C4.5 13.9 3.9 13.7 3.9 13.7C3.1 13.1 4 13.2 4 13.2C4.8 13.3 5.3 14 5.3 14C6 15.2 7.2 14.8 7.8 14.5C7.9 14 8.1 13.6 8.4 13.4C6.4 13.2 4.4 12.4 4.4 9.1C4.4 8.2 4.7 7.5 5.3 6.9C5.2 6.7 4.8 5.9 5.4 4.8C5.4 4.8 6.1 4.6 7.8 5.6C8.5 5.4 9.3 5.4 10 5.4C10.7 5.4 11.5 5.4 12.2 5.6C13.9 4.6 14.6 4.8 14.6 4.8C15.2 5.9 14.8 6.7 14.7 6.9C15.2 7.5 15.6 8.2 15.6 9.1C15.6 12.4 13.5 13.2 11.5 13.4C11.8 13.7 12.1 14.2 12.1 15V17.5C12.1 17.7 12.3 18 12.7 17.9C16.1 16.9 18.5 13.8 18.5 10C18.5 5.3 14.7 1.5 10 1.5Z"
        fill="#000"
      />
    </svg>
  );
}

// Luma — purple gradient circle with L
export function LumaIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="9" fill="#8B5CF6" />
      <path d="M7 6V14H13" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// HubSpot — orange sprocket
export function HubSpotIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="3.5" stroke="#FF7A59" strokeWidth="2" fill="none" />
      <circle cx="10" cy="3" r="1.5" fill="#FF7A59" />
      <circle cx="10" cy="17" r="1.5" fill="#FF7A59" />
      <circle cx="3" cy="10" r="1.5" fill="#FF7A59" />
      <circle cx="17" cy="10" r="1.5" fill="#FF7A59" />
      <circle cx="5" cy="5" r="1.2" fill="#FF7A59" />
      <circle cx="15" cy="5" r="1.2" fill="#FF7A59" />
      <circle cx="5" cy="15" r="1.2" fill="#FF7A59" />
      <circle cx="15" cy="15" r="1.2" fill="#FF7A59" />
    </svg>
  );
}

// Salesforce — blue cloud
export function SalesforceIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M5 14C3 14 1.5 12.5 1.5 10.5C1.5 8.8 2.7 7.4 4.3 7.1C4.5 5.3 6 4 7.8 4C8.7 4 9.5 4.4 10 5C10.6 4.1 11.7 3.5 12.8 3.5C14.7 3.5 16.2 5 16.3 6.9C17.8 7.2 19 8.5 19 10.2C19 12 17.5 13.5 15.7 13.5L5 14Z"
        fill="#00A1E0"
      />
    </svg>
  );
}

// Slack — colorful hash
export function SlackIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      {/* Vertical bars */}
      <rect x="5.5" y="3" width="2.5" height="6" rx="1.25" fill="#E01E5A" />
      <rect x="12" y="3" width="2.5" height="6" rx="1.25" fill="#2EB67D" />
      <rect x="5.5" y="11" width="2.5" height="6" rx="1.25" fill="#ECB22E" />
      <rect x="12" y="11" width="2.5" height="6" rx="1.25" fill="#36C5F0" />
      {/* Horizontal bars */}
      <rect x="3" y="5.5" width="6" height="2.5" rx="1.25" fill="#36C5F0" />
      <rect x="11" y="5.5" width="6" height="2.5" rx="1.25" fill="#E01E5A" />
      <rect x="3" y="12" width="6" height="2.5" rx="1.25" fill="#2EB67D" />
      <rect x="11" y="12" width="6" height="2.5" rx="1.25" fill="#ECB22E" />
    </svg>
  );
}

// Clay — blue rounded square with C
export function ClayIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="2" y="2" width="16" height="16" rx="4" fill="#2563EB" />
      <path d="M12.5 7C11.5 5.8 10 5.5 8.5 6C6.5 7 6 9.5 7 11.5C8 13.5 10.5 14 12.5 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// Apollo — blue/purple circle with rocket shape
export function ApolloIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="9" fill="#6366F1" />
      <path d="M10 4L7 14H9L10 10L11 14H13L10 4Z" fill="#fff" />
    </svg>
  );
}

// Instantly — blue lightning bolt
export function InstantlyIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="9" fill="#3B82F6" />
      <path d="M11 3L6 11H10L9 17L14 9H10L11 3Z" fill="#fff" />
    </svg>
  );
}

// Attio — purple geometric
export function AttioIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="2" y="2" width="16" height="16" rx="4" fill="#7C3AED" />
      <path d="M6 14L10 6L14 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="7.5" y1="11" x2="12.5" y2="11" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Common Room — green circle with door/room
export function CommonRoomIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="9" fill="#22C55E" />
      <rect x="7" y="6" width="6" height="9" rx="1" stroke="#fff" strokeWidth="1.5" fill="none" />
      <circle cx="11.5" cy="10.5" r="0.8" fill="#fff" />
    </svg>
  );
}

// Unify — blue U shape
export function UnifyIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="2" y="2" width="16" height="16" rx="4" fill="#2563EB" />
      <path d="M6 6V12C6 14.2 7.8 16 10 16C12.2 16 14 14.2 14 12V6" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// Pocus — purple circle with crosshair/target
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

// Hightouch — blue upward arrow
export function HightouchIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="2" y="2" width="16" height="16" rx="4" fill="#0EA5E9" />
      <path d="M10 15V6M6 9L10 5L14 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Snowflake — light blue snowflake
export function SnowflakeIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <line x1="10" y1="2" x2="10" y2="18" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="6" x2="17" y2="14" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="14" x2="17" y2="6" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" />
      <line x1="7.5" y1="2.5" x2="10" y2="5" stroke="#29B5E8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12.5" y1="2.5" x2="10" y2="5" stroke="#29B5E8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7.5" y1="17.5" x2="10" y2="15" stroke="#29B5E8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12.5" y1="17.5" x2="10" y2="15" stroke="#29B5E8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Segment — green circle with S
export function SegmentIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="9" fill="#52BD95" />
      <line x1="4" y1="7" x2="16" y2="7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="4" y1="10" x2="12" y2="10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="4" y1="13" x2="16" y2="13" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// Stripe — purple circle with S
export function StripeIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="2" y="2" width="16" height="16" rx="4" fill="#635BFF" />
      <path
        d="M10.5 7C9.5 6.5 7.5 6.5 7.5 8C7.5 10.5 12.5 9.5 12.5 12.5C12.5 14 10.5 14.5 9 14C8 13.6 7.5 13 7.5 13"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// LinkedIn — blue square with "in"
export function LinkedInIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="2" y="2" width="16" height="16" rx="2" fill="#0A66C2" />
      <circle cx="6.5" cy="7" r="1.2" fill="#fff" />
      <rect x="5.5" y="9" width="2" height="6" rx="0.5" fill="#fff" />
      <path d="M9.5 9H11.5V10C12 9.2 12.8 8.8 13.5 9C14.5 9.2 15 10 15 11V15H13V11.5C13 10.8 12.5 10.5 12 10.5C11.3 10.5 11 11 11 11.5V15H9.5V9Z" fill="#fff" />
    </svg>
  );
}

// Gong — purple circle with sound waves
export function GongIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="9" fill="#7C3AED" />
      <circle cx="8" cy="10" r="3" stroke="#fff" strokeWidth="1.5" fill="none" />
      <path d="M13 6.5C14.5 8 14.5 12 13 13.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M15.5 4.5C17.5 7 17.5 13 15.5 15.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// Google Ads — colorful triangle/play shape
export function GoogleAdsIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M3 15L10 3L12.5 7.5L5.5 19Z" fill="#FBBC04" />
      <path d="M10 3L17 15H12L5 3Z" fill="#4285F4" />
      <circle cx="4" cy="16" r="2.5" fill="#34A853" />
    </svg>
  );
}

// Meta — blue infinity/figure-eight
export function MetaIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="9" fill="#0668E1" />
      <path
        d="M4.5 10C4.5 8 5.5 6 7 6C8 6 8.5 7 10 10C11.5 13 12 14 13 14C14.5 14 15.5 12 15.5 10C15.5 12 14.5 14 13 14C12 14 11.5 13 10 10C8.5 7 8 6 7 6C5.5 6 4.5 8 4.5 10Z"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Coframe — teal/green circle with overlapping frames
export function CoframeIcon({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="2" y="2" width="16" height="16" rx="4" fill="#0D9488" />
      <rect x="5" y="5" width="5.5" height="5.5" rx="1" stroke="#fff" strokeWidth="1.3" fill="none" />
      <rect x="9.5" y="9.5" width="5.5" height="5.5" rx="1" stroke="#fff" strokeWidth="1.3" fill="none" />
    </svg>
  );
}
