import { X } from 'lucide-react';
import { PROFACTO_BRAND } from '../config/brand';
import type { ConsentStatus, Language } from '../types/analytics';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  consentStatus: ConsentStatus;
  onGrantConsent: () => void;
  onDenyConsent: () => void;
}

export function PrivacyModal({
  isOpen,
  onClose,
  lang,
  consentStatus,
  onGrantConsent,
  onDenyConsent,
}: PrivacyModalProps) {
  if (!isOpen) return null;

  const isAr = lang === 'ar';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profacto-privacy-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
    >
      <div className="w-full max-w-xl bg-white text-[#0F0E0E] rounded-xl border border-[#E5E2DE] p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-5">
        <div className="flex items-start justify-between gap-4 border-b border-[#E5E2DE] pb-4">
          <div>
            <h2
              id="profacto-privacy-title"
              className="text-lg font-bold text-[#0F0E0E]"
            >
              {isAr ? 'الخصوصية وتفضيلات التتبع' : 'Privacy Notice & Tracking Preferences'}
            </h2>
            <p className="text-xs text-[#5C5856] mt-1">
              {isAr
                ? 'شفافية كاملة حول قياس حملات تيك توك وروابط التواصل'
                : 'Transparent disclosure on TikTok campaign attribution and contact links'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isAr ? 'إغلاق نافذة الخصوصية' : 'Close privacy dialog'}
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[#E5E2DE] text-[#0F0E0E] hover:border-[#BF2531] transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-[#3D3A38]">
          <div>
            <h3 className="font-semibold text-[#0F0E0E] mb-1">
              {isAr ? '1. بيانات الإحالة والتتبع الإعلاني' : '1. Campaign Attribution & TikTok Pixel'}
            </h3>
            <p>
              {isAr
                ? `يستخدم هذا الموقع تقنية TikTok Pixel (المعرّف: ${PROFACTO_BRAND.tracking.tiktokPixelId}) لقياس زيارات الصفحات وتفاعلات طلب الاستشارة عبر واتساب أو الهاتف تلقائياً، ويمكنك إيقاف التتبع الإعلاني من هنا في أي وقت.`
                : `This site uses the official TikTok Pixel (${PROFACTO_BRAND.tracking.tiktokPixelId}) to measure page visits and direct WhatsApp or phone consultation clicks, and you can opt out below at any time.`}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#0F0E0E] mb-1">
              {isAr ? '2. حفظ معايير الحملة في الجلسة' : '2. Session Attribution Preservation'}
            </h3>
            <p>
              {isAr
                ? 'عند دخولك من رابط حملة يحتوي على معاملات UTM أو ttclid، يتم حفظها مؤقتاً في Session Storage طوال الجلسة فقط دون جمع بيانات شخصية حساسة أو أرقام هواتف خاصة بالزائر.'
                : 'When you arrive from a campaign URL containing UTM parameters or ttclid, those campaign identifiers are retained strictly in sessionStorage for the current session without collecting personal visitor identity data.'}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#0F0E0E] mb-1">
              {isAr ? '3. حالة الموافقة الحالية' : '3. Current Consent Preference'}
            </h3>
            <p className="text-xs font-medium text-[#0F0E0E]">
              {consentStatus === 'granted'
                ? isAr
                  ? 'الحالة: تم تفعيل القياس الإعلاني (TikTok Pixel نشط).'
                  : 'Status: Advertising tracking enabled (TikTok Pixel active).'
                : consentStatus === 'denied'
                  ? isAr
                    ? 'الحالة: ملفات التتبع الأساسية فقط (تم إيقاف TikTok Pixel).'
                    : 'Status: Essential session only (TikTok Pixel disabled).'
                  : isAr
                    ? 'الحالة: بانتظار اختيارك (لم يتم تحميل ملفات التتبع الإعلانية بعد).'
                    : 'Status: Pending selection (non-essential advertising scripts not loaded).'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#E5E2DE]">
          <button
            type="button"
            onClick={() => {
              onDenyConsent();
              onClose();
            }}
            className="px-4 py-2.5 text-xs font-semibold rounded-lg border border-[#E5E2DE] text-[#0F0E0E] hover:bg-[#F7F6F4] transition-colors whitespace-nowrap"
          >
            {isAr ? 'الضروري فقط' : 'Essential Only'}
          </button>
          <button
            type="button"
            onClick={() => {
              onGrantConsent();
              onClose();
            }}
            className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-[#BF2531] text-white hover:bg-[#A11D27] transition-colors whitespace-nowrap"
          >
            {isAr ? 'قبول التتبع الإعلاني' : 'Accept Tracking'}
          </button>
        </div>
      </div>
    </div>
  );
}
