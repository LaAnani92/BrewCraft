# BrewCraft — Regression Checklist

Run before every release. All items must pass. Updated for v6 (Sprint 1).

## Launch & data
- [ ] Fresh install: opens on **Today** tab, Simple mode active, 2 sample recipes seeded
- [ ] Existing user: opens on Today, Pro mode auto-detected, all old recipes load unchanged
- [ ] Draft restore: edit a new unsaved recipe, close, reopen → fields restored, "Draft restored" shown
- [ ] Corrupt `brewcraft_recipes` manually → app recovers from `_bak` with warning toast

## Today tab
- [ ] Hero shows current recipe name, method · dose · ratio · water, freshness badge
- [ ] ▶ Brew this → opens Brew-Along (or warns if no pour weights)
- [ ] ⚡ Repeat last → creates new version of most recent brew
- [ ] Quick Start chips load all 4 templates with full pour schedules
- [ ] Recent brews list shows last 3; tapping one updates the hero

## Recipe tab
- [ ] Steppers: dose ±0.5 / ratio ±0.5 / water ±10 / temp ±1; temp cannot exceed 100°C (212°F)
- [ ] Ratio chips and temp chips set values; 98° chip present
- [ ] Bean profile: save → appears in select → apply fills fields → delete removes
- [ ] Gear profile: ＋ Save setup shows **inline** name row (no popup); Enter key saves; Cancel hides
- [ ] Freshness badge updates live when roast date changes
- [ ] Dose/ratio/water recalculate bidirectionally
- [ ] Number fields open the **numeric keypad** on mobile

## Simple / Pro mode
- [ ] Simple hides: Water Chemistry, TDS field, Extraction Yield, SCA Cupping, Water Calculator, espresso Pressure/Pre-infusion, Process/Varietal/Elevation
- [ ] "More details ▾" in Simple reveals the hidden bean fields
- [ ] Ratio explainer hint visible only in Simple
- [ ] Toggling mode in Settings applies instantly, persists across reload

## Brew
- [ ] Timer start/pause/resume/reset; Lap fills next empty start→end slot
- [ ] **Pause after ≥20s with empty brew time → auto-fills time + "Evaluate ›" toast**
- [ ] Sound cues + vibration fire at pour start times
- [ ] Brew-Along: tap left/right zones navigate; countdown to next pour shows; auto-advance works; screen stays awake

## Evaluate
- [ ] Rating ≤3 stars shows the dial-in nudge; >3 hides it
- [ ] Dial-in advice (rule mode without key, AI mode with key) → "Brew Again with this plan" appears
- [ ] Brew Again creates v2 with results cleared, diff card shows changes vs parent

## Library
- [ ] Search / method filter / 4 sort orders work
- [ ] **Delete is instant; Undo toast (7s) restores the recipe at its original position**
- [ ] Deleting the open recipe clears the form safely
- [ ] Compare: pick two → diff table; close clears selection
- [ ] Share & Receive section: code generates, copies, QR renders; pasted code imports; malformed JSON (e.g. `pours:"x"`) imports safely or is rejected — **never crashes**
- [ ] Export All / Import File round-trips identically

## Units
- [ ] Switch °C→°F: field converts (93 → 199), chips relabel (199° 194° 199°…), label shows (°F)
- [ ] Recipes save canonical °C regardless of display unit; reload shows correct converted value

## Accessibility
- [ ] Tab key reaches stars; Enter/Space sets rating
- [ ] Focus outline visible on buttons/inputs/chips
- [ ] Icon-only buttons announce labels (screen reader spot-check)

## Release mechanics
- [ ] `node --check` on extracted script passes
- [ ] ID / handler / duplicate-function audits pass
- [ ] No `confirm(` or `prompt(` in code
- [ ] Old-version recipes (no schemaVersion) still load

