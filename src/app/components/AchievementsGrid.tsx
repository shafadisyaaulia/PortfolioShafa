import { useState } from "react";
import { Trophy, Medal, Brain, Star, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const ACHIEVEMENTS = [
  {
    id: 1,
    icon: <Trophy size={22} />,
    badge: "NATIONAL HACKATHON",
    title: "Top 10 Finalist",
    subtitle: "Gemini AI & Google Maps",
    desc: "Built a smart platform using Gemini AI and Maps API, competing among top national teams.",
    tags: ["Gemini AI", "Google Maps", "React", "Node.js"],
    accent: "#00CFFD",
    glow: "rgba(0,207,253,0.22)",
    image: "/Images%20Portofolio/Portofolio/Level%20Up/Cover.PNG",
    gallery: [
      "/Images%20Portofolio/Portofolio/Level%20Up/Cover.PNG",
      "/Images%20Portofolio/Portofolio/Level%20Up/website%20level-up.png",
      "/Images%20Portofolio/Portofolio/Level%20Up/IMG_2219.PNG"
    ],
  },
  {
    id: 2,
    icon: <Medal size={22} />,
    badge: "SCHOLARSHIP PROGRAM",
    title: "Beasiswa Unggulan Awardee",
    subtitle: "Kemendikbudristek",
    desc: "Recognized as Beasiswa Unggulan awardee for strong academic and leadership performance.",
    tags: ["Beasiswa Unggulan", "Academic", "Leadership"],
    accent: "#A855F7",
    glow: "rgba(168,85,247,0.22)",
    image: "/Images%20Portofolio/Portofolio/Beasiswa%20Unggulan/cover.jpeg",
    gallery: [
      "/Images%20Portofolio/Portofolio/Beasiswa%20Unggulan/cover.jpeg",
      "/Images%20Portofolio/Portofolio/Beasiswa%20Unggulan/foto%20bersama.jpeg",
      "/Images%20Portofolio/Portofolio/Beasiswa%20Unggulan/report%20lulus%20bu.jpeg"
    ],
  },
  {
    id: 3,
    icon: <Brain size={22} />,
    badge: "IBM SCHOLAR",
    title: "AI Engineer Scholar",
    subtitle: "PIJAK × IBM SkillsBuild 2026",
    desc: "Selected in IBM SkillsBuild scholarship pathway for AI engineering development.",
    tags: ["IBM", "SkillsBuild", "AI Engineer"],
    accent: "#EC4899",
    glow: "rgba(236,72,153,0.22)",
    image: "/Images%20Portofolio/Portofolio/Pijak%20X%20IBM%20Skillsbuild/IMG_2734.PNG",
    gallery: [
      "/Images%20Portofolio/Portofolio/Pijak%20X%20IBM%20Skillsbuild/IMG_2734.PNG",
      "/Images%20Portofolio/Portofolio/Pijak%20X%20IBM%20Skillsbuild/IMG_4622.PNG"
    ],
  },
  {
    id: 4,
    icon: <Star size={22} />,
    badge: "USK RECOGNITION",
    title: "Most Outstanding Student",
    subtitle: "Mahasiswa Berprestasi FMIPA",
    desc: "Recognized as outstanding student of FMIPA USK based on achievements and impact.",
    tags: ["USK", "FMIPA", "Berprestasi"],
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.22)",
    image: "/Images%20Portofolio/Portofolio/Mahasiswa%20Berprestasi%20FMIPA/mapres%20mipa%20cover.jpeg",
    gallery: [
      "/Images%20Portofolio/Portofolio/Mahasiswa%20Berprestasi%20FMIPA/mapres%20mipa%20cover.jpeg",
      "/Images%20Portofolio/Portofolio/Mahasiswa%20Berprestasi%20FMIPA/penyerahan%20sertifikat%20oleh%20dekan%20fmipa.jpeg",
      "/Images%20Portofolio/Portofolio/Mahasiswa%20Berprestasi%20FMIPA/sertifikat%20mahasiswa%20prestasi%20mipa.jpeg"
    ],
  },
];

