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
3. **Trade with a global broker:** eight cards in a draggable carousel. The three added cards cover account choice, demo practice and mobile access. The cards are read-only stats, so they carry no per-card link button.
4. Markets with glass currency tokens and metal bars; platforms with a pointer-reactive wallpaper; referral and partnership bento cards.
5. Centered platform section with a new front-facing laptop, tablet and phone image; glass MetaTrader 4, MetaTrader 5 and TradingView capsules with official standalone app icons and a single changing description.
6. Blue mobile section matching the supplied reference: original hand-held ByteFX artwork on desktop, a separate upright screenshot phone below 981px, real Google Play QR, an App Store badge awaiting its URL, and the user-supplied 4.9/5 rating.
7. Payment section with generated glass-jar and lime-vault illustrations beside seven expandable payment methods. Original-color Visa, Mastercard, Apple Pay, Bitcoin, USDT, bank wire and UPI logos accompany individual descriptions.
8. Testimonials as a continuously auto-scrolling wall of ten reviews.
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

- Header is visible at the top of the page (including over the hero) and tucks away on downward scroll. Scroll travel is accumulated per direction: 18 pixels down hides it, and it only returns after 64 pixels of deliberate upward scroll, so it no longer flies in and out while reading. It stays put whenever it is in use — pointer over the bar, a mega menu open, or the mobile drawer up — and reaching the top of the page always brings it back. A mobile drawer and visible keyboard focus keep it accessible.
- Mega menus wait 120 ms before opening on hover, so crossing the nav on the way down the page no longer throws a panel over the content; once one panel is open, moving between them is instant. Click, Escape and the mobile drawer are unchanged.
- Opening the mobile drawer locks the body scroll and compensates for the removed scrollbar, so the page no longer shifts sideways.
- Hero slides can be dragged with the mouse, swiped on touch screens and trackpads, changed with the arrow keys, or picked from the tabs. Slides advance every 8 seconds; the active tab shows progress. Autoplay pauses while dragging, while the controls are hovered, on keyboard focus, when the hero is off screen or the tab is hidden, and can be paused with the button. Reduced-motion preferences turn off autoplay, parallax and scene effects.
- Hero scene effects: mouse parallax and a cursor light on every slide; a lens glint, headphone sound waves and platform notifications on the cat slide; falling light streaks on the markets slide.
- The partner card uses the glass ByteFX mark (`public/assets/partner/bytefx-glass-mark.webp`, cut out from the supplied artwork with a transparent background).
- The platforms bento tile reacts to the pointer: the wallpaper drifts against the cursor and a soft light follows it behind the artwork. Coarse pointers and reduced motion get the still image.
- Testimonials auto-scroll as a seamless marquee: the list is rendered twice and the track slides by exactly half its width. Speed is a constant 34 px/s derived from the measured track width, and the animation pauses on hover, on press and on keyboard focus. The row is still a native horizontal scroller for touch and trackpad, the duplicate copy is `aria-hidden`, and `prefers-reduced-motion` stops the drift entirely.
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

The mobile rating is a single generated badge at `public/assets/mobile/platinum-rating.png`, replacing the separate text, stars and drawn laurel. Exact prompts for all four new images are recorded in [payment-editorial-prompts.json](public/assets/generated/payment-editorial-prompts.json).

## Trading platforms tile

The supplied `extra_assets/image.png` is a wide transparent cut-out (1672 x 941). It was trimmed to its alpha bounding box, resized to 1440 px wide and saved as `public/assets/platforms/trade-everywhere.webp` (365 KB). It replaces `platform-orbit-wallpaper.webp` as the wallpaper behind the tile; the bento grid, the tile's markup and its copy are otherwise unchanged, and no card was added or removed. The previous wallpaper is retained as an unused asset.

Because the artwork is a cut-out rather than a photograph it is `object-fit: contain`, so nothing is cropped and the tile's own surface shows through the transparent areas. The left-to-right scrim was strengthened and the copy narrowed to 53% so the text still reads over the scene. The tile follows the theme: charcoal in dark mode, a pale green-grey panel in light mode, with the scrim, the copy colours and the cursor light (screen-blended on dark, multiply on light) all flipping with it.

`components/platform-wallpaper.jsx` makes it interactive: pointer position is written to the tile as `--wall-x` / `--wall-y` (-0.5 to 0.5) and `--beam-x` / `--beam-y`, which the CSS uses to drift the artwork against the cursor and move a screen-blended light behind it. Hover still scales the scene. Coarse pointers and `prefers-reduced-motion` fall back to the still image.

## Testimonials

`testimonials.items` in `lib/content.js` now holds ten reviews. **The quotes, names, roles and countries are placeholders written for this build — they are not real customer feedback and must be replaced with verified quotes before launch.** The card label reads "Trader review" rather than claiming verification.

Profile pictures are photorealistic **synthesised** faces from [thispersondoesnotexist.com](https://thispersondoesnotexist.com/) (StyleGAN2 on FFHQ), saved as 256 px WebP in `public/assets/voices/` with provenance in [sources.json](public/assets/voices/sources.json). They are public domain and depict nobody: attaching a real, identifiable person's photograph to a fabricated quote is not acceptable, and stock-library portraits are recognisable from other sites. Each face was chosen to match its reviewer's country, and all ten are adults. Earlier illustrated SVG avatars have been removed.

Country flags are local SVGs in `public/assets/flags/`; the previous flag emoji rendered as bare letter pairs because Windows ships no flag-emoji font. Ratings render five stars with the unearned ones dimmed.
