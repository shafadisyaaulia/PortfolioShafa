import { Heart, Wifi, Users, Globe, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";
import socialImpactData from "@/data/social-impact.json";
import { socialImpactApi } from "@/lib/api";

// Icon mapping helper
const getIcon = (iconName: string) => {
  const icons: any = {
    'Wifi': <Wifi size={18} />,
    'Heart': <Heart size={18} />,
    'Users': <Users size={18} />,
    'Globe': <Globe size={18} />,
  };
  return icons[iconName] || <Heart size={18} />;
};

// Default social impact stories from JSON (fallback)
const DEFAULT_STORIES: any[] = socialImpactData.stories.map((story: any) => ({
  ...story,
  icon: getIcon(story.icon)
}));

// Story Detail Modal Component
function StoryDetailModal({ story, onClose }: { story: typeof STORIES[0]; onClose: () => void }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px", overflow: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "1100px", width: "100%",
          background: "rgba(7,7,26,0.95)",
          border: `1px solid ${story.accent}30`,
          borderRadius: "24px",
          boxShadow: `0 40px 100px ${story.glow}, 0 0 0 1px ${story.accent}10`,
          maxHeight: "90vh", overflow: "auto",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "20px", right: "20px", zIndex: 10,
            width: "40px", height: "40px", borderRadius: "50%",
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)",
            border: `1px solid ${story.accent}40`,
            color: "white", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = `${story.accent}30`;
            (e.currentTarget as HTMLElement).style.transform = "rotate(90deg)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.5)";
            (e.currentTarget as HTMLElement).style.transform = "rotate(0deg)";
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{
          padding: "40px 40px 30px",
          borderBottom: `1px solid ${story.accent}15`,
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", borderRadius: "100px",
            background: story.gradient,
            boxShadow: `0 4px 20px ${story.glow}`,
            marginBottom: "16px",
          }}>
            {story.icon}
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: "800", color: "white", letterSpacing: "1px" }}>
              {story.tag}
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "42px", fontWeight: "800", color: "white",
            letterSpacing: "-1.5px", margin: "0 0 8px 0",
            textShadow: `0 0 40px ${story.accent}60`,
          }}>{story.title}</h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "16px", color: story.accent, margin: 0, fontWeight: "600",
          }}>{story.headline}</p>
        </div>

        {/* Main Image */}
        <div style={{ padding: "40px" }}>
          <div style={{
            position: "relative", borderRadius: "16px", overflow: "hidden",
            height: "400px",
            border: `1px solid ${story.accent}20`,
            boxShadow: `0 20px 60px ${story.glow}`,
          }}>
            <img
              src={story.gallery[selectedImage]}
              alt={`${story.title} - ${selectedImage + 1}`}
              style={{
                width: "100%", height: "100%", objectFit: "cover",
              }}
            />
            <div style={{
              position: "absolute", top: "16px", right: "16px",
              padding: "8px 14px", borderRadius: "8px",
              background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)",
              border: `1px solid ${story.accent}40`,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "12px", fontWeight: "600", color: "white",
            }}>
              {selectedImage + 1} / {story.gallery.length}
            </div>
          </div>

          {/* Gallery Thumbnails */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "12px",
            marginTop: "20px",
          }}>
            {story.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                style={{
                  position: "relative",
                  height: "80px", borderRadius: "10px", overflow: "hidden",
                  border: selectedImage === idx ? `2px solid ${story.accent}` : "2px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  background: "transparent",
                  padding: 0,
                  boxShadow: selectedImage === idx ? `0 0 20px ${story.glow}` : "none",
                }}
                onMouseEnter={(e) => {
                  if (selectedImage !== idx) {
                    (e.currentTarget as HTMLElement).style.borderColor = `${story.accent}60`;
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedImage !== idx) {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }
                }}
              >
                <img
                  src={img}
                  alt={`${story.title} thumbnail ${idx + 1}`}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    opacity: selectedImage === idx ? 1 : 0.6,
                  }}
                />
              </button>
            ))}
          </div>

          {/* Story Details */}
          <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
            <div>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "20px", fontWeight: "700", color: "white",
                marginBottom: "16px", letterSpacing: "-0.5px",
              }}>The Story</h3>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7",
                marginBottom: "24px",
              }}>{story.fullDesc}</p>

              {/* Achievements */}
              <h4 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "16px", fontWeight: "700", color: story.accent,
                marginBottom: "12px", letterSpacing: "-0.3px",
              }}>Key Achievements</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {story.achievements.filter(achievement => achievement && achievement.trim()).map((achievement, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "10px 14px", borderRadius: "8px",
                    background: `${story.accent}06`,
                    border: `1px solid ${story.accent}15`,
                  }}>
                    <div style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      background: story.accent, boxShadow: `0 0 8px ${story.accent}`, flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "13px", fontWeight: "500", color: "rgba(255,255,255,0.6)",
                    }}>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Impact Metrics */}
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "20px", fontWeight: "700", color: "white",
                marginBottom: "16px", letterSpacing: "-0.5px",
              }}>Impact Metrics</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
                {story.impact.map((metric, i) => (
                  <div key={i} style={{
                    padding: "16px", borderRadius: "12px",
                    background: `${story.accent}08`,
                    border: `1px solid ${story.accent}20`,
                  }}>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "24px", fontWeight: "800", color: story.accent,
                      letterSpacing: "-0.5px", textShadow: `0 0 15px ${story.accent}50`,
                    }}>{metric.value}</div>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "12px", color: "rgba(255,255,255,0.4)", fontWeight: "600", marginTop: "4px",
                    }}>{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Statistics */}
              <h4 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "16px", fontWeight: "700", color: story.accent,
                marginBottom: "12px", letterSpacing: "-0.3px",
              }}>Program Statistics</h4>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px",
                padding: "20px", borderRadius: "12px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}>
                {story.stats.map((stat, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "20px", fontWeight: "800", color: story.accent,
                      letterSpacing: "-0.5px", textShadow: `0 0 15px ${story.accent}60`,
                    }}>{stat.val}</div>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "10px", color: "rgba(255,255,255,0.35)", fontWeight: "600", marginTop: "4px",
                    }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div style={{ marginTop: "20px" }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "12px", fontWeight: "700", color: story.accent,
                  marginBottom: "8px", letterSpacing: "0.5px",
                }}>Key Highlights</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {story.highlights.filter(h => h && h.trim()).map((h, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "8px 12px", borderRadius: "6px",
                      background: `${story.accent}06`,
                      border: `1px solid ${story.accent}15`,
                    }}>
                      <div style={{
                        width: "4px", height: "4px", borderRadius: "50%",
                        background: story.accent, boxShadow: `0 0 6px ${story.accent}`, flexShrink: 0,
                      }} />
                      <span style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "12px", fontWeight: "500", color: "rgba(255,255,255,0.5)",
                      }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryCard({ s, onViewDetails }: { s: typeof STORIES[0]; onViewDetails: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % s.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + s.images.length) % s.images.length);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? s.accent + "50" : "rgba(255,255,255,0.07)"}`,
        transition: "all 0.4s ease",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? `0 30px 80px ${s.glow}` : "none",
        position: "relative",
      }}
    >
      {/* Image Carousel */}
      <div style={{ height: "260px", position: "relative", overflow: "hidden" }}>
        <img
          src={s.images[currentImageIndex]}
          alt={`${s.title} - ${currentImageIndex + 1}`}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.6s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            filter: "brightness(0.6) saturate(0.7)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(6,6,20,0.98) 0%, rgba(6,6,20,0.3) 60%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `${s.accent}10`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.4s ease",
        }} />

        {/* Navigation Arrows */}
        {s.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              style={{
                position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)",
                width: "36px", height: "36px", borderRadius: "50%",
                background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)",
                border: `1px solid ${s.accent}40`,
                color: "white", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s ease",
                zIndex: 2,
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              style={{
                position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
                width: "36px", height: "36px", borderRadius: "50%",
                background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)",
                border: `1px solid ${s.accent}40`,
                color: "white", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s ease",
                zIndex: 2,
              }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
        <div style={{
          position: "absolute", top: "16px", left: "16px",
          display: "flex", alignItems: "center", gap: "6px",
          padding: "7px 14px", borderRadius: "100px",
          background: s.gradient,
          boxShadow: `0 4px 20px ${s.glow}`,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "11px", fontWeight: "800", color: "white", letterSpacing: "1px",
        }}>
          {s.icon}
          {s.tag}
        </div>
        <div style={{
          position: "absolute", top: "16px", right: "20px",
          fontFamily: "'Syne', sans-serif",
          fontSize: "11px", fontWeight: "800", color: s.accent,
          letterSpacing: "2px", opacity: 0.6,
        }}>{s.num}</div>

        {/* Image Indicators */}
        {s.images.length > 1 && (
          <div style={{
            position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: "6px", zIndex: 2,
          }}>
            {s.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                style={{
                  width: currentImageIndex === idx ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: currentImageIndex === idx ? s.accent : "rgba(255,255,255,0.3)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: currentImageIndex === idx ? `0 0 12px ${s.accent}` : "none",
                }}
              />
            ))}
          </div>
        )}

        <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "32px", fontWeight: "800", color: "white",
            letterSpacing: "-1px", margin: 0,
            textShadow: `0 0 40px ${s.accent}80`,
          }}>{s.title}</h3>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "13px", color: s.accent, margin: 0, fontWeight: "600",
          }}>{s.headline}</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "28px" }}>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: "1.65", marginBottom: "20px",
        }}>{s.desc}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
          {s.highlights.filter(h => h && h.trim()).map((h, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "8px 14px", borderRadius: "8px",
              background: `${s.accent}06`,
              border: `1px solid ${s.accent}15`,
            }}>
              <div style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: s.accent, boxShadow: `0 0 8px ${s.accent}`, flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "13px", fontWeight: "500", color: "rgba(255,255,255,0.55)",
              }}>{h}</span>
            </div>
          ))}
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px",
          paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          {s.stats.map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "22px", fontWeight: "800", color: s.accent,
                letterSpacing: "-0.5px", textShadow: `0 0 15px ${s.accent}60`,
              }}>{stat.val}</div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "11px", color: "rgba(255,255,255,0.3)", fontWeight: "600", marginTop: "4px",
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* View Details Button */}
        <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "16px" }}>
          <button
            onClick={onViewDetails}
            style={{
              width: "100%",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              padding: "12px", borderRadius: "10px",
              background: `${s.accent}12`,
              border: `1px solid ${s.accent}30`,
              color: s.accent,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "13px", fontWeight: "700", cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = `${s.accent}20`;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${s.glow}`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = `${s.accent}12`;
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <Maximize2 size={14} /> View Full Story
          </button>
        </div>
      </div>
    </div>
  );
}

