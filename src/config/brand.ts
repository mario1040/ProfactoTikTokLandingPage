import type { Language } from '../types/analytics';

const envPixelId =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_PROFACTO_TIKTOK_PIXEL_ID
    ? String(import.meta.env.VITE_PROFACTO_TIKTOK_PIXEL_ID).trim()
    : '';

const envWhatsappNumber =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_PROFACTO_WHATSAPP_NUMBER
    ? String(import.meta.env.VITE_PROFACTO_WHATSAPP_NUMBER).trim()
    : '';

export const PROFACTO_BRAND = {
  name: 'Profacto',
  nameAr: 'بروفاكتو',
  handle: '@profactoo1',
  tiktokUrl: 'https://www.tiktok.com/@profactoo1',
  logoAssetPath: '/assets/profacto-avatar.jpg',
  verifiedBioEn: 'Profacto specializes in high-end, custom kitchens and dressing rooms.',
  verifiedBioAr: 'تتخصص Profacto في تصميم وتنفيذ المطابخ الفاخرة وغرف الملابس المخصصة.',
  verifiedTikTokStats: {
    videos: 41,
    likes: 110,
    followers: 21,
  },
  contact: {
    phoneInternational: '+201106365101',
    phoneDisplay: '+20 11 06365101',
    telHref: 'tel:+201106365101',
    whatsappNumber: envWhatsappNumber || '201106365101',
    whatsappBaseUrl: 'https://wa.me/201106365101',
  },
  tracking: {
    tiktokPixelId: envPixelId || 'DBUOAARC77UCDH70RRQ0',
    customEventsEnabled: {
      // Enable firing custom TikTok event only after configuring 'TikTokProfileClick' in Events Manager.
      // Internal analytics always logs TikTok profile clicks regardless of this flag.
      TikTokProfileClick: false,
    },
    eventsApi: {
      // Server-side Events API 2.0 is prepared structurally in src/utils/eventsApiBlueprint.ts
      // and remains inactive until a backend route and server-side TIKTOK_ACCESS_TOKEN are provisioned.
      enabled: false,
      endpoint: 'https://business-api.tiktok.com/open_api/v1.3/event/track/',
    },
  },
  colors: {
    primaryRed: '#BF2531',
    primaryRedHover: '#A11D27',
    primaryBlack: '#0F0E0E',
    surfaceDark: '#171616',
    white: '#FFFFFF',
    canvasLight: '#F8F7F6',
    borderLight: '#E5E2DF',
    mutedText: '#5C5856',
  },
  typography: {
    english: "'Arial Rounded MT Bold', 'Arial Rounded MT', 'Varela Round', sans-serif",
    arabic: "'Noto Kufi Arabic', 'Arial Rounded MT', sans-serif",
  },
  language: {
    default: 'ar' as Language,
    supported: ['ar', 'en'] as readonly Language[],
  },
} as const;

export function buildOfficialWhatsAppUrl(message: string): string {
  const cleanNumber = PROFACTO_BRAND.contact.whatsappNumber.replace(/\D/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}
