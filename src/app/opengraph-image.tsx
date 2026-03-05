import { ImageResponse } from "next/og";

export const alt = "2137.dev — Solana / Backend / AI Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0c0c0c",
          padding: 60,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#34d399",
            }}
          />
          <span
            style={{
              fontSize: 14,
              color: "#666",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Available for new projects
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          2137<span style={{ color: "#ffb800" }}>.dev</span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#ffb800",
            marginBottom: 12,
          }}
        >
          Solana / Backend / AI Agency
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#666",
          }}
        >
          Fixed-scope consulting. 7 years building production systems.
        </div>
      </div>
    ),
    { ...size }
  );
}
