import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Tayylo | The modern tailor’s notebook";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const lockup = await readFile(join(process.cwd(), "public/brand/tayylo-lockup-cream.svg"), "utf8");
  const lockupSrc = `data:image/svg+xml;base64,${Buffer.from(lockup).toString("base64")}`;

  const ticks = Array.from({ length: 121 }, (_, i) => i);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#2E3420", padding: "64px 72px", position: "relative" }}>
        {/* Tape edge */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 22, display: "flex", opacity: 0.35 }}>
          {ticks.map(i => (
            <div key={i} style={{ width: 1, height: i % 10 === 0 ? 22 : i % 5 === 0 ? 15 : 9, background: "#FBFAF7", marginRight: 9 }} />
          ))}
        </div>
        {/* eslint-disable-next-line jsx-a11y/alt-text -- rendered to PNG by ImageResponse */}
        <img src={lockupSrc} width={333} height={80} style={{ marginTop: 28 }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.02, color: "#FBFAF7", letterSpacing: -3, fontWeight: 500 }}>Every client. Every measurement.</div>
          <div style={{ fontSize: 84, lineHeight: 1.08, color: "#A9B386", letterSpacing: -3, fontWeight: 500 }}>Remembered.</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#C9CDB8" }}>The modern tailor&rsquo;s notebook for iPhone, Android and the web.</div>
        </div>
      </div>
    ),
    size
  );
}
