import { useRef, useEffect, useState } from "react";
import { Trophy, Rocket, Brain, Star } from "lucide-react";

const ACHIEVEMENTS = [
  {
    id: 1, icon: <Trophy size={26} />, emoji: "🏆",
    badge: "NATIONAL HACKATHON",
    title: "Top 10 Finalist",
    subtitle: "Gemini AI & Google Maps",
    desc: "Built a smart platform leveraging Google's Gemini AI and Maps API, competing among the top national teams in Indonesia.",
    tags: ["Gemini AI", "Google Maps", "React", "Node.js"],
    accent: "#00CFFD", glow: "rgba(0,207,253,0.2)",
    size: "large",
  },
  {
    id: 2, icon: <Rocket size={26} />, emoji: "🚀",
    badge: "NATIONAL STARTUP",
    title: "Top 20 — SheHacks",
    subtitle: "Indosat · Meurunoe.id",
    desc: "Selected as one of the top 20 startups nationally in SheHacks competition organized by Indosat Ooredoo.",
    tags: ["SheHacks", "Indosat", "Startup"],
    accent: "#A855F7", glow: "rgba(168,85,247,0.2)",
    size: "small",
  },
  {
    id: 3, icon: <Brain size={26} />, emoji: "🤖",
    badge: "IBM SCHOLARSHIP",
    title: "AI Engineer Scholar",
    subtitle: "PIJAK × IBM SkillsBuild 2026",
    desc: "Awarded scholarship for excellence in AI engineering through the PIJAK × IBM SkillsBuild 2026 program.",
    tags: ["IBM", "SkillsBuild", "AI", "2026"],
    accent: "#EC4899", glow: "rgba(236,72,153,0.2)",
    size: "small",
  },
  {
    id: 4, icon: <Star size={26} />, emoji: "⭐",
    badge: "USK RECOGNITION",
    title: "Most Outstanding Student",
    subtitle: "Mahasiswa Berprestasi · FMIPA USK",
    desc: "Recognized as the most outstanding student in the Faculty of Mathematics and Natural Sciences, Universitas Syiah Kuala.",
    tags: ["USK", "FMIPA", "Berprestasi"],
    accent: "#F59E0B", glow: "rgba(245,158,11,0.2)",
    size: "large",
  },
];

function AchievCard({ a, large }: { a: typeof ACHIEVEMENTS[0]; large?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px",
        borderRadius: "20px",
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? a.accent + "50" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered ? `0 0 40px ${a.glow}, inset 0 0 40px rgba(255,255,255,0.01)` : "none",
        transition: "all 0.4s ease",
        transform: hovered ? "translateY(-6px)" : "none",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        height: "100%",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${a.accent}, transparent)`,
        opacity: hovered ? 1 : 0.3,
        transition: "opacity 0.4s ease",
      }} />

      {/* Corner glow */}
      <div style={{
        position: "absolute", top: "-60px", right: "-60px",
        width: "160px", height: "160px", borderRadius: "50%",
        background: `radial-gradient(circle, ${a.accent}15 0%, transparent 70%)`,
        transition: "opacity 0.4s ease",
        opacity: hovered ? 1 : 0.4,
      }} />

      {/* Badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        padding: "5px 12px", borderRadius: "100px",
        background: `${a.accent}12`,
        border: `1px solid ${a.accent}30`,
        marginBottom: "20px",
      }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", fontWeight: "700", color: a.accent, letterSpacing: "1.5px" }}>
          {a.emoji} {a.badge}
        </span>
      </div>

      {/* Icon */}
      <div style={{
        width: "52px", height: "52px", borderRadius: "14px",
        background: `${a.accent}10`,
        border: `1px solid ${a.accent}20`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: a.accent,
        marginBottom: "16px",
        boxShadow: hovered ? `0 0 20px ${a.glow}` : "none",
        transition: "box-shadow 0.4s ease",
      }}>
        {a.icon}
      </div>

      <h3 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: large ? "24px" : "20px",
        fontWeight: "800", color: "white",
        letterSpacing: "-0.5px", marginBottom: "4px", lineHeight: 1.2,
      }}>{a.title}</h3>
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "13px", fontWeight: "600", color: a.accent, marginBottom: "12px",
      }}>{a.subtitle}</p>
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: "1.6", marginBottom: "20px",
      }}>{a.desc}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {a.tags.map(tag => (
          <span key={tag} style={{
            padding: "4px 10px", borderRadius: "6px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.3px",
          }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0; const step = target / 60;
        const timer = setInterval(() => {
          start = Math.min(start + step, target);
          setVal(Math.round(start));
          if (start >= target) clearInterval(timer);
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export function AchievementsGrid() {
  return (
    <section id="achievements" style={{
      background: "#07071A",
      padding: "100px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background decoration */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "800px", height: "800px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,207,253,0.03) 0%, transparent 65%)",
        pointerEvents: "none",
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
              🏅 RECOGNITION & AWARDS
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "800",
            color: "white", letterSpacing: "-2px", lineHeight: 1.05, marginBottom: "16px",
          }}>
            Achievements That
            <br />
            <span style={{
              background: "linear-gradient(135deg, #00CFFD 0%, #A855F7 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: "drop-shadow(0 0 20px rgba(0,207,253,0.3))",
            }}>Define Excellence</span>
          </h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "15px", color: "rgba(255,255,255,0.4)", maxWidth: "480px", margin: "0 auto", lineHeight: "1.7",
          }}>A track record of national recognition across AI, innovation, and academic leadership.</p>
        </div>

        {/* Bento Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)", gap: "18px",
        }} className="achiev-bento">
          <div style={{ gridColumn: "span 7" }} className="bento-span-large"><AchievCard a={ACHIEVEMENTS[0]} large /></div>
          <div style={{ gridColumn: "span 5" }} className="bento-span-small"><AchievCard a={ACHIEVEMENTS[1]} /></div>
          <div style={{ gridColumn: "span 5" }} className="bento-span-small"><AchievCard a={ACHIEVEMENTS[2]} /></div>
          <div style={{ gridColumn: "span 7" }} className="bento-span-large"><AchievCard a={ACHIEVEMENTS[3]} large /></div>
        </div>

        {/* Stats */}
        <div style={{
          marginTop: "40px",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px",
        }} className="stats-row-grid">
          {[
            { val: 388, suffix: "/400", label: "GPA Score", color: "#00CFFD" },
            { val: 4, suffix: "+", label: "National Awards", color: "#A855F7" },
            { val: 3, suffix: "+", label: "Live Projects", color: "#EC4899" },
            { val: 500, suffix: "+", label: "Community Impact", color: "#F59E0B" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "24px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              textAlign: "center",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = s.color + "40"; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${s.color}15`; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "36px", fontWeight: "800", color: s.color, letterSpacing: "-1px", lineHeight: 1.1,
                textShadow: `0 0 20px ${s.color}60`,
              }}>
                <CountUp target={s.val} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: "600", marginTop: "6px", letterSpacing: "0.5px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .achiev-bento { grid-template-columns: 1fr !important; }
          .bento-span-large, .bento-span-small { grid-column: 1 !important; }
        }
        @media (max-width: 640px) {
          .stats-row-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
