# Profacto — Official Brand Landing Page

Official conversion landing page for **Profacto** (`@profactoo1`), specializing in high-end, custom kitchens and dressing rooms.

## Official Business Configuration
- **Brand**: Profacto
- **Official TikTok**: https://www.tiktok.com/@profactoo1
- **Phone / WhatsApp**: `+20 11 06365101` (`https://wa.me/201106365101`)
- **TikTok Pixel ID**: `DBUOAARC77UCDH70RRQ0`
- **Brand Palette**: Primary Red `#BF2531`, Primary Black `#0F0E0E`, White `#FFFFFF`

## Environment Variables
Configure frontend environment variables (or rely on centralized defaults in `src/config/brand.ts`):

```env
VITE_PROFACTO_TIKTOK_PIXEL_ID=DBUOAARC77UCDH70RRQ0
VITE_PROFACTO_WHATSAPP_NUMBER=201106365101
```

Optional server-side variables (never prefix with `VITE_`):
```env
TIKTOK_ACCESS_TOKEN=<SERVER_SIDE_SECRET>
```

## Scripts
- `npm run dev` — Start Vite development server on port 3000
- `npm run lint` — Run TypeScript validation (`tsc --noEmit`)
- `npm run build` — Build production bundle into `dist/`
- `npx --yes tsx --test src/utils/tracking.test.ts` — Run unit tests for attribution, WhatsApp URL encoding, and Pixel event guards

## Tracking Architecture
See [`TRACKING.md`](./TRACKING.md) for complete documentation of TikTok Pixel initialization, standard events (`PageView`, `ViewContent`, `Contact`), attribution preservation (`ttclid` + `utm_*`), consent gating, and Events API 2.0 readiness.
