import { useState, useEffect } from "react";
import { Download, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { theme, toggleTheme } = useTheme();

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
            ? theme === 'dark' ? "rgba(6,6,20,0.85)" : "rgba(248,249,252,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? `1px solid ${theme === 'dark' ? 'rgba(0,207,253,0.08)' : 'rgba(0,0,0,0.06)'}` : "none",
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
              fontSize: "15px", fontWeight: "700", 
              color: theme === 'dark' ? "rgba(255,255,255,0.9)" : "var(--text-primary)",
              letterSpacing: "0.3px",
            }}>Shafa Disya Aulia</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex" style={{ gap: "32px", alignItems: "center" }}>
            {links.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setActive(link.id)}
                style={{
                  textDecoration: "none",
                  fontSize: "14px", fontWeight: "500",
                  color: active === link.id 
                    ? "#00CFFD" 
                    : theme === 'dark' ? "rgba(255,255,255,0.5)" : "var(--text-secondary)",
                  transition: "all 0.2s ease",
                  position: "relative",
                  paddingBottom: "4px",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#00CFFD")}
                onMouseLeave={e => (e.currentTarget.style.color = active === link.id ? "#00CFFD" : theme === 'dark' ? "rgba(255,255,255,0.5)" : "var(--text-secondary)")}
              >
                {link.label}
              </a>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: theme === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                color: theme === 'dark' ? "#F59E0B" : "#6366F1",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = theme === 'dark' ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = theme === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* CTA */}
          <div className="hidden md:flex" style={{ gap: "12px" }}>
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
            style={{ 
              background: "none", 
              border: "none", 
              color: theme === 'dark' ? "white" : "var(--text-primary)", 
              cursor: "pointer", 
              padding: "8px" 
            }}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden" style={{
            background: theme === 'dark' ? "rgba(6,6,20,0.98)" : "rgba(248,249,252,0.98)",
            borderTop: `1px solid ${theme === 'dark' ? 'rgba(0,207,253,0.1)' : 'rgba(0,0,0,0.08)'}`,
            padding: "16px 24px 24px",
          }}>
            {links.map(link => (
              <a key={link.id} href={`#${link.id}`} onClick={() => setIsOpen(false)}
                style={{
                  display: "block", padding: "12px 0",
                  textDecoration: "none", 
                  color: theme === 'dark' ? "rgba(255,255,255,0.7)" : "var(--text-secondary)",
                  fontSize: "15px", fontWeight: "500",
                  borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                }}>{link.label}</a>
            ))}
            
            {/* Theme Toggle in Mobile */}
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <button
                onClick={toggleTheme}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  borderRadius: "8px",
                  background: theme === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                  border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                  color: theme === 'dark' ? "#F59E0B" : "#6366F1",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
            
            <a href="#contact" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "8px", marginTop: "12px", padding: "12px",
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