function AchievementDetailModal({
  item,
  onClose,
}: {
  item: typeof ACHIEVEMENTS[0];
  onClose: () => void;
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  const prev = () => {
    setSelectedImage((p) => (p - 1 + item.gallery.length) % item.gallery.length);
  };

  const next = () => {
    setSelectedImage((p) => (p + 1) % item.gallery.length);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "1020px",
          maxHeight: "92vh",
          overflow: "auto",
          borderRadius: "18px",
          background: "#FFFFFF",
          border: `1px solid ${item.accent}40`,
          boxShadow: "0 24px 64px rgba(15,23,42,0.22)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            width: "36px",
            height: "36px",
            borderRadius: "999px",
            border: "1px solid #D1D5DB",
            background: "#FFFFFF",
            color: "#111827",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <X size={16} />
        </button>

        <div style={{ padding: "20px" }}>
          <div
            style={{
              position: "relative",
              height: "clamp(240px, 48vw, 480px)",
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid #E5E7EB",
              background: "#F8FAFC",
            }}
          >
            <img
              src={item.gallery[selectedImage]}
              alt={`${item.title} ${selectedImage + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
            />

            {item.gallery.length > 1 && (
              <>
                <button
                  onClick={prev}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "34px",
                    height: "34px",
                    borderRadius: "999px",
                    border: `1px solid ${item.accent}55`,
                    background: "rgba(255,255,255,0.94)",
                    color: "#0F172A",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "34px",
                    height: "34px",
                    borderRadius: "999px",
                    border: `1px solid ${item.accent}55`,
                    background: "rgba(255,255,255,0.94)",
                    color: "#0F172A",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          <div style={{ marginTop: "12px", display: "flex", gap: "8px", overflowX: "auto" }}>
            {item.gallery.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                style={{
                  minWidth: "78px",
                  height: "58px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: idx === selectedImage ? `2px solid ${item.accent}` : "1px solid #D1D5DB",
                  padding: 0,
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <img src={image} alt={`${item.title} thumb ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </button>
            ))}
          </div>

          <div style={{ marginTop: "14px" }}>
            <h3
              style={{
                margin: "0 0 6px 0",
                fontFamily: "'Syne', sans-serif",
                fontSize: "30px",
                lineHeight: 1.1,
                color: "#0F172A",
              }}
            >
              {item.title}
            </h3>
            <p style={{ margin: "0 0 8px 0", color: item.accent, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
              {item.subtitle}
            </p>
            <p style={{ margin: 0, color: "#475569", fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.7 }}>
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AchievementPhotoCard({
  a,
  onOpen,
}: {
  a: typeof ACHIEVEMENTS[0];
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="achievement-photo-card"
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "22px",
        overflow: "hidden",
        background: "#FFFFFF",
        border: `1px solid ${hovered ? a.accent + "55" : "#E5E7EB"}`,
        boxShadow: hovered ? "0 18px 44px rgba(15,23,42,0.14)" : "0 8px 26px rgba(15,23,42,0.08)",
        transform: hovered ? "translateY(-4px)" : "none",
        transition: "all 0.35s ease",
        height: "100%",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <div
        className="achievement-photo-media"
        style={{
          position: "relative",
          height: "220px",
          overflow: "hidden",
        }}
      >
        <img
          src={a.image}
          alt={a.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.6s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(15,23,42,0.74) 0%, rgba(15,23,42,0.18) 55%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "14px",
            bottom: "12px",
            right: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "6px 12px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.92)",
              border: `1px solid ${a.accent}55`,
              color: a.accent,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "0.8px",
            }}
          >
            {a.icon}
            {a.badge}
          </span>
        </div>
      </div>

      <div style={{ padding: "18px 18px 20px" }}>
        <h3
          className="achievement-photo-title"
          style={{
            margin: "0 0 6px 0",
            fontFamily: "'Syne', sans-serif",
            fontSize: "23px",
            fontWeight: "800",
            letterSpacing: "-0.6px",
            color: "#111827",
            lineHeight: 1.15,
          }}
        >
          {a.title}
        </h3>
        <p
          style={{
            margin: "0 0 10px 0",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "13px",
            fontWeight: "700",
            color: a.accent,
          }}
        >
          {a.subtitle}
        </p>
        <p
          style={{
            margin: "0 0 14px 0",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "14px",
            lineHeight: "1.6",
            color: "#4B5563",
          }}
        >
          {a.desc}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {a.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px 10px",
                borderRadius: "8px",
                background: "#F8FAFC",
                border: "1px solid #E5E7EB",
                color: "#374151",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "11px",
                fontWeight: "600",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          style={{
            marginTop: "12px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            borderRadius: "8px",
            border: `1px solid ${a.accent}35`,
            background: `${a.accent}10`,
            color: a.accent,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "12px",
            fontWeight: "700",
            padding: "7px 10px",
            cursor: "pointer",
          }}
        >
          <Maximize2 size={13} /> View Details
        </button>
      </div>
    </article>
  );
}

export function AchievementsGrid() {
  const [selectedAchievement, setSelectedAchievement] = useState<typeof ACHIEVEMENTS[0] | null>(null);

  return (
    <section
      id="achievements"
      style={{
        background: "linear-gradient(180deg, #F4F8FF 0%, #FFFFFF 55%, #F8FAFF 100%)",
        padding: "90px 22px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {selectedAchievement && (
        <AchievementDetailModal item={selectedAchievement} onClose={() => setSelectedAchievement(null)} />
      )}

      <div
        style={{
          position: "absolute",
          top: "-240px",
          left: "-190px",
          width: "620px",
          height: "620px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 66%)",
          filter: "blur(24px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "6px 15px",
              borderRadius: "999px",
              background: "rgba(14,165,233,0.08)",
              border: "1px solid rgba(14,165,233,0.22)",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "11px",
                fontWeight: "700",
                color: "#0284C7",
                letterSpacing: "1.4px",
              }}
            >
              RECOGNITION & AWARDS
            </span>
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: "800",
              letterSpacing: "-1.8px",
              color: "#111827",
            }}
          >
            Achievements Gallery
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "16px",
          }}
          className="achievement-bento-grid"
        >
          {ACHIEVEMENTS.map((item) => (
            <AchievementPhotoCard key={item.id} a={item} onOpen={() => setSelectedAchievement(item)} />
          ))}
        </div>

        <div
          style={{
            marginTop: "34px",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "12px",
          }}
          className="achievement-stats-grid"
        >
          {[
            { val: "Top 10", label: "National Hackathon Finalist" },
            { val: "Awardee", label: "Beasiswa Unggulan" },
            { val: "Scholar", label: "PIJAK × IBM SkillsBuild 2026" },
            { val: "Recognized", label: "Mahasiswa Berprestasi FMIPA" },
          ].map((s, i) => (
            <div
              className="achievement-stat-card"
              key={i}
              style={{
                padding: "18px",
                borderRadius: "14px",
                border: "1px solid #E5E7EB",
                background: "#FFFFFF",
                textAlign: "center",
                boxShadow: "0 6px 18px rgba(15,23,42,0.07)",
              }}
            >
              <div
                className="achievement-stat-value"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "26px",
                  fontWeight: "800",
                  letterSpacing: "-1px",
                  lineHeight: 1.05,
                  color: "#0F172A",
                }}
              >
                {s.val}
              </div>
              <div
                className="achievement-stat-label"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#64748B",
                  marginTop: "5px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .achievement-bento-grid { grid-template-columns: 1fr !important; }

          .achievement-photo-media {
            height: 220px !important;
          }
        }

        @media (max-width: 760px) {
          .achievement-stats-grid { grid-template-columns: 1fr !important; }

          .achievement-photo-card {
            border-radius: 18px !important;
          }

          .achievement-photo-media {
            height: 220px !important;
          }

          .achievement-photo-title {
            font-size: 23px !important;
            line-height: 1.1 !important;
          }

          .achievement-stat-card {
            padding: 14px !important;
          }

          .achievement-stat-value {
            font-size: 24px !important;
          }

          .achievement-stat-label {
            font-size: 11px !important;
          }
        }
      `}</style>
    </section>
  );
}
