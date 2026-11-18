import { ExternalLink, Play } from 'lucide-react';
import { PROFACTO_BRAND } from '../config/brand';
import { SITE_ASSETS, SITE_COPY } from '../config/site';
import type { Language } from '../types/analytics';
import { trackTikTokProfileClick } from '../utils/tiktokPixel';
import { ArchitecturalImage } from '../components/common/ArchitecturalImage';
import { ProfactoLogo } from '../components/common/ProfactoLogo';

interface TikTokShowcaseSectionProps {
  lang: Language;
}

export function TikTokShowcaseSection({ lang }: TikTokShowcaseSectionProps) {
  const isAr = lang === 'ar';

  const showcaseHighlights = [
    {
      id: 'reel-kitchens',
      image: SITE_ASSETS.kitchenDetail,
      title: isAr ? 'تفاصيل تنفيذ المطابخ' : 'Custom Kitchen Joinery Details',
      subtitle: isAr ? 'شاهد المقاطع على @profactoo1' : 'Watch reels on @profactoo1',
    },
    {
      id: 'reel-dressing',
      image: SITE_ASSETS.wardrobeShowcase,
      title: isAr ? 'تصاميم غرف الملابس' : 'Walk-In Dressing Room Layouts',
      subtitle: isAr ? 'شاهد المقاطع على @profactoo1' : 'Watch reels on @profactoo1',
    },
    {
      id: 'reel-lighting',
      image: SITE_ASSETS.dressingRoomMain,
      title: isAr ? 'الإضاءة والتقسيم الداخلي' : 'Integrated Wardrobe Lighting',
      subtitle: isAr ? 'شاهد المقاطع على @profactoo1' : 'Watch reels on @profactoo1',
    },
  ];

  return (
    <section
      id="tiktok-showcase"
      className="bg-white py-14 sm:py-20 border-b border-[#E5E2DE]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs sm:text-sm font-semibold text-[#BF2531]">
              {SITE_COPY.tiktokShowcase.eyebrow[lang]}
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0F0E0E] leading-tight text-balance">
              {SITE_COPY.tiktokShowcase.title[lang]}
            </h2>
            <p className="text-sm sm:text-base text-[#4A4644] leading-relaxed">
              {SITE_COPY.tiktokShowcase.description[lang]}
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#F7F6F4] border border-[#E5E2DE] rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <ProfactoLogo showWordmark tone="light" size="md" />
              <span dir="ltr" className="font-en-brand text-xs font-semibold text-[#5C5856]">
                {PROFACTO_BRAND.handle}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 py-4 border-y border-[#E5E2DE] text-center">
              <div>
                <span className="font-en-brand text-xl font-bold text-[#0F0E0E] tabular-nums block">
                  {PROFACTO_BRAND.verifiedTikTokStats.videos}
                </span>
                <span className="text-xs text-[#5C5856]">
                  {isAr ? 'فيديو منشور' : 'Videos'}
                </span>
              </div>
              <div>
                <span className="font-en-brand text-xl font-bold text-[#0F0E0E] tabular-nums block">
                  {PROFACTO_BRAND.verifiedTikTokStats.likes}
                </span>
                <span className="text-xs text-[#5C5856]">
                  {isAr ? 'إعجاب' : 'Likes'}
                </span>
              </div>
              <div>
                <span className="font-en-brand text-xl font-bold text-[#0F0E0E] tabular-nums block">
                  {PROFACTO_BRAND.verifiedTikTokStats.followers}
                </span>
                <span className="text-xs text-[#5C5856]">
                  {isAr ? 'متابع' : 'Followers'}
                </span>
              </div>
            </div>

            <a
              href={PROFACTO_BRAND.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackTikTokProfileClick('showcase_card')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#0F0E0E] text-white text-sm font-semibold hover:bg-[#BF2531] transition-colors min-h-[44px]"
            >
              <span>{SITE_COPY.tiktokShowcase.ctaLabel[lang]}</span>
              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Visual Showcase Cards Linking Directly to Official TikTok */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseHighlights.map((card) => (
            <a
              key={card.id}
              href={PROFACTO_BRAND.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackTikTokProfileClick(card.id)}
              className="group block rounded-xl overflow-hidden border border-[#E5E2DE] bg-[#171616] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BF2531]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ArchitecturalImage
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  fallbackLabel={card.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {card.title}
                      </h3>
                      <p className="text-xs text-white/80 mt-0.5">{card.subtitle}</p>
                    </div>
                    <span className="w-9 h-9 rounded-full bg-[#BF2531] text-white inline-flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="text-xs text-[#5C5856]">
          {SITE_COPY.tiktokShowcase.limitationNote[lang]}
        </p>
      </div>
    </section>
  );
}
