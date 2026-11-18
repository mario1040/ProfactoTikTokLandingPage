import { PROFACTO_BRAND } from '../config/brand';
import type {
  ConsentStatus,
  ConversionContext,
  TikTokEventPayload,
} from '../types/analytics';
import { generateEventId, recordInternalEvent } from './analytics';
import { getActiveAttributionContext } from './attribution';

const CONSENT_STORAGE_KEY = 'profacto_tracking_consent_v1';
const RAPID_CLICK_DEBOUNCE_MS = 800;

interface TTQInstance {
  load?: (pixelId: string, options?: Record<string, unknown>) => void;
  page?: (params?: Record<string, unknown>) => void;
  track?: (
    eventName: string,
    params?: TikTokEventPayload,
    options?: { event_id?: string },
  ) => void;
  _i?: Record<string, unknown>;
}

declare global {
  interface Window {
    ttq?: TTQInstance & ((...args: unknown[]) => void) & {
      methods?: string[];
      setAndDefer?: (t: unknown, e: string) => void;
      instance?: (t: string) => TTQInstance;
      _i?: Record<string, unknown[]>;
      _t?: Record<string, number>;
      _o?: Record<string, Record<string, unknown>>;
    };
    TiktokAnalyticsObject?: string;
    __PROFACTO_TTQ_INITIALIZED__?: boolean;
  }
}

let modulePixelInitialized = false;
let moduleScriptInjected = false;
const viewedContentKeys = new Set<string>();
const lastActionTimestamp = new Map<string, number>();

export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return 'granted';
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === 'denied') {
      return 'denied';
    }
  } catch {
    // Ignore storage read restrictions
  }
  return 'granted';
}

export function setConsentStatus(status: Exclude<ConsentStatus, 'pending'>): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
  } catch {
    // Ignore storage write restrictions
  }

  if (status === 'granted') {
    initTikTokPixel();
  }
}

export function isPixelInitialized(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(modulePixelInitialized || window.__PROFACTO_TTQ_INITIALIZED__);
}

function bootstrapTikTokStub(pixelId: string): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Prevent duplicate SDK injection or initialization across React StrictMode / re-renders
  if (window.__PROFACTO_TTQ_INITIALIZED__ || modulePixelInitialized) {
    return;
  }

  const w = window as unknown as Record<string, unknown>;
  const d = document;
  const t = 'ttq';

  w.TiktokAnalyticsObject = t;

  if (!w[t]) {
    const ttqObj = function (...args: unknown[]) {
      const target = ttqObj as unknown as {
        push: (item: unknown[]) => void;
        queue: unknown[][];
      };
      target.queue = target.queue || [];
      target.queue.push(args);
    } as unknown as Record<string, unknown> & {
      methods: string[];
      setAndDefer: (obj: Record<string, unknown>, method: string) => void;
      instance: (id: string) => Record<string, unknown>;
      load: (id: string, opts?: Record<string, unknown>) => void;
      page: () => void;
      _i: Record<string, unknown[]>;
      _t: Record<string, number>;
      _o: Record<string, Record<string, unknown>>;
      _u: string;
    };

    ttqObj.methods = [
      'page',
      'track',
      'identify',
      'instances',
      'debug',
      'on',
      'off',
      'once',
      'ready',
      'alias',
      'group',
      'enableCookie',
      'disableCookie',
      'holdConsent',
      'revokeConsent',
      'grantConsent',
    ];

    ttqObj.setAndDefer = function (obj: Record<string, unknown>, method: string) {
      obj[method] = function (...args: unknown[]) {
        const queue = (obj.queue as unknown[][]) || [];
        obj.queue = queue;
        queue.push([method, ...args]);
      };
    };

    for (let i = 0; i < ttqObj.methods.length; i++) {
      ttqObj.setAndDefer(ttqObj, ttqObj.methods[i]);
    }

    ttqObj.instance = function (id: string) {
      const existing = ttqObj._i[id] as unknown as Record<string, unknown> | undefined;
      if (existing) return existing;
      const inst: Record<string, unknown> = { queue: [] };
      for (let i = 0; i < ttqObj.methods.length; i++) {
        ttqObj.setAndDefer(inst, ttqObj.methods[i]);
      }
      return inst;
    };

    ttqObj.load = function (id: string, opts?: Record<string, unknown>) {
      const src = 'https://analytics.tiktok.com/i18n/pixel/events.js';
      ttqObj._i = ttqObj._i || {};
      ttqObj._i[id] = [];
      ttqObj._i[id] = Object.assign(ttqObj._i[id], { _u: src });
      ttqObj._t = ttqObj._t || {};
      ttqObj._t[id] = Number(new Date());
      ttqObj._o = ttqObj._o || {};
      ttqObj._o[id] = opts || {};

      if (!moduleScriptInjected) {
        const existingScript = d.querySelector(`script[src*="sdkid=${id}"]`);
        if (!existingScript) {
          const scriptEl = d.createElement('script');
          scriptEl.type = 'text/javascript';
          scriptEl.async = true;
          scriptEl.src = `${src}?sdkid=${encodeURIComponent(id)}&lib=${t}`;
          scriptEl.onerror = () => {
            // Tracking must fail silently without ever breaking site UX
          };
          const firstScript = d.getElementsByTagName('script')[0];
          if (firstScript && firstScript.parentNode) {
            firstScript.parentNode.insertBefore(scriptEl, firstScript);
          } else {
            d.head.appendChild(scriptEl);
          }
        }
        moduleScriptInjected = true;
      }
    };

    w[t] = ttqObj;
  }

  const ttq = window.ttq;
  if (ttq && typeof ttq.load === 'function') {
    ttq.load(pixelId);
    // Base code sends the single initial PageView once
    if (typeof ttq.page === 'function') {
      ttq.page();
    }
    modulePixelInitialized = true;
    window.__PROFACTO_TTQ_INITIALIZED__ = true;

    recordInternalEvent({
      eventName: 'PageView',
      eventId: generateEventId('pv'),
      channel: 'tiktok_pixel',
      context: 'initial_base_load',
      consentStatus: 'granted',
      deliveredToPixel: true,
      metadata: {
        pixelId,
      },
    });
  }
}

