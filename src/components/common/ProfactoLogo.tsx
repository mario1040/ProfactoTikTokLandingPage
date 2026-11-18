import { useState } from 'react';
import { PROFACTO_BRAND } from '../../config/brand';

interface ProfactoLogoProps {
  showWordmark?: boolean;
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function ProfactoLogo({
  showWordmark = true,
  tone = 'light',
  size = 'md',
}: ProfactoLogoProps) {
  const [imgError, setImgError] = useState(false);

  const boxSizeClass =
    size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';

  const wordmarkColor = tone === 'dark' ? 'text-white' : 'text-[#0F0E0E]';
  const badgeSurfaceClass =
    tone === 'dark'
      ? 'bg-[#171616] border border-white/15'
      : 'bg-[#171616] border border-black/10';

  return (
    <span className="inline-flex items-center gap-3 shrink-0 whitespace-nowrap">
      <span
        className={`${boxSizeClass} relative inline-flex items-center justify-center overflow-hidden rounded-lg ${badgeSurfaceClass} shrink-0`}
      >
        {!imgError ? (
          <img
            src={PROFACTO_BRAND.logoAssetPath}
            alt="Profacto Official Logo"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-en-brand text-xs font-bold tracking-tight text-white">
            PF
          </span>
        )}
      </span>
      {showWordmark && (
        <span
          className={`font-en-brand text-lg font-bold tracking-tight whitespace-nowrap ${wordmarkColor}`}
        >
          {PROFACTO_BRAND.name}
        </span>
      )}
    </span>
  );
}
