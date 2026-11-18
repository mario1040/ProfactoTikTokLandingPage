import { SITE_COPY } from '../config/site';
import type { Language } from '../types/analytics';
import { WhatsAppButton } from '../components/WhatsAppButton';

interface WhyProfactoSectionProps {
  lang: Language;
}

export function WhyProfactoSection({ lang }: WhyProfactoSectionProps) {
  return (
    <section id="why-profacto" className="bg-[#0F0E0E] text-white py-14 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-14">
        {/* Why Profacto Pillars */}
        <div className="space-y-8">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#BF2531]">
              {SITE_COPY.whyProfacto.eyebrow[lang]}
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold leading-tight text-balance">
              {SITE_COPY.whyProfacto.title[lang]}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SITE_COPY.whyProfacto.pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="bg-[#171616] border border-white/10 rounded-xl p-6 space-y-3"
              >
                <span className="font-en-brand text-2xl font-bold text-[#BF2531] tabular-nums block">
                  {pillar.number}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {pillar.title[lang]}
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  {pillar.description[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Customer Journey */}
        <div className="pt-10 border-t border-white/15 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs sm:text-sm font-semibold text-[#BF2531]">
                {SITE_COPY.process.eyebrow[lang]}
              </p>
              <h2 className="text-xl sm:text-3xl font-bold leading-tight text-balance">
                {SITE_COPY.process.title[lang]}
              </h2>
            </div>
            <WhatsAppButton
              context="process"
              lang={lang}
              label={SITE_COPY.hero.primaryCta[lang]}
              variant="primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SITE_COPY.process.steps.map((step) => (
              <div
                key={step.number}
                className="border-t border-white/20 pt-5 space-y-2.5"
              >
                <span className="text-xs font-bold text-[#BF2531] tabular-nums block">
                  {lang === 'ar' ? `الخطوة ${step.number}` : `Step ${step.number}`}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {step.title[lang]}
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  {step.description[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
