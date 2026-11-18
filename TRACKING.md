# Profacto TikTok Pixel & Attribution Documentation

## 1. Pixel Configuration
- **Pixel ID**: `DBUOAARC77UCDH70RRQ0`
- **Environment Variable**: `VITE_PROFACTO_TIKTOK_PIXEL_ID` (fallback in `src/config/brand.ts`)
- **SDK Loader**: `src/utils/tiktokPixel.ts`
- **Initialization Rule**: Loads `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=DBUOAARC77UCDH70RRQ0&lib=ttq` **at most once** per session, guarded by module state and `window.__PROFACTO_TTQ_INITIALIZED__`.

## 2. Consent Management
- Consent status is persisted in `localStorage` (`profacto_tracking_consent_v1`) as `'pending' | 'granted' | 'denied'`.
- On initial visit (`'pending'`) or if `'denied'`, the third-party TikTok Pixel SDK is **not injected** and non-essential advertising cookies are not set.
- Clicking **Accept / موافقة** immediately invokes `initTikTokPixel()`, loads the SDK once, and fires the base `PageView`.
- Users can update preferences anytime via the **Tracking & Cookie Preferences** button in the footer.

## 3. Event Strategy
| Visitor Action | Event Name | Implementation | Notes |
|---|---|---|---|
| Initial consented load | `PageView` | `ttq.page()` inside `bootstrapTikTokStub()` | Fires once per load; no duplicate manual `PageView`. |
| Viewing Specialties (`#services`) | `ViewContent` | `IntersectionObserver` in `ServicesSection.tsx` | Fires once when >=25% visible (`trackViewContent`). |
| Clicking any WhatsApp CTA | `Contact` | `WhatsAppButton.tsx` -> `trackProfactoWhatsAppClick()` | Debounced per physical action (`800ms`), unique `event_id`. Never fires `Lead` or `Schedule`. |
| Clicking phone link (`tel:+201106365101`) | `Contact` | `ContactSection.tsx` / `Footer.tsx` -> `trackContact('phone', ...)` | Fires once per click with unique `event_id`. |
| Clicking TikTok profile (`@profactoo1`) | `TikTokProfileClick` | `trackTikTokProfileClick()` | Recorded in internal session analytics; external Pixel custom fire is gated behind `customEventsEnabled.TikTokProfileClick` until configured in Events Manager. |
| Lead form submission | `Lead` | `trackVerifiedLead()` | **Intentionally inactive**: no backend CRM lead form exists yet. |
| Confirmed booking | `Schedule` | `trackConfirmedSchedule()` | **Intentionally inactive**: no online booking engine exists yet. |

## 4. Attribution & `ttclid` Preservation
- Implemented in `src/utils/attribution.ts`.
- Captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `ttclid`, `landing_url`, `landing_path`, `referrer`, and `timestamp` into `sessionStorage` (`profacto_attribution_v1`).
- Preserves both `firstTouch` and `latestTouch` without inventing missing parameters.

## 5. WhatsApp Attribution Limitations & Future CRM Path
- Clicking `https://wa.me/201106365101` measures **Contact intent** in the browser; an external deep link cannot verify whether the user sent the WhatsApp message or became a qualified lead.
- For closed-loop `Lead` attribution, integrate WhatsApp Business Platform webhooks or a CRM server endpoint in a future phase.

## 6. Server-Side Events API 2.0 Readiness
- Schema builder and deduplication helper live in `src/utils/eventsApiBlueprint.ts` (`buildEventsApi2Payload`, `canSendServerEventsApi`).
- Every browser event generates a unique `event_id` (`generateEventId()`), ready to be mirrored in server-side `event_id` deduplication.
- **Status**: Prepared structurally, **currently inactive** because no backend runtime or `TIKTOK_ACCESS_TOKEN` secret is provisioned.
