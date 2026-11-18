import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SITE_COPY } from '../config/site';
import type { Language } from '../types/analytics';
import { BidiText } from '../components/common/BidiText';

interface FAQSectionProps {
  lang: Language;
}

export function FAQSection({ lang }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(SITE_COPY.faq.items[0].id);

  return (
    <section id="faq" className="bg-[#F7F6F4] py-14 sm:py-20 border-b border-[#E5E2DE]">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-2">
          <p className="text-xs sm:text-sm font-semibold text-[#BF2531]">
            {SITE_COPY.faq.eyebrow[lang]}
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0F0E0E] text-balance">
            {SITE_COPY.faq.title[lang]}
          </h2>
        </div>

        <div className="divide-y divide-[#E5E2DE] border-y border-[#E5E2DE] bg-white rounded-xl overflow-hidden">
          {SITE_COPY.faq.items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-start hover:bg-[#FAF9F8] transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-[#0F0E0E]">
                    {item.question[lang]}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#BF2531] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div
                    id={`faq-panel-${item.id}`}
                    className="px-5 sm:px-6 pb-5 text-sm text-[#4A4644] leading-relaxed"
                  >
                    <BidiText text={item.answer[lang]} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
