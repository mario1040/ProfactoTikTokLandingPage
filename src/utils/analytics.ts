import type { ConsentStatus, InternalAnalyticsRecord } from '../types/analytics';
import { getStoredAttribution } from './attribution';

const INTERNAL_EVENTS_CAP = 50;
const sessionEventLog: InternalAnalyticsRecord[] = [];

export function generateEventId(prefix = 'pf'): string {
  const cleanPrefix = prefix.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase() || 'pf';
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${cleanPrefix}_${crypto.randomUUID()}`;
  }
  const rand = Math.random().toString(36).slice(2, 10);
  const ts = Date.now().toString(36);
  return `${cleanPrefix}_${ts}_${rand}`;
}

export function recordInternalEvent(params: {
  eventName: string;
  eventId: string;
  channel: 'tiktok_pixel' | 'internal';
  context?: string;
  consentStatus: ConsentStatus;
  deliveredToPixel: boolean;
  metadata?: Record<string, string | number | boolean | undefined>;
}): InternalAnalyticsRecord {
  const attribution = getStoredAttribution();
  const record: InternalAnalyticsRecord = {
    id: generateEventId('log'),
    eventName: params.eventName,
    eventId: params.eventId,
    channel: params.channel,
    context: params.context,
    timestamp: new Date().toISOString(),
    consentStatus: params.consentStatus,
    deliveredToPixel: params.deliveredToPixel,
    attribution: attribution ? attribution.latestTouch : null,
    metadata: params.metadata,
  };

  sessionEventLog.push(record);
  if (sessionEventLog.length > INTERNAL_EVENTS_CAP) {
    sessionEventLog.shift();
  }

  return record;
}

export function getSessionAnalyticsHistory(): readonly InternalAnalyticsRecord[] {
  return [...sessionEventLog];
}

export function clearSessionAnalyticsHistory(): void {
  sessionEventLog.length = 0;
}
