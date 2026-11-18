import type { ConsentStatus, Language } from '../types/analytics';

interface CookieConsentProps {
  lang: Language;
  consentStatus: ConsentStatus;
  onAccept: () => void;
  onReject: () => void;
  onOpenDetails: () => void;
}

export function CookieConsent({
  lang,
  consentStatus,
  onAccept,
  onReject,
  onOpenDetails,
}: CookieConsentProps) {
  if (consentStatus !== 'pending') return null;

  const isAr = lang === 'ar';

  return (
    <aside
      aria-label={isAr ? 'إشعار الخصوصية والكوكيز' : 'Cookie and tracking consent'}
      className="fixed bottom-0 inset-x-0 z-40 bg-[#0F0E0E] text-white border-t border-white/15 px-4 py-3"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs leading-relaxed text-white/85">
          {isAr
            ? 'نستخدم ملفات قياس إعلانية (TikTok Pixel) لتحسين دقة حملاتنا عند موافقتك. '
            : 'We use TikTok Pixel analytics to measure campaign effectiveness with your consent. '}
          <button
            type="button"
            onClick={onOpenDetails}
            className="underline text-white hover:text-[#BF2531] transition-colors font-medium"
          >
            {isAr ? 'التفاصيل' : 'Privacy details'}
          </button>
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onReject}
            className="px-3.5 py-2 text-xs font-medium rounded-lg border border-white/25 text-white hover:bg-white/10 transition-colors whitespace-nowrap min-h-[38px]"
          >
            {isAr ? 'الضروري فقط' : 'Essential Only'}
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#BF2531] text-white hover:bg-[#A11D27] transition-colors whitespace-nowrap min-h-[38px]"
          >
            {isAr ? 'موافقة' : 'Accept'}
          </button>
        </div>
      </div>
    </aside>
  );
}
