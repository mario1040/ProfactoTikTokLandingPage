import { ExternalLink, Phone } from 'lucide-react';
import { PROFACTO_BRAND } from '../config/brand';
import { SITE_COPY } from '../config/site';
import type { Language } from '../types/analytics';
import { trackContact, trackTikTokProfileClick } from '../utils/tiktokPixel';
import { WhatsAppButton } from '../components/WhatsAppButton';

interface ContactSectionProps {
  lang: Language;
}

export function ContactSection({ lang }: ContactSectionProps) {
  return (
    <section id="contact" className="bg-white py-14 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden border border-[#E5E2DE]">
          {/* Crimson Brand Callout */}
          <div className="lg:col-span-7 bg-[#BF2531] text-white p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs sm:text-sm font-semibold text-white/85">
                {SITE_COPY.contactSection.eyebrow[lang]}
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold leading-tight text-balance">
                {SITE_COPY.contactSection.title[lang]}
              </h2>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl">
                {SITE_COPY.contactSection.description[lang]}
              </p>
            </div>

            <p className="text-xs text-white/80 pt-4 border-t border-white/20">
              {SITE_COPY.contactSection.attributionNote[lang]}
            </p>
          </div>

          {/* Direct Action Channels */}
          <div className="lg:col-span-5 bg-[#0F0E0E] text-white p-8 sm:p-12 flex flex-col justify-center space-y-4">
            <WhatsAppButton
              context="contact"
              lang={lang}
              label={SITE_COPY.contactSection.whatsappCta[lang]}
              variant="primary"
              className="w-full"
            />

            <a
              href={PROFACTO_BRAND.contact.telHref}
              onClick={() => trackContact('phone', 'contact_section')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#171616] border border-white/20 text-white text-sm font-semibold hover:border-white transition-colors min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-[#BF2531] shrink-0" aria-hidden="true" />
              <span dir="ltr" className="tabular-nums">
                {PROFACTO_BRAND.contact.phoneDisplay}
              </span>
            </a>

            <a
              href={PROFACTO_BRAND.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackTikTokProfileClick('contact_section')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-white/15 text-white/90 text-sm font-medium hover:bg-white/10 transition-colors min-h-[44px]"
            >
              <span>{SITE_COPY.contactSection.tiktokCta[lang]}</span>
              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
