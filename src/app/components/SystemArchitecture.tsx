import { useState } from "react";

type Layer = { key: string; label: string; num: string; color: string; nodes: Node[] };
type Node = { id: string; label: string; sub: string; color: string };

const LAYERS: Layer[] = [
  {
    key: "client", label: "Client Layer", num: "L1", color: "#00CFFD",
    nodes: [
      { id: "react", label: "React 18", sub: "Frontend UI", color: "#61DAFB" },
      { id: "tailwind", label: "Tailwind CSS", sub: "Styling", color: "#06B6D4" },
      { id: "figma", label: "Figma", sub: "UX/UI Design", color: "#F24E1E" },
    ],
  },
  {
    key: "api", label: "API Gateway", num: "L2", color: "#A855F7",
    nodes: [
      { id: "rest", label: "REST API", sub: "HTTP/JSON", color: "#A855F7" },
      { id: "ws", label: "WebSocket", sub: "Real-time", color: "#7C3AED" },
      { id: "auth", label: "JWT Auth", sub: "Authentication", color: "#8B5CF6" },
    ],
  },
  {
    key: "backend", label: "Backend Services", num: "L3", color: "#00FF88",
    nodes: [
      { id: "nodejs", label: "Node.js", sub: "API Server", color: "#339933" },
      { id: "laravel", label: "Laravel", sub: "PHP Framework", color: "#FF2D20" },
      { id: "queue", label: "Job Queue", sub: "Async Tasks", color: "#10B981" },
    ],
  },
  {
    key: "ai", label: "AI / ML Engine", num: "L4", color: "#EC4899",
    nodes: [
      { id: "gemini", label: "Gemini AI", sub: "Google AI", color: "#4285F4" },
      { id: "yolo", label: "YOLO v8", sub: "Object Detection", color: "#EC4899" },
      { id: "tf", label: "TensorFlow", sub: "ML Models", color: "#FF6F00" },
    ],
  },
  {
    key: "data", label: "Data Layer", num: "L5", color: "#F59E0B",
    nodes: [
      { id: "mongo", label: "MongoDB", sub: "NoSQL Store", color: "#47A248" },
      { id: "mysql", label: "MySQL", sub: "Relational DB", color: "#4479A1" },
      { id: "redis", label: "Redis", sub: "Cache Layer", color: "#DC382D" },
    ],
  },
];

