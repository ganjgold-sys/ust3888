import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'gold';
  className?: string;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  className = '',
  showSubtitle = true,
}) => {
  // Color presets based on variant
  const isDarkBg = variant === 'light' || variant === 'gold';
  
  const textColor = isDarkBg ? 'text-bone' : 'text-bone-ink';
  const subtitleColor = isDarkBg ? 'text-muted' : 'text-bone-mute';
  const featherColor = variant === 'gold' ? 'var(--color-gold)' : isDarkBg ? 'var(--color-gold-soft)' : 'var(--color-bone-mute)';
  const strokeLineColor = variant === 'gold' ? 'var(--color-gold)' : isDarkBg ? 'var(--color-gold)' : 'var(--color-bone-mute)';

  return (
    <div className={`inline-flex items-center space-x-3 select-none ${className}`}>
      {/* SVG Emblem with Feather Quill and Underline */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg aria-hidden="true"
          className="w-10 h-10 sm:w-11 sm:h-11 transition-transform duration-300 hover:scale-105"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer elegant ring or shield back drop */}
          <rect
            x="4"
            y="4"
            width="112"
            height="112"
            rx="24"
            fill={isDarkBg ? 'rgba(38, 30, 24, 0.6)' : 'rgba(245, 240, 235, 0.8)'}
            stroke={featherColor}
            strokeWidth="2"
            strokeOpacity="0.4"
          />

          {/* Detailed Feather Quill */}
          <path
            d="M86 22C68 26 44 44 32 68C38 65 48 62 56 63C42 72 34 82 28 88C48 84 66 72 80 54C92 40 92 28 86 22Z"
            fill={featherColor}
          />
          {/* Central spine of the feather */}
          <path
            d="M28 88L92 24"
            stroke={isDarkBg ? 'var(--color-paper-2)' : 'var(--color-bone)'}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Feather texture cuts */}
          <path
            d="M48 50L38 42M60 38L52 30M70 30L64 22"
            stroke={isDarkBg ? 'var(--color-card)' : 'var(--color-bone)'}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Underline drawn by the feather */}
          <path
            d="M22 92C35 90 60 90 102 92"
            stroke={strokeLineColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography Column */}
      <div className="flex flex-col text-left">
        <div
          className={`font-serif text-xl sm:text-2xl font-black leading-none ${textColor}`}
          
        >
          Юстиция
        </div>
        {showSubtitle && (
          <div
            className={`text-xs font-sans font-semibold mt-1 ${subtitleColor}`}
            
          >
            Юридическая компания
          </div>
        )}
      </div>
    </div>
  );
};
