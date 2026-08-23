import React from 'react';

// FlyFair India Brand Logo with Supersonic Jet Silhouette and Tricolor Dot Accent
export const FlyFairLogo: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-8 h-8',
  size = 32
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="flyfairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Outer rounded brand container */}
      <rect width="48" height="48" rx="12" fill="url(#flyfairGrad)" />

      {/* Aerodynamic flight orbit arc */}
      <path
        d="M 8 36 C 14 18, 30 10, 40 12"
        stroke="url(#orbitGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />

      {/* Supersonic Jet Silhouette */}
      <path
        d="M26 14 L30 18 L38 21 L38 23 L30 24 L28 32 L26 33 L27 24 L20 23 L18 26 L16 26 L17 22 L16 18 L18 18 L20 21 L27 20 Z"
        fill="#FFFFFF"
        filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.25))"
      />

      {/* Subtle Indian Tricolor pip accent dots */}
      <circle cx="10" cy="38" r="2" fill="#FF9933" />
      <circle cx="15" cy="38" r="2" fill="#FFFFFF" />
      <circle cx="20" cy="38" r="2" fill="#138808" />
    </svg>
  );
};

// Carrier SVGs & Badges
interface AirlineLogoProps {
  airlineCode?: string;
  airlineName?: string;
  size?: number;
  className?: string;
}

export const AirlineLogo: React.FC<AirlineLogoProps> = ({
  airlineCode = '6E',
  airlineName = 'IndiGo',
  size = 28,
  className = ''
}) => {
  const code = airlineCode.toUpperCase();
  const name = airlineName.toLowerCase();

  // IndiGo (6E) - Iconic Deep Blue + 6E constellation
  if (code === '6E' || name.includes('indigo')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`flex-shrink-0 ${className}`}
      >
        <rect width="32" height="32" rx="8" fill="#001B94" />
        {/* 6E Typography */}
        <text
          x="16"
          y="18"
          fill="#FFFFFF"
          fontSize="10"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          dominantBaseline="central"
        >
          6E
        </text>
        {/* Constellation dots */}
        <circle cx="7" cy="8" r="1.2" fill="#60A5FA" />
        <circle cx="11" cy="6" r="1.2" fill="#60A5FA" />
        <circle cx="21" cy="6" r="1.2" fill="#60A5FA" />
        <circle cx="25" cy="8" r="1.2" fill="#60A5FA" />
        <circle cx="16" cy="26" r="1.2" fill="#93C5FD" />
      </svg>
    );
  }

  // Air India (AI) - Red & Gold Iconic Swan / Sun monogram
  if (code === 'AI' || name.includes('air india')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`flex-shrink-0 ${className}`}
      >
        <rect width="32" height="32" rx="8" fill="#D91D24" />
        {/* Golden swoosh & wing */}
        <path
          d="M 6 22 Q 16 10 26 8 Q 20 18 10 24 Z"
          fill="#FFB81C"
        />
        <circle cx="21" cy="11" r="2.5" fill="#FFFFFF" />
        <text
          x="16"
          y="23"
          fill="#FFFFFF"
          fontSize="7.5"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
        >
          AI
        </text>
      </svg>
    );
  }

  // Vistara (UK) - Royal Aubergine & 8-point gold star emblem
  if (code === 'UK' || name.includes('vistara')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`flex-shrink-0 ${className}`}
      >
        <rect width="32" height="32" rx="8" fill="#582C4D" />
        {/* 8-point gold star / yantra */}
        <path
          d="M16 6 L18 13 L25 10 L20 16 L25 22 L18 19 L16 26 L14 19 L7 22 L12 16 L7 10 L14 13 Z"
          fill="#D4AF37"
        />
        <circle cx="16" cy="16" r="3" fill="#582C4D" />
        <circle cx="16" cy="16" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // SpiceJet (SG) - Red Chili / 5-capsule speed spark
  if (code === 'SG' || name.includes('spicejet')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`flex-shrink-0 ${className}`}
      >
        <rect width="32" height="32" rx="8" fill="#E62B1E" />
        {/* 5-capsule speed dash */}
        <circle cx="8" cy="16" r="2" fill="#FFCC00" />
        <circle cx="13" cy="13" r="2.5" fill="#FFCC00" />
        <circle cx="18" cy="10" r="3" fill="#FFFFFF" />
        <circle cx="23" cy="15" r="2.5" fill="#FFCC00" />
        <circle cx="20" cy="22" r="2" fill="#FFCC00" />
        <text
          x="16"
          y="27"
          fill="#FFFFFF"
          fontSize="7"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
        >
          SG
        </text>
      </svg>
    );
  }

  // Akasa Air (QP) - Sunrise Orange & Purple 'Rising A'
  if (code === 'QP' || name.includes('akasa')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`flex-shrink-0 ${className}`}
      >
        <rect width="32" height="32" rx="8" fill="#FF6B00" />
        {/* Rising A wings */}
        <path
          d="M 8 24 L 16 7 L 24 24 L 19 24 L 16 15 L 13 24 Z"
          fill="#5C2D91"
        />
        <path
          d="M 12 19 L 16 11 L 20 19 Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Air India Express (IX) - Vibrant Orange & Teal
  if (code === 'IX' || name.includes('express')) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`flex-shrink-0 ${className}`}
      >
        <rect width="32" height="32" rx="8" fill="#FF5000" />
        <path
          d="M 6 18 Q 16 8 26 12 L 20 22 Q 12 18 6 18 Z"
          fill="#009688"
        />
        <text
          x="16"
          y="26"
          fill="#FFFFFF"
          fontSize="8"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
        >
          IX
        </text>
      </svg>
    );
  }

  // Default Carrier fallback badge
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold text-[11px] flex-shrink-0 shadow-xs ${className}`}
    >
      {code}
    </div>
  );
};

// Carrier Tag / Card Badge
export const AirlineBadge: React.FC<{
  airline: string;
  code: string;
  subtext?: string;
  className?: string;
}> = ({ airline, code, subtext, className = '' }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <AirlineLogo airlineCode={code} airlineName={airline} size={30} />
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            {airline}
          </span>
          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            {code}
          </span>
        </div>
        {subtext && (
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
