import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { SITE_COPY } from '../config/site';
import type { Language } from '../types/analytics';
import { trackViewContent } from '../utils/tiktokPixel';
import { ArchitecturalImage } from '../components/common/ArchitecturalImage';
import { BidiText } from '../components/common/BidiText';
import { WhatsAppButton } from '../components/WhatsAppButton';

interface ServicesSectionProps {
  lang: Language;
}

type FilterKey = 'all' | 'kitchens' | 'dressing-rooms';

export function ServicesSection({ lang }: ServicesSectionProps) {
  const isAr = lang === 'ar';
  const sectionRef = useRef<HTMLElement | null>(null);
  const [filter, setFilter] = useState<FilterKey>('all');

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            trackViewContent({
              contentId: 'profacto_custom_kitchens_dressing_rooms',
              contentKey: 'profacto_specialties_section',
              contentName: 'Profacto Custom Kitchens & Dressing Rooms',
              contentCategory: 'specialties',
              description: 'Main services section viewed with meaningful visibility',
            });
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: [0.25, 0.5] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const visibleItems =
    filter === 'all'
      ? SITE_COPY.specialtiesSection.items
      : SITE_COPY.specialtiesSection.items.filter((item) => item.id === filter);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-[#F7F6F4] py-14 sm:py-20 border-b border-[#E5E2DE]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header + Interactive Category Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#BF2531]">
              {SITE_COPY.specialtiesSection.eyebrow[lang]}
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0F0E0E] leading-tight text-balance">
              {SITE_COPY.specialtiesSection.title[lang]}
            </h2>
            <p className="text-sm sm:text-base text-[#4A4644] leading-relaxed">
              {SITE_COPY.specialtiesSection.subtitle[lang]}
            </p>
          </div>

          <div
            role="tablist"
            aria-label={isAr ? 'تصفية التخصصات' : 'Filter specialties'}
            className="inline-flex items-center gap-1 p-1 bg-white border border-[#E5E2DE] rounded-lg self-start"
          >
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-[#0F0E0E] text-white'
                  : 'text-[#5C5856] hover:text-[#0F0E0E]'
              }`}
            >
              {isAr ? 'جميع التخصصات' : 'All Specialties'}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'kitchens'}
              onClick={() => setFilter('kitchens')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                filter === 'kitchens'
                  ? 'bg-[#BF2531] text-white'
                  : 'text-[#5C5856] hover:text-[#0F0E0E]'
              }`}
            >
              {isAr ? 'المطابخ' : 'Kitchens'}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'dressing-rooms'}
              onClick={() => setFilter('dressing-rooms')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                filter === 'dressing-rooms'
                  ? 'bg-[#BF2531] text-white'
                  : 'text-[#5C5856] hover:text-[#0F0E0E]'
              }`}
            >
              {isAr ? 'غرف الملابس' : 'Dressing Rooms'}
            </button>
          </div>
        </div>

        {/* Specialty Showcases */}
        <div className="space-y-8">
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-[#E5E2DE] rounded-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Media Pair */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 bg-[#171616]">
                  <div className="sm:col-span-8 aspect-[4/3] sm:aspect-auto sm:min-h-[340px] overflow-hidden">
                    <ArchitecturalImage
                      src={item.image}
                      alt={item.title[lang]}
                      className="w-full h-full object-cover"
                      fallbackLabel={item.title[lang]}
                    />
                  </div>
                  <div className="sm:col-span-4 aspect-[4/3] sm:aspect-auto sm:min-h-[340px] border-t sm:border-t-0 sm:border-s border-white/10 overflow-hidden">
                    <ArchitecturalImage
                      src={item.secondaryImage}
                      alt={`${item.title[lang]} — ${item.subtitle[lang]}`}
                      className="w-full h-full object-cover"
                      fallbackLabel={item.title[lang]}
                    />
                  </div>
                </div>

                {/* Editorial Content Column */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#BF2531] tabular-nums">
                      <span>{item.index}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#5C5856] font-medium">
                        {item.id === 'kitchens'
                          ? isAr
                            ? 'تخصص المطابخ'
                            : 'Kitchen Architecture'
                          : isAr
                            ? 'تخصص غرف الملابس'
                            : 'Wardrobe Systems'}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F0E0E]">
                      {item.title[lang]}
                    </h3>

                    <p className="text-sm text-[#4A4644] leading-relaxed">
                      {item.description[lang]}
                    </p>

                    <ul className="space-y-2.5 pt-2 border-t border-[#E5E2DE]">
                      {item.highlights[lang].map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0F0E0E]"
                        >
                          <Check
                            className="w-4 h-4 text-[#BF2531] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <WhatsAppButton
                      context={item.id}
                      lang={lang}
                      label={item.ctaLabel[lang]}
                      variant="primary"
                      className="w-full sm:w-auto"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="text-xs text-[#5C5856]">
          <BidiText text={SITE_COPY.specialtiesSection.visualNote[lang]} />
        </p>
      </div>
    </section>
  );
}