export function SystemArchitecture() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section id="architecture" style={{
      background: "var(--bg-primary)",
      padding: "100px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,207,253,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,207,253,0.025) 1px, transparent 1px)",
        backgroundSize: "40px 40px", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "100px",
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.2)",
            marginBottom: "20px",
          }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: "700", color: "#F59E0B", letterSpacing: "1.5px" }}>
              🏗️ SYSTEM DESIGN
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "800",
            color: "var(--text-primary)", letterSpacing: "-2px", lineHeight: 1.05,
          }}>
            Technical System
            <span style={{
              background: "linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: "drop-shadow(0 0 20px rgba(245,158,11,0.4))",
            }}> Architecture</span>
          </h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "14px", color: "var(--text-muted)", marginTop: "16px", letterSpacing: "0.3px",
          }}>Hover layers to explore the full technical stack</p>
        </div>

        {/* Terminal Diagram */}
        <div style={{
          borderRadius: "20px", overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 0 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.03)",
        }}>
          {/* Terminal Header */}
          <div style={{
            background: "#0D0D24",
            padding: "14px 20px",
            display: "flex", alignItems: "center", gap: "8px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ display: "flex", gap: "6px" }}>
              {["#FF5F57", "#FFBD2E", "#28C840"].map(c => (
                <div key={c} style={{ width: "11px", height: "11px", borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}80` }} />
              ))}
            </div>
            <span style={{
              marginLeft: "12px", fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px", color: "rgba(255,255,255,0.3)",
            }}>~/shafa/architecture.diagram — v2.6.0</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: "4px" }}>
              {["L1", "L2", "L3", "L4", "L5"].map((l, i) => (
                <div key={l} style={{
                  padding: "2px 8px", borderRadius: "4px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px", fontWeight: "700",
                  color: LAYERS[i].color + "99",
                  background: LAYERS[i].color + "12",
                }}>{l}</div>
              ))}
            </div>
          </div>

          {/* Diagram Body */}
          <div style={{ background: "#0A0A1E", padding: "32px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {LAYERS.map((layer, li) => (
                <div key={layer.key}>
                  <div
                    onMouseEnter={() => setActiveLayer(layer.key)}
                    onMouseLeave={() => setActiveLayer(null)}
                    style={{
                      borderRadius: "14px",
                      background: activeLayer === layer.key ? `${layer.color}06` : "rgba(255,255,255,0.02)",
                      border: `1px solid ${activeLayer === layer.key ? layer.color + "40" : "rgba(255,255,255,0.05)"}`,
                      padding: "16px 20px",
                      transition: "all 0.3s ease",
                      boxShadow: activeLayer === layer.key ? `0 0 30px ${layer.color}15` : "none",
                      cursor: "default",
                    }}
                  >
                    <div style={{
                      display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px",
                    }}>
                      {/* Layer indicator */}
                      <div style={{
                        padding: "3px 10px", borderRadius: "6px",
                        background: `${layer.color}15`,
                        border: `1px solid ${layer.color}30`,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px", fontWeight: "700", color: layer.color,
                        letterSpacing: "0.5px",
                      }}>{layer.num}</div>
                      <span style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "13px", fontWeight: "700",
                        color: activeLayer === layer.key ? "white" : "rgba(255,255,255,0.55)",
                        transition: "color 0.3s ease",
                      }}>{layer.label}</span>
                      {activeLayer === layer.key && (
                        <div style={{
                          marginLeft: "auto",
                          width: "6px", height: "6px", borderRadius: "50%",
                          background: layer.color, boxShadow: `0 0 10px ${layer.color}`,
                          animation: "nodePulse 1.5s infinite",
                        }} />
                      )}
                    </div>

                    {/* Nodes */}
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {layer.nodes.map(node => (
                        <div
                          key={node.id}
                          onMouseEnter={() => setActiveNode(node.id)}
                          onMouseLeave={() => setActiveNode(null)}
                          style={{
                            display: "flex", alignItems: "center", gap: "8px",
                            padding: "8px 14px", borderRadius: "10px",
                            background: activeNode === node.id ? `${node.color}15` : `${node.color}06`,
                            border: `1px solid ${activeNode === node.id ? node.color + "50" : node.color + "15"}`,
                            transition: "all 0.25s ease",
                            transform: activeNode === node.id ? "scale(1.05)" : "none",
                            boxShadow: activeNode === node.id ? `0 0 20px ${node.color}30` : "none",
                            cursor: "default",
                          }}
                        >
                          <div style={{
                            width: "7px", height: "7px", borderRadius: "50%",
                            background: node.color,
                            boxShadow: activeNode === node.id ? `0 0 10px ${node.color}` : `0 0 4px ${node.color}80`,
                            transition: "box-shadow 0.3s ease",
                          }} />
                          <div>
                            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.8)", lineHeight: 1.2 }}>
                              {node.label}
                            </div>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", lineHeight: 1.2 }}>
                              {node.sub}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connector */}
                  {li < LAYERS.length - 1 && (
                    <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                        <div style={{ width: "1px", height: "10px", background: `linear-gradient(to bottom, ${LAYERS[li].color}40, ${LAYERS[li+1].color}40)` }} />
                        <svg width="10" height="7" viewBox="0 0 10 7">
                          <path d="M5 7L0 0h10L5 7z" fill={`${LAYERS[li+1].color}40`} />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{
              marginTop: "24px", padding: "16px 20px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.04)",
              display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap",
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.5px" }}>
                LEGEND:
              </span>
              {LAYERS.map(l => (
                <div key={l.key} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: l.color, boxShadow: `0 0 6px ${l.color}60` }} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: "500" }}>{l.label}</span>
                </div>
              ))}
              <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
                ↕ hover to inspect
              </span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div style={{
          marginTop: "28px",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px",
        }} className="arch-metrics-grid">
          {[
            { val: "5", label: "Architecture Layers", icon: "🏗️", color: "#00CFFD" },
            { val: "3", label: "AI Models Active", icon: "🤖", color: "#EC4899" },
            { val: "2", label: "Database Systems", icon: "🗄️", color: "#F59E0B" },
            { val: "REST+WS", label: "API Protocols", icon: "🔌", color: "#A855F7" },
          ].map((m, i) => (
            <div key={i} style={{
              padding: "20px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              textAlign: "center",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = m.color + "40"; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${m.color}15`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>{m.icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: "800", color: m.color, letterSpacing: "-0.5px", textShadow: `0 0 15px ${m.color}50` }}>{m.val}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", fontWeight: "600", marginTop: "4px" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes nodePulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @media (max-width: 640px) { .arch-metrics-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
