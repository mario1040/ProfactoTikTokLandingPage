import { MessageCircle } from 'lucide-react';
import type { ConversionContext, Language } from '../types/analytics';
import {
  getProfactoWhatsAppHref,
  trackProfactoWhatsAppClick,
} from '../utils/whatsapp';

interface WhatsAppButtonProps {
  context: ConversionContext;
  lang: Language;
  label: string;
  variant?: 'primary' | 'dark' | 'outline' | 'compact';
  className?: string;
}

export function WhatsAppButton({
  context,
  lang,
  label,
  variant = 'primary',
  className = '',
}: WhatsAppButtonProps) {
  const href = getProfactoWhatsAppHref(context, lang);

  const variantClasses: Record<NonNullable<WhatsAppButtonProps['variant']>, string> = {
    primary:
      'bg-[#BF2531] text-white hover:bg-[#A11D27] px-6 py-3.5 text-sm font-semibold min-h-[44px]',
    dark:
      'bg-[#0F0E0E] text-white hover:bg-[#242222] px-6 py-3.5 text-sm font-semibold min-h-[44px]',
    outline:
      'border border-[#0F0E0E]/20 bg-white text-[#0F0E0E] hover:border-[#BF2531] hover:text-[#BF2531] px-6 py-3.5 text-sm font-semibold min-h-[44px]',
    compact:
      'bg-[#BF2531] text-white hover:bg-[#A11D27] px-4 py-2 text-xs font-semibold min-h-[40px]',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackProfactoWhatsAppClick(context)}
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BF2531] ${variantClasses[variant]} ${className}`}
    >
      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}