export function initTikTokPixel(): boolean {
  if (typeof window === 'undefined') return false;

  const pixelId = PROFACTO_BRAND.tracking.tiktokPixelId;
  if (!pixelId) {
    return false;
  }

  // Respect explicit privacy consent: never load non-essential advertising cookies unless granted
  if (getConsentStatus() !== 'granted') {
    return false;
  }

  if (isPixelInitialized()) {
    return true;
  }

  try {
    bootstrapTikTokStub(pixelId);
    return isPixelInitialized();
  } catch {
    return false;
  }
}

function safeTrackStandardEvent(
  eventName: 'ViewContent' | 'Contact',
  payload: TikTokEventPayload,
  eventId: string,
  context: string,
): boolean {
  const consentStatus = getConsentStatus();
  let delivered = false;

  if (consentStatus === 'granted') {
    if (!isPixelInitialized()) {
      initTikTokPixel();
    }

    try {
      if (typeof window !== 'undefined' && window.ttq && typeof window.ttq.track === 'function') {
        const attribution = getActiveAttributionContext();
        const sanitizedPayload: TikTokEventPayload = {
          ...payload,
          ...attribution,
        };
        window.ttq.track(eventName, sanitizedPayload, { event_id: eventId });
        delivered = true;
      }
    } catch {
      delivered = false;
    }
  }

  recordInternalEvent({
    eventName,
    eventId,
    channel: delivered ? 'tiktok_pixel' : 'internal',
    context,
    consentStatus,
    deliveredToPixel: delivered,
    metadata: payload,
  });

  return delivered;
}

export function shouldAllowActionDispatch(
  actionKey: string,
  nowMs = Date.now(),
  debounceMs = RAPID_CLICK_DEBOUNCE_MS,
): boolean {
  const prev = lastActionTimestamp.get(actionKey);
  if (prev !== undefined && nowMs - prev < debounceMs) {
    return false;
  }
  lastActionTimestamp.set(actionKey, nowMs);
  return true;
}

export function resetTrackingGuardsForTest(): void {
  viewedContentKeys.clear();
  lastActionTimestamp.clear();
}

