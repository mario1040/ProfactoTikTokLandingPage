import { Phone, ExternalLink } from 'lucide-react';
import { PROFACTO_BRAND } from '../config/brand';
import { SITE_COPY } from '../config/site';
import type { Language } from '../types/analytics';
import { trackContact, trackTikTokProfileClick } from '../utils/tiktokPixel';
import { ProfactoLogo } from './common/ProfactoLogo';
import { WhatsAppButton } from './WhatsAppButton';

interface FooterProps {
  lang: Language;
  onToggleLang: (next: Language) => void;
}

export function Footer({ lang, onToggleLang }: FooterProps) {
  return (
    <footer className="bg-[#0F0E0E] text-white border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Summary */}
          <div className="md:col-span-5 space-y-4">
            <ProfactoLogo showWordmark tone="dark" size="md" />
            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              {SITE_COPY.footer.tagline[lang]}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <WhatsAppButton
                context="contact"
                lang={lang}
                label={SITE_COPY.contactSection.whatsappCta[lang]}
                variant="compact"
              />
              <a
                href={PROFACTO_BRAND.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackTikTokProfileClick('footer')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/20 text-xs font-medium text-white hover:border-[#BF2531] hover:text-white transition-colors whitespace-nowrap min-h-[40px]"
              >
                <span dir="ltr" className="font-en-brand">{PROFACTO_BRAND.handle}</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold text-white/50">
              {lang === 'ar' ? 'روابط الموقع' : 'Navigation'}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {SITE_COPY.nav.services[lang]}
                </a>
              </li>
              <li>
                <a href="#why-profacto" className="hover:text-white transition-colors">
                  {SITE_COPY.nav.process[lang]}
                </a>
              </li>
              <li>
                <a href="#tiktok-showcase" className="hover:text-white transition-colors">
                  {SITE_COPY.nav.tiktok[lang]}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {SITE_COPY.nav.faq[lang]}
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Language Switch */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold text-white/50">
              {lang === 'ar' ? 'التواصل المباشر' : 'Direct Contact'}
            </h3>
            <div className="space-y-2.5 text-sm">
              <a
                href={PROFACTO_BRAND.contact.telHref}
                onClick={() => trackContact('phone', 'footer')}
                className="inline-flex items-center gap-2 text-white hover:text-[#BF2531] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#BF2531]" aria-hidden="true" />
                <span dir="ltr" className="font-en-brand tabular-nums">
                  {PROFACTO_BRAND.contact.phoneDisplay}
                </span>
              </a>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleLang(lang === 'ar' ? 'en' : 'ar')}
                  className="px-3 py-1.5 text-xs font-medium rounded-md border border-white/20 text-white/90 hover:border-white transition-colors"
                >
                  {lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/55">
          <p>{SITE_COPY.footer.copyright[lang]}</p>
          <span dir="ltr" className="font-en-brand text-white/60">
            {PROFACTO_BRAND.handle}
          </span>
        </div>
      </div>
    </footer>
  );
}
