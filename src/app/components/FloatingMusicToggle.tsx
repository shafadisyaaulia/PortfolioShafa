import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play } from "lucide-react";

const AUDIO_PATH = encodeURI(
  "/Images Portofolio/Taylor Swift - The Great War (Official Lyric Video) [iFX6_9h7th0].mp3",
);

export function FloatingMusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = 0.35;

    const handleEnded = () => {
      setIsPlaying(false);
      audio.currentTime = 0;
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={AUDIO_PATH} preload="metadata" playsInline />

      <button
        type="button"
        onClick={toggleAudio}
        aria-label={isPlaying ? "Pause musik" : "Play musik"}
        title={isPlaying ? "Pause musik" : "Play musik"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          minWidth: "158px",
          height: "46px",
          padding: "0 12px",
          border: "1px solid rgba(255,255,255,0.22)",
          borderRadius: "14px",
          background: isPlaying
            ? "linear-gradient(120deg, rgba(8,32,36,0.95), rgba(16,185,129,0.65))"
            : "linear-gradient(120deg, rgba(12,20,40,0.95), rgba(99,102,241,0.52))",
          color: "#F8FAFC",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: isPlaying
            ? "0 10px 26px rgba(16,185,129,0.32), inset 0 0 28px rgba(16,185,129,0.15)"
            : "0 10px 26px rgba(79,70,229,0.35), inset 0 0 28px rgba(14,165,233,0.12)",
          backdropFilter: "blur(10px)",
          transition: "transform 0.24s ease, box-shadow 0.24s ease, background 0.24s ease",
          transform: isHovered ? "translateY(-2px)" : "none",
        }}
      >
        <span
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.14)",
            color: "#E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <Music2 size={13} />
        </span>

        <span
          style={{
            flex: 1,
            textAlign: "left",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "12px",
            letterSpacing: "0.25px",
            fontWeight: 700,
            opacity: 0.95,
            whiteSpace: "nowrap",
          }}
        >
          {isPlaying ? "Music On" : "Play Music"}
        </span>

        <span
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.16)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </span>
      </button>
    </>
  );
}