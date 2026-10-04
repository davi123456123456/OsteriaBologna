import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Osteria Bologna, trattoria bolognese";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Immagine Open Graph 1200×630: cantina, wordmark pergamena, didascalia (brief §11). */
export default async function OpenGraphImage() {
  const satoshi = await readFile(join(process.cwd(), "src/fonts/Satoshi-Medium.otf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px 64px 72px",
          background: "#292622",
          color: "#ebe3d5",
          fontFamily: "Satoshi",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 40, fontSize: 22, letterSpacing: "-0.012em", textTransform: "uppercase" }}>
          <span>Trattoria bolognese</span>
          <span style={{ flex: 1, height: 1, background: "rgba(235,227,213,0.16)" }} />
          <span>Bologna</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 196, lineHeight: 0.8, letterSpacing: "-0.016em", textTransform: "uppercase" }}>
          <span>Osteria</span>
          <span>Bologna</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Satoshi", data: satoshi, weight: 500, style: "normal" }] },
  );
}
