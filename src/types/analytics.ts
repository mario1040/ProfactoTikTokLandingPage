export type Language = 'ar' | 'en';

export type ConsentStatus = 'pending' | 'granted' | 'denied';

export type ConversionContext =
  | 'hero'
  | 'navbar'
  | 'kitchens'
  | 'dressing-rooms'
  | 'process'
  | 'tiktok-showcase'
  | 'contact'
  | 'floating-bar'
  | 'default';

export type TikTokStandardEvent = 'PageView' | 'ViewContent' | 'Contact' | 'Lead' | 'Schedule';

export interface AttributionSnapshot {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  ttclid: string | null;
  landing_url: string;
  landing_path: string;
  referrer: string;
  timestamp: string;
}

export interface StoredAttribution {
  firstTouch: AttributionSnapshot;
  latestTouch: AttributionSnapshot;
}

export interface InternalAnalyticsRecord {
  id: string;
  eventName: string;
  eventId: string;
  channel: 'tiktok_pixel' | 'internal';
  context?: string;
  timestamp: string;
  consentStatus: ConsentStatus;
  deliveredToPixel: boolean;
  attribution: AttributionSnapshot | null;
  metadata?: Record<string, string | number | boolean | undefined>;
}

export interface TikTokEventPayload {
  content_type?: string;
  content_name?: string;
  content_category?: string;
  description?: string;
  query?: string;
  [key: string]: string | number | boolean | undefined;
}
