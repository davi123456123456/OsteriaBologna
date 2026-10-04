import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: monogramma "OB" in serif su pergamena. */
export default async function Icon() {
  const fraunces = await readFile(join(process.cwd(), "src/fonts/Fraunces-Light-OG.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ebe3d5",
          color: "#2c2c2c",
          fontFamily: "Fraunces",
          fontSize: 40,
          letterSpacing: "-0.06em",
          paddingTop: 4,
        }}
      >
        OB
      </div>
    ),
    { ...size, fonts: [{ name: "Fraunces", data: fraunces, weight: 300, style: "normal" }] },
  );
}
