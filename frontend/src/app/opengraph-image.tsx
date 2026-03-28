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
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#22c55e",
              marginRight: "12px",
            }}
          />
          <div
            style={{
              color: "#a3a3a3",
              fontSize: "20px",
              letterSpacing: "0.15em",
            }}
          >
            LIVE ON X
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              color: "white",
              lineHeight: 1.2,
            }}
          >
            Your GTM team
          </div>
          <div
            style={{
              fontSize: "72px",
              color: "white",
              lineHeight: 1.2,
              fontStyle: "italic",
            }}
          >
            just got smarter
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "32px",
            fontSize: "24px",
            color: "#737373",
            lineHeight: 1.6,
          }}
        >
          Tag @stardroplin on X — get competitive intel, ICP analysis, and
          outbound copy in 60 seconds.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontStyle: "italic",
              fontSize: "28px",
              color: "#525252",
            }}
          >
            Stardrop
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "18px",
              color: "#525252",
            }}
          >
            next-gen-gtm.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
