import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ArchitecturalImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallbackLabel?: string;
}

export function ArchitecturalImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  priority = false,
  fallbackLabel = 'Profacto Architectural Craft',
}: ArchitecturalImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full min-h-[220px] flex flex-col items-center justify-center gap-3 bg-[#171616] text-white/80 p-6 text-center"
      >
        <Layers className="w-8 h-8 text-[#BF2531]" aria-hidden="true" />
        <span className="text-sm font-medium">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
