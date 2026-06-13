# BrewCraft Architecture

Internal notes on how the single file is organized. For conventions and workflow, see `CLAUDE.md`.

## Shape of `index.html`

Top to bottom:

1. `<head>` — meta tags (PWA, theme colour, Open Graph), and the entire `<style>` block. CSS uses custom properties (design tokens) defined in `:root`, with a `:root` override block for later refinements and an `html.theme-light` block for the Cream Paper theme.
2. Start of `<body>` — an inline SVG `<symbol>` sprite. Every icon in the UI is a `<svg class="ico"><use href="#i-NAME"></svg>` reference into this sprite. **Add new icons here**, never as emoji.
3. Header (with the settings gear), the tab bar, then six `.tab-panel` sections: Today, Recipe, Brew, Evaluate, Library, Lab.
4. Modals (settings, save-choice, scan/OCR, recipe comparison, import, onboarding).
5. The single large `<script>` at the end containing all application logic.

## State and storage

All persistent state is in `localStorage`, behind a small wrapper (`store`) that degrades gracefully when storage is blocked (private mode / sandboxed preview), exposing `store.ok`.

Keys (all `brewcraft_` prefixed):
- `brewcraft_recipes` — the recipe array (and `_bak`, a backup written before each save)
- `brewcraft_beans` — saved bean profiles
- `brewcraft_gear` — saved grinder/brewer setups
- `brewcraft_settings` — `{ apiKey, model, sounds, tempUnit, mode, theme, feedbackUrl }`
- `brewcraft_draft` — unsaved in-progress recipe
- `brewcraft_seeded` — flag: starter recipes have been loaded
- `brewcraft_onboarded` — flag: onboarding tour shown

Recipes carry lineage: `parentId` and `version` link iterations. `DIFF_FIELDS` drives the "changes from previous version" card and the param-change detection that powers save-consent.

## The brew lifecycle (the product's spine)

Recipe (set parameters) → Brew (timer, pour-along) → Evaluate (taste, rate, dial-in) → Brew Again (logs a versioned iteration). The dial-in assistant reads taste issues + iteration history and recommends one change at a time.

## AI features

Two features call the Anthropic API directly from the browser with the user's own key (`settings.apiKey`):
- **Dial-in assistant** — sends recipe JSON + taste issues, gets a coaching reply. Falls back to a built-in rule engine (`ruleDialIn`) with no key.
- **Camera OCR** (`openScan`/`runScanRead`/`applyScan`) — sends a downscaled bag photo, gets structured JSON, fills the bean fields.

Both use the identical fetch shape (headers include `anthropic-dangerous-direct-browser-access: true`). The dial-in and pour logic branch on `method === 'Espresso'` to give shot-based rather than pour-based guidance.

## Service worker

`sw.js` caches the app shell for offline use, network-first for navigation, cache-first for assets. Its `CACHE` constant is version-stamped; changing it triggers the update toast. **Always bump it with `APP_VERSION`.**

## Why one file (and when to reconsider)

One file = zero build, host anywhere, trivially offline, easy to reason about. The cost is a large file. That trade has been correct so far. Only reconsider splitting into modules + a build step if the app grows past what's comfortable to navigate, AND the owner accepts losing the "drop one file on any host" property. Until then, keep it monolithic.
