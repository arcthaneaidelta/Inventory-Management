import React, { useEffect, useState } from 'react';

interface InitialLoadingScreenProps {
  onComplete: () => void;
}

export const InitialLoadingScreen: React.FC<InitialLoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 250);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#F8F8F4',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      {/* Brand Icon & Converging Ergonomic Lines Animation */}
      <div style={{
        position: 'relative',
        width: 120,
        height: 120,
        marginBottom: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Subtle background glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          backgroundColor: '#E9F0EA',
          filter: 'blur(20px)',
          opacity: 0.8
        }} />

        {/* SVG converging motion curves */}
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ position: 'relative', zIndex: 1 }}>
          <defs>
            <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8FA99A" />
              <stop offset="100%" stopColor="#244A3D" />
            </linearGradient>
          </defs>

          {/* Converging ergonomic curve 1 */}
          <path
            d="M 15,75 C 30,70 45,55 50,25"
            fill="none"
            stroke="url(#curveGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset={100 - (progress * 1.0)}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />

          {/* Converging ergonomic curve 2 */}
          <path
            d="M 85,75 C 70,70 55,55 50,25"
            fill="none"
            stroke="#8FA99A"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset={100 - (progress * 1.0)}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />

          {/* Dynamic spine curvature line */}
          <path
            d="M 50,85 C 46,65 54,45 50,25"
            fill="none"
            stroke="#244A3D"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset={100 - (progress * 1.0)}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />

          {/* Precision node circle */}
          <circle
            cx="50"
            cy="25"
            r={progress > 60 ? 5 : 0}
            fill="#244A3D"
            style={{ transition: 'r 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </svg>
      </div>

      {/* Brand Title */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 800,
          color: '#244A3D',
          letterSpacing: '-0.02em',
          marginBottom: '6px'
        }}>
          RehabEquip <span style={{ color: '#8FA99A', fontWeight: 600 }}>AU</span>
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#707A73',
          fontWeight: 500
        }}>
          Preparing your clinical workspace...
        </p>
      </div>

      {/* Thin forest-green progress line */}
      <div style={{
        width: '240px',
        height: '4px',
        backgroundColor: '#E7E8E1',
        borderRadius: '9999px',
        overflow: 'hidden',
        marginBottom: '24px'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#244A3D',
          borderRadius: '9999px',
          transition: 'width 0.1s ease-out'
        }} />
      </div>

      {/* Tagline footer */}
      <p style={{
        fontSize: '12px',
        color: '#9DA6A0',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        fontWeight: 600
      }}>
        Intelligent equipment sourcing. Thoughtfully designed.
      </p>
    </div>
  );
};
