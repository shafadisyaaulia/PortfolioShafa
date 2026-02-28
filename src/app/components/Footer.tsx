import { useState, useEffect } from "react";
import { Mail, Linkedin, Download, Github, ArrowUp, Copy, CheckCircle } from "lucide-react";
import { settingsApi } from "@/lib/api";
import settingsDataImport from "@/data/settings.json";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  // Load settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await settingsApi.get();
        if (response.success && response.data) {
          setSettings(response.data);
        } else {
          const storedSettings = localStorage.getItem('portfolio_settings');
          if (storedSettings) {
            setSettings(JSON.parse(storedSettings));
          } else {
            setSettings(settingsDataImport);
          }
        }
      } catch (error) {
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

  const copyEmail = () => {
    const email = settings?.profile?.email || "shafa.disya@gmail.com";
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" style={{
      fontFamily: "'Space Grotesk', sans-serif",
      background: "var(--bg-primary)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Top glow line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent 0%, #00CFFD 30%, #A855F7 70%, transparent 100%)",
      }} />

      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,207,253,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,207,253,0.025) 1px, transparent 1px)",
        backgroundSize: "60px 60px", pointerEvents: "none",
      }} />

      {/* Orbs */}
      <div style={{
        position: "absolute", bottom: "-200px", left: "50%", transform: "translateX(-50%)",
        width: "800px", height: "500px",
        background: "radial-gradient(ellipse, rgba(0,207,253,0.08) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)",
        filter: "blur(30px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 24px 48px", position: "relative", zIndex: 1 }}>

        {/* Big CTA */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "100px",
            background: "rgba(0,207,253,0.08)",
            border: "1px solid rgba(0,207,253,0.2)",
            marginBottom: "28px",
          }}>
            <div style={{
              width: "7px", height: "7px", borderRadius: "50%", background: "#00FF88",
              boxShadow: "0 0 8px #00FF88", animation: "footerPulse 2s infinite",
            }} />
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#00CFFD", letterSpacing: "1.5px" }}>
              OPEN TO OPPORTUNITIES
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(40px, 7vw, 96px)",
            fontWeight: "800", color: "var(--text-primary)",
            letterSpacing: "-3px", lineHeight: "0.95",
            marginBottom: "28px",
          }}>
            Let's Build
            <br />
            <span style={{
              background: "linear-gradient(135deg, #00CFFD 0%, #A855F7 50%, #EC4899 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: "drop-shadow(0 0 40px rgba(0,207,253,0.4))",
            }}>Something
            <br />Meaningful</span>
          </h2>
          <p style={{
            fontSize: "16px", color: "var(--text-muted)",
            maxWidth: "480px", margin: "0 auto 48px", lineHeight: "1.7",
          }}>
            Ready to collaborate on AI projects, product development, or social impact initiatives? Let's make it happen.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={copyEmail} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "16px 32px", borderRadius: "12px",
              background: "linear-gradient(135deg, #00CFFD, #A855F7)",
              color: "#060614",
              fontSize: "15px", fontWeight: "800", border: "none",
              cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.3px",
              boxShadow: "0 0 40px rgba(0,207,253,0.35), 0 0 80px rgba(168,85,247,0.2)",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(0,207,253,0.55), 0 0 100px rgba(168,85,247,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,207,253,0.35), 0 0 80px rgba(168,85,247,0.2)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >
              {copied ? <CheckCircle size={18} /> : <Mail size={18} />}
              {copied ? "Email Copied!" : "Contact Me"}
            </button>

            <a href={settings?.profile?.social?.linkedin || "https://linkedin.com/in/shafa-disya-aulia"} target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "16px 32px", borderRadius: "12px",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                color: "var(--text-secondary)",
                fontSize: "15px", fontWeight: "700", textDecoration: "none",
                fontFamily: "'Space Grotesk', sans-serif",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#0A66C2"; (e.currentTarget as HTMLElement).style.background = "rgba(10,102,194,0.15)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--card-border)"; (e.currentTarget as HTMLElement).style.background = "var(--card-bg)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
            >
              <Linkedin size={18} />LinkedIn
            </a>

            <a href={settings?.profile?.resumeUrl || "/cv-shafa-disya-aulia.pdf"} download
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "16px 32px", borderRadius: "12px",
                background: "var(--card-bg-subtle)",
                border: "1px solid var(--card-border)",
                color: "var(--text-muted)",
                fontSize: "15px", fontWeight: "700", textDecoration: "none",
                fontFamily: "'Space Grotesk', sans-serif",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.4)"; (e.currentTarget as HTMLElement).style.color = "#F59E0B"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--card-border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >
              <Download size={18} />Download CV
            </a>
          </div>
        </div>

        {/* Contact details */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px",
          marginBottom: "64px",
        }} className="contact-cards-grid">
          {[
            { 
              icon: <Mail size={18} color="#00CFFD" />, 
              label: "EMAIL", 
              val: settings?.profile?.email || "shafa.disya@gmail.com", 
              color: "#00CFFD", 
              action: copyEmail 
            },
            { 
              icon: <Linkedin size={18} color="#0A66C2" />, 
              label: "LINKEDIN", 
              val: settings?.profile?.social?.linkedin?.replace('https://', '').replace('http://', '') || "linkedin.com/in/shafa", 
              color: "#0A66C2", 
              href: settings?.profile?.social?.linkedin || "https://linkedin.com/in/shafa-disya-aulia" 
            },
            { 
              icon: <Github size={18} color="rgba(255,255,255,0.6)" />, 
              label: "GITHUB", 
              val: settings?.profile?.social?.github?.replace('https://', '').replace('http://', '') || "github.com/shafa", 
              color: "#fff", 
              href: settings?.profile?.social?.github || "https://github.com" 
            },
          ].map((c, i) => {
            const el = (
              <div style={{
                padding: "20px 24px",
                borderRadius: "14px",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                display: "flex", alignItems: "center", gap: "14px",
                cursor: "pointer", transition: "all 0.3s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = c.color + "40"; (e.currentTarget as HTMLElement).style.background = "var(--card-bg-hover)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--card-border)"; (e.currentTarget as HTMLElement).style.background = "var(--card-bg)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
              >
                {c.icon}
                <div>
                  <div style={{ fontSize: "10px", fontWeight: "700", color: "var(--text-muted)", letterSpacing: "1.5px", marginBottom: "2px" }}>{c.label}</div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-secondary)" }}>{c.val}</div>
                </div>
              </div>
            );
            return c.href
              ? <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{el}</a>
              : <div key={i} onClick={c.action}>{el}</div>;
          })}
        </div>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--border-color), transparent)",
          marginBottom: "32px",
        }} />

        {/* Bottom Bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, #00CFFD, #A855F7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "13px", fontWeight: "800", color: "#060614",
              fontFamily: "'Syne', sans-serif",
              boxShadow: "0 0 15px rgba(0,207,253,0.3)",
            }}>
              {settings?.profile?.name ? 
                settings.profile.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0,3) 
                : 'SDA'}
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-secondary)" }}>
                {settings?.profile?.name || "Shafa Disya Aulia"}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.3px" }}>© 2026 · All rights reserved</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {["#home", "#achievements", "#projects", "#impact", "#tech"].map((h, i) => (
              <a key={h} href={h}
                style={{
                  textDecoration: "none", fontSize: "12px", fontWeight: "600",
                  color: "var(--text-muted)", letterSpacing: "0.5px",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#00CFFD")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {["Home", "Awards", "Projects", "Impact", "Tech"][i]}
              </a>
            ))}
          </div>

          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              width: "38px", height: "38px", borderRadius: "10px",
              background: "rgba(0,207,253,0.08)",
              border: "1px solid rgba(0,207,253,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#00CFFD",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,207,253,0.15)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(0,207,253,0.25)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,207,253,0.08)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          ><ArrowUp size={16} /></button>
        </div>

        <p style={{ textAlign: "center", marginTop: "28px", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.5px", opacity: 0.5 }}>
          Engineered with precision · Driven by impact · Universitas Syiah Kuala · 2026
        </p>
      </div>

      <style>{`
        @keyframes footerPulse { 0%,100% { box-shadow: 0 0 8px #00FF88; } 50% { box-shadow: 0 0 16px #00FF88, 0 0 30px rgba(0,255,136,0.3); } }
        @media (max-width: 768px) {
          .contact-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
