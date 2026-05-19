import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 40%, #0a0a1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "linear-gradient(135deg, #a855f7, #ec4899, #f97316)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 28 }}>V</span>
          </div>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 32 }}>DON Video</span>
        </div>

        {/* Headline */}
        <h1
          style={{
            color: "#fff",
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.1,
            margin: "0 0 24px 0",
            maxWidth: 820,
          }}
        >
          Professional{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #f59e0b, #f97316, #fbbf24)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Video Editing
          </span>{" "}
          Services
        </h1>

        {/* Subtitle */}
        <p style={{ color: "#aaa", fontSize: 26, margin: "0 0 48px 0", maxWidth: 720 }}>
          YouTube · TikTok · Reels · Color Grading · Motion Graphics · 24-48h Turnaround
        </p>

        {/* Stats */}
        <div style={{ display: "flex", gap: "48px" }}>
          {[
            ["10K+", "Videos Edited"],
            ["500+", "Clients"],
            ["98%", "Satisfaction"],
            ["24-48h", "Turnaround"],
          ].map(([val, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ color: "#f59e0b", fontSize: 34, fontWeight: 800 }}>{val}</span>
              <span style={{ color: "#666", fontSize: 16 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{ position: "absolute", bottom: 60, right: 80, color: "#555", fontSize: 22 }}>
          don-video.com
        </div>
      </div>
    ),
    { ...size }
  );
}
