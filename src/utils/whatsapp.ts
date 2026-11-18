import { buildOfficialWhatsAppUrl } from '../config/brand';
import type { ConversionContext, Language } from '../types/analytics';
import { trackContact } from './tiktokPixel';

const DEFAULT_AR_MESSAGE =
  'مرحباً Profacto، وصلت إليكم من خلال الموقع وأرغب في معرفة المزيد عن خدماتكم.';

const CONTEXTUAL_AR_MESSAGES: Partial<Record<ConversionContext, string>> = {
  kitchens:
    'مرحباً Profacto، وصلت إليكم من خلال الموقع وأرغب في معرفة المزيد عن المطابخ المخصصة.',
  'dressing-rooms':
    'مرحباً Profacto، وصلت إليكم من خلال الموقع وأرغب في معرفة المزيد عن غرف الملابس المخصصة (Dressing Rooms).',
  hero: DEFAULT_AR_MESSAGE,
  contact: DEFAULT_AR_MESSAGE,
  process:
    'مرحباً Profacto، وصلت إليكم من خلال الموقع وأرغب في بدء استشارة أولية لمشروعي.',
  'tiktok-showcase':
    'مرحباً Profacto، وصلت إليكم من خلال الموقع بعد مشاهدة محتواكم على تيك توك وأرغب في معرفة المزيد عن خدماتكم.',
};

const CONTEXTUAL_EN_MESSAGES: Partial<Record<ConversionContext, string>> = {
  kitchens:
    'Hello Profacto, I visited your website and would like to inquire about your custom kitchens.',
  'dressing-rooms':
    'Hello Profacto, I visited your website and would like to inquire about your custom dressing rooms.',
  default:
    'Hello Profacto, I visited your website and would like to learn more about your services.',
};

export function buildProfactoWhatsAppMessage(
  context: ConversionContext = 'default',
  lang: Language = 'ar',
): string {
  if (lang === 'en') {
    return CONTEXTUAL_EN_MESSAGES[context] ?? CONTEXTUAL_EN_MESSAGES.default!;
  }
  return CONTEXTUAL_AR_MESSAGES[context] ?? DEFAULT_AR_MESSAGE;
}

export function getProfactoWhatsAppHref(
  context: ConversionContext = 'default',
  lang: Language = 'ar',
): string {
  const message = buildProfactoWhatsAppMessage(context, lang);
  return buildOfficialWhatsAppUrl(message);
}

/**
 * Centralized WhatsApp conversion helper:
 * 1. Builds the official https://wa.me/201106365101?text=... link
 * 2. Fires exactly ONE TikTok Contact event (never Lead or Schedule)
 * 3. Preserves the landing page and works safely on mobile and desktop
 */
export function trackProfactoWhatsAppClick(context: ConversionContext = 'default'): {
  eventId: string;
  delivered: boolean;
} {
  return trackContact('whatsapp', context);
}

export function openProfactoWhatsApp(
  context: ConversionContext = 'default',
  lang: Language = 'ar',
): string {
  const url = getProfactoWhatsAppHref(context, lang);
  trackProfactoWhatsAppClick(context);

  if (typeof document !== 'undefined') {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return url;
}
