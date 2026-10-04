import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
          fontSize: 104,
          letterSpacing: "-0.06em",
          paddingTop: 10,
        }}
      >
        OB
      </div>
    ),
    { ...size, fonts: [{ name: "Fraunces", data: fraunces, weight: 300, style: "normal" }] },
  );
}
