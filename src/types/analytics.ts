export type Language = 'ar' | 'en';

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

export interface TikTokContentItem {
  content_id: string;
  content_type?: 'product' | 'product_group' | 'destination' | 'hotel' | 'flight' | 'vehicle';
  content_name?: string;
  content_category?: string;
}

export interface InternalAnalyticsRecord {
  id: string;
  eventName: string;
  eventId: string;
  channel: 'tiktok_pixel' | 'internal';
  context?: string;
  timestamp: string;
  deliveredToPixel: boolean;
  attribution: AttributionSnapshot | null;
  metadata?: Record<string, string | number | boolean | TikTokContentItem[] | undefined>;
}

export interface TikTokEventPayload {
  content_id?: string;
  content_type?: 'product' | 'product_group' | 'destination' | 'hotel' | 'flight' | 'vehicle';
  content_name?: string;
  content_category?: string;
  contents?: TikTokContentItem[];
  description?: string;
  query?: string;
  [key: string]: string | number | boolean | TikTokContentItem[] | undefined;
}
