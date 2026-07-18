import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Shared branded OG image template — no external font/image fetches (Satori's
// built-in default typeface only), so this works offline and needs no
// third-party service.
export function renderOgImage(title: string, eyebrow?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#F7F5F1",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#0F3D3E",
              color: "#F7F5F1",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            AH
          </div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: "#1C2230" }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 600,
                color: "#0F3D3E",
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 20,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div style={{ display: "flex", fontSize: 58, fontWeight: 700, color: "#1C2230", lineHeight: 1.15 }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "#4A5164" }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
