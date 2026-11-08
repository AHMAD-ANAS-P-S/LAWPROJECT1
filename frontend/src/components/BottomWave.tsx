import React from 'react';

export const BottomWave: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden h-32 sm:h-40 md:h-48 z-0">
      <svg
        viewBox="0 0 1440 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover object-bottom"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="purpleGradientWave" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#25053B" stopOpacity="0.98" />
            <stop offset="35%" stopColor="#3E0B64" stopOpacity="0.96" />
            <stop offset="65%" stopColor="#58148A" stopOpacity="0.94" />
            <stop offset="100%" stopColor="#220436" stopOpacity="0.98" />
          </linearGradient>
          <linearGradient id="goldEdgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A87A2A" stopOpacity="0.3" />
            <stop offset="25%" stopColor="#E5C158" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#FDEAA8" stopOpacity="1" />
            <stop offset="80%" stopColor="#D4AF37" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8A5A1B" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Primary Purple Curved Wave with smooth elegant rise and flow */}
        <path
          d="M0,160 C260,195 440,115 720,110 C980,105 1200,150 1440,125 L1440,240 L0,240 Z"
          fill="url(#purpleGradientWave)"
        />

        {/* Radiant Gold Edge Curve */}
        <path
          d="M0,160 C260,195 440,115 720,110 C980,105 1200,150 1440,125"
          stroke="url(#goldEdgeGlow)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Secondary Back Wave for rich depth */}
        <path
          d="M0,185 C320,210 580,140 900,135 C1160,130 1320,155 1440,145 L1440,240 L0,240 Z"
          fill="#150220"
          fillOpacity="0.55"
        />
      </svg>
    </div>
  );
};