export function SocialImpact() {
  const [selectedStory, setSelectedStory] = useState<any | null>(null);
  const [stories, setStories] = useState<any[]>(DEFAULT_STORIES);
  const [loading, setLoading] = useState(true);

  // Load stories from MongoDB API or fallback to localStorage/JSON
  useEffect(() => {
    const loadStories = async () => {
      try {
        setLoading(true);
        
        // Try MongoDB API first
        const response = await socialImpactApi.getAll();
        
        if (response.success && response.data && Array.isArray(response.data)) {
          console.log('📦 Loaded social impact from MongoDB:', response.data);
          // Add icon component to each story
          const storiesWithIcons = response.data.map((story: any) => ({
            ...story,
            icon: getIcon(story.icon)
          }));
          setStories(storiesWithIcons);
          // Sync to localStorage for offline access
          localStorage.setItem('portfolio_social_impact', JSON.stringify(response.data));
          return;
        }
        
        // Fallback 1: Try localStorage
        const stored = localStorage.getItem('portfolio_social_impact');
        if (stored) {
          const parsed = JSON.parse(stored);
          const storiesWithIcons = parsed.map((story: any) => ({
            ...story,
            icon: getIcon(story.icon)
          }));
          console.log('📦 Loaded social impact from localStorage (fallback):', storiesWithIcons);
          setStories(storiesWithIcons);
          return;
        }
        
        // Fallback 2: Use default JSON
        console.log('📦 Using default social impact from JSON');
        setStories(DEFAULT_STORIES);
        localStorage.setItem('portfolio_social_impact', JSON.stringify(socialImpactData.stories));
        
      } catch (error) {
        console.error('Error loading social impact:', error);
        
        // Try localStorage fallback on error
        try {
          const stored = localStorage.getItem('portfolio_social_impact');
          if (stored) {
            const parsed = JSON.parse(stored);
            const storiesWithIcons = parsed.map((story: any) => ({
              ...story,
              icon: getIcon(story.icon)
            }));
            setStories(storiesWithIcons);
          } else {
            setStories(DEFAULT_STORIES);
          }
        } catch {
          setStories(DEFAULT_STORIES);
        }
      } finally {
        setLoading(false);
      }
    };

    loadStories();

    // Listen for custom event from Admin panel (reload from MongoDB)
    const handleCustomUpdate = () => {
      console.log('🔄 Social Impact updated event received! Reloading from MongoDB...');
      loadStories(); // Always reload from API, not from localStorage
    };

    window.addEventListener('portfolioSocialImpactUpdated', handleCustomUpdate);
    
    return () => {
      window.removeEventListener('portfolioSocialImpactUpdated', handleCustomUpdate);
    };
  }, []);

  return (
    <>
      {selectedStory && (
        <StoryDetailModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
      <section id="impact" style={{
      background: "#07071A",
      padding: "100px 24px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", bottom: "-200px", left: "50%", transform: "translateX(-50%)",
        width: "800px", height: "400px",
        background: "radial-gradient(ellipse, rgba(236,72,153,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "100px",
            background: "rgba(236,72,153,0.08)",
            border: "1px solid rgba(236,72,153,0.2)",
            marginBottom: "20px",
          }}>
            <Heart size={12} color="#EC4899" fill="#EC4899" />
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "11px", fontWeight: "700", color: "#EC4899", letterSpacing: "1.5px",
            }}>
              SOCIAL IMPACT STORIES
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "800",
            color: "white", letterSpacing: "-2px", lineHeight: 1.05,
          }}>
            Technology for
            <span style={{
              background: "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: "drop-shadow(0 0 20px rgba(236,72,153,0.4))",
            }}> Communities</span>
          </h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "15px", color: "rgba(255,255,255,0.4)", marginTop: "16px",
          }}>Beyond code — creating real change where it matters most.</p>
        </div>

        {/* Stories */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="impact-cards-grid">
          {stories.length > 0 ? (
            stories.map(s => (
              <StoryCard
                key={s.id}
                s={s}
                onViewDetails={() => setSelectedStory(s)}
              />
            ))
          ) : (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '60px 20px',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
            }}>
              <p style={{ marginBottom: '12px' }}>No social impact stories yet.</p>
              <a href="/admin" style={{ 
                color: '#EC4899',
                textDecoration: 'underline',
                fontWeight: '600'
              }}>
                Add stories from Admin Panel →
              </a>
            </div>
          )}
        </div>

        {/* Quote Block */}
        <div style={{
          marginTop: "64px",
          padding: "48px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at center, rgba(0,207,253,0.04) 0%, transparent 60%)",
          }} />
          {/* Large decorative quote mark */}
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "80px", color: "rgba(0,207,253,0.12)",
            lineHeight: 1, marginBottom: "8px", position: "relative", zIndex: 1,
            userSelect: "none",
          }}>
            &#8220;
          </div>
          <blockquote style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(18px, 3vw, 26px)", fontWeight: "700",
            color: "rgba(255,255,255,0.85)", letterSpacing: "-0.5px", lineHeight: "1.4",
            marginBottom: "20px", position: "relative", zIndex: 1,
            margin: "0 0 20px 0",
          }}>
            Technology should serve the marginalized,{" "}
            <span style={{
              background: "linear-gradient(135deg, #00CFFD, #A855F7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>not just the privileged.</span>
          </blockquote>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "13px", color: "rgba(255,255,255,0.3)", position: "relative", zIndex: 1,
            letterSpacing: "0.5px", marginTop: "20px",
          }}>
            — SHAFA DISYA AULIA · AI ENGINEER & COMMUNITY FACILITATOR
          </p>
        </div>

        {/* Metrics */}
        <div style={{
          marginTop: "40px",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px",
        }} className="impact-metrics-grid">
          {[
            { icon: <Users size={22} color="#00CFFD" />, val: "500+", label: "People Impacted", color: "#00CFFD" },
            { icon: <Globe size={22} color="#A855F7" />, val: "2", label: "Regions Served", color: "#A855F7" },
            { icon: <Heart size={22} color="#EC4899" />, val: "1", label: "National Award", color: "#EC4899" },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                padding: "24px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", gap: "16px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = m.color + "40";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${m.color}15`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px",
                background: `${m.color}10`,
                border: `1px solid ${m.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>{m.icon}</div>
              <div>
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "28px", fontWeight: "800", color: m.color,
                  letterSpacing: "-0.5px", textShadow: `0 0 15px ${m.color}50`,
                }}>{m.val}</div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: "600", marginTop: "2px",
                }}>{m.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .impact-cards-grid { grid-template-columns: 1fr !important; }
          .impact-metrics-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
    </>
  );
}