## Sprint 2 (v7) — Habit features
- [ ] Bean profile with "Bag g" set: select shows "…· 230g left"; bag status bar appears under bean row
- [ ] Brew + rate a recipe linked to a bean → dose deducted **once** (re-saving/re-rating does not double-deduct)
- [ ] Brew Again → new version deducts again when rated; Duplicate does **not** deduct
- [ ] ≤2 brews remaining → status turns amber + "running low" toast on deduction
- [ ] "New bag" resets counter; editing Bag g while bean selected updates live
- [ ] Today shows bag line + "Best result with this bean" (highest-rated, hidden when current IS the best); Load it works
- [ ] Diff card shows "Outcome: 3★ → 4★ — improved ✓" when parent & child both rated
- [ ] Dial-in (rule mode): warns when last change made the cup worse; shows "Iteration memory" line
- [ ] Dial-in (AI mode): source line says "informed by N past iterations"
- [ ] Library Journal toggle: date-grouped timeline, ratings, EY, note previews; search/method filter still apply; tap opens recipe
- [ ] Gear-name inline input is properly styled (regression from v6 fixed)

## Sprint 3 (v8 / v1.0) — Pride & Market
- [ ] Fresh install on hosted site: onboarding tour appears (3 steps, dots, Skip works); choosing Simple/Pro sets the mode; never shows again
- [ ] Existing user: onboarding never appears
- [ ] Hosted: sw.js registers; after first load, airplane mode → app still opens fully (offline shell)
- [ ] Deploy a new index.html → open app → "App updated — Reload" toast appears; Reload gets new version
- [ ] Add to Home Screen: BrewCraft icon (gradient + cone) appears; launches standalone with dark theme bar
- [ ] Local file:// usage: no SW errors, manifest/icon 404s harmless, app fully functional
- [ ] Sharing the site link in WhatsApp shows BrewCraft title + description preview
- [ ] Lab → About: version v1.0.0 shown; Copy diagnostics copies; Send feedback opens configured link (mailto: and https both), warns if unset

## Sprint 4 (v9 / v1.1.0) — Design System
- [ ] Zero emoji anywhere in chrome: tab bar, section headers, header — all crisp SVG line icons
- [ ] Recipe tab opens with the recipe name as a large serif title (tap to edit, underline on focus)
- [ ] Brew Bar shows Dose / Ratio / Water / Temp live; updates instantly while typing or stepping; tapping a stat scrolls to + focuses its field
- [ ] Sections render as soft elevated cards with gradient icon tiles; inputs visibly darker than cards
- [ ] Header gear opens the Settings sheet (Settings expanded, About collapsible); ✕ and backdrop-tap close it; all settings still persist
- [ ] Lab tab now contains only: Stats, Water Calculator, Cupping, Print
- [ ] All "Lab → Settings" copy now points to the gear icon (dial-in hint, onboarding, feedback hints)
- [ ] Today hero has the warm gradient treatment; tab icons glow when active
- [ ] After deploy: "App updated — Reload" toast appears (cache bumped to v1.1.0)

## Sprint 5 (v10 / v1.2.0) — Feel
- [ ] Brew Bar values pulse/tick when changed by typing, steppers, or chips — not on every keystroke when unchanged
- [ ] Rating stars pop with spring animation on tap; 5★ fires confetti + haptic — but NOT when loading a 5★ recipe from the library
- [ ] Brew-Along: progress ring sweeps around the timer over total brew time, turns green at completion; ring still and harmless when recipe has no times
- [ ] Brew-Along: pace bar fills across each pour window with "→ Xg" target; shows "starts at m:ss" before the window, "window done" after
- [ ] Library: swipe a card left past ~half-way → border arms red → release deletes (Undo toast catches it); partial swipe springs back; vertical scrolling unaffected; tap-after-swipe doesn't open the recipe
- [ ] Buttons/chips/icons compress slightly on press; active tab icon lifts
- [ ] System "reduce motion" setting: all animations (confetti, ring sweep, ticks) effectively disabled
- [ ] Update toast appears after deploy (cache v1.2.0)

## Sprint 6 (v11 / v1.3.0) — Comfort & Insight
- [ ] Settings → Theme: Auto / Dark roast / Cream paper; choice persists across reloads
- [ ] Cream paper: warm light surfaces everywhere — header, tab bar, cards, inputs, modals; copper accent darkened for contrast; no unreadable text anywhere (check Brew Bar values, chips, hints, toasts)
- [ ] Auto mode follows the phone's light/dark setting, switching live without reload
- [ ] Status bar color (PWA) matches the active theme
- [ ] Stats: charts render crisp on retina; timeline is a smooth curve with gradient fill; 4–5★ scatter points brighter; green band repositions to YOUR sweet spot once you have 2+ good brews with TDS
- [ ] Insight chips appear above charts: sweet spot range, rating trend (up/dip/steady), best origin — and update when theme changes
- [ ] Charts redraw correctly after switching theme while on the Lab tab
- [ ] Update toast after deploy (cache v1.3.0)

