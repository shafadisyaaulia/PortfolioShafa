import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Default password - GANTI INI!
  const ADMIN_PASSWORD = 'admin123'; // ⚠️ Change this!

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_logged_in', 'true');
      onLogin();
    } else {
      setError('❌ Wrong password!');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060614',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: "linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '-200px',
        right: '-200px',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 65%)',
        filter: 'blur(30px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '400px',
        background: 'rgba(7,7,26,0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(168,85,247,0.2)',
        borderRadius: '24px',
        padding: '48px',
        boxShadow: '0 40px 100px rgba(168,85,247,0.15)',
      }}>
        {/* Logo/Icon */}
        <div style={{
          width: '64px',
          height: '64px',
          margin: '0 auto 24px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 40px rgba(168,85,247,0.3)',
        }}>
          <Lock size={32} color="white" />
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '32px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          marginBottom: '8px',
        }}>
          Admin Panel
        </h1>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '14px',
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          Enter your password to continue
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '8px',
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                style={{
                  width: '100%',
                  padding: '14px 48px 14px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: error ? '1px solid #EC4899' : '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border 0.3s ease',
                }}
                onFocus={(e) => {
                  if (!error) e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)';
                }}
                onBlur={(e) => {
                  if (!error) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && (
              <p style={{
                marginTop: '8px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '12px',
                color: '#EC4899',
                margin: '8px 0 0 0',
              }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
              border: 'none',
              color: 'white',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 40px rgba(168,85,247,0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Login to Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
}
