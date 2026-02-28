import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function FloatingAdminButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to="/admin"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: isHovered ? 'auto' : '52px',
        height: '52px',
        padding: isHovered ? '0 20px 0 16px' : '0',
        borderRadius: '26px',
        background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
        boxShadow: isHovered 
          ? '0 12px 48px rgba(0,207,253,0.5), 0 0 0 1px rgba(255,255,255,0.2)'
          : '0 8px 32px rgba(0,207,253,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 9999,
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        transform: isHovered ? 'translateY(-4px) scale(1.05)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Shield 
        size={22} 
        color="#060614" 
        style={{
          flexShrink: 0,
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'rotate(0deg)' : 'rotate(-10deg)',
        }}
      />
      {isHovered && (
        <span style={{
          color: '#060614',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '14px',
          fontWeight: '700',
          letterSpacing: '0.3px',
          whiteSpace: 'nowrap',
          animation: 'slideIn 0.3s ease',
        }}>
          Admin
        </span>
      )}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @media (max-width: 640px) {
          /* On mobile, always show compact version */
        }
      `}</style>
    </Link>
  );
}