## Sprint 7 (v12 / v1.4.0) — Trust
- [ ] Load a saved recipe, change dose/ratio/grind, tap Save → consent sheet appears: "Save as new version / Update the original / Keep editing"; original is untouched until you choose
- [ ] "Save as new version" creates "Name v2" linked to the parent; both visible in Library
- [ ] While param edits are pending, autosave shows "Unsaved changes" and does NOT touch the saved recipe; rating/notes/TDS-only edits still autosave silently into the same brew
- [ ] Brew Again with unsaved param tweaks: tweaks go to the NEW version, parent unchanged
- [ ] Today "Brew this" → lands on Brew tab, timer ready, toast confirms; a fresh version is staged
- [ ] Brew tab shows compact Brew Bar; updates live; tapping a stat jumps to that field on Recipe
- [ ] Espresso: bitter → coarser/cut yield/temp-down advice with your actual shot numbers; sour+bitter → WDT/puck-prep channeling diagnosis; NO pour/swirl/drawdown language anywhere (rule + AI paths)
- [ ] Espresso recipes hide the pour schedule; switching back to V60 restores it
- [ ] Evaluate tab order: Tasting → Notes → Dial-In → Extraction
- [ ] °F users see dial-in temp advice in °F
- [ ] Light theme: hints/placeholders readable on inputs; primary buttons higher contrast; rating stars and chips have larger tap areas
- [ ] Update toast after deploy (cache v1.4.0)

## Sprint 8 (v1.6.0) — Precision dials
- [ ] Recipe → Brew Parameters: dose / ratio / water / temp each show a large value plus a ruler; the old +/- buttons and granularity chips are gone
- [ ] Drag a ruler left/right: the value changes and snaps (dose 0.1 g, ratio 0.1, water 1 g, temp 0.5°), with a haptic tick on phone; a slow drag fine-tunes, a fast swipe covers range
- [ ] Dragging dose or ratio updates Total Water live (dose × ratio); dragging water updates ratio; pour totals and extraction recompute
- [ ] Tap the big number → numeric keyboard appears; typing an exact value repositions the ruler and recalculates water
- [ ] The ↺ reset on each dial returns it to its default (dose 15, ratio 16, water 250, temp 93 °C)
- [ ] Keyboard (desktop): focus a ruler, ← → nudges one step, Shift+← → by ten steps, Home resets
- [ ] Values clamp: ratio cannot go below 1; temp respects 0–100 °C (0–212 °F)
- [ ] Switch °C↔°F in Lab: the temp value converts, the ruler ceiling extends to 212 °F, and the dial still drags correctly
- [ ] Load a saved recipe / restore a draft → all four rulers show the correct position on load
- [ ] Update toast after deploy (cache v1.6.0)

## Sprint 9 (v1.7.0) — Adaptive onboarding & Brew ring
- [ ] First run (clear storage): after the two welcome screens, step 3 asks "Where are you on your coffee journey?" with three choices — Beginner / Enthusiast / Expert (no clipped text)
- [ ] Choosing a level shows a tailored toast and tunes the app; the choice persists across reload
- [ ] Settings (Lab) shows a "Skill level" picker (Beginner/Enthusiast/Expert) that changes the app live; returning users who had Simple/Pro see a sensible inferred level
- [ ] Beginner hides the grinder model, grind-setting (clicks), and saved-gear setups (keeps the coarseness word + visual)
- [ ] Enthusiast shows grinder model + grind clicks + saved setups, but still hides water chemistry / TDS / cupping
- [ ] Expert unlocks everything (water chemistry, TDS, cupping)
- [ ] Today tab for a new user reads "Your starter recipe" with the welcome hint and a "Make it yours" button; an experienced user (own recipes) sees "Current recipe" and no hint
- [ ] Brew tab: the timer sits inside a progress ring that fills as the brew runs toward its expected finish; ring reaches full + brightens at/after target; Reset empties the ring
- [ ] Ring target derives from the last pour cue (+drawdown), or a logged total time, or 3 min fallback
- [ ] Update toast after deploy (cache v1.7.0)
