import type { AttributionSnapshot, StoredAttribution } from '../types/analytics';

const SESSION_STORAGE_KEY = 'profacto_attribution_v1';

let inMemoryAttribution: StoredAttribution | null = null;

function cleanParam(value: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.slice(0, 256) : null;
}

export function parseAttributionFromUrl(
  href: string,
  referrer = '',
  timestamp = new Date().toISOString(),
): AttributionSnapshot {
  let parsed: URL;
  try {
    parsed = new URL(href, 'https://profacto.local');
  } catch {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
      ttclid: null,
      landing_url: href,
      landing_path: '/',
      referrer: referrer.slice(0, 512),
      timestamp,
    };
  }

  const params = parsed.searchParams;

  return {
    utm_source: cleanParam(params.get('utm_source')),
    utm_medium: cleanParam(params.get('utm_medium')),
    utm_campaign: cleanParam(params.get('utm_campaign')),
    utm_content: cleanParam(params.get('utm_content')),
    utm_term: cleanParam(params.get('utm_term')),
    ttclid: cleanParam(params.get('ttclid')),
    landing_url: parsed.href,
    landing_path: parsed.pathname || '/',
    referrer: referrer.slice(0, 512),
    timestamp,
  };
}

export function hasCampaignParameters(snapshot: AttributionSnapshot): boolean {
  return Boolean(
    snapshot.ttclid ||
      snapshot.utm_source ||
      snapshot.utm_medium ||
      snapshot.utm_campaign ||
      snapshot.utm_content ||
      snapshot.utm_term,
  );
}

export function mergeAttributionTouch(
  existing: StoredAttribution | null,
  incoming: AttributionSnapshot,
): StoredAttribution {
  if (!existing) {
    return {
      firstTouch: incoming,
      latestTouch: incoming,
    };
  }

  // Preserve original first-touch completely; preserve ttclid in latestTouch if not overwritten by a newer ttclid.
  const latestTouch: AttributionSnapshot = hasCampaignParameters(incoming)
    ? {
        ...incoming,
        ttclid: incoming.ttclid ?? existing.latestTouch.ttclid,
      }
    : {
        ...existing.latestTouch,
        landing_path: incoming.landing_path,
      };

  return {
    firstTouch: existing.firstTouch,
    latestTouch,
  };
}

function readStoredAttribution(): StoredAttribution | null {
  if (typeof window === 'undefined') {
    return inMemoryAttribution;
  }

  try {
    const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return inMemoryAttribution;
    const parsed = JSON.parse(raw) as StoredAttribution;
    if (parsed && parsed.firstTouch && parsed.latestTouch) {
      inMemoryAttribution = parsed;
      return parsed;
    }
  } catch {
    // Session storage might be disabled; fall back to in-memory copy
  }
  return inMemoryAttribution;
}

function writeStoredAttribution(data: StoredAttribution): void {
  inMemoryAttribution = data;
  if (typeof window === 'undefined') return;

  try {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage quota or private browsing errors
  }
}

export function captureAttribution(): StoredAttribution | null {
  if (typeof window === 'undefined') {
    return inMemoryAttribution;
  }

  const incoming = parseAttributionFromUrl(
    window.location.href,
    typeof document !== 'undefined' ? document.referrer : '',
  );
  const existing = readStoredAttribution();
  const merged = mergeAttributionTouch(existing, incoming);
  writeStoredAttribution(merged);
  return merged;
}

export function getStoredAttribution(): StoredAttribution | null {
  return readStoredAttribution();
}

export function getActiveAttributionContext(): Record<string, string> {
  const stored = readStoredAttribution();
  if (!stored) return {};

  const touch = stored.latestTouch;
  const result: Record<string, string> = {};

  if (touch.utm_source) result.utm_source = touch.utm_source;
  if (touch.utm_medium) result.utm_medium = touch.utm_medium;
  if (touch.utm_campaign) result.utm_campaign = touch.utm_campaign;
  if (touch.utm_content) result.utm_content = touch.utm_content;
  if (touch.utm_term) result.utm_term = touch.utm_term;
  if (touch.ttclid) result.ttclid = touch.ttclid;
  if (touch.landing_path) result.landing_path = touch.landing_path;

  return result;
}

export function clearStoredAttribution(): void {
  inMemoryAttribution = null;
  if (typeof window === 'undefined') return;

  try {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // Ignore
  }
}
