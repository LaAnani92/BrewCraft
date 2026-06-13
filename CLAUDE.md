# BrewCraft — Project Guide for Claude Code

This file is read automatically at the start of every Claude Code session. It is the distilled memory of how this project works. Read it fully before making changes.

## What this is

BrewCraft is a specialty-coffee companion app: recipe management, a guided brew timer, an AI dial-in assistant, water chemistry tools, and camera OCR for coffee bags. It is a **Progressive Web App** for use primarily on **mobile (iPhone Safari)**.

**Current version: 1.5.0** (see `APP_VERSION` in `index.html` and `CACHE` in `sw.js` — these two must always match).

The owner is a beginner coder and an advanced coffee enthusiast. Explain concepts before code. Favour clarity over cleverness.

## The single most important architectural fact

**The entire application is ONE self-contained file: `index.html`.** All HTML, CSS, and JavaScript live inside it. There is no build step, no framework, no bundler, no npm dependencies in the app itself. This is deliberate — it makes the app trivially hostable (any static server) and installable offline.

When you edit the app, you edit `index.html`. That's it.

The few external libraries (QR code generator, etc.) are loaded lazily from a CDN at runtime, exactly as the existing code does it. Do not introduce a build system or move code into separate JS modules unless the owner explicitly asks to restructure — it would break the "one file, deploy anywhere" property the whole project depends on.

## File inventory

- `index.html` — the entire app. This is what you edit and what gets deployed.
- `sw.js` — service worker (offline caching). Its `CACHE` constant is version-stamped; bump it on every release so users get the update.
- `manifest.json` — PWA metadata (name, icons, theme colour).
- `icon-192.png`, `icon-512.png` — home-screen icons.
- `tools/validate.mjs` — the validation harness. **Run this after every change** (see Workflow).
- `tools/boot-test.mjs` — boots the app in a simulated browser (jsdom) and reports runtime errors + key UI state.
- `REGRESSION.md` — the manual test checklist, one section per past sprint. Add a section when you ship a feature.
- `docs/ARCHITECTURE.md` — deeper notes on how the app is structured internally.

## Deployment

The app is live at `https://laanani92.github.io/BrewCraft/` via GitHub Pages (deploy from the `main` branch, root folder).

To release: commit and push to `main`. GitHub Pages serves the new `index.html` within ~1 minute. **Always bump both `APP_VERSION` (in `index.html`) and `CACHE` (in `sw.js`) together**, or returning users keep seeing the cached old version. When the cache string changes, the app shows an "App updated — Reload" toast.

## Workflow for every change

1. Make the edit in `index.html` (or `sw.js`).
2. Run the validator: `npm run validate`. It must pass.
3. Run the boot test: `npm run boot`. It must boot clean (no runtime errors).
4. Test in a browser: `npm run dev`, then open the printed URL on your phone or desktop.
5. If you added a user-facing feature, bump `APP_VERSION` + `CACHE` and add a `REGRESSION.md` section.
6. Commit with a clear message.

## Conventions learned the hard way

These come from real incidents earlier in the project. Respect them.

- **Emoji in source can corrupt the file on write.** Use SVG icons (there's an inline `<symbol>` sprite near the top of `<body>`) for any UI glyph, and use `\uXXXX` escapes rather than pasting raw pictographs into JavaScript strings. The app's icons are all SVG `<use href="#i-...">` references.
- **The app stores data in `localStorage`.** Keys are prefixed `brewcraft_` (recipes, beans, gear, settings, draft, seeded, onboarded). There is a backup-before-write safety net (`brewcraft_recipes_bak`). Never rename a storage key without a migration — it erases users' saved recipes.
- **Saving is consent-based.** Editing a saved recipe's *parameters* (dose, ratio, grind, temp) never silently overwrites — it offers "save as new version / update original". Result fields (rating, notes, TDS) do autosave in place. Don't regress this; it's the app's core trust guarantee.
- **The AI features (dial-in + camera OCR) call the Anthropic API directly from the browser** using the user's own key, stored in `settings.apiKey`. The fetch pattern (headers including `anthropic-dangerous-direct-browser-access`) is identical in both features — match it if you add a third AI feature.
- **Espresso is not pour-over.** The dial-in assistant and pour UI branch on `method === 'Espresso'`. Espresso advice talks dose/yield/shot-time, never pours/swirls/blooms.

## What NOT to do

- Don't add a build step, framework, or npm runtime dependencies to the app.
- Don't split `index.html` into multiple files (unless explicitly asked to restructure).
- Don't use `localStorage`/`sessionStorage` assumptions that break in private mode — there's already a storage wrapper with a preview-mode fallback; use it.
- Don't reproduce copyrighted recipe text from third parties; the seeded recipes are original.

## Roadmap (buildable in this architecture, in priority order)

1. ✅ Camera OCR (v1.5.0) — done.
2. Precision dials — 0.1 / 1 / 10 granularity, presets, one-tap reset (replaces current steppers).
3. Three-level adaptive onboarding — Beginner / Enthusiast / Expert (extends the existing Simple/Pro mode).
4. Metric/imperial units — grams ↔ ounces (°C/°F already done).
5. Gesture hints, haptics, accessibility polish.

Not buildable without a backend (out of scope for this repo): cloud sync, accounts, a roaster-lookup server, OCR model retraining. The existing Export/Import JSON covers single-user data safety.
