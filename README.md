# ByteFX landing page

Next.js App Router, React, JavaScript/JSX and Tailwind CSS v4.

## Run

```sh
npm install
npm run dev
npm run lint
npm run build
npm start
```

The current development preview uses http://localhost:3000. A fresh server normally uses port 3000.

## Design

The visual reference is [Global Prime](https://globalprime.com/): charcoal `#0f0f0f`, secondary surfaces `#141414` and `#1b1b1b`, lime `#ade512`, white headings, rounded cards and pill buttons. ByteFX retains its own branding and content. Figtree Variable is bundled locally as the available typeface.

`app/globals.css` defines the dark and light tokens. `app/styles/base.css` contains resets, `components.css` contains shared component styles, and `reference-theme.css` applies this design. Component styles use the components cascade layer, so Tailwind utilities retain precedence.

Dark is the default. The header toggle remembers an explicit light/dark preference in localStorage before first paint. The original full-colour ByteFX logo is used without filters in both the header and footer.

## Page structure

1. Header with desktop mega menus and a mobile drawer.
2. Full-height hero carousel with four slides: Mindset, Stay cool (the trading cat), Global markets and Precious metals. Artwork lives in `public/assets/hero/`; copy, layout and focal points in `hero` inside `lib/content.js`.
3. **Trade with a global broker:** eight cards in a draggable carousel. The three added cards cover account choice, demo practice and mobile access.
4. Markets with glass currency tokens and metal bars; platforms with a sculptural glass wallpaper; referral and partnership bento cards.
5. Centered platform section with a new front-facing laptop, tablet and phone image; glass MetaTrader 4, MetaTrader 5 and TradingView capsules with official standalone app icons and a single changing description.
6. Blue mobile section matching the supplied reference: original hand-held ByteFX artwork on desktop, a separate upright screenshot phone below 981px, real Google Play QR, an App Store badge awaiting its URL, and the user-supplied 4.9/5 rating.
7. Payment section with generated glass-jar and lime-vault illustrations beside seven expandable payment methods. Original-color Visa, Mastercard, Apple Pay, Bitcoin, USDT, bank wire and UPI logos accompany individual descriptions.
8. Testimonials.
9. **Ready to start trading?** with a minimum height of `100svh`, a lime glass scene inspired by the supplied background: arcs on the left and market tiles on the right. The two sides move toward one another as the section scrolls through the viewport. Reduced-motion preferences disable this effect. Small screens position the artwork beneath the content; content can grow for accessibility.
10. Footer with a new lime glass Bitcoin sculpture based on the supplied footer image.

## Artwork

Original PNG images were generated using the built-in image_gen tool and saved in `public/assets/generated/`. Object illustrations use alpha transparency and soft reflections; the platform wallpaper is an opaque charcoal, glass and lime composition. Next Image serves optimized image formats. Earlier artwork remains available in its original folders.

The initial prompts, filenames, palette and generation mode are recorded in [prompts.json](public/assets/generated/prompts.json). The four revised images and their exact prompts are recorded in [revision-prompts.json](public/assets/generated/revision-prompts.json).

## Content and destinations

Copy and destinations live in `lib/content.js`. Destination URLs that have not been supplied remain `href: null`; `SmartLink` renders those as non-interactive labels. Account registration, demo, platform downloads, social profiles and other destination pages still need their approved URLs.

The navbar and mobile-section QR codes encode `https://play.google.com/store/apps/details?id=com.bytefx.app&hl=en_IN`. The real code at `public/app-qr.png` was generated with the QRCode library and independently decoded from both rendered locations.

Current platform artwork: `public/assets/generated/platform-devices-front.png`. The earlier mobile stage is retained as an unused asset. Their exact prompts and built-in generation mode are in [showcase-prompts.json](public/assets/generated/showcase-prompts.json). Screenshots are displayed intact inside CSS phone frames. Platform and payment logo sources are recorded in their asset folders. Original solid interface glyphs in `components/icon.jsx` replace the previous outline style; no Lucide dependency is used.

## Atlas assistant

`components/atlas-chat.jsx` provides a bottom-right chat window with message submission, suggested questions, links, restart and Escape handling. `lib/atlas.js` supplies local website guidance for app downloads, platforms, markets and support. No live AI backend, account access or live market data is configured. Messages are kept only in component memory and are not transmitted to a service.

## Interactions

- Header is visible at the top of the page (including over the hero), hides on downward scroll and returns on any upward scroll. Small scroll movements are ignored so it never flickers. A mobile drawer and visible keyboard focus keep it accessible, and scrolling down closes hover menus.
- Hero slides can be dragged with the mouse, swiped on touch screens and trackpads, changed with the arrow keys, or picked from the tabs. Slides advance every 8 seconds; the active tab shows progress. Autoplay pauses while dragging, while the controls are hovered, on keyboard focus, when the hero is off screen or the tab is hidden, and can be paused with the button. Reduced-motion preferences turn off autoplay, parallax and scene effects.
- Hero scene effects: mouse parallax and a cursor light on every slide; a lens glint, headphone sound waves and platform notifications on the cat slide; falling light streaks on the markets slide.
- The partner card uses the glass ByteFX mark (`public/assets/partner/bytefx-glass-mark.webp`, cut out from the supplied artwork with a transparent background).
- Menus support hover, click and Escape. Closed panels use the React boolean `inert` attribute.
- Broker cards support mouse dragging, native touch scrolling and previous/next buttons with disabled end states.
- Reveals use a shared requestAnimationFrame position check. Reduced motion disables decorative movement.
- Keyboard focus is visible, with a skip link to the main content.

## Validation

- Production build and ESLint passed.
- Chrome checks passed at 320, 390, 768, 1024 and 1440 pixels wide, without horizontal page overflow.
- Verified full-viewport closing height, eight cards, carousel navigation and end state, desktop/mobile menus, Escape, theme persistence and reduced motion.
- No browser console errors or broken images in the final checks.
- Verified desktop hand-held artwork, alternate mobile phone, three glass platform tabs, seven payment accordions including UPI, QR decoding, keyboard selection, Atlas, light theme and reduced motion at widths from 320 to 1440 pixels.
- The latest checks cover both payment illustrations, accordion expansion/collapse and keyboard navigation, a single mobile rating image, platform wallpaper contrast, and responsive layouts without runtime errors.
- Review screenshots are saved in `output/review/`.

## Brand icon

The favicon uses the symbol from the original ByteFX logo, exported at 32 and 192 pixels, with a 180-pixel Apple touch icon. Metadata in `app/layout.jsx` references these assets. Platform app-icon source URLs are recorded in `public/assets/platforms/icon-sources.json`.

## Blue mobile and payment revision

Desktop artwork is `public/assets/mobile/bytefx-handheld.webp`, copied unchanged from the supplied `Downloads/mobile.webp`. The small-screen alternative uses the actual chart screenshot in an upright frame. `site.iosAppUrl` remains null; add the approved App Store URL there to activate its badge. The 4.9/5 rating text was supplied and explicitly requested by the user; its source link is still pending. The QR continues to encode the confirmed Google Play URL.

The payment section now uses `public/assets/generated/payment-jar.png` and `payment-vault.png`, inspired by the supplied jar and safe references. Selecting crypto or bank wire gently emphasizes the vault; reduced motion disables this movement. Brand SVGs stay separate and retain their original colors. The previous chrome-glass tile asset remains unused.

The mobile rating is a single generated badge at `public/assets/mobile/platinum-rating.png`, replacing the separate text, stars and drawn laurel. The bento platform card uses `public/assets/generated/platform-wallpaper.png`; the separate device showcase remains intact. Exact prompts for all four new images are recorded in [payment-editorial-prompts.json](public/assets/generated/payment-editorial-prompts.json).
