import "../styles/fonts.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AchievementsGrid } from "./components/AchievementsGrid";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { SocialImpact } from "./components/SocialImpact";
import { TechStack } from "./components/TechStack";
import { SystemArchitecture } from "./components/SystemArchitecture";
import { Footer } from "./components/Footer";
import AdminPage from "./admin/page";

// Homepage Component
function HomePage() {
  return (
    <div style={{
      background: "#060614",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #060614; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00CFFD, #A855F7);
          border-radius: 3px;
        }

        /* Selection */
        ::selection { background: rgba(0,207,253,0.25); color: #fff; }

        /* Responsive hero */
        @media (max-width: 768px) {
          .hero-main-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-portrait-col { order: -1; }
        }

        /* Smooth link transitions */
        a { transition: color 0.2s ease; }

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
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
