import "../styles/fonts.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "../contexts/ThemeContext";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AchievementsGrid } from "./components/AchievementsGrid";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { SocialImpact } from "./components/SocialImpact";
import { TechStack } from "./components/TechStack";
import { SystemArchitecture } from "./components/SystemArchitecture";
import { Footer } from "./components/Footer";
import { FloatingAdminButton } from "./components/FloatingAdminButton";
import AdminPage from "./admin/page";

// Homepage Component
function HomePage() {
  return (
    <div style={{
      background: "var(--bg-primary)",
      minHeight: "100vh",
      overflowX: "hidden",
      transition: "background 0.3s ease",
    }}>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        
        /* Light Theme (Default) */
        body[data-theme="light"] {
          --bg-primary: #F8F9FC;
          --bg-secondary: #FFFFFF;
          --bg-tertiary: #F1F3F9;
          --text-primary: #1A1D29;
          --text-secondary: #6B7280;
          --text-muted: #9CA3AF;
          --accent-cyan: #00CFFD;
          --accent-purple: #A855F7;
          --accent-pink: #EC4899;
          --accent-green: #00FF88;
          --border-color: rgba(0,0,0,0.08);
          --card-bg: rgba(0,0,0,0.025);
          --card-bg-hover: rgba(0,0,0,0.05);
          --card-bg-subtle: rgba(0,0,0,0.015);
          --card-border: rgba(0,0,0,0.08);
          --glow-opacity: 0.15;
          --grid-opacity: 0.03;
        }

        /* Dark Theme */
        body[data-theme="dark"] {
          --bg-primary: #060614;
          --bg-secondary: #0A0B1A;
          --bg-tertiary: #12132A;
          --text-primary: #FFFFFF;
          --text-secondary: rgba(255,255,255,0.7);
          --text-muted: rgba(255,255,255,0.5);
          --accent-cyan: #00CFFD;
          --accent-purple: #A855F7;
          --accent-pink: #EC4899;
          --accent-green: #00FF88;
          --border-color: rgba(255,255,255,0.1);
          --card-bg: rgba(255,255,255,0.025);
          --card-bg-hover: rgba(255,255,255,0.04);
          --card-bg-subtle: rgba(255,255,255,0.015);
          --card-border: rgba(255,255,255,0.07);
          --glow-opacity: 0.25;
          --grid-opacity: 0.04;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg-primary); }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, var(--accent-cyan), var(--accent-purple));
          border-radius: 3px;
        }

        /* Selection */
        ::selection { 
          background: var(--accent-cyan); 
          background-opacity: 0.25;
          color: var(--text-primary); 
        }

        /* Responsive hero */
        @media (max-width: 768px) {
          .hero-main-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-portrait-col { order: -1; }
        }

        /* Smooth transitions */
        a, button, div { transition: background 0.3s ease, color 0.3s ease; }

        /* Cursor glow effect */
        body { cursor: default; }
      `}</style>

      <Navbar />
      <main>
        <HeroSection />
        <AchievementsGrid />
        <FeaturedProjects />
        <SocialImpact />
        <TechStack />
        <SystemArchitecture />
      </main>
      <Footer />
      <FloatingAdminButton />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
