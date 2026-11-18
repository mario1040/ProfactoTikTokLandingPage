import { PROFACTO_BRAND } from '../config/brand';
import type { AttributionSnapshot, TikTokStandardEvent } from '../types/analytics';

/**
 * Server-Side TikTok Events API 2.0 Readiness Blueprint
 *
 * IMPORTANT:
 * - This module must ONLY be invoked in a trusted server-side runtime (Node.js / Express)
 *   where `process.env.TIKTOK_ACCESS_TOKEN` is stored as a private server secret.
 * - NEVER expose `TIKTOK_ACCESS_TOKEN` via `VITE_*` variables or frontend code.
 * - While this project runs as a static Vite SPA without an active backend or token,
 *   server-side transmission remains intentionally INACTIVE (`canSendServerEventsApi` returns false).
 */

export interface EventsApi2Payload {
  event_source: 'web';
  event_source_id: string;
  test_event_code?: string;
  data: Array<{
    event: TikTokStandardEvent;
    event_time: number;
    event_id: string;
    user: {
      ttclid?: string;
      external_id?: string;
      ip?: string;
      user_agent?: string;
    };
    page: {
      url: string;
      referrer?: string;
    };
    properties?: {
      content_id?: string;
      content_type?: 'product' | 'product_group' | 'destination' | 'hotel' | 'flight' | 'vehicle';
      content_name?: string;
      content_category?: string;
    };
  }>;
}

export function canSendServerEventsApi(serverToken?: string): boolean {
  return Boolean(
    PROFACTO_BRAND.tracking.eventsApi.enabled &&
      serverToken &&
      serverToken.trim().length > 0 &&
      !serverToken.includes('SERVER_SIDE_SECRET'),
  );
}

export function buildEventsApi2Payload(params: {
  event: TikTokStandardEvent;
  eventId: string;
  eventTimeUnixSeconds?: number;
  pageUrl: string;
  referrer?: string;
  attribution?: AttributionSnapshot | null;
  clientIp?: string;
  userAgent?: string;
  contentId?: string;
  contentName?: string;
  contentCategory?: string;
  testEventCode?: string;
}): EventsApi2Payload {
  const eventTime = params.eventTimeUnixSeconds ?? Math.floor(Date.now() / 1000);

  const userContext: EventsApi2Payload['data'][number]['user'] = {};
  if (params.attribution?.ttclid) {
    userContext.ttclid = params.attribution.ttclid;
  }
  if (params.clientIp) {
    userContext.ip = params.clientIp;
  }
  if (params.userAgent) {
    userContext.user_agent = params.userAgent;
  }
  // Never assign Profacto's business WhatsApp number (+201106365101) to user identity fields.

  const payload: EventsApi2Payload = {
    event_source: 'web',
    event_source_id: PROFACTO_BRAND.tracking.tiktokPixelId,
    data: [
      {
        event: params.event,
        event_time: eventTime,
        event_id: params.eventId,
        user: userContext,
        page: {
          url: params.pageUrl,
          ...(params.referrer ? { referrer: params.referrer } : {}),
        },
        properties: {
          ...(params.contentId ? { content_id: params.contentId, content_type: 'product_group' } : {}),
          ...(params.contentName ? { content_name: params.contentName } : {}),
          ...(params.contentCategory ? { content_category: params.contentCategory } : {}),
        },
      },
    ],
  };

  if (params.testEventCode) {
    payload.test_event_code = params.testEventCode;
  }

  return payload;
}
