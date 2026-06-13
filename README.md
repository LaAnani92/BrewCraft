# BrewCraft ☕

A specialty-coffee companion: recipe management, a guided brew timer, an AI dial-in assistant, water-chemistry tools, and camera OCR that reads coffee-bag labels. It's a Progressive Web App — one self-contained HTML file, installable on your phone, works offline.

**Live:** https://laanani92.github.io/BrewCraft/

## The one thing to understand

The whole app is **`index.html`** — HTML, CSS, and JavaScript in a single file, no build step. You edit that file, refresh the browser, done. This is deliberate: it deploys to any static host and runs offline. See `CLAUDE.md` for the full architecture and conventions.

## Working on it locally

You need [Node.js](https://nodejs.org) (LTS version). Then, from this folder:

```bash
npm install        # one-time: installs the test harness (jsdom)
npm run dev        # starts a local server, prints a URL like http://localhost:5000
```

Open that URL in your browser. On your phone, use your computer's local IP (e.g. `http://192.168.1.20:5000`) while both are on the same Wi-Fi. Edit `index.html`, save, refresh.

## Before every commit

```bash
npm run check      # runs the validator + boot test; both must pass
```

- `npm run validate` — static checks: JS syntax, element IDs, event handlers, duplicate functions, version sync, no truncation.
- `npm run boot` — loads the app in a simulated browser and confirms it starts with no runtime errors.

## Releasing

This deploys via GitHub Pages from the `main` branch.

1. Bump `APP_VERSION` in `index.html` **and** the `CACHE` string in `sw.js` — they must match, or returning users keep the cached old version.
2. `npm run check` (must pass).
3. Commit and push to `main`.
4. Wait ~1 minute; the live site updates and shows an "App updated — Reload" toast.

## Layout

```
index.html          the entire app
sw.js               service worker (offline cache; version-stamped)
manifest.json       PWA metadata
icon-192.png        home-screen icons
icon-512.png
tools/validate.mjs  static validator  (npm run validate)
tools/boot-test.mjs jsdom boot test    (npm run boot)
docs/ARCHITECTURE.md  how the app is built internally
REGRESSION.md       manual test checklist, one section per sprint
CLAUDE.md           project guide that Claude Code reads automatically
```

## Using with Claude Code

From this folder, run `claude`. It reads `CLAUDE.md` automatically and will understand the single-file architecture, the version-bump rule, the storage-key safety rules, and the validation workflow. Ask it to build the next roadmap item (precision dials), or to fix anything — it knows to run `npm run check` after editing.
