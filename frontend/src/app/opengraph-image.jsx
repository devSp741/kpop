import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "K-Pop Radar - Never Miss Your Favorite Idol's Updates";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #311042 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
          position: "relative",
          padding: "40px",
        }}
      >
        {/* Background Decorative Circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Logo Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "10px 24px",
            borderRadius: "9999px",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: "24px", fontWeight: "bold", color: "#EC4899" }}>⚡</span>
          <span style={{ fontSize: "20px", fontWeight: "600", letterSpacing: "1px", color: "#F8FAFC" }}>
            K-POP RADAR
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: "900",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "20px",
            color: "#FFFFFF",
            maxWidth: "900px",
          }}
        >
          Never Miss Your Favorite Idol's Updates Again
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "22px",
            textAlign: "center",
            color: "#94A3B8",
            maxWidth: "800px",
            lineHeight: 1.5,
            marginBottom: "36px",
          }}
        >
          Track real-time drops, YouTube videos, Weverse posts, Instagram updates & Comeback schedules in one clean feed.
        </div>

        {/* Platform Tags */}
        <div
          style={{
            display: "flex",
            gap: "14px",
          }}
        >
          {["YouTube", "Instagram", "TikTok", "Weverse", "X (Twitter)"].map((platform) => (
            <div
              key={platform}
              style={{
                backgroundColor: "rgba(124, 58, 237, 0.25)",
                border: "1px solid rgba(168, 85, 247, 0.4)",
                color: "#E9D5FF",
                padding: "8px 18px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              {platform}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
