import { useEffect, useState } from 'react';
import { PROFACTO_BRAND } from './config/brand';
import type { Language } from './types/analytics';
import { captureAttribution } from './utils/attribution';
import { initTikTokPixel } from './utils/tiktokPixel';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection';
import { WhyProfactoSection } from './sections/WhyProfactoSection';
import { TikTokShowcaseSection } from './sections/TikTokShowcaseSection';
import { FAQSection } from './sections/FAQSection';
import { ContactSection } from './sections/ContactSection';

export default function App() {
  const [lang, setLang] = useState<Language>(PROFACTO_BRAND.language.default);

  // Sync HTML lang and dir attributes for Arabic RTL / English LTR
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Capture campaign attribution (UTMs + ttclid) and initialize TikTok Pixel immediately on open
  useEffect(() => {
    captureAttribution();
    initTikTokPixel();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F0E0E]">
      <Navbar lang={lang} />

      <main className="flex-1">
        <HeroSection lang={lang} onToggleLang={setLang} />
        <ServicesSection lang={lang} />
        <WhyProfactoSection lang={lang} />
        <TikTokShowcaseSection lang={lang} />
        <FAQSection lang={lang} />
        <ContactSection lang={lang} />
      </main>

      <Footer lang={lang} onToggleLang={setLang} />
    </div>
  );
}
