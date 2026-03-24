import { useState, useEffect } from "react";
import { ExternalLink, Github, ArrowRight, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import projectsData from "@/data/projects.json";

// Default projects from JSON (fallback)
const DEFAULT_PROJECTS: any[] = projectsData.projects;

// Project Detail Modal Component
function ProjectDetailModal({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(16, 24, 40, 0.45)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(10px, 2.5vw, 24px)", overflow: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "1240px", width: "100%",
          background: "#FFFFFF",
          border: `1px solid ${project.accent}25`,
          borderRadius: "20px",
          boxShadow: "0 24px 70px rgba(15,23,42,0.18)",
          maxHeight: "94vh", overflow: "auto",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "20px", right: "20px", zIndex: 10,
            width: "40px", height: "40px", borderRadius: "50%",
            background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)",
            border: `1px solid ${project.accent}40`,
            color: "#111827", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = `${project.accent}30`;
            (e.currentTarget as HTMLElement).style.transform = "rotate(90deg)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.95)";
            (e.currentTarget as HTMLElement).style.transform = "rotate(0deg)";
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{
          padding: "clamp(18px, 3.2vw, 34px)",
          borderBottom: `1px solid ${project.accent}15`,
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", borderRadius: "100px",
            background: `${project.accent}15`,
            border: `1px solid ${project.accent}40`,
            marginBottom: "16px",
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: project.accent, boxShadow: `0 0 8px ${project.accent}` }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: "700", color: project.accent, letterSpacing: "1px" }}>
              {project.status}
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "42px", fontWeight: "800",
            letterSpacing: "-1.5px", margin: "0 0 8px 0",
            color: "#111827",
            textShadow: "none",
          }}>{project.name}</h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "16px", color: project.accent, margin: 0, fontWeight: "600",
          }}>{project.tagline}</p>
        </div>

        {/* Main Image */}
        <div style={{ padding: "clamp(14px, 2.8vw, 30px)" }}>
          <div style={{
            position: "relative", borderRadius: "16px", overflow: "hidden",
            height: "clamp(300px, 64vw, 620px)",
            border: `1px solid ${project.accent}20`,
            boxShadow: "0 14px 34px rgba(15,23,42,0.14)",
            background: "#F8FAFC",
          }}>
            <img
              src={project.gallery[selectedImage]}
              alt={`${project.name} - ${selectedImage + 1}`}
              style={{
                width: "100%", height: "100%", objectFit: "contain", objectPosition: "center",
              }}
            />
            <div style={{
              position: "absolute", top: "16px", right: "16px",
              padding: "8px 14px", borderRadius: "8px",
              background: "rgba(15,23,42,0.66)", backdropFilter: "blur(6px)",
              border: `1px solid ${project.accent}40`,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "12px", fontWeight: "600", color: "white",
            }}>
              {selectedImage + 1} / {project.gallery.length}
            </div>
          </div>

          {/* Gallery Thumbnails */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "12px",
            marginTop: "20px",
          }}>
            {project.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                style={{
                  position: "relative",
                  height: "92px", borderRadius: "10px", overflow: "hidden",
                  border: selectedImage === idx ? `2px solid ${project.accent}` : "2px solid rgba(17,24,39,0.12)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  background: "transparent",
                  padding: 0,
                  boxShadow: selectedImage === idx ? `0 0 20px ${project.glow}` : "none",
                }}
                onMouseEnter={(e) => {
                  if (selectedImage !== idx) {
                    (e.currentTarget as HTMLElement).style.borderColor = `${project.accent}60`;
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedImage !== idx) {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(17,24,39,0.12)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }
                }}
              >
                <img
                  src={img}
                  alt={`${project.name} thumbnail ${idx + 1}`}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    opacity: selectedImage === idx ? 1 : 0.78,
                  }}
                />
              </button>
            ))}
          </div>

          {/* Description & Details */}
          <div style={{ marginTop: "28px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            <div>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "20px", fontWeight: "700", color: "#111827",
                marginBottom: "16px", letterSpacing: "-0.5px",
              }}>About Project</h3>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "14px", color: "#374151", lineHeight: "1.7",
                marginBottom: "24px",
              }}>{project.fullDesc}</p>

              {/* Features */}
              <h4 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "16px", fontWeight: "700", color: project.accent,
                marginBottom: "12px", letterSpacing: "-0.3px",
              }}>Key Features</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {project.features.filter(feature => feature && feature.trim()).map((feature, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "10px 14px", borderRadius: "8px",
                    background: `${project.accent}10`,
                    border: `1px solid ${project.accent}24`,
                  }}>
                    <div style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      background: project.accent, boxShadow: `0 0 8px ${project.accent}`, flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "13px", fontWeight: "500", color: "#1F2937",
                    }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Tech Stack */}
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "20px", fontWeight: "700", color: "#111827",
                marginBottom: "16px", letterSpacing: "-0.5px",
              }}>Tech Stack</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {project.techStack.map((category, i) => (
                  <div key={i}>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "12px", fontWeight: "700", color: project.accent,
                      marginBottom: "8px", letterSpacing: "0.5px",
                    }}>{category.name}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {category.items.map((tech, j) => (
                        <span key={j} style={{
                          padding: "6px 12px", borderRadius: "6px",
                          background: "#F8FAFC",
                          border: "1px solid #E5E7EB",
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "12px", fontWeight: "600", color: "#374151",
                        }}>{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ marginTop: "24px" }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "12px", fontWeight: "700", color: project.accent,
                  marginBottom: "8px", letterSpacing: "0.5px",
                }}>Tags</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      padding: "6px 12px", borderRadius: "6px",
                      background: `${project.accent}10`,
                      border: `1px solid ${project.accent}30`,
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "12px", fontWeight: "600", color: project.accent,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              {(project.demo || project.github) && (
                <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
                  {project.demo && (
                    <button 
                      onClick={() => window.open(project.demo, '_blank')}
                      style={{
                        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                        padding: "14px", borderRadius: "10px",
                        background: `${project.accent}15`,
                        border: `1px solid ${project.accent}40`,
                        color: project.accent,
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "14px", fontWeight: "700", cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${project.accent}25`; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${project.glow}`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${project.accent}15`; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                    >
                      <ExternalLink size={16} /> Visit Project
                    </button>
                  )}
                  {project.github && (
                    <button 
                      onClick={() => window.open(project.github, '_blank')}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: "14px 18px", borderRadius: "10px",
                        background: "#F8FAFC",
                        border: "1px solid #E5E7EB",
                        color: "#374151",
                        cursor: "pointer", transition: "all 0.3s ease",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#EEF2FF"; (e.currentTarget as HTMLElement).style.color = "#111827"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#F8FAFC"; (e.currentTarget as HTMLElement).style.color = "#374151"; }}
                    >
                      <Github size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p, onViewDetails }: { p: typeof PROJECTS[0]; onViewDetails: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % p.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + p.images.length) % p.images.length);
  };

  return (
    <div
      className="project-card-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "20px",
        background: "#FFFFFF",
        border: `1px solid ${hovered ? p.accent + "55" : "rgba(17,24,39,0.10)"}`,
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered ? "translateY(-5px)" : "none",
        boxShadow: hovered ? "0 18px 38px rgba(15,23,42,0.14)" : "0 6px 20px rgba(15,23,42,0.06)",
        position: "relative",
      }}
    >
      {/* Image Carousel */}
      <div style={{ height: "clamp(250px, 50vw, 340px)", overflow: "hidden", position: "relative" }}>
        <img src={p.images[currentImageIndex]} alt={`${p.name} - ${currentImageIndex + 1}`} style={{
          width: "100%", height: "100%", objectFit: "cover",
          transition: "transform 0.6s ease",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          filter: "brightness(0.92) saturate(1.05)",
        }} />
        {/* Color overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to top, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.50) 45%, rgba(255,255,255,0.05) 100%)`,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `${p.accent}14`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }} />

        {/* Navigation Arrows */}
        {p.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              style={{
                position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)",
                width: "32px", height: "32px", borderRadius: "50%",
                background: "rgba(255,255,255,0.88)", backdropFilter: "blur(10px)",
                border: `1px solid ${p.accent}40`,
                color: "#111827", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s ease",
                zIndex: 2,
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              style={{
                position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)",
                width: "32px", height: "32px", borderRadius: "50%",
                background: "rgba(255,255,255,0.88)", backdropFilter: "blur(10px)",
                border: `1px solid ${p.accent}40`,
                color: "#111827", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s ease",
                zIndex: 2,
              }}
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Project number */}
        <div style={{
          position: "absolute", top: "16px", left: "16px",
          fontFamily: "'Syne', sans-serif",
          fontSize: "11px", fontWeight: "800", color: "#111827",
          letterSpacing: "2px", opacity: 0.82,
        }}>{p.num}</div>

        {/* Status badge */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          padding: "5px 12px", borderRadius: "100px",
          background: `${p.accent}15`,
          border: `1px solid ${p.accent}40`,
          backdropFilter: "blur(10px)",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "11px", fontWeight: "700", color: p.accent,
          display: "flex", alignItems: "center", gap: "5px",
        }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: p.accent, boxShadow: `0 0 6px ${p.accent}` }} />
          {p.status}
        </div>

        {/* Image Indicators */}
        {p.images.length > 1 && (
          <div style={{
            position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: "6px", zIndex: 2,
          }}>
            {p.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                style={{
                  width: currentImageIndex === idx ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: currentImageIndex === idx ? p.accent : "rgba(17,24,39,0.28)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: currentImageIndex === idx ? `0 0 10px ${p.accent}` : "none",
                }}
              />
            ))}
          </div>
        )}

        {/* Name on image */}
        <div style={{
          position: "absolute", bottom: "16px", left: "20px",
        }}>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(22px, 5vw, 26px)", fontWeight: "800", color: "#111827",
            letterSpacing: "-0.5px", margin: 0,
            textShadow: "none",
          }}>{p.name}</h3>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "12px", color: p.accent, margin: 0,
            fontWeight: "600", letterSpacing: "0.5px",
          }}>{p.tagline}</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px" }}>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "14px", color: "#374151", lineHeight: "1.65", marginBottom: "16px",
        }}>{p.desc}</p>

        {/* Metric highlight */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "10px 14px", borderRadius: "10px",
          background: `${p.accent}08`,
          border: `1px solid ${p.accent}20`,
          marginBottom: "18px",
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.accent, boxShadow: `0 0 8px ${p.accent}` }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: "700", color: p.accent, letterSpacing: "0.3px" }}>
            {p.metric}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
          {p.tags.filter(tag => tag && tag.trim()).map(tag => (
            <span key={tag} style={{
              padding: "4px 10px", borderRadius: "6px",
              background: "#F8FAFC",
              border: "1px solid #E5E7EB",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "11px", fontWeight: "600", color: "#4B5563",
            }}>{tag}</span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={onViewDetails}
            style={{
              flex: "1 1 180px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              padding: "11px", borderRadius: "10px",
              background: `${p.accent}12`,
              border: `1px solid ${p.accent}30`,
              color: p.accent,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "13px", fontWeight: "700", cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${p.accent}20`; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${p.glow}`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${p.accent}12`; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            <Maximize2 size={13} /> View Project
          </button>
          {p.demo && (
            <button
              onClick={(e) => { e.stopPropagation(); window.open(p.demo, '_blank'); }}
              style={{
                flex: "1 1 140px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                padding: "11px", borderRadius: "10px",
                background: "#FFFFFF",
                border: "1px solid #D1D5DB",
                color: "#1F2937",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "13px", fontWeight: "700", cursor: "pointer",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F9FAFB"; (e.currentTarget as HTMLElement).style.color = "#111827"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; (e.currentTarget as HTMLElement).style.color = "#1F2937"; }}
            >
              <ExternalLink size={14} /> Visit Link
            </button>
          )}
          {p.github && (
            <button 
              onClick={(e) => { e.stopPropagation(); window.open(p.github, '_blank'); }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "11px 16px", borderRadius: "10px",
                background: "#FFFFFF",
                border: "1px solid #D1D5DB",
                color: "#374151",
                cursor: "pointer", transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F9FAFB"; (e.currentTarget as HTMLElement).style.color = "#111827"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; (e.currentTarget as HTMLElement).style.color = "#374151"; }}
            >
              <Github size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [projects, setProjects] = useState<any[]>(DEFAULT_PROJECTS);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const previewCount = 4;
  const displayedProjects = isMobile && !showAllProjects ? projects.slice(0, previewCount) : projects;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Source of truth: local JSON generated from portfolio folders
  useEffect(() => {
    const loadProjects = () => {
      setProjects(DEFAULT_PROJECTS);
      localStorage.setItem('portfolio_projects', JSON.stringify(DEFAULT_PROJECTS));
    };

    loadProjects();

    // Listen for custom event from Admin panel
    const handleCustomUpdate = () => {
      loadProjects();
    };

    window.addEventListener('portfolioProjectsUpdated', handleCustomUpdate);
    
    return () => {
      window.removeEventListener('portfolioProjectsUpdated', handleCustomUpdate);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) setShowAllProjects(true);
    if (isMobile) setShowAllProjects(false);
  }, [isMobile]);

  return (
    <>
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      <section id="projects" style={{
      background: "linear-gradient(180deg, #F3F7FF 0%, #FFFFFF 55%, #F7FAFF 100%)",
      padding: "72px 18px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)",
        backgroundSize: "60px 60px", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "-200px", right: "-200px",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)",
        filter: "blur(30px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: "34px", flexWrap: "wrap", gap: "16px",
        }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 14px", borderRadius: "100px",
              background: "rgba(168,85,247,0.08)",
              border: "1px solid rgba(168,85,247,0.2)",
              marginBottom: "20px",
            }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: "700", color: "#A855F7", letterSpacing: "1.5px" }}>
                FEATURED WORK
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "800",
              color: "var(--text-primary)", letterSpacing: "-2px",
              margin: 0,
            }}>
              Projects That
              <span style={{
                background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: "drop-shadow(0 0 14px rgba(168,85,247,0.22))",
              }}> Make Impact</span>
            </h2>
          </div>
          <button
            onClick={() => {
              if (isMobile) setShowAllProjects(prev => !prev);
            }}
            style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "12px 22px", borderRadius: "10px",
            background: "#FFFFFF",
            border: "1px solid rgba(17,24,39,0.14)",
            color: "#374151",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "13px", fontWeight: "700",
            cursor: isMobile ? "pointer" : "default",
            opacity: isMobile ? 1 : 0.85,
            transition: "all 0.3s ease",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.4)"; (e.currentTarget as HTMLElement).style.color = "#A855F7"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(17,24,39,0.14)"; (e.currentTarget as HTMLElement).style.color = "#374151"; }}
          >
            {isMobile ? (showAllProjects ? "Show Less" : `All Projects (${projects.length})`) : `All Projects (${projects.length})`} <ArrowRight size={14} />
          </button>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "22px",
        }} className={`projects-layout-grid ${isMobile && showAllProjects ? "projects-layout-grid-expanded" : ""}`}>
          {displayedProjects.length > 0 ? (
            displayedProjects.map(p => (
              <ProjectCard
                key={`${p.id}-${p.name}`}
                p={p}
                onViewDetails={() => setSelectedProject(p)}
              />
            ))
          ) : (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '60px 20px',
              color: '#4B5563',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
            }}>
              <p style={{ marginBottom: '12px' }}>No projects yet.</p>
              <a href="/admin" style={{ 
                color: '#A855F7',
                textDecoration: 'underline',
                fontWeight: '600'
              }}>
                Add projects from Admin Panel →
              </a>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-layout-grid {
            display: flex !important;
            gap: 14px !important;
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 8px;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }

          .projects-layout-grid::-webkit-scrollbar {
            height: 6px;
          }

          .projects-layout-grid::-webkit-scrollbar-thumb {
            background: rgba(99, 102, 241, 0.35);
            border-radius: 999px;
          }

          .project-card-item {
            flex: 0 0 86vw;
            max-width: 380px;
            scroll-snap-align: start;
          }

          .projects-layout-grid.projects-layout-grid-expanded {
            display: grid !important;
            grid-template-columns: 1fr !important;
            overflow: visible;
            scroll-snap-type: none;
            gap: 14px !important;
          }

          .projects-layout-grid.projects-layout-grid-expanded .project-card-item {
            flex: unset;
            max-width: none;
            scroll-snap-align: unset;
          }
        }
      `}</style>
    </section>
    </>
  );
}
