import React from 'react';

interface ScalesLogoProps {
  className?: string;
  size?: number;
}

export const ScalesLogo: React.FC<ScalesLogoProps> = ({ className = "", size = 44 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-md ${className}`}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE58F" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="85%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#996515" />
        </linearGradient>
        <linearGradient id="goldBeam" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#FFEBAA" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>

      {/* Top Finial */}
      <circle cx="32" cy="10" r="3" fill="url(#goldGradient)" />
      
      {/* Central Pillar */}
      <path
        d="M30.5 13H33.5V52H30.5V13Z"
        fill="url(#goldGradient)"
      />
      <rect x="29" y="16" width="6" height="2.5" rx="1" fill="url(#goldGradient)" />
      <rect x="29" y="32" width="6" height="2.5" rx="1" fill="url(#goldGradient)" />

      {/* Base Pedestal */}
      <path
        d="M22 52H42V55H22V52Z"
        fill="url(#goldGradient)"
      />
      <path
        d="M18 55H46V58H18V55Z"
        rx="1"
        fill="url(#goldGradient)"
      />

      {/* Horizontal Balance Beam */}
      <path
        d="M12 18C12 16.5 14 16 32 16C50 16 52 16.5 52 18C52 19 50 19.5 32 19.5C14 19.5 12 19 12 18Z"
        fill="url(#goldBeam)"
      />

      {/* Left Pan Strings & Pan */}
      <line x1="14" y1="19" x2="6" y2="34" stroke="url(#goldGradient)" strokeWidth="1.2" />
      <line x1="14" y1="19" x2="14" y2="34" stroke="url(#goldGradient)" strokeWidth="1.2" />
      <line x1="14" y1="19" x2="22" y2="34" stroke="url(#goldGradient)" strokeWidth="1.2" />
      {/* Left Bowl */}
      <path
        d="M5 34C5 40 23 40 23 34H5Z"
        fill="url(#goldGradient)"
      />

      {/* Right Pan Strings & Pan */}
      <line x1="50" y1="19" x2="42" y2="34" stroke="url(#goldGradient)" strokeWidth="1.2" />
      <line x1="50" y1="19" x2="50" y2="34" stroke="url(#goldGradient)" strokeWidth="1.2" />
      <line x1="50" y1="19" x2="58" y2="34" stroke="url(#goldGradient)" strokeWidth="1.2" />
      {/* Right Bowl */}
      <path
        d="M41 34C41 40 59 40 59 34H41Z"
        fill="url(#goldGradient)"
      />
    </svg>
  );
};
