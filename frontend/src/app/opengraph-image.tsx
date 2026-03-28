import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Stardrop — Next-Gen GTM Intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 12px rgba(34,197,94,0.5)",
            }}
          />
          <span
            style={{
              color: "#a3a3a3",
              fontSize: "20px",
              fontFamily: "sans-serif",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Live on X
          </span>
        </div>
        <div
          style={{
            marginTop: "32px",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "72px",
            color: "white",
            lineHeight: 1.15,
          }}
        >
          Your GTM team
          <br />
          just got smarter
        </div>
        <div
          style={{
            marginTop: "32px",
            fontSize: "24px",
            color: "#737373",
            lineHeight: 1.6,
            maxWidth: "700px",
          }}
        >
          Tag @stardroplin on X — get competitive intel, ICP analysis, and
          outbound copy in 60 seconds. Powered by AI + 60 pages of GTM research.
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: "28px",
              color: "#525252",
            }}
          >
            Stardrop
          </span>
          <span style={{ fontSize: "18px", color: "#525252" }}>
            next-gen-gtm.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
