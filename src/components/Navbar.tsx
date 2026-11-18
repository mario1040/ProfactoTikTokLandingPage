import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE_COPY } from '../config/site';
import type { Language } from '../types/analytics';
import { ProfactoLogo } from './common/ProfactoLogo';
import { WhatsAppButton } from './WhatsAppButton';

interface NavbarProps {
  lang: Language;
}

export function Navbar({ lang }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '#services', label: SITE_COPY.nav.services[lang] },
    { href: '#why-profacto', label: SITE_COPY.nav.process[lang] },
    { href: '#tiktok-showcase', label: SITE_COPY.nav.tiktok[lang] },
    { href: '#faq', label: SITE_COPY.nav.faq[lang] },
    { href: '#contact', label: SITE_COPY.nav.contact[lang] },
  ];

  return (
    <header className="md:sticky md:top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E5E2DE]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Mark (single clean lockup) */}
        <a
          href="#top"
          aria-label="Profacto Home"
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BF2531] rounded-md"
        >
          <ProfactoLogo showWordmark tone="light" size="sm" />
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#3D3A38]"
        >
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#BF2531] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BF2531]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Drawer Button */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block">
            <WhatsAppButton
              context="navbar"
              lang={lang}
              label={SITE_COPY.nav.cta[lang]}
              variant="compact"
            />
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="profacto-mobile-menu"
            aria-label={
              mobileOpen
                ? lang === 'ar'
                  ? 'إغلاق القائمة'
                  : 'Close navigation menu'
                : lang === 'ar'
                  ? 'فتح القائمة'
                  : 'Open navigation menu'
            }
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E5E2DE] text-[#0F0E0E] hover:border-[#BF2531] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="profacto-mobile-menu"
          className="md:hidden border-t border-[#E5E2DE] bg-white px-4 py-4 space-y-2"
        >
          <nav
            aria-label={lang === 'ar' ? 'القائمة السريعة' : 'Mobile navigation'}
            className="flex flex-col space-y-1"
          >
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#0F0E0E] hover:bg-[#F7F6F4] hover:text-[#BF2531] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-[#E5E2DE]">
            <WhatsAppButton
              context="navbar"
              lang={lang}
              label={SITE_COPY.hero.primaryCta[lang]}
              variant="primary"
              className="w-full"
            />
          </div>
        </div>
      )}
    </header>
  );
}
