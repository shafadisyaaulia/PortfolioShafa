import { useState } from "react";

const TECH = [
  {
    group: "Languages & Frameworks",
    icon: "⚡",
    items: [
      { name: "Python", lvl: 92, color: "#3776AB", icon: "🐍" },
      { name: "React", lvl: 90, color: "#61DAFB", icon: "⚛️" },
      { name: "Laravel", lvl: 80, color: "#FF2D20", icon: "🔴" },
      { name: "Node.js", lvl: 85, color: "#339933", icon: "🟢" },
    ],
  },
  {
    group: "AI & Machine Learning",
    icon: "🤖",
    items: [
      { name: "TensorFlow", lvl: 85, color: "#FF6F00", icon: "🔶" },
      { name: "YOLO / OpenCV", lvl: 80, color: "#5C3EE8", icon: "👁️" },
      { name: "Gemini AI", lvl: 88, color: "#4285F4", icon: "✨" },
      { name: "Scikit-learn", lvl: 82, color: "#F7931E", icon: "📊" },
    ],
  },
  {
    group: "Tools & Design",
    icon: "🎨",
    items: [
      { name: "Figma", lvl: 88, color: "#F24E1E", icon: "🖌️" },
      { name: "MongoDB", lvl: 78, color: "#47A248", icon: "🍃" },
      { name: "MySQL", lvl: 75, color: "#4479A1", icon: "💾" },
      { name: "Git / GitHub", lvl: 90, color: "#E34F26", icon: "🐙" },
    ],
  },
];

function TechBar({ item, visible }: { item: { name: string; lvl: number; color: string; icon: string }; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "16px 20px",
        borderRadius: "14px",
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? item.color + "40" : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.3s ease",
        transform: hovered ? "translateX(4px)" : "none",
        boxShadow: hovered ? `0 0 20px ${item.color}20` : "none",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px" }}>{item.icon}</span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: "600", color: hovered ? "white" : "rgba(255,255,255,0.7)" }}>
            {item.name}
          </span>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px", fontWeight: "700", color: item.color,
          textShadow: hovered ? `0 0 12px ${item.color}` : "none",
        }}>{item.lvl}%</span>
      </div>
      {/* Progress bar */}
      <div style={{
        height: "4px", borderRadius: "100px",
        background: "rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: "100px",
          width: visible ? `${item.lvl}%` : "0%",
          background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
          boxShadow: hovered ? `0 0 12px ${item.color}` : `0 0 6px ${item.color}60`,
          transition: "width 1.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease",
        }} />
      </div>
    </div>
  );
}

export function TechStack() {
  const [visible, setVisible] = useState(false);

  return (
    <section id="tech" style={{
      background: "#060614",
      padding: "100px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background hex pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(0,207,253,0.04) 1.5px, transparent 1.5px)",
        backgroundSize: "30px 30px", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "-200px", left: "-200px",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,207,253,0.06) 0%, transparent 65%)",
        filter: "blur(20px)", pointerEvents: "none",
      }} />

      <div
        style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}
        ref={el => {
          if (el) {
            const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
            obs.observe(el);
          }
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "100px",
            background: "rgba(0,207,253,0.08)",
            border: "1px solid rgba(0,207,253,0.2)",
            marginBottom: "20px",
          }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: "700", color: "#00CFFD", letterSpacing: "1.5px" }}>
              ⚙️ TECHNICAL EXPERTISE
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "800",
            color: "white", letterSpacing: "-2px", lineHeight: 1.05, marginBottom: "8px",
          }}>
            Tools &{" "}
            <span style={{
              background: "linear-gradient(135deg, #00CFFD 0%, #A855F7 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: "drop-shadow(0 0 20px rgba(0,207,253,0.3))",
            }}>Technologies</span>
          </h2>
        </div>

        {/* Tech Grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px",
        }} className="tech-grid-layout">
          {TECH.map(group => (
            <div key={group.group} style={{
              padding: "28px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              position: "relative", overflow: "hidden",
            }}>
              {/* Group header */}
              <div style={{
                display: "flex", alignItems: "center", gap: "10px",
                marginBottom: "24px", paddingBottom: "16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>
                <span style={{ fontSize: "20px" }}>{group.icon}</span>
                <span style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "13px", fontWeight: "700",
                  color: "rgba(255,255,255,0.5)", letterSpacing: "1px",
                  textTransform: "uppercase",
                }}>{group.group}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {group.items.map(item => (
                  <TechBar key={item.name} item={item} visible={visible} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom highlight */}
        <div style={{
          marginTop: "40px",
          padding: "24px 32px",
          borderRadius: "16px",
          background: "rgba(0,207,253,0.04)",
          border: "1px solid rgba(0,207,253,0.12)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "20px",
        }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.3px" }}>
            <span style={{ color: "#00CFFD", fontWeight: "700" }}>12+ technologies</span> mastered across the full stack, from UI design to AI/ML deployment.
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["Python", "React", "AI/ML", "Figma", "Cloud"].map(t => (
              <span key={t} style={{
                padding: "5px 12px", borderRadius: "100px",
                background: "rgba(0,207,253,0.08)",
                border: "1px solid rgba(0,207,253,0.2)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "12px", fontWeight: "600", color: "#00CFFD",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .tech-grid-layout { grid-template-columns: 1fr !important; } }
        @media (min-width: 640px) and (max-width: 900px) { .tech-grid-layout { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
