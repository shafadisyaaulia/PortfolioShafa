import { useState, useEffect } from "react";
import { Download, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "achievements", label: "Achievements" },
    { id: "projects", label: "Projects" },
    { id: "impact", label: "Impact" },
    { id: "tech", label: "Tech" },
  ];

  return (
    <>
      <nav
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          background: scrolled
            ? "rgba(6,6,20,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,207,253,0.08)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Top glow line */}
        {scrolled && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent 0%, #00CFFD 30%, #A855F7 70%, transparent 100%)",
          }} />
        )}

        <div style={{
          maxWidth: "1280px", margin: "0 auto",
          padding: "0 24px",
          height: "72px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "10px",
              background: "linear-gradient(135deg, #00CFFD, #A855F7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "13px", fontWeight: "800", color: "#060614",
              fontFamily: "'Syne', sans-serif",
              boxShadow: "0 0 20px rgba(0,207,253,0.4)",
            }}>SDA</div>
            <span style={{
              fontSize: "15px", fontWeight: "700", color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.3px",
            }}>Shafa Disya Aulia</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex" style={{ gap: "32px" }}>
            {links.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setActive(link.id)}
                style={{
                  textDecoration: "none",
                  fontSize: "14px", fontWeight: "500",
                  color: active === link.id ? "#00CFFD" : "rgba(255,255,255,0.5)",
                  transition: "all 0.2s ease",
                  position: "relative",
                  paddingBottom: "4px",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#00CFFD")}
                onMouseLeave={e => (e.currentTarget.style.color = active === link.id ? "#00CFFD" : "rgba(255,255,255,0.5)")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <a
              href="#contact"
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 20px", borderRadius: "8px",
                background: "rgba(0,207,253,0.08)",
                border: "1px solid rgba(0,207,253,0.3)",
                color: "#00CFFD",
                fontSize: "13px", fontWeight: "700", textDecoration: "none",
                transition: "all 0.3s ease",
                letterSpacing: "0.3px",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,207,253,0.15)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,207,253,0.25)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,207,253,0.08)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <Download size={13} />
              Download CV
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}
            style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: "8px" }}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden" style={{
            background: "rgba(6,6,20,0.98)",
            borderTop: "1px solid rgba(0,207,253,0.1)",
            padding: "16px 24px 24px",
          }}>
            {links.map(link => (
              <a key={link.id} href={`#${link.id}`} onClick={() => setIsOpen(false)}
                style={{
                  display: "block", padding: "12px 0",
                  textDecoration: "none", color: "rgba(255,255,255,0.7)",
                  fontSize: "15px", fontWeight: "500",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}>{link.label}</a>
            ))}
            <a href="#contact" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "8px", marginTop: "16px", padding: "12px",
              borderRadius: "8px", border: "1px solid rgba(0,207,253,0.3)",
              color: "#00CFFD", textDecoration: "none",
              fontSize: "14px", fontWeight: "700",
            }}>
              <Download size={14} /> Download CV
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
