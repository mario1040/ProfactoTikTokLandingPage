import test from 'node:test';
import assert from 'node:assert/strict';
import { PROFACTO_BRAND } from '../config/brand';
import {
  clearStoredAttribution,
  hasCampaignParameters,
  mergeAttributionTouch,
  parseAttributionFromUrl,
} from './attribution';
import { generateEventId, getSessionAnalyticsHistory, clearSessionAnalyticsHistory } from './analytics';
import {
  buildEventsApi2Payload,
  canSendServerEventsApi,
} from './eventsApiBlueprint';
import {
  buildContactPayload,
  buildViewContentPayload,
  resetTrackingGuardsForTest,
  shouldAllowActionDispatch,
  trackConfirmedSchedule,
  trackContact,
  trackTikTokProfileClick,
  trackVerifiedLead,
  trackViewContent,
} from './tiktokPixel';
import { buildProfactoWhatsAppMessage, getProfactoWhatsAppHref } from './whatsapp';

test('brand configuration uses exact Profacto Pixel ID and WhatsApp number', () => {
  assert.equal(PROFACTO_BRAND.tracking.tiktokPixelId, 'DBUOAARC77UCDH70RRQ0');
  assert.equal(PROFACTO_BRAND.contact.phoneInternational, '+201106365101');
  assert.equal(PROFACTO_BRAND.contact.whatsappNumber, '201106365101');
  assert.equal(PROFACTO_BRAND.tiktokUrl, 'https://www.tiktok.com/@profactoo1');
});

test('ViewContent and Contact payloads always include non-empty content_id and valid content_type', () => {
  const vcPayload = buildViewContentPayload({
    contentId: 'profacto_custom_kitchens_dressing_rooms',
    contentKey: 'profacto_specialties_section',
    contentName: 'Profacto Custom Kitchens & Dressing Rooms',
    contentCategory: 'specialties',
    description: 'Main services section viewed',
  });

  assert.equal(vcPayload.content_id, 'profacto_custom_kitchens_dressing_rooms');
  assert.equal(vcPayload.content_type, 'product_group');
  assert.ok(Array.isArray(vcPayload.contents) && vcPayload.contents.length === 1);
  assert.equal(vcPayload.contents[0].content_id, 'profacto_custom_kitchens_dressing_rooms');
  assert.equal(vcPayload.contents[0].content_type, 'product_group');

  const contactPayload = buildContactPayload('whatsapp', 'hero');
  assert.equal(contactPayload.content_id, 'profacto_whatsapp_hero');
  assert.equal(contactPayload.content_type, 'product_group');
  assert.ok(Array.isArray(contactPayload.contents) && contactPayload.contents.length === 1);
  assert.equal(contactPayload.contents[0].content_id, 'profacto_whatsapp_hero');
});

test('attribution parser captures UTM parameters and ttclid when present, and never invents them when absent', () => {
  const withCampaign = parseAttributionFromUrl(
    'https://profacto.example/?utm_source=tiktok&utm_medium=cpc&utm_campaign=kitchen_q4&utm_content=reel1&utm_term=custom&ttclid=EAIaIQobChMI_test_123',
    'https://www.tiktok.com/',
    '2026-11-18T12:00:00.000Z',
  );

  assert.equal(withCampaign.utm_source, 'tiktok');
  assert.equal(withCampaign.utm_medium, 'cpc');
  assert.equal(withCampaign.utm_campaign, 'kitchen_q4');
  assert.equal(withCampaign.utm_content, 'reel1');
  assert.equal(withCampaign.utm_term, 'custom');
  assert.equal(withCampaign.ttclid, 'EAIaIQobChMI_test_123');
  assert.equal(hasCampaignParameters(withCampaign), true);

  const organic = parseAttributionFromUrl(
    'https://profacto.example/#services',
    '',
    '2026-11-18T12:05:00.000Z',
  );

  assert.equal(organic.utm_source, null);
  assert.equal(organic.ttclid, null);
  assert.equal(hasCampaignParameters(organic), false);
});

test('first-touch attribution and ttclid are preserved across internal navigation without campaign params', () => {
  clearStoredAttribution();
  const initial = parseAttributionFromUrl(
    'https://profacto.example/?utm_source=tiktok&ttclid=tt_first_001',
    'https://www.tiktok.com/@profactoo1',
    '2026-11-18T10:00:00.000Z',
  );
  const firstState = mergeAttributionTouch(null, initial);

  const navigated = parseAttributionFromUrl(
    'https://profacto.example/services',
    '',
    '2026-11-18T10:02:00.000Z',
  );
  const merged = mergeAttributionTouch(firstState, navigated);

  assert.equal(merged.firstTouch.ttclid, 'tt_first_001');
  assert.equal(merged.latestTouch.ttclid, 'tt_first_001');
  assert.equal(merged.latestTouch.utm_source, 'tiktok');
  assert.equal(merged.latestTouch.landing_path, '/services');
});

