import React from 'react';

interface ProductIllustrationProps {
  category: string;
  name: string;
  image?: string;
  size?: number;
}

export const ProductIllustration: React.FC<ProductIllustrationProps> = ({
  category,
  name,
  image,
  size = 180
}) => {
  // If we have actual image for chairs, desks, monitor arms
  if (image && (image.endsWith('.jpg') || image.endsWith('.png'))) {
    return (
      <div style={{
        width: '100%',
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        borderRadius: '12px'
      }}>
        <img
          src={image}
          alt={name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease'
          }}
          onError={(e) => {
            // fallback to SVG if image not found
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  // Bespoke clean vector representations for specific categories
  return (
    <div style={{
      width: '100%',
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FAF9F5',
      borderRadius: '12px',
      padding: '16px'
    }}>
      {category.includes('Keyboard') ? (
        // Split Ergonomic Keyboard Vector
        <svg width={size * 0.8} height={size * 0.6} viewBox="0 0 160 100" fill="none">
          <rect x="10" y="20" width="65" height="55" rx="8" fill="#E9F0EA" stroke="#244A3D" strokeWidth="2" transform="rotate(-6 42 47)" />
          <rect x="85" y="20" width="65" height="55" rx="8" fill="#E9F0EA" stroke="#244A3D" strokeWidth="2" transform="rotate(6 117 47)" />
          {/* Keys left */}
          <rect x="20" y="26" width="10" height="8" rx="2" fill="#244A3D" opacity="0.8" transform="rotate(-6 42 47)" />
          <rect x="34" y="26" width="10" height="8" rx="2" fill="#244A3D" opacity="0.8" transform="rotate(-6 42 47)" />
          <rect x="48" y="26" width="10" height="8" rx="2" fill="#244A3D" opacity="0.8" transform="rotate(-6 42 47)" />
          <rect x="22" y="38" width="10" height="8" rx="2" fill="#244A3D" opacity="0.8" transform="rotate(-6 42 47)" />
          <rect x="36" y="38" width="10" height="8" rx="2" fill="#244A3D" opacity="0.8" transform="rotate(-6 42 47)" />
          <rect x="50" y="38" width="10" height="8" rx="2" fill="#244A3D" opacity="0.8" transform="rotate(-6 42 47)" />
          {/* Keys right */}
          <rect x="95" y="26" width="10" height="8" rx="2" fill="#244A3D" opacity="0.8" transform="rotate(6 117 47)" />
          <rect x="109" y="26" width="10" height="8" rx="2" fill="#244A3D" opacity="0.8" transform="rotate(6 117 47)" />
          <rect x="123" y="26" width="10" height="8" rx="2" fill="#244A3D" opacity="0.8" transform="rotate(6 117 47)" />
          {/* Cushioned palm rest */}
          <path d="M 8 75 Q 45 88 80 82 Q 115 88 152 75 L 148 90 Q 115 98 80 94 Q 45 98 12 90 Z" fill="#D5E2D8" stroke="#8FA99A" strokeWidth="1.5" />
        </svg>
      ) : category.includes('Mouse') ? (
        // 57-degree Vertical Handshake Mouse Vector
        <svg width={size * 0.6} height={size * 0.7} viewBox="0 0 100 120" fill="none">
          <ellipse cx="50" cy="108" rx="36" ry="7" fill="#E7E8E1" />
          <path d="M 30 105 C 18 80 20 40 42 22 C 58 8 76 15 78 35 C 80 55 84 90 70 105 Z" fill="#244A3D" />
          <path d="M 42 22 C 52 35 56 60 48 90" stroke="#8FA99A" strokeWidth="2.5" strokeLinecap="round" />
          {/* Scroll wheel & tactile clickers */}
          <rect x="56" y="24" width="7" height="18" rx="3.5" fill="#E9F0EA" />
          <path d="M 28 85 C 32 75 36 65 34 50" stroke="#E9F0EA" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      ) : category.includes('Footrests') ? (
        // Ergonomic Footrest Vector
        <svg width={size * 0.8} height={size * 0.6} viewBox="0 0 140 100" fill="none">
          {/* Stand legs */}
          <path d="M 25 80 L 40 45 L 50 80" stroke="#707A73" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 90 80 L 100 45 L 115 80" stroke="#707A73" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {/* Tilting platform */}
          <rect x="20" y="32" width="100" height="24" rx="6" fill="#244A3D" transform="rotate(-10 70 44)" />
          {/* Anti-slip ribs */}
          <line x1="38" y1="36" x2="102" y2="25" stroke="#8FA99A" strokeWidth="2" strokeLinecap="round" />
          <line x1="38" y1="44" x2="102" y2="33" stroke="#8FA99A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : category.includes('Standing Support') ? (
        // Anti Fatigue Mat Vector
        <svg width={size * 0.85} height={size * 0.55} viewBox="0 0 160 80" fill="none">
          <ellipse cx="80" cy="50" rx="72" ry="24" fill="#244A3D" />
          <ellipse cx="80" cy="46" rx="64" ry="20" fill="#2E5C4C" />
          <ellipse cx="80" cy="44" rx="54" ry="16" fill="#3D7563" />
          <text x="80" y="47" textAnchor="middle" fill="#E9F0EA" fontSize="8" fontWeight="600" letterSpacing="0.08em">ORTHO CUSHION 19MM</text>
        </svg>
      ) : (
        // Mobile Lifter Aid Vector
        <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 120 120" fill="none">
          {/* Base & casters */}
          <line x1="20" y1="105" x2="85" y2="105" stroke="#244A3D" strokeWidth="6" strokeLinecap="round" />
          <circle cx="25" cy="112" r="5" fill="#707A73" />
          <circle cx="80" cy="112" r="5" fill="#707A73" />
          {/* Mast */}
          <rect x="22" y="25" width="10" height="80" rx="3" fill="#244A3D" />
          {/* Electric screw / lift mechanism */}
          <line x1="27" y1="30" x2="27" y2="95" stroke="#C49B55" strokeWidth="3" strokeDasharray="3 3" />
          {/* Lift carriage & platform */}
          <rect x="30" y="55" width="55" height="8" rx="2" fill="#C49B55" />
          {/* Push handle */}
          <path d="M 22 35 L 8 40 L 8 60" stroke="#707A73" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
};
