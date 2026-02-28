import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Star, Zap } from "lucide-react";
import { settingsApi } from "@/lib/api";
import settingsDataImport from "@/data/settings.json";

// Ganti dengan foto Anda sendiri
// Taruh foto di: public/images/shafa-portrait.jpg
const PORTRAIT_URL = "/images/shafa-portrait.JPG";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; size: number; color: string }[] = [];
    const colors = ["#00CFFD", "#A855F7", "#EC4899", "#00FF88"];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.1,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        // Draw connections
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x; const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 100) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
        ctx.globalAlpha = 1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1,
    }} />
  );
}

export function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [settings, setSettings] = useState<any>(null);
  const roles = ["AI Engineer", "Product Leader", "IBM AI Scholar", "Hackathon Finalist", "Community Facilitator"];

  // Load settings from API
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await settingsApi.get();
        if (response.success && response.data) {
          setSettings(response.data);
          console.log('📦 Loaded settings from MongoDB:', response.data);
        } else {
          // Fallback to localStorage or defaults
          const storedSettings = localStorage.getItem('portfolio_settings');
          if (storedSettings) {
            setSettings(JSON.parse(storedSettings));
          } else {
            setSettings(settingsDataImport);
          }
        }
      } catch (error) {
        console.error('Error loading settings:', error);
        // Fallback to localStorage or defaults
        const storedSettings = localStorage.getItem('portfolio_settings');
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        } else {
          setSettings(settingsDataImport);
        }
      }
    };

    loadSettings();

    // Listen for settings updates
    const handleSettingsUpdate = () => {
      loadSettings();
    };
    window.addEventListener('portfolioSettingsUpdated', handleSettingsUpdate);

    return () => {
      window.removeEventListener('portfolioSettingsUpdated', handleSettingsUpdate);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setVisible(true), 150);
    const t = setInterval(() => setRoleIdx(p => (p + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      position: "relative",
      overflow: "hidden",
      paddingTop: "80px",
      display: "flex",
      alignItems: "center",
      transition: "background 0.3s ease",
    }}>
      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none", zIndex: 0,
        opacity: 0.4,
      }} />

      {/* Glowing orbs */}
      <div style={{
        position: "absolute", top: "-250px", left: "-150px",
        width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,207,253,0.12) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0, filter: "blur(20px)",
      }} />
      <div style={{
        position: "absolute", bottom: "-250px", right: "-150px",
        width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0, filter: "blur(20px)",
      }} />
      <div style={{
        position: "absolute", top: "40%", left: "40%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0, filter: "blur(30px)",
      }} />

      {/* Particles */}
      <ParticleCanvas />

      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,207,253,0.015) 2px, rgba(0,207,253,0.015) 4px)",
      }} />

      {/* Main Content */}
      <div style={{
        maxWidth: "1280px", margin: "0 auto", padding: "60px 24px",
        width: "100%", position: "relative", zIndex: 3,
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center",
      }} className="hero-main-grid">

        {/* LEFT */}
        <div style={{
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
          transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
        }}>
          {/* Status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "8px 16px", borderRadius: "100px",
            background: "rgba(0,207,253,0.07)",
            border: "1px solid rgba(0,207,253,0.25)",
            marginBottom: "32px",
          }}>
            <div style={{
              width: "7px", height: "7px", borderRadius: "50%", background: "#00FF88",
              boxShadow: "0 0 8px #00FF88",
              animation: "heroPulse 2s infinite",
            }} />
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "12px", fontWeight: "600", color: "var(--accent-cyan)", letterSpacing: "1px",
            }}>AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          {/* Huge Name */}
          <div style={{ marginBottom: "20px" }}>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(52px, 8.5vw, 120px)",
              fontWeight: "800",
              lineHeight: "0.92",
              letterSpacing: "-3px",
              color: "var(--text-primary)",
              margin: 0,
            }}>
              {settings?.profile?.name ? (
                settings.profile.name.split(' ').map((word: string, idx: number) => (
                  <span key={idx} style={{
                    display: "block",
                    ...(idx === 1 ? {
                      background: "linear-gradient(135deg, #00CFFD 0%, #A855F7 60%, #EC4899 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 30px rgba(0,207,253,0.4))",
                    } : {})
                  }}>
                    {word.toUpperCase()}
                  </span>
                ))
              ) : (
                <>
                  <span style={{ display: "block" }}>SHAFA</span>
                  <span style={{
                    display: "block",
                    background: "linear-gradient(135deg, #00CFFD 0%, #A855F7 60%, #EC4899 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 30px rgba(0,207,253,0.4))",
                  }}>DISYA</span>
                  <span style={{ display: "block" }}>AULIA</span>
                </>
              )}
            </h1>
          </div>

          {/* Animated Role */}
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            marginBottom: "24px",
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            <div style={{
              width: "28px", height: "2px",
              background: "linear-gradient(90deg, #00CFFD, #A855F7)",
              boxShadow: "0 0 8px rgba(0,207,253,0.6)",
            }} />
            <span key={roleIdx} style={{
              fontSize: "18px", fontWeight: "600",
              color: "var(--text-secondary)",
              animation: "roleSlide 0.5s ease",
              letterSpacing: "0.5px",
            }}>{roles[roleIdx]}</span>
            <div style={{
              width: "28px", height: "2px",
              background: "linear-gradient(90deg, #A855F7, #EC4899)",
            }} />
          </div>

          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "16px", color: "var(--text-muted)",
            lineHeight: "1.7", marginBottom: "36px", maxWidth: "460px",
          }}>
            {settings?.profile?.bio || (
              <>
                Bridging <span style={{ color: "#00CFFD", fontWeight: "600" }}>Artificial Intelligence</span> and{" "}
                <span style={{ color: "#A855F7", fontWeight: "600" }}>Social Impact</span> — engineering technology that transforms communities and shapes a better future.
              </>
            )}
          </p>

          {/* Meta */}
          <div style={{
            display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px",
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            {[
              { icon: <Star size={13} color="#F59E0B" />, text: "GPA 3.88 / 4.00" },
              { icon: <MapPin size={13} color="#00CFFD" />, text: "USK, Aceh, Indonesia" },
              { icon: <Zap size={13} color="#A855F7" />, text: "Informatics, 2024" },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "13px" }}>
                {m.icon}{m.text}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a href="#projects" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 28px", borderRadius: "10px",
              background: "linear-gradient(135deg, #00CFFD, #A855F7)",
              color: "#060614",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "14px", fontWeight: "700", textDecoration: "none",
              boxShadow: "0 0 30px rgba(0,207,253,0.35), 0 0 60px rgba(168,85,247,0.15)",
              transition: "all 0.3s ease", letterSpacing: "0.3px",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(0,207,253,0.55), 0 0 80px rgba(168,85,247,0.25)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0,207,253,0.35), 0 0 60px rgba(168,85,247,0.15)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >
              Explore Projects <ArrowRight size={15} />
            </a>
            <a href="#contact" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 28px", borderRadius: "10px",
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              color: "var(--text-secondary)",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "14px", fontWeight: "700", textDecoration: "none",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,207,253,0.4)"; (e.currentTarget as HTMLElement).style.color = "#00CFFD"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--card-border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* RIGHT - Portrait */}
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "center",
          position: "relative",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "scale(0.85)",
          transition: "all 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s",
        }} className="hero-portrait-col">

          {/* Orbit rings */}
          <div style={{
            position: "absolute", width: "450px", height: "450px",
            borderRadius: "50%",
            border: "1px solid rgba(0,207,253,0.12)",
            animation: "orbitSpin 25s linear infinite",
          }} />
          <div style={{
            position: "absolute", width: "380px", height: "380px",
            borderRadius: "50%",
            border: "1px dashed rgba(168,85,247,0.15)",
            animation: "orbitSpin 18s linear infinite reverse",
          }} />
          <div style={{
            position: "absolute", width: "310px", height: "310px",
            borderRadius: "50%",
            border: "1px solid rgba(236,72,153,0.08)",
            animation: "orbitSpin 12s linear infinite",
          }} />

          {/* Floating orbit dot */}
          <div style={{
            position: "absolute", width: "450px", height: "450px",
            borderRadius: "50%",
            animation: "orbitSpin 25s linear infinite",
          }}>
            <div style={{
              position: "absolute", top: "6px", left: "50%",
              width: "10px", height: "10px", borderRadius: "50%",
              background: "#00CFFD", boxShadow: "0 0 12px #00CFFD",
              transform: "translateX(-50%)",
            }} />
          </div>
          <div style={{
            position: "absolute", width: "380px", height: "380px",
            borderRadius: "50%",
            animation: "orbitSpin 18s linear infinite reverse",
          }}>
            <div style={{
              position: "absolute", bottom: "6px", right: "30px",
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#A855F7", boxShadow: "0 0 10px #A855F7",
            }} />
          </div>

          {/* Floating Badges */}
          <div style={{
            position: "absolute", top: "30px", right: "0px",
            padding: "10px 14px", borderRadius: "12px",
            background: "rgba(0,207,253,0.08)",
            border: "1px solid rgba(0,207,253,0.25)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 20px rgba(0,207,253,0.15)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "12px", fontWeight: "700", color: "#00CFFD",
            animation: "floatBadge 4s ease-in-out infinite",
          }}>🏆 Top 10 National</div>

          <div style={{
            position: "absolute", bottom: "50px", left: "0px",
            padding: "10px 14px", borderRadius: "12px",
            background: "rgba(168,85,247,0.08)",
            border: "1px solid rgba(168,85,247,0.25)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 20px rgba(168,85,247,0.15)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "12px", fontWeight: "700", color: "#A855F7",
            animation: "floatBadge 4s ease-in-out infinite 1.5s",
          }}>🤖 IBM AI Scholar</div>

          <div style={{
            position: "absolute", bottom: "100px", right: "-10px",
            padding: "10px 14px", borderRadius: "12px",
            background: "rgba(0,255,136,0.06)",
            border: "1px solid rgba(0,255,136,0.2)",
            backdropFilter: "blur(20px)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "12px", fontWeight: "700", color: "#00FF88",
            animation: "floatBadge 4s ease-in-out infinite 3s",
          }}>⭐ GPA 3.88</div>

          {/* Portrait */}
          <div style={{
            width: "300px", height: "300px", borderRadius: "50%",
            position: "relative", zIndex: 2,
            padding: "3px",
            background: "linear-gradient(135deg, #00CFFD, #A855F7, #EC4899)",
            boxShadow: "0 0 60px rgba(0,207,253,0.3), 0 0 120px rgba(168,85,247,0.2)",
            animation: "portraitFloat 6s ease-in-out infinite",
          }}>
            <div style={{
              width: "100%", height: "100%", borderRadius: "50%",
              overflow: "hidden",
              background: "#0a0a1e",
            }}>
              <img src={PORTRAIT_URL} alt="Shafa Disya Aulia"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
          </div>

          {/* Name label under portrait */}
          <div style={{
            position: "absolute", bottom: "-10px",
            fontFamily: "'Syne', sans-serif",
            fontSize: "12px", fontWeight: "700",
            color: "rgba(255,255,255,0.3)", letterSpacing: "3px",
            textTransform: "uppercase",
          }}>SHAFA · DISYA · AULIA</div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        borderTop: "1px solid rgba(0,207,253,0.08)",
        padding: "14px 0", overflow: "hidden",
        zIndex: 3,
        background: "rgba(6,6,20,0.5)", backdropFilter: "blur(8px)",
      }}>
        <div style={{
          display: "flex", gap: "48px", width: "max-content",
          animation: "marqueeSlide 25s linear infinite",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "12px", fontWeight: "600", letterSpacing: "2px",
          color: "rgba(255,255,255,0.25)",
        }}>
          {[..."AI ENGINEER · PRODUCT LEADER · HACKATHON FINALIST · IBM SCHOLAR · MAHASISWA BERPRESTASI · COMMUNITY FACILITATOR · ".repeat(4)].join("")
            .split("·").map((t, i) => (
              <span key={i} style={{ flexShrink: 0 }}>
                {t.trim()} <span style={{ color: "#00CFFD", opacity: 0.6 }}>·</span>
              </span>
            ))}
        </div>
      </div>

      <style>{`
        @keyframes heroPulse { 0%,100% { box-shadow: 0 0 8px #00FF88; } 50% { box-shadow: 0 0 16px #00FF88, 0 0 30px rgba(0,255,136,0.3); } }
        @keyframes roleSlide { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes floatBadge { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes portraitFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes marqueeSlide { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (max-width: 768px) {
          .hero-main-grid { grid-template-columns: 1fr !important; }
          .hero-portrait-col { margin-top: 40px; }
        }
      `}</style>
    </section>
  );
}