export function trackViewContent(params: {
  contentKey: string;
  contentName: string;
  contentCategory: string;
  description?: string;
}): boolean {
  // Trigger only once per intended content impression
  if (viewedContentKeys.has(params.contentKey)) {
    return false;
  }
  viewedContentKeys.add(params.contentKey);

  const eventId = generateEventId('vc');
  safeTrackStandardEvent(
    'ViewContent',
    {
      content_name: params.contentName,
      content_category: params.contentCategory,
      description: params.description,
    },
    eventId,
    params.contentKey,
  );

  return true;
}

export function trackContact(
  channel: 'whatsapp' | 'phone' | 'email',
  context: ConversionContext | string = 'default',
): { eventId: string; delivered: boolean } {
  const dedupeKey = `contact:${channel}:${context}`;
  if (!shouldAllowActionDispatch(dedupeKey)) {
    return { eventId: '', delivered: false };
  }

  const eventId = generateEventId('contact');
  const delivered = safeTrackStandardEvent(
    'Contact',
    {
      content_name: `profacto_${channel}_contact`,
      content_category: context,
      contact_method: channel,
    },
    eventId,
    `${channel}:${context}`,
  );

  return { eventId, delivered };
}

export function trackTikTokProfileClick(sourceSection: string): {
  eventId: string;
  deliveredToPixel: boolean;
} {
  const dedupeKey = `tiktok_profile:${sourceSection}`;
  if (!shouldAllowActionDispatch(dedupeKey)) {
    return { eventId: '', deliveredToPixel: false };
  }

  const eventId = generateEventId('ttprofile');
  const consentStatus = getConsentStatus();
  let deliveredToPixel = false;

  // Fire custom TikTokProfileClick ONLY if explicitly enabled & configured in TikTok Events Manager
  if (
    PROFACTO_BRAND.tracking.customEventsEnabled.TikTokProfileClick &&
    consentStatus === 'granted' &&
    typeof window !== 'undefined' &&
    window.ttq &&
    typeof window.ttq.track === 'function'
  ) {
    try {
      window.ttq.track(
        'TikTokProfileClick',
        {
          content_name: 'profacto_tiktok_profile',
          content_category: sourceSection,
          ...getActiveAttributionContext(),
        },
        { event_id: eventId },
      );
      deliveredToPixel = true;
    } catch {
      deliveredToPixel = false;
    }
  }

  recordInternalEvent({
    eventName: 'TikTokProfileClick',
    eventId,
    channel: deliveredToPixel ? 'tiktok_pixel' : 'internal',
    context: sourceSection,
    consentStatus,
    deliveredToPixel,
    metadata: {
      profileHandle: PROFACTO_BRAND.handle,
    },
  });

  return { eventId, deliveredToPixel };
}

/**
 * Lead tracking is intentionally gated behind verified lead-creation confirmation.
 * WhatsApp clicks MUST NOT call trackLead; they represent Contact intent only.
 */
export function trackVerifiedLead(confirmedByServer: boolean, leadReferenceId?: string): boolean {
  if (!confirmedByServer || !leadReferenceId) {
    return false;
  }
  const consentStatus = getConsentStatus();
  if (consentStatus !== 'granted' || typeof window === 'undefined' || !window.ttq?.track) {
    return false;
  }
  const eventId = generateEventId('lead');
  window.ttq.track(
    'Lead',
    {
      content_name: 'verified_lead_submission',
      ...getActiveAttributionContext(),
    },
    { event_id: eventId },
  );
  recordInternalEvent({
    eventName: 'Lead',
    eventId,
    channel: 'tiktok_pixel',
    context: leadReferenceId,
    consentStatus,
    deliveredToPixel: true,
  });
  return true;
}

/**
 * Schedule tracking is intentionally gated behind confirmed appointment creation.
 */
export function trackConfirmedSchedule(confirmedBookingId?: string): boolean {
  if (!confirmedBookingId) {
    return false;
  }
  const consentStatus = getConsentStatus();
  if (consentStatus !== 'granted' || typeof window === 'undefined' || !window.ttq?.track) {
    return false;
  }
  const eventId = generateEventId('schedule');
  window.ttq.track(
    'Schedule',
    {
      content_name: 'confirmed_consultation_booking',
      ...getActiveAttributionContext(),
    },
    { event_id: eventId },
  );
  recordInternalEvent({
    eventName: 'Schedule',
    eventId,
    channel: 'tiktok_pixel',
    context: confirmedBookingId,
    consentStatus,
    deliveredToPixel: true,
  });
  return true;
}
