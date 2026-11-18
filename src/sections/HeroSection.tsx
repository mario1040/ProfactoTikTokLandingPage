import { ArrowDownLeft, ArrowDownRight } from 'lucide-react';
import { SITE_ASSETS, SITE_COPY } from '../config/site';
import type { Language } from '../types/analytics';
import { ArchitecturalImage } from '../components/common/ArchitecturalImage';
import { WhatsAppButton } from '../components/WhatsAppButton';

interface HeroSectionProps {
  lang: Language;
  onToggleLang: (next: Language) => void;
}

export function HeroSection({ lang, onToggleLang }: HeroSectionProps) {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowDownLeft : ArrowDownRight;

  return (
    <section id="top" className="bg-white border-b border-[#E5E2DE]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Copy & Conversion Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Language Switcher & Unboxed Eyebrow */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs sm:text-sm font-medium text-[#BF2531]">
                  {SITE_COPY.hero.eyebrow[lang]}
                </p>
                <div
                  role="group"
                  aria-label={isAr ? 'اختيار اللغة' : 'Language selector'}
                  className="inline-flex items-center p-1 bg-[#F7F6F4] border border-[#E5E2DE] rounded-lg"
                >
                  <button
                    type="button"
                    onClick={() => onToggleLang('ar')}
                    aria-pressed={lang === 'ar'}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      lang === 'ar'
                        ? 'bg-[#0F0E0E] text-white'
                        : 'text-[#5C5856] hover:text-[#0F0E0E]'
                    }`}
                  >
                    العربية
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleLang('en')}
                    aria-pressed={lang === 'en'}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap font-en-brand ${
                      lang === 'en'
                        ? 'bg-[#0F0E0E] text-white'
                        : 'text-[#5C5856] hover:text-[#0F0E0E]'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              <h1 className="text-[clamp(2rem,3.8vw,3.25rem)] font-bold leading-[1.22] tracking-tight text-[#0F0E0E] text-balance">
                {SITE_COPY.hero.headline[lang]}
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-[#4A4644] max-w-xl">
                {SITE_COPY.hero.subheadline[lang]}
              </p>

              {/* Primary WhatsApp CTA + Secondary Exploration CTA */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <WhatsAppButton
                  context="hero"
                  lang={lang}
                  label={SITE_COPY.hero.primaryCta[lang]}
                  variant="primary"
                />
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border border-[#E5E2DE] bg-[#F7F6F4] text-sm font-semibold text-[#0F0E0E] hover:border-[#0F0E0E] transition-colors whitespace-nowrap min-h-[44px]"
                >
                  <span>{SITE_COPY.hero.secondaryCta[lang]}</span>
                  <ArrowIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Verified Unboxed Proof Strip */}
            <div className="pt-5 border-t border-[#E5E2DE] flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-[#5C5856]">
              {SITE_COPY.hero.proofItems[lang].map((item, idx) => {
                const ltrToken = item.includes('+20 11 06365101')
                  ? '+20 11 06365101'
                  : item.includes('@profactoo1')
                    ? '@profactoo1'
                    : null;
                const [beforeToken, afterToken] = ltrToken
                  ? item.split(ltrToken)
                  : [item, ''];

                return (
                  <span key={item} className="inline-flex items-center gap-2.5">
                    {idx > 0 && (
                      <span aria-hidden="true" className="text-[#BF2531] font-bold">
                        ·
                      </span>
                    )}
                    <span className="tabular-nums">
                      {ltrToken ? (
                        <>
                          {beforeToken}
                          <span dir="ltr" className="inline-block font-en-brand">
                            {ltrToken}
                          </span>
                          {afterToken}
                        </>
                      ) : (
                        item
                      )}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Architectural Hero Media Column */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 min-h-[280px] sm:min-h-[380px] lg:min-h-[460px] rounded-xl overflow-hidden bg-[#171616] border border-[#E5E2DE]">
              <ArchitecturalImage
                src={SITE_ASSETS.heroKitchen}
                alt={
                  isAr
                    ? 'تصميم مطبخ عصري مخصص من الخشب الداكن والحجر الفاخر'
                    : 'Bespoke modern custom kitchen with dark cabinetry and honed stone island'
                }
                priority
                className="w-full h-full object-cover"
                fallbackLabel="Profacto Custom Kitchens"
              />
            </div>
            <p className="mt-2.5 text-xs text-[#5C5856]">
              {SITE_COPY.hero.mediaCaption[lang]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