test('WhatsApp helper builds official wa.me/201106365101 URL with encoded contextual Arabic & English messages', () => {
  const arDefault = getProfactoWhatsAppHref('default', 'ar');
  assert.ok(arDefault.startsWith('https://wa.me/201106365101?text='));
  assert.ok(
    decodeURIComponent(arDefault.split('?text=')[1]).includes('مرحباً Profacto، وصلت إليكم من خلال الموقع'),
  );

  const arKitchens = buildProfactoWhatsAppMessage('kitchens', 'ar');
  assert.ok(arKitchens.includes('المطابخ المخصصة'));

  const enDressing = buildProfactoWhatsAppMessage('dressing-rooms', 'en');
  assert.ok(enDressing.includes('custom dressing rooms'));
});

test('event_id generator produces unique IDs across sequential calls', () => {
  const id1 = generateEventId('contact');
  const id2 = generateEventId('contact');
  assert.notEqual(id1, id2);
  assert.ok(id1.startsWith('contact_'));
});

test('rapid double-clicks on same conversion action are debounced, while distinct impressions fire once', () => {
  resetTrackingGuardsForTest();
  clearSessionAnalyticsHistory();

  assert.equal(shouldAllowActionDispatch('contact:whatsapp:hero', 1000, 800), true);
  assert.equal(shouldAllowActionDispatch('contact:whatsapp:hero', 1200, 800), false);
  assert.equal(shouldAllowActionDispatch('contact:whatsapp:hero', 1900, 800), true);
  assert.equal(shouldAllowActionDispatch('contact:whatsapp:kitchens', 1950, 800), true);

  const firstView = trackViewContent({
    contentId: 'profacto_custom_kitchens_dressing_rooms',
    contentKey: 'specialties_section',
    contentName: 'Custom Kitchens & Dressing Rooms',
    contentCategory: 'specialties',
  });
  const secondView = trackViewContent({
    contentId: 'profacto_custom_kitchens_dressing_rooms',
    contentKey: 'specialties_section',
    contentName: 'Custom Kitchens & Dressing Rooms',
    contentCategory: 'specialties',
  });

  assert.equal(firstView, true);
  assert.equal(secondView, false);

  const contactRes = trackContact('whatsapp', 'hero');
  assert.ok(contactRes.eventId.startsWith('contact_'));

  const ttClick = trackTikTokProfileClick('showcase_section');
  assert.ok(ttClick.eventId.startsWith('ttprofile_'));
  // Custom TikTokProfileClick is disabled by default until verified in Events Manager
  assert.equal(ttClick.deliveredToPixel, false);

  const history = getSessionAnalyticsHistory();
  assert.equal(history.some((e) => e.eventName === 'Lead'), false);
  assert.equal(history.some((e) => e.eventName === 'Schedule'), false);
  assert.equal(history.some((e) => e.eventName === 'ViewContent'), true);
  assert.equal(history.some((e) => e.eventName === 'Contact'), true);
  assert.equal(history.some((e) => e.eventName === 'TikTokProfileClick'), true);
});

test('Lead and Schedule remain strictly blocked without confirmed server/booking references', () => {
  assert.equal(trackVerifiedLead(false, 'x'), false);
  assert.equal(trackVerifiedLead(true, undefined), false);
  assert.equal(trackConfirmedSchedule(undefined), false);
});

test('Events API 2.0 blueprint stays inactive without server secret and never exposes Profacto phone as user PII', () => {
  assert.equal(canSendServerEventsApi(undefined), false);
  assert.equal(canSendServerEventsApi('<SERVER_SIDE_SECRET>'), false);

  const attribution = parseAttributionFromUrl(
    'https://profacto.example/?ttclid=tt_srv_99',
    '',
    '2026-11-18T12:00:00.000Z',
  );
  const payload = buildEventsApi2Payload({
    event: 'Contact',
    eventId: 'contact_unique_123',
    eventTimeUnixSeconds: 1795000000,
    pageUrl: 'https://profacto.example/',
    attribution,
    contentId: 'profacto_whatsapp_hero',
    contentName: 'profacto_whatsapp_contact',
    contentCategory: 'hero',
  });

  assert.equal(payload.event_source_id, 'DBUOAARC77UCDH70RRQ0');
  assert.equal(payload.data[0].event, 'Contact');
  assert.equal(payload.data[0].event_id, 'contact_unique_123');
  assert.equal(payload.data[0].user.ttclid, 'tt_srv_99');
  assert.equal(payload.data[0].properties?.content_id, 'profacto_whatsapp_hero');
  assert.equal(JSON.stringify(payload).includes('201106365101'), false);
});
