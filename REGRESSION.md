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

## Sprint 10 (v1.8.0) — Guided pour-along & finish, accessibility, gesture hints
- [ ] Brew tab: start the timer → a live line under the ring shows the current step "pour to X g (+Y g)" and advances Bloom → pours as start times pass
- [ ] "next: <pour> in M:SS" counts down; after the last pour it reads "drawing down — done ~M:SS"
- [ ] At the expected finish a one-time "✓ Brew complete" (green) appears with a gentle beep/haptic; it does not refire; Reset clears the guide + ring
- [ ] Full-screen Brew-Along target also shows the per-pour increment (+Y g)
- [ ] All collapsible section headers are reachable by Tab and toggle with Enter/Space; aria-expanded reflects state; the pour guidance announces via aria-live
- [ ] Rating a cup and tapping "Brew this" give a haptic on supported devices
- [ ] First few app opens: a "↔ Drag the ruler" hint shows under the dose dial and disappears permanently after the first drag
- [ ] Brew-Along shows a "tap screen edges" hint on entry that fades after ~5s or on the first edge tap
- [ ] Settings → "Show tips again" re-enables both hints
- [ ] Update toast after deploy (cache v1.8.0)

## Sprint 11 (v1.9.0) — Brew-first landing (Today merged into Brew)
- [ ] App opens directly on the Brew tab; there is no Today tab; tab bar = Brew · Recipe · Evaluate · Library · Lab (5 tabs)
- [ ] Brew landing: header (recipe name + method/dose/ratio/water + context) → brew bar → Brew-Along button → timer ring → pour schedule
- [ ] New users see "Your starter recipe" + welcome hint; experienced users see "Current recipe"
- [ ] "↺ Switch recipe" reveals the method quick-pick (Hoffmann / Kasuya / AeroPress / French); tapping one loads it and STAYS on Brew, ready to brew (picker collapses, brew bar updates)
- [ ] "✎ Edit recipe" jumps to the Recipe tab
- [ ] Freshness shows as guidance, not just a badge: degassing / peak / fading each give different advice; espresso wording differs
- [ ] Carry-the-thread line appears when the current recipe is a child version: "Continuing vN — last change: X→Y (improved/worse)"; hidden for a first-version recipe
- [ ] Recent brews list removed from the home (recipes still in Library); boots clean, no console errors
- [ ] Update toast after deploy (cache v1.9.0)

## Sprint 12 (v2.0.0) — Recipe tab redesign: methods, quick recipes, grind
- [ ] Brew Method shows 3 collapsible categories (Gravity / Pressure / Immersion); only the active method's category is open on load; ~20 methods reachable one tap away
- [ ] Selecting a method in a collapsed category works; loading a recipe opens its method's category
- [ ] Brew Parameters appears directly below Brew Method (Bean & Recipe Details moved below Parameters)
- [ ] Ratio presets (1:14–17) sit directly above the Ratio dial; Temp presets (88–98°) above the Temp dial
- [ ] Quick Recipes rail appears at top of Brew Parameters for methods that have recipes (V60/Chemex/Kalita/AeroPress/French Press/Espresso/Moka/Clever); tapping a card fills dose/ratio/temp (+espresso yield/shot) and a coarseness hint; rail hides for methods without recipes
- [ ] Grind Setting unit + placeholder + info adapt to the selected grinder; "Other" reveals custom unit/min/max; known grinders hide them
- [ ] Coarseness word-select removed; dynamic fine→coarse bar shows a caret from (setting−min)/(max−min) with the method's target band overlaid (in range / off target); legacy grindCoarseness still positions the caret + renders in diffs
- [ ] Espresso still shows yield/shot/pressure/preinfusion fields
- [ ] Update toast after deploy (cache v2.0.0)

## Sprint 13 (v2.1.0) — Quick recipes for every method
- [ ] Every one of the 20 methods now shows a Quick Recipes rail (no method is empty); 37 recipes total
- [ ] New methods have attributed recipes: Origami (Kurasu, Equator), Melitta (Voltage), Phin (CAFELY), Cold Drip (Padre), Flair (Flair official, Lance Hedrick "soup"), Cafelat Robot (Cafelat, Hoffmann-style), Nanopresso (Wacaco), Hario Switch (Hoffmann ×2), Siphon (Hario), Cold Brew (Hoffmann RTD, ATK concentrate), Turkish (Mehmet Efendi), Cupping (SCA protocol)
- [ ] Enriched: Chemex +2 (Blue Bottle, Equator), Kalita Wave +2 (George Howell, Ozone), AeroPress +1 (2023 WAC champion Tay Wipvasutt), Espresso +2 (Ristretto 1:1.5, Lungo 1:3)
- [ ] Tapping any card fills dose/ratio/water/temp/grind correctly; large-batch values (Cold Brew 80g/255g, Cold Drip 60g) and unusual ratios (Phin 1:6, Cupping 1:18.2, Turkish 1:10) apply without clamping (temp stays ≤100)
- [ ] Each card shows name · author · stats; technique is the hover/title tooltip; every recipe has a source URL
- [ ] Update toast after deploy (cache v2.1.0)

## Sprint 14 (v2.2.0) — Redesign: visual system, AI woven through, polish
Visual system & a11y (Cycle 2)
- [ ] One token set drives type/space/elevation/focus (added :root after the v13 block); the app looks unchanged from v2.1.0 except the refinements below (no regressions)
- [ ] Keyboard Tab shows a clear accent focus ring (`:focus-visible`); mouse clicks do NOT show it
- [ ] `prefers-reduced-motion` disables animations/transitions; scrollbars are thin & themed; text selection is warm
- [ ] The active bottom-tab has a small crema indicator bar; tapping method/recipe cards gives a press-scale; selected-method ring is clearer
AI woven through the flow (Cycle 3) — all work with AND without an API key
- [ ] Recipe → "Suggest a starting point": pick a taste goal (Balanced/Brighter/Sweeter/Stronger) → a recipe appears; "Apply to dials" fills dose/ratio/water/temp/grind; no-key uses the method's quick recipe
- [ ] Recipe → "What do these mean?": plain-language, number-aware explanation of the current dose/ratio/temp/grind (espresso wording differs)
- [ ] Lab → Stats → "Find my patterns": with ≥3 rated brews shows clustering of best cups; <3 shows a friendly "rate a few more" message
- [ ] Recipe version-diff card → "Explain this change": maps each param change to a sensory effect + the rating verdict
- [ ] Each AI panel shows a source/footnote; AI failures fall back to the built-in read; the existing dial-in + bag-scan still work
Empty states & desktop (Cycle 4)
- [ ] Empty Journal shows "Your journal is empty" + a "Build your first recipe" CTA (jumps to Recipe); no-match search shows a warm "No matches" message
- [ ] Wide screens still show the existing sticky top-nav cleanly (no regression from the token/a11y changes); mobile (iPhone) bottom-nav unchanged
- [ ] Update toast after deploy (cache v2.2.0)

## Sprint 15 (v2.3.0) — IA cleanup: tab labels + water merge (Cycle 1)
- [ ] Tab bar reads Brew · Recipe · Taste · Journal · Insights (was Brew · Recipe · Evaluate · Library · Lab); internal tab ids unchanged so all switchTab() calls still work
- [ ] The Insights tab uses a chart icon; it holds Stats, SCA Cupping, Print, Settings, About (the Water Calculator was moved out)
- [ ] Inside the Journal tab the view toggle reads "List / Timeline" (the inner view was renamed from "Journal" to avoid clashing with the tab name)
- [ ] Recipe → "Water" section now contains BOTH the chemistry fields (TDS/GH/KH/brand) AND, under a "Mix your water — two-concentrate method" divider, the calculator (Target GH/KH, Batch → GH/KH stock grams + distilled top-up); calcWater() works; only one #wcGH/#wcKH/#wcL/#wcOut exists
- [ ] The old standalone "Water Recipe Calculator" section in Lab/Insights is gone; no duplicate water feature
- [ ] Copy is consistent: "Journal → Export All" / "backups from the Journal" / "rate your cup in Taste" / brew-time toast says "Taste ›" / dial-in says "see the water calculator in Recipe"
- [ ] Simple mode still hides the (now merged) Water section; boot test still passes (5 panels, Brew active)
- [ ] Update toast after deploy (cache v2.3.0)

## Sprint 16 (v2.4.0) — Review board: correctness & safety (Release 1 of 3)
- [ ] SECURITY: toast no longer interprets HTML — a recipe/bean named `<img src=x onerror=...>` shows as literal text and runs nothing (showToast now uses textContent)
- [ ] COFFEE: Turkish maps to the finest grind band (espresso), not the coarsest (French press) — grindBandKey('Turkish') === 'espresso'
- [ ] Typing a negative dose/water or a zero/negative ratio clears that field instead of producing "1:-12" that leaks into extraction/AI (_sanitizeAmounts in the recalc functions)
- [ ] Water calculator floors GH/KH/L at 0 and warns ("⚠ Those targets need more concentrate than X L can hold…") when targets exceed the batch, instead of silently showing 0 g distilled
- [ ] iOS: every form input is ≥16px on touch devices so Safari no longer zooms in on focus (the dial scrubber numerals and recipe-name hero keep their larger size)
- [ ] iOS: the bag scanner file input no longer forces the live camera — the Photo Library / Choose File option is available again (removed capture="environment")
- [ ] The fractal-noise overlay no longer sits above modals/toasts/onboarding (z-index 9999 → 100); modals render clean
- [ ] SCA Cupping section is labelled "Legacy 2004 form (pre-CVA)"
- [ ] npm run check green (2.4.0 synced); existing features unaffected
- [ ] Update toast after deploy (cache v2.4.0)

## Sprint 17 (v2.5.0) — Review board: accessibility (Release 2 of 3)
All added as boot-time enhancers (initControlsA11y / initFieldLabels / initModalA11y) — no markup churn.
- [ ] Method cards are keyboard-operable: Tab to focus, Enter/Space selects, role=button + aria-pressed reflects the active method (verified: Enter on Chemex selects it)
- [ ] Flavor & issue tags are keyboard-operable (role=button/tabindex/aria-pressed via delegated keydown; aria-pressed updates on toggle; custom + loaded tags get it too via refreshTagsA11y)
- [ ] Every .field input is now programmatically labelled (label.htmlFor ↔ input.id) — screen readers announce the field name (verified beanOrigin)
- [ ] Modals (settings/scan/saveChoice/import/compare) are role=dialog aria-modal: opening moves focus inside, Tab is trapped, Escape closes, focus returns to the opener (verified settings)
- [ ] Tab bar has tablist/tab/tabpanel semantics + aria-selected + Left/Right arrow roving; aria-selected updates on tab change
- [ ] Dial scrubbers announce a human value: aria-valuetext "15 grams" / "1 to 16" / "93 degrees Celsius"; aria-valuenow no longer empty
- [ ] The dial-in assistant output (#dialinOut) is a polite live region (role=status aria-live)
- [ ] Focus ring brightened to solid --accent-bright (#f0c294) so the indicator clears 3:1 on dark backgrounds
- [ ] npm run check green (2.5.0 synced); 5 panels, Brew active; existing pointer/mouse flows unaffected
- [ ] Update toast after deploy (cache v2.5.0)

## Sprint 18 (v2.6.0) — Review board: soul & craft (Release 3 of 3, part 1)
- [ ] Brew-Along finish is a ritual, not a chore: "✓ That's brewed / Let it settle. Take the first sip before you judge it." (was "let it finish draining, then rate your cup in Taste")
- [ ] The Taste tab opens with a human prompt before the score grid ("First, just taste it. Sweet or sharp, bright or heavy — what jumps out?…") and a warmer subtitle ("Taste it first — then let the numbers agree")
- [ ] Brewer's Notes placeholder is beginner-friendly ("How was it? Sweet or sharp, thin or full…") instead of competition jargon (Rao spin / channeling / drawdown)
- [ ] The two golds are harmonized: --accent #c8956c→#d3a06f and --accent-warm #d4a574→#e0b07f so the button/tab-indicator gradient matches the brighter --accent-bright text gold (no more split temperature)
- [ ] The "Keep editing" button in the save-choice modal now has a visible background (btn-secondary, was a bare .btn)
- [ ] npm run check green (2.6.0 synced); verified the Taste warmth + accent in preview
- [ ] DEFERRED to a later polish (owner's eye, they change the signature look): full raw-glyph→SVG icon sweep, single unified timer-ring component, consolidating the 4 :root token blocks, bean-over-its-life arc, celebrate personal-best
- [ ] Update toast after deploy (cache v2.6.0)

## Sprint 19 (v2.7.0) — Soul & craft, part 2
- [ ] Celebrate a personal best: rating a brew higher than the best rating among its earlier versions (the parentId lineage) fires "New best for this recipe — N★ beats your M★" + confetti/haptic. A rating at or below the prior best does NOT fire. Only fires once per loaded cup (re-armed on recipe load / clearRating). New recipes with no rated ancestors never fire (nothing to beat).
- [ ] The two timer rings share one identity: the Brew-Along ring is now stroke-width 12 (was 7) with the same drop-shadow glow (var(--accent-glow)) and bg-surface track as the Brew-tab ring
- [ ] npm run check green (2.7.0 synced); verified the personal-best logic in preview (ancestorBestRating, fire/no-fire/once)
- [ ] Still DEFERRED (a dedicated pass): full raw-glyph→SVG icon sweep (needs dynamic Start/Pause label handled + ~10 symbols + ~50 swaps), consolidating the 4 :root token blocks, the bean-over-its-life arc
- [ ] Update toast after deploy (cache v2.7.0)

## Sprint 20 (v2.8.0) — Full glyph→SVG icon sweep
- [ ] 11 new sprite symbols added: i-play, i-pause, i-lap, i-bolt, i-copy, i-trash, i-close, i-chev-left, i-chev-right, i-chev-down, i-plus
- [ ] Every raw-glyph UI icon is now an SVG <use> matching the existing 1.8px-stroke set: timer Start/Reset/Lap (Start/Pause/Resume update via setTimerBtns + ICON_PLAY/ICON_PAUSE), Brew-Along, Edit/Switch recipe, New/Duplicate/Delete, Get Dial-In Advice, Brew Again (×2 + plan), Brew last again, Save bean/setup, Auto-Distribute, Show tips again, modal/scan/settings/exit closes, Prev/Next, "More details"
- [ ] Section headers and method-category headers use an SVG chevron that still rotates on collapse (transform applies to the element); verified .section-toggle svg + .method-cat-toggle svg
- [ ] Pour cards: bloom marker is a water-drop icon, each pour-remove is a close icon; library card delete is a close icon (delBtn now innerHTML)
- [ ] Intentionally left as typographic prose (not button icons): the onboarding feature mnemonics were converted; the ba-hint "‹ tap the screen edges ›" stays as instructional prose; "×2 pts" in cupping labels is a multiplication sign, not an icon
- [ ] npm run check green (2.8.0 synced, 180 IDs / 92 handlers); verified icons render in preview (Start/Lap/section-toggle/bloom/pour-remove all SVG, no broken <use>)
- [ ] Update toast after deploy (cache v2.8.0)

## Sprint 21 (v2.9.0) — v5.0 sprint, Cycle 1: AI discoverability
- [ ] Every AI panel's no-key footnote ("Add an API key in Settings…") is now a one-tap link (.link-btn → openSettingsToKey) that opens Settings and focuses the API-key field (verified: explainer link opens settings, labApiKey focused)
- [ ] Covers dial-in, parameter explainer, suggester, pattern-detection, version-diff — the AI is no longer silently rule-based with no obvious path to unlock it
- [ ] npm run check green (2.9.0 synced); existing no-key fallbacks still work
- [ ] Update toast after deploy (cache v2.9.0)

## Sprint 22 (v2.10.0) — v5.0 sprint, Cycle 2: skill-tier discoverability
- [ ] A compact tier pill in the header shows the current experience level (Beginner/Enthusiast/Expert) — previously invisible after onboarding (updateTierPill, called from applyMode so it tracks every change)
- [ ] Tapping the pill opens Settings and focuses the level picker (openSettingsToSkill); changing the level updates the pill text + the skill-* body class live (verified beginner↔expert)
- [ ] Header does not overflow at 375px (measured: headerScrollW==clientW; logo truncates, pill 76px); pill hidden only if no skill set
- [ ] npm run check green (2.10.0 synced)
- [ ] Update toast after deploy (cache v2.10.0)

## Sprint 23 (v2.11.0) — v5.0 sprint, Cycle 3: AI loading states
- [ ] All AI panels now show a calm animated three-dot pulse while thinking instead of flat "Thinking…" text — explainer, suggester, pattern-detection, version-diff (via aiThinking helper) and the dial-in ("Analyzing your recipe …")
- [ ] Dots are decorative (aria-hidden); the live region still announces the label only; respects prefers-reduced-motion (dots go static)
- [ ] Verified: aiThinking() outputs heading + label + 3 dots resolving the aiDot animation
- [ ] npm run check green (2.11.0 synced)
- [ ] Update toast after deploy (cache v2.11.0)

## Sprint 24 (v2.12.0) — v5.0 sprint, Cycle 4: warmer empty states (Insights)
- [ ] The two Stats charts now use journey-framed empty copy instead of deficiency-framed: scatter "Log a few rated brews with extraction % — your sweet spot maps here"; timeline "Rate a couple of brews — your progress curve grows here" (was "Need 2+…")
- [ ] Rendered in the muted chart-text colour so they read as calm guidance, not errors; drawStats runs clean on the empty path (verified 0/0 points, no error)
- [ ] npm run check green (2.12.0 synced)
- [ ] Update toast after deploy (cache v2.12.0)

## Sprint 25 (v2.13.0) — v5.0 sprint, Cycle 5: dial-in cross-link from Recipe
- [ ] The Recipe → Brew Parameters AI row has a third pill "Dial in a cup" (bolt icon) that jumps to Taste and opens the dial-in assistant — fixes the board's "weak dial-in scent" (verified: from Recipe, click → evaluate tab active + sec-dialin open)
- [ ] openDialinFromNudge now switches to the Taste tab first (works from anywhere, not just the rating nudge) and sets aria-expanded on the dial-in header
- [ ] npm run check green (2.13.0 synced, 93 handlers)
- [ ] Update toast after deploy (cache v2.13.0)

## Sprint 26 (v2.14.0) — v5.0 sprint, Cycle 6: desktop 2-col Journal list
- [ ] On wide screens (≥900px) the saved-recipe List view renders 2-up instead of stretching cards to 980px (#libraryList.list-grid → grid; verified 460px×2 at 1120px)
- [ ] Scoped to the List view only — the Timeline view (date-grouped) stays single-column (class toggled in renderLibrary vs renderJournal); mobile (<900px) unchanged (block)
- [ ] npm run check green (2.14.0 synced)
- [ ] Update toast after deploy (cache v2.14.0)

## Sprint 27 (v2.15.0) — v5.0 sprint, Cycle 7: Recipe progressive disclosure (part 1)
- [ ] Calm beginner default: a Beginner opens the Recipe tab to Method + Brew Parameters, with the optional Bean & Recipe Details collapsed (one tap to open) — applyInitialDisclosure at boot, skill-beginner only
- [ ] Enthusiast/Expert keep Bean details expanded; Method + Parameters stay open for everyone (essentials); Water already hidden in simple mode (verified beginner collapsed/expert open, aria-expanded synced)
- [ ] Boot-only — does not re-collapse if the user opens it mid-session; reverts to calm default next load
- [ ] npm run check green (2.15.0 synced)
- [ ] Update toast after deploy (cache v2.15.0)

## Sprint 28 (v2.16.0) — v5.0 sprint, Cycle 8: beginner grind readout
- [ ] Beginners (who have the full grind controls beginner-hidden) now see a simple read-only "Grind · <descriptor>" line reading the grindCoarseness the quick recipe / suggestion set — fills the gap where a beginner saw no grind info at all (verified "Grind · Medium-Fine" after applying a V60 quick recipe)
- [ ] Shown only for skill-beginner (updateGrindReadout via updateGrindVisual); Enthusiast/Expert keep the full grinder picker + setting + bar and do NOT see the readout (verified hidden for enthusiast)
- [ ] When nothing is set: "Pick a recipe and the grind comes with it"
- [ ] npm run check green (2.16.0 synced)
- [ ] Update toast after deploy (cache v2.16.0)

## Sprint 29 (v2.17.0) — Keep screen awake for any live brew
- [ ] The screen now stays awake whenever a brew is live — the inline Brew-tab timer (Start), not just Brew-Along (real kitchen need: phone no longer sleeps mid-pour)
- [ ] Unified via syncWakeLock() (acquires when timerRunning || baActive, releases otherwise); wired into toggleTimer, resetTimer, enterBrewAlong, exitBrewAlong, and visibilitychange (re-acquires on return — wake locks auto-drop when hidden)
- [ ] Fixes a latent gap: exiting Brew-Along while the timer was still running used to kill the lock; now it stays on if the timer runs
- [ ] Idempotent + guarded (navigator.wakeLock absent → no-op); on iPhone Safari (secure context) it holds; verified no errors + correct wiring (preview is visibilityState:hidden so it can't hold a lock, as expected)
- [ ] npm run check green (2.17.0 synced)
- [ ] Update toast after deploy (cache v2.17.0)

## Sprint 30 (v2.18.0) — Bigger tap target for the destructive "Remove pour" X
- [ ] In the pour-schedule editor, each pour card's "Remove pour" X now has a 44×44 touch target (was ~29×25) — easier one-handed in the kitchen, harder to fat-finger a destructive delete
- [ ] Visual unchanged: `.pour-card-head` stays ~24px tall (negative margins absorb the larger hit box); icon still right-aligned
- [ ] Added :focus-visible styling to match :hover (keyboard parity on the destructive control)
- [ ] Still guarded: removing the last remaining pour is blocked with a "Need at least one pour" toast (unchanged)
- [ ] npm run check green (2.18.0 synced); verified rendered button = 44×44 via DOM measurement
- [ ] Update toast after deploy (cache v2.18.0)

## Sprint 31 (v2.19.0) — AI dial-in now knows bean freshness
- [ ] With an API key set + a Roast Date logged, dial-in advice factors in degassing/staleness (previously the AI got the raw roast date but no "today," so it couldn't compute days-off-roast)
- [ ] getDialinAdvice() computes freshnessInfo(roastDate) and passes a "FRESHNESS: Day N · <state>" line to the model; system prompt now tells it how freshness shifts the diagnosis (very fresh → sour/gassy/uneven; past ~5 weeks → flat/hollow, not fixable by grind alone)
- [ ] Freshness clause is method-neutral → espresso advice stays espresso-specific (no bloom/pour language leaks in)
- [ ] No roast date logged → "FRESHNESS: roast date not logged" (no crash, no false precision); invalid date handled the same
- [ ] No-key rule fallback unchanged; AI source line still notes when advice is "informed by N past iterations"
- [ ] npm run check green (2.19.0 synced); freshness line verified for degassing/peak/fading/no-date via preview eval
- [ ] Update toast after deploy (cache v2.19.0)

## Sprint 32 (v2.20.0) — AI suggester also knows bean freshness
- [ ] The "Suggest a starting point" AI now receives bean freshness (days off roast) in beanBits, matching the dial-in; system prompt tells it very fresh coffee brews unevenly / aged coffee has faded aromatics
- [ ] No roast date → freshness "roast date not logged" (no crash); rule-based ruleSuggest fallback unchanged
- [ ] Espresso still gets espYield/espShot keys; grind enum unchanged
- [ ] npm run check green (2.20.0 synced)
- [ ] Update toast after deploy (cache v2.20.0)

## Sprint 33 (v2.21.0) — 44px tap targets for the pour-editor actions
- [ ] "+ Add Pour" and "Auto-Distribute" in the Pour Schedule controls are now ≥44px tall (were 38px), scoped via `.pour-controls .btn { min-height:44px }` — no change to the global `.btn-sm`
- [ ] Completes the pour-editor touch-target pass started in v2.18.0 (Remove-X)
- [ ] npm run check green (2.21.0 synced); rendered heights verified via DOM measurement
- [ ] Update toast after deploy (cache v2.21.0)

## Sprint 34 (v2.22.0) — 44px targets for the primary in-kitchen controls
- [ ] Brew-tab timer buttons (Start/Pause, Reset, Lap) are now ≥44px tall (scoped `.timer-buttons .btn`) — the most-tapped controls during a live brew, often one-handed
- [ ] Settings gear is now 44×44 (was 42) with the icon flex-centered
- [ ] Tier pill left as-is (a persistent-background chip; min-height would balloon it — not worth a pseudo-element hack for a minor secondary control)
- [ ] npm run check green (2.22.0 synced); rendered heights verified via DOM measurement
- [ ] Update toast after deploy (cache v2.22.0)

## Sprint 35 (v2.23.0) — accessible names for 10 unlabeled form controls
- [ ] Screen readers now announce a name for: recipeName, beanProfileSelect (Recipe); customTagInput, brewerNotes, dialinNotes (Taste); librarySearch, libraryMethodFilter, librarySort, shareCodeBox, importCodeBox (Library)
- [ ] All via aria-label (placeholders are not a reliable accessible name); no visible layout or behavior change
- [ ] Flavor-tag chips (33px) and ratio chips (28px) left as-is — they pass WCAG AA target-size (≥24px) and their dense layout is intentional
- [ ] npm run check green (2.23.0 synced); verified via DOM accessible-name audit
- [ ] Update toast after deploy (cache v2.23.0)

## Sprint 36 (v2.24.0) — quiet "Rate this cup" link at brew-complete
- [ ] When the main Brew-tab timer passes the target finish, the calm done-state ("That's brewed / let it settle") now offers a quiet, optional text link "Rate this cup →" that switches to the Taste tab
- [ ] Closes the brew→rate→dial-in loop the onboarding promises, without nagging: it's a muted underlined link (not a CTA button), appears only after completion, honors "take the first sip before you judge it"
- [ ] Only shows where guideSteps exist (pour-schedule methods); espresso/immersion without a schedule unaffected; resets/hides when the timer resets
- [ ] :focus-visible parity for keyboard; arrow via &rarr; entity (no raw glyph in source)
- [ ] npm run check green (2.24.0 synced); link presence + tab switch verified via preview
- [ ] Update toast after deploy (cache v2.24.0)

## Sprint 37 (v2.25.0) — inline ideal-range hints on Water GH/KH
- [ ] GH field now shows "Ideal: 50-175 ppm" and KH shows "Ideal: ~40 ppm" inline, matching the TDS field's existing "Ideal range" hint and the section's own SCA-target footnote
- [ ] Helps a user judge their measured water as they type instead of cross-referencing the footnote below the mixing calculator
- [ ] Water section still collapsed by default + hidden in Simple mode (beginners unaffected); no behavior change
- [ ] npm run check green (2.25.0 synced)
- [ ] Update toast after deploy (cache v2.25.0)

## Sprint 38 (v2.26.0) — finish the glyph→SVG icon sweep (2 runtime icons)
- [ ] Dial-in button: after running, it reset to a raw ⚡ glyph via textContent; now restores its SVG #i-bolt via innerHTML (matches the button's initial markup) — icon no longer degrades after first use
- [ ] Compare button (Library cards): replaced the raw ⚖ glyph with a new stroke SVG symbol #i-compare (two-way swap arrows, matches the icon set)
- [ ] These were the last raw-glyph UI icons (set at runtime, so the v2.8.0 static sweep missed them); also removes two raw pictographs from source (corruption-risk per project convention)
- [ ] npm run check green (2.26.0 synced; 183 IDs present, parses, boots clean); compare icon render verified via preview
- [ ] Update toast after deploy (cache v2.26.0)

## Sprint 39 (v2.27.0) — 44px targets for the AI-invocation buttons
- [ ] The shared .ai-explain-btn pills (Suggest a starting point, What do these mean?, Dial in a cup, Explain this change, Find my patterns) are now ≥44px tall (were ~35px) — they're AI entry points tapped across Recipe/Insights
- [ ] One scoped rule (min-height on .ai-explain-btn); already inline-flex+centered so content stays centered; pill look unchanged
- [ ] npm run check green (2.27.0 synced); rendered heights verified via DOM measurement
- [ ] Update toast after deploy (cache v2.27.0)

## Sprint 40 (v2.28.0) — clarify the "Lap" timer button
- [ ] The Lap button now has a title + aria-label ("Lap — record the current time onto the next pour") — "Start"/"Reset" are self-explanatory but "Lap" was opaque to newcomers and screen-reader users
- [ ] Matches what lapTimer() actually does (stamps the live time into the next empty pour start/end as you brew)
- [ ] No behavior or layout change
- [ ] npm run check green (2.28.0 synced)
- [ ] Update toast after deploy (cache v2.28.0)

## Sprint 41 (v2.29.0) — warmer, actionable Journal no-match state
- [ ] Journal/Timeline view's "no results" state now matches the Library List view: an "No matches" title + helpful recovery line ("Try a different term, or clear them to see your whole journal") instead of the curt "No brews match your search."
- [ ] Consistency between the two views of the same data + clearer path out of a dead-end filter
- [ ] Only shows when recipes exist but the search/filter excludes all; the no-recipes empty state (libraryEmpty CTA) is unchanged
- [ ] npm run check green (2.29.0 synced); verified via preview (filter to zero in Journal)
- [ ] Update toast after deploy (cache v2.29.0)

## Sprint 42 (v2.30.0) — gentle target ranges on the espresso fields
- [ ] Shot Time field shows "Typical: 25-32s" and Pressure shows "Typical: ~9 bar" inline, parallel to the Water section's range hints; espresso-specific (only shown when Espresso is the selected method — #espressoFields display:grid)
- [ ] Yield Out intentionally has no fixed hint (it's dose×ratio, recipe-derived); Pre-infusion left unhinted (machine-dependent)
- [ ] No behavior change; respects espresso-as-distinct-workflow
- [ ] Accessibility note (this iteration's lens): computed --text-muted is #9a8a76 → 5.08:1 on cards / 5.55:1 on deep bg (passes AA); only 4.44:1 on the rarely-used --bg-surface — a global recolor was REJECTED as unwarranted + taste-territory
- [ ] npm run check green (2.30.0 synced); verified hints render under espresso via preview
- [ ] Update toast after deploy (cache v2.30.0)

## Sprint 43 (v2.31.0) — surface the dial-in journey (version lineage)
- [ ] The version-diff card (Recipe tab) now offers a collapsed "Dial-in journey · N steps" <details> listing the full lineage iterationHistory already computes (vN: what changed → improved/worse N→M★), not just the immediate parent diff
- [ ] Shown only for genuinely multi-step lineages (iterationHistory length ≥ 2); reuses existing computed data, no new storage; collapsed by default (progressive disclosure, calm)
- [ ] Appended via insertAdjacentHTML (existing immediate-diff lines + AI "Explain this change" unchanged); native <details> = accessible + zero-JS
- [ ] Surfaces the app's moat (the iterative dialing-in story) that was previously fed only to the AI
- [ ] npm run check green (2.31.0 synced); verified via preview with a synthetic 3-version chain
- [ ] Update toast after deploy (cache v2.31.0)

## Sprint 44 (v2.32.0) — align the beginner starter hint with the guided path
- [ ] The brand-new-user starter hint now reads "...A forgiving first brew — tap Brew-Along below and it guides every pour." (was "just press Start below")
- [ ] Fixes two issues: (1) the copy said "Start" while the dominant primary button is "Brew-Along Mode"; (2) it contradicted onboarding step 2 ("Brew-Along guides every pour") by steering novices to the bare stopwatch instead of the guided path built for them
- [ ] Copy-only; still only shows when isStarter && allSamples (seeded pour-over/immersion samples, which have pour weights so Brew-Along works); hides once the user edits/switches off a sample
- [ ] npm run check green (2.32.0 synced); verified hint text + starter-only visibility via preview
- [ ] Update toast after deploy (cache v2.32.0)

## Sprint 45 (v2.33.0) — Brew-Along is now a proper dialog (a11y)
- [ ] Mobile Kitchen audit (this iteration's lens): verified at 375x812 the Brew-Along bottom buttons (y688-732) clear the edge tap-zones (end y682) — no overlap/hijack; ergonomics rejected as already-solid
- [ ] Adjacent a11y gap shipped: .ba-overlay is not a .modal-overlay, so initModalA11y's dialog handling never applied. Added role="dialog" aria-modal="true" aria-label="Brew-Along guided brewing"
- [ ] Escape now exits Brew-Along (global keydown, guarded by baActive); focus moves to the Start button on open and restores to the opener (the Brew-Along button) on close — both with preventScroll
- [ ] Full Tab focus-trap deferred (residual: keyboard Tab can still reach background controls; aria-modal hides them from SR) — flagged as follow-up
- [ ] timer/wake-lock/advance behavior unchanged; exit still preserves the running timer
- [ ] npm run check green (2.33.0 synced); verified Escape-exit + focus move/restore via preview
- [ ] Update toast after deploy (cache v2.33.0)

## Sprint 46 (v2.34.0) — friendlier, actionable AI error messages
- [ ] AI Product audit (this iteration's lens): the no-key fallbacks (ruleSuggest is goal-aware, ruleDialIn is expert-level, ruleDetectPatterns computes real stats) and the calm muted upsells are well-built — rejected the "nagging keyless users" critique
- [ ] Weak moment fixed: all 5 AI features showed the raw error (e.message → "API 401"/"API 404") on failure. Added aiErrorHint(e) mapping 401/403→key not accepted, 404→model name not found, 429→rate limited, 5xx→service hiccup, network→no connection; routed all 5 catches (dial-in, explain, suggest, patterns, diff) through it
- [ ] Every feature still falls back to its rule output on error (unchanged); only the parenthetical reason is now actionable
- [ ] npm run check green (2.34.0 synced); verified aiErrorHint mapping via preview
- [ ] Update toast after deploy (cache v2.34.0)

## Sprint 47 (v2.35.0) — warm reframe on the low-rating nudge
- [ ] Emotional Design audit (this iteration's lens): empty states, chart-empties, OCR errors, the taste-prompt, rating haptics/celebrate/best-toast, and the brew-thread are all warm — rejected rating-word captions (would undercut the app's "what your mouth already knows" restraint) and a first-rating celebration (gimmicky)
- [ ] Shipped: the ≤3★ nudge (previously just a "Get dial-in advice" button) now has one calm, encouraging line — "An off cup is the most useful one: it shows exactly what to nudge next." — reframing a disappointing cup as productive, aligned with the app's improvement-loop thesis, without re-judging the user's palate
- [ ] Muted .field-hint styling, only shown on low ratings; flows into the existing dial-in CTA; no behavior change
- [ ] npm run check green (2.35.0 synced); verified nudge shows on ≤3★ and hides on 4-5★ via preview
- [ ] Update toast after deploy (cache v2.35.0)

## Sprint 48 (v2.36.0) — timed espresso shot auto-logs to Shot Time
- [ ] Advanced Coffee audit (lens): verified the timer already auto-fills totalBrewTime on stop (>=20s, only if empty, with a "Taste >" jump toast), Extraction & Results is expanded by default, number fields use decimal keyboards — the expert post-brew flow is efficient
- [ ] Espresso-specific gap fixed: timing a shot used to log to the generic Total Brew Time while espShotTime (the field espressoDialIn reads) stayed empty, forcing manual re-entry. Now on timer-stop with method===Espresso, espShotTime is filled in seconds (>=8s floor, only if empty) with a "Shot time Ns logged · Taste >" toast; non-espresso still fills totalBrewTime mm:ss (unchanged)
- [ ] Respects espresso-as-distinct-workflow; consent-safe (never overwrites an existing value); strengthens the espresso dial-in (no manual shot-time entry needed)
- [ ] npm run check green (2.36.0 synced); verified espresso fills espShotTime / non-espresso fills totalBrewTime via preview
- [ ] Update toast after deploy (cache v2.36.0)

## Sprint 49 (v2.37.0) — fix pour numbering in the printable recipe card
- [ ] Product Strategist audit (lens): habit/longitudinal reflection is strong (Insights sweet-spot, trend "the dial-in is working", best-origin; Brew-thread continuity) — rejected a Brew-landing stat (would break "threshold not dashboard") and a streak counter (gamification clutter)
- [ ] Bug fixed in printRecipe(): pours were numbered by array index, so a recipe with no bloom printed "Pour 0, Pour 1, ...". Now uses a running counter — non-bloom pours number 1,2,3 regardless of whether a bloom is present (matches the editor's reindexPours)
- [ ] The printable/shareable card is part of the ownership/distinctiveness story; numbering now reads correctly
- [ ] npm run check green (2.37.0 synced); numbering logic verified (bloom and no-bloom) via preview
- [ ] Update toast after deploy (cache v2.37.0)

## Sprint 50 (v2.38.0) — tactile grind anchor for beginners
- [ ] The beginner-only grind readout now appends a real-world analogy: "Grind · Medium-Coarse · like raw sugar" (GRIND_ANCHORS parallel to COARSE_LABELS: powdered sugar/table salt/fine sand/coarse sand/raw sugar/sea salt/peppercorns)
- [ ] De-mystifies grind (the most intimidating variable) for newcomers without reintroducing the grinder-aware bar we hide from them; muted .grind-anchor styling
- [ ] Beginner-scoped (the readout only shows under body.skill-beginner); enthusiasts/experts keep the full grind controls; no behavior change
- [ ] npm run check green (2.38.0 synced); anchor text verified across levels via preview
- [ ] Update toast after deploy (cache v2.38.0)

## Sprint 51 (v2.39.0) — keep scrolled-to sections clear of the sticky header
- [ ] Mobile Kitchen audit (lens): the scrubber/ruler dials are well-built (46px target, 30px value, reliable pointer-capture drag, clamps+step-snaps on drag AND keyboard via _scrubSnap, iOS-zoom handled). The touch-action:none scroll-trap was FLAGGED for real-device testing (pan-y fix is unverifiable in the headless preview), not shipped
- [ ] Bug fixed: there was no scroll-margin anywhere, so scrollIntoView({block:'start'}) (e.g. openDialinFromNudge → dial-in section) landed the section title behind the ~73px sticky header. Added scroll-margin-top:84px to .section (124px on desktop where the tab-bar is also sticky-top)
- [ ] Low-risk: scroll-margin only affects where scrollIntoView lands, no layout change; benefits the low-rating "Get dial-in advice" jump and any future block:start section scroll
- [ ] npm run check green (2.39.0 synced); computed scroll-margin-top + post-scroll section position verified via preview
- [ ] Update toast after deploy (cache v2.39.0)

## Sprint 52 (v2.40.0) — announce scan status + fix raw-HTML in the scanner
- [ ] Accessibility audit (lens): the 4 AI panels (suggest/explain/patterns/diff) already have role=region aria-live=polite, and dialinOut/toast are role=status — dynamic AI announcements are covered. The gap was #scanStatus (camera OCR: "Reading the label…", errors, success) with no live-region; added role=status aria-live=polite so SR users hear scan progress/results
- [ ] BUG fixed (found while auditing): the photo-selected handler set scanStatus.textContent to a string containing a <button>, so a keyless user saw raw HTML ("<button ...>Add an API key</button> to read this.") instead of a clickable link. Switched to innerHTML so the link renders (matches the 5 AI-panel no-key prompts); static string, no user input
- [ ] npm run check green (2.40.0 synced); verified scanStatus has role=status + aria-live, and the no-key status renders a real button (no literal "<button" text) via preview
- [ ] Update toast after deploy (cache v2.40.0)

## Sprint 53 (v2.41.0) — first-class framing for the keyless dial-in
- [ ] Beginner audit (lens): the AI buttons are framed as capabilities (Suggest/Explain/Find patterns, not "AI"), and the no-key outputs lead with built-in value ("Built-in expert rules", "Built-in starting point") — keyless framing is mostly first-class. The outlier was the dial-in mode hint: "Rule-based mode — add an API key…" (jargon, reads as downgraded, upsell-first)
- [ ] Reworded to "Built-in coach active — add an API key in Settings (gear icon, top right) for AI tuned to your bean" — parallels the key case ("AI mode active"), leads with value, keeps the optional upgrade secondary
- [ ] Copy-only; the keyed hint ("AI mode active (model)") is unchanged
- [ ] npm run check green (2.41.0 synced); both hint states verified via preview
- [ ] Update toast after deploy (cache v2.41.0)

## Sprint 54 (v2.42.0) — clear column headers on the recipe comparison
- [ ] Advanced Coffee audit (lens): dials are already 0.1g-precise (scrubber step 0.1 for dose/ratio, arrows ±step, shift ×10), logging is espresso-aware (v2.36), dial-in reads history — precision/efficiency are well-served. FLAGGED (recommend AGAINST): grams↔ounces units — specialty coffee is gram-native worldwide; a units system risks the gram-native data model for little gain
- [ ] Shipped: the compare table had a `.compare-table th` style defined but no <thead>, so the two recipes' columns were only identified by a plain first body row. Added a real <thead> populated with the two recipe names (accent, readable; first cell muted), removed the redundant "Recipe" body row — clearer which column is which when scanning a long comparison
- [ ] Activates the dormant intended th style; openCompare builds the header via textContent (safe); diff-row highlighting unchanged
- [ ] npm run check green (2.42.0 synced); header names + removed body row verified via preview
- [ ] Update toast after deploy (cache v2.42.0)

## Sprint 55 (v2.43.0) — warm the received-recipe hand-off
- [ ] Emotional Design audit (lens): the receive modal ("A friend shared X with you. Add it to your library?") is warm, but accepting landed the user on the Recipe (editing) tab with a cold "Recipe imported ✓" toast — a data-transaction ending for what is a gift
- [ ] addImportedRecipe now lands on the Brew threshold ("Now brewing: <gift>, ready to brew" hero) and shows a personal toast "<name> is yours, ready to brew"; switchTab('brew') refreshes the hero (renderToday/renderBrewBar) so it's not stale
- [ ] Still consent-based (the accept/decline modal is unchanged), name shown via textContent (safe against a malicious shared name); recipe still added to library + loaded
- [ ] npm run check green (2.43.0 synced); landing tab + toast verified via preview
- [ ] Update toast after deploy (cache v2.43.0)

## Sprint 56 (v2.44.0) — stop the brew guide over-announcing to screen readers
- [ ] Accessibility audit (lens): the visible #brewGuide was aria-live=polite but its content changes every second (the "next: pour 2 in 0:05" countdown), so a screen reader re-read the whole guide ~once/second during a brew — noisy
- [ ] Removed aria-live from the visible guide; added a visually-hidden .sr-only live region (#brewGuideSr role=status aria-live=polite) that updates ONLY on meaningful transitions: each step instruction once ("Bloom, pour to 50 g"; "Pour 1, pour to 150 g") and once at completion ("That's brewed. Let it settle."). Tracked via lastGuideAnnounce; reset when the guide clears
- [ ] Visual guide + countdown unchanged for sighted users; first .sr-only utility class added (standard clip pattern)
- [ ] npm run check green (2.44.0 synced); announce-on-change-only (not per-tick) + completion message verified via preview
- [ ] Update toast after deploy (cache v2.44.0)

## Sprint 57 (v2.45.0) — make "Read this label" the visual primary in the scanner
- [ ] Mobile Kitchen audit (lens): the scan flow is solid — big camera drop-zone capture (accept=image/* with no forced capture so library is allowed), 300px contain preview, retake + read, editable read-back fields. The one inconsistency: step 2's main action "Read this label" was btn-secondary (equal-weight with the ghost "Retake"), so nothing drew the eye, unlike step 3 where "Fill bean fields" is btn-primary
- [ ] Promoted #scanReadBtn to btn-primary so the next action is obvious one-handed; the "… reading" disabled state still works (only disabled+textContent change, no className reset)
- [ ] npm run check green (2.45.0 synced); button class verified via preview
- [ ] Update toast after deploy (cache v2.45.0)

## Sprint 58 (v2.46.0) — Export All is now a complete, restorable backup
- [ ] Product Strategist / data-ownership: "Export All" exported ONLY recipes, despite the label + About copy ("saves everything") — a user restoring on a new device silently lost their bean profiles and gear setups
- [ ] exportAllRecipes now writes a bundle { app, type:'brewcraft-backup', version:2, exportedAt, recipes, beans, gear } to brewcraft_backup.json; importRecipesFile restores all three (additive, dedupe by id — never overwrites), refreshes the profile selects, and reports "(+N beans, M setups)"
- [ ] Backward compatible: a bare recipe array or single recipe object still imports as recipes-only; About copy updated to "recipes, beans & gear"
- [ ] Consent-safe (no overwrite of existing items by id); localStorage keys (brewcraft_beans/gear/recipes) unchanged
- [ ] npm run check green (2.46.0 synced); export-bundle shape + round-trip restore (recipes+beans+gear) + legacy-array import verified via preview
- [ ] Update toast after deploy (cache v2.46.0)

## Sprint 59 (v2.47.0) — explain what the roast date unlocks
- [ ] Beginner audit (lens): the roast-date field was bare (label + date input + badge, no hint), yet it's the single input that unlocks the freshness badge, the warm hero freshnessGuidance, and the AI freshness context — a beginner had no reason to fill it
- [ ] Added a calm field-hint: "Add it to unlock the freshness badge and brewing tips. Coffee usually peaks ~7-21 days after roast." — explains the payoff + a concrete anchor (peak window)
- [ ] In-context (only seen when the Bean section is open), no popup/nag; helpful for all tiers; no behavior change
- [ ] npm run check green (2.47.0 synced); hint text under #roastDate verified via preview
- [ ] Update toast after deploy (cache v2.47.0)

## Sprint 60 (v2.48.0) — convey rating state to screen readers
- [ ] Accessibility audit (lens): the rating stars were keyboard/SR-operable (role=button, tabindex, aria-label, Enter/Space) but conveyed NO current value — an SR user could set a rating yet re-navigating just heard "Rate 1 of 5… Rate 2 of 5…" with no indication which was selected
- [ ] Added role=group + aria-label="Rate this cup, 1 to 5 stars" on the container, and aria-pressed on each star; setRating sets aria-pressed = (star <= value), clearRating resets to false — so SR now conveys the fill (e.g. stars 1-4 "pressed", 5 "not pressed" = 4/5)
- [ ] Kept the working Tab + Enter/Space model (no radiogroup arrow-key change); visual unchanged
- [ ] Fixed a self-inflicted typo from the batch edit (aria-label had lost its space: "Rate1 of 5" → "Rate 1 of 5")
- [ ] npm run check green (2.48.0 synced); aria-pressed reflects rating + labels correct via preview
- [ ] Update toast after deploy (cache v2.48.0)

## Sprint 61 (v2.49.0) — custom flavor tags become a reusable vocabulary
- [ ] Advanced Coffee audit (lens): custom descriptors saved to the recipe's flavorTags but did NOT persist as reusable chips — they only reappeared when that specific recipe was loaded, so on a fresh session/new cup the cloud was just presets and the taster re-typed "jasmine" every time
- [ ] Added a personal vocabulary in brewcraft_tags (new key, additive): addCustomTag persists each new descriptor; renderCustomTags() (called from loadProfiles at init) re-injects them as reusable inactive chips; setActiveTags still marks the loaded recipe's tags active
- [ ] Fixed latent dup-chip bug: typing an existing descriptor (preset or custom) now activates that chip instead of appending a duplicate (case-insensitive)
- [ ] Consent-based recipe saving unchanged (tags still via getActiveTags); existing keys untouched; new chips carry role/aria-pressed (a11y consistent with v2.48)
- [ ] FLAGGED follow-up: add customTags to the v2.46 export bundle so the vocabulary travels with a backup (currently it's embedded per-recipe but not as a standalone list)
- [ ] npm run check green (2.49.0 synced); persist + re-render + dedupe verified via preview
- [ ] Update toast after deploy (cache v2.49.0)

## Sprint 62 (v2.50.0) — cap the flavor cloud so a big vocabulary stays tidy
- [ ] Mobile Kitchen audit (lens, follow-on to v2.49): measured at 375px the 24-preset cloud is ~280px, but a heavy vocabulary (49 tags) ballooned to ~610px — burying the notes/dial-in/extraction
- [ ] Scoped #flavorTags to max-height:300px + overflow-y:auto (just above the preset height, so normal users see all presets with NO scroll — zero regression — while a large custom vocabulary scrolls within a bounded region). The "+ Add" input is outside the cloud, so it stays reachable
- [ ] Did NOT cap below preset height (would force everyone to scroll to find a preset); dialin chips (also .tag-container) unaffected — scoped to #flavorTags only
- [ ] npm run check green (2.50.0 synced); presets fit (no scroll) + 49-tag cloud capped at 300 & scrollable verified via preview
- [ ] Update toast after deploy (cache v2.50.0)

## Sprint 63 (v2.51.0) — let the service worker cache the QR lib for offline
- [ ] Offline-robustness audit (lens): the QR path already degrades gracefully (oversize guard, try/catch, onerror "needs internet once — use Copy Code"; the share code/link works fully offline). The gap: the lazy CDN script loaded WITHOUT crossOrigin, so its response is opaque and the SW (caches only basic/cors) never cached it — QR failed on every fresh offline session even after many online loads
- [ ] Added s.crossOrigin='anonymous' (cdnjs is CORS-enabled) so the response is cors → the existing SW fetch handler caches it → QR works offline after one online load
- [ ] No SW change needed; graceful onerror fallback unchanged (worst case = today's behavior); QR is still lazy-loaded (one-file model intact)
- [ ] npm run check green (2.51.0 synced); QR still generates online with crossOrigin set (no CORS regression) verified via preview
- [ ] Update toast after deploy (cache v2.51.0)

## Sprint 64 (v2.52.0) — method-category subtitles name familiar examples
- [ ] Beginner audit (lens): the Gravity/Pressure/Immersion accordions already had subtitles, but they described physics ("pour-over, percolation" / "forced through the bed" / "full steep, then separate") — opaque jargon for a newcomer
- [ ] Reworded to name familiar devices: Gravity · pour-over & drip; Pressure · espresso & moka; Immersion · French press & cold brew. The category NAME still carries the physics term (still teaches it); the subtitle now aids recognition for beginners AND everyone
- [ ] Copy-only; method grid/cards/quick-recipes unchanged
- [ ] npm run check green (2.52.0 synced); the three subtitles verified via preview
- [ ] Update toast after deploy (cache v2.52.0)

## Sprint 65 (v2.53.0) — header clears the notch in standalone PWA
- [ ] Mobile Kitchen audit (lens): method cards measure 146x73px with 10px gaps (well above 44px — no mis-tap risk; that concern unfounded). The real gap: viewport-fit=cover + black-translucent status bar + display:standalone, but the sticky header had NO env(safe-area-inset-top) — so on a notched iPhone the installed PWA's header (logo, recipe name, gear) sat under the status bar / Dynamic Island (only the tabbar padded for the bottom inset)
- [ ] Header top padding now calc(14px + env(safe-area-inset-top)); no-op where there's no notch (env()→0 keeps it exactly 14px — zero regression in browser), adds clearance only on notched standalone
- [ ] npm run check green (2.53.0 synced); preview confirms padding-top stays 14px when inset is 0 (no regression); notch clearance guaranteed by env() additive semantics
- [ ] [follow-up] consider left/right safe-area insets for landscape
- [ ] Update toast after deploy (cache v2.53.0)

## Sprint 66 (v2.54.0) — collapsed sections leave the focus + screen-reader tree
- [ ] Accessibility audit (lens): method-cat accordions are solid (aria-expanded toggled, grids display:none → out of focus). The real gap: section accordions collapse via max-height:0/overflow:hidden/opacity:0 (NOT display:none), so collapsed fields stayed in the tab order and the SR tree — keyboard users tabbed into invisible clipped inputs; SR read every collapsed section's fields
- [ ] Now toggle the `inert` attribute on .section-body when collapsed: wired in toggleSection (runtime), initSectionA11y (markup-collapsed sections at boot: Water, Share & Receive), and applyInitialDisclosure (beginner Bean collapse). Preserves the max-height animation (inert only affects focus + AT)
- [ ] Progressive enhancement: on browsers without inert (rare, pre-Safari-15.5) the prior behavior remains — no regression. Method-cat grids already display:none, unaffected
- [ ] npm run check green (2.54.0 synced); verified collapsed-section inputs are non-focusable + expand restores focusability via preview
- [ ] Update toast after deploy (cache v2.54.0)

## Sprint 67 (v2.55.0) — chart canvases hidden from screen readers (data is in text)
- [ ] Accessibility audit (lens): the Insights charts are <canvas> with no role/aria-label — opaque to SR. But the equivalent data is already text: statsMsg (counts), renderInsights chips (sweet-spot range, "trending up X vs Y", best origin), and the visible .stats-caption titles
- [ ] Marked both canvases aria-hidden="true" so SR skips the meaningless pixels and relies on the adjacent text equivalents (cleaner than a redundant role=img). No visual change for sighted users
- [ ] WCAG 1.1.1 satisfied via the in-context text alternative (captions + insight chips + statsMsg)
- [ ] npm run check green (2.55.0 synced); canvases aria-hidden + captions/insight text present verified via preview
- [ ] Update toast after deploy (cache v2.55.0)

## Sprint 68 (v2.56.0) — remember section collapse preferences across sessions
- [ ] Mobile Kitchen / Advanced audit (lens): the expert Taste tab is ~2294px (2.8 screenfuls); sections are collapsible but toggleSection didn't PERSIST the collapse state, so an expert who collapses dial-in/extraction to tighten the tab had to re-collapse every session
- [ ] toggleSection now writes sectionState{id:collapsed} to brewcraft_collapsed (new additive key); restoreSectionState() (called in init after applyInitialDisclosure) reapplies the user's explicit choices over the markup + beginner-disclosure defaults, syncing class + aria-expanded + inert (consistent with v2.54)
- [ ] Precedence: markup default → applyInitialDisclosure (beginner Bean) → user's explicit toggles win; sections never toggled keep their default
- [ ] npm run check green (2.56.0 synced); verified collapse persists + a user-expanded default-collapsed section is remembered via preview
- [ ] Update toast after deploy (cache v2.56.0)

## Sprint 69 (v2.57.0) — identifiable default name for unnamed first saves
- [ ] Beginner audit (lens): the save flow is well-built (always-visible Save button, clear consent-choice copy). Gap: saving a NEW recipe with an empty name produced "Untitled Recipe"; skip naming twice → multiple indistinguishable "Untitled" entries
- [ ] On first save of a new recipe with no name, default to "<method> · <Mon D>" (e.g., "V60 · Jun 19") and populate the name field visibly so the user can refine it. Forgiving, identifiable, transparent
- [ ] Only the new-recipe path with an empty name (named saves + the version path unchanged); consent flow untouched
- [ ] npm run check green (2.57.0 synced); verified unnamed new save gets a method+date name (and a named save is untouched) via preview
- [ ] Update toast after deploy (cache v2.57.0)

## Sprint 70 (v2.58.0) — symmetric praise nudge for a good cup
- [ ] Product Strategist lens: retention is intentionally intrinsic (no notifications/streaks). The real asymmetry: a low rating (<=3) gets a constructive dial-in nudge (v2.35), but a high rating (4-5) dead-ends after the confetti — no calm "what next"
- [ ] Added #ratingPraise (4-5 stars): "A keeper: it's saved, and ready to brew again whenever." — completes the rating feedback (low → fix via dial-in; high → it's captured & repeatable, the app's core value) without gamifying. Mutually exclusive with the low-rating nudge; both hidden at 0
- [ ] Calm muted field-hint, text-only (no pushy CTA / no "come back" hook); setRating shows it for v>=4, clearRating hides it
- [ ] npm run check green (2.58.0 synced); verified praise shows at 4-5, low-nudge at <=3, neither at 0 via preview
- [ ] Update toast after deploy (cache v2.58.0)

## Sprint 71 (v2.59.0) — warm relative day labels in the Journal
- [ ] Emotional Design lens: the Journal already tells a chronological story (date-grouped entries + ratings/notes/version), but recent groups used clinical full dates ("Thu, Jun 19, 2026"). A count/"since" header was rejected — counting is ambiguous (seeded samples vs real brews, rated vs not)
- [ ] fmtDay now returns "Today" / "Yesterday" for the two most recent days, else the full date — makes recent brews feel immediate/personal. Unambiguous, journal-scoped
- [ ] Consistency: compares iso to today's/yesterday's UTC date slice (same basis as createdAt + the journal grouping) — no timezone drift vs the grouping
- [ ] npm run check green (2.59.0 synced); verified Today/Yesterday/old-date mapping + a today brew groups under "Today" via preview
- [ ] Update toast after deploy (cache v2.59.0)

## Sprint 72 (v2.60.0) — disable the inert sort control in Timeline view
- [ ] Advanced Coffee lens: retrieval is well-covered in List view (getFilteredRecipes: search name/origin/roaster + method filter + sort incl "Highest rated" — so "5★ Ethiopia" = search + sort). Gap: the Timeline view ignores the sort (always newest-first), so the sort dropdown silently did nothing there — a UX smell
- [ ] setLibraryView now disables #librarySort in Timeline (with a title "Timeline is always newest-first — switch to List to sort") and re-enables it in List; the select value is preserved across the switch. Search + method filters still work in both views
- [ ] Added .library-filters select:disabled { opacity .5; not-allowed } for a clear disabled appearance
- [ ] npm run check green (2.60.0 synced); verified sort disabled in Timeline / enabled in List, value preserved, search+method still active via preview
- [ ] Update toast after deploy (cache v2.60.0)

## Sprint 73 (v2.61.0) — expose the active Journal view to screen readers
- [ ] Accessibility lens: the List/Timeline toggle buttons are real buttons (keyboard-OK) but the active view was conveyed only by the visual active-view class — no aria-pressed, so SR users couldn't tell which view is selected (same gap class as the v2.48 rating stars)
- [ ] Added role=group + aria-label="Journal view" on the chip-row, aria-pressed on both buttons, synced in setLibraryView (List pressed when list, Timeline pressed when journal); visual unchanged
- [ ] npm run check green (2.61.0 synced); verified aria-pressed tracks the active view via preview
- [ ] Update toast after deploy (cache v2.61.0)

## Sprint 74 (v2.62.0) — single-line form controls meet the 44px tap target
- [ ] Mobile Kitchen UX lens: measured controls at 390px width — `.field` inputs/selects (Settings, Water chemistry, dial-in text fields) rendered 40px tall and `.library-filters` (Journal search/sort) ~41px, below the 44px target the rest of the app (buttons, steppers, icon-btns) already meets
- [ ] Added min-height:44px to `.field input, .field select` and `.library-filters input, .library-filters select` — textareas left alone (taller by design; avoids specificity collision with .notes-box/.dialin-textarea)
- [ ] npm run check green (2.62.0 synced); verified all settings + filter controls now >=44px via preview at 390px
- [ ] Update toast after deploy (cache v2.62.0)

## Sprint 75 (v2.63.0) — beginner orienting line above the dial-in chips
- [ ] Beginner User lens: the Dial-In Assistant shows 10 defect-vocabulary chips (Sour/Bitter/Astringent/Hollow/Muted/Harsh…) with no orientation — a beginner can't tell which word matches their cup, and the core sour=under / bitter=over mental model was only revealed AFTER they picked a chip (in ruleDialIn output)
- [ ] Added a beginner-only `.dialin-coach-hint` line above the chips ("Sour & sharp → grind finer; Bitter & harsh → grind coarser; tap whatever's closest, no wrong answer"); display:none by default, display:block under body.skill-beginner (mirrors the .grind-readout pattern) — enthusiasts/experts see nothing; additive, no JS
- [ ] npm run check green (2.63.0 synced); verified hint visible for beginner skill + hidden for enthusiast/expert via preview
- [ ] Update toast after deploy (cache v2.63.0)

## Sprint 76 (v2.64.0) — one-tap revert when a dial-in made the cup worse
- [ ] Advanced Coffee User lens: the app advises "consider reverting" in two places (dial-in output + the version-diff "worse, consider reverting" verdict) but offered no way to do it — a power user who made the cup worse had to hunt the parent version in the Journal by hand
- [ ] Added a "Go back to vN (your better cup)" button in the version-diff card, shown ONLY when the current version is rated strictly worse than its parent (rA && rB && rB<rA); calls new loadParentVersion() → loadRecipe(parent.id) + switchTab('recipe') + toast. Non-destructive (worse version stays saved); matches the existing loadRecipe dirty/autosave behavior
- [ ] npm run check green (2.64.0 synced); verified button appears only when child rated worse than parent, loads the parent, and is absent when improved/unchanged via preview
- [ ] Update toast after deploy (cache v2.64.0)

## Sprint 77 (v2.65.0) — the dial-in journey tells the arc, not a step count
- [ ] Emotional Design lens: the multi-brew arc surfaced only as a collapsed "Dial-in journey · N steps" — N capped at 3 (iterationHistory's AI-token cap), framed as a debug log. A user who took a bean 2★→5★ over 6 brews saw "3 steps", not their story
- [ ] Reworded the journey <details> summary to walk the full parentId chain (uncapped) and show "Your dial-in journey · N brews · firstRated★ → currentRated★" (arc shown only when the current cup is rated strictly better than the first rated cup in the lineage; honest — no false progress). Same element, no new UI; body steps unchanged
- [ ] npm run check green (2.65.0 synced); verified summary shows brew count + rating arc on an improving lineage, count-only when flat/declining via preview
- [ ] Update toast after deploy (cache v2.65.0)

## Sprint 78 (v2.66.0) — make the "Explain this change" AI actually bean-aware
- [ ] AI Product lens: the version-diff "Explain this change" AI (explainDiff) sent only METHOD + CHANGES + RATING — no bean data — so it could only produce the same generic read as the keyless ruleExplainDiff, just slower. Yet the keyless CTA promises "Add an API key for a bean-aware explanation" — an unkept promise; the AI felt bolted on
- [ ] Carried bean context in _lastDiff (beanOrigin/beanVarietal/beanProcess/roastLevel/roastDate) and fed BEAN + FRESHNESS (via freshnessInfo) lines into the explainDiff prompt + told the system prompt to make the read specific to that coffee. Added an ESPRESSO guard line (espresso terms only, no pour-over language) to honor espresso-stays-espresso
- [ ] npm run check green (2.66.0 synced); verified userMsg includes BEAN + FRESHNESS for a bean recipe and the ESPRESSO note for espresso, via preview (prompt-construction inspection; no live API call)
- [ ] Update toast after deploy (cache v2.66.0)

## Sprint 79 (v2.67.0) — accessible labels on read-only rating-star displays
- [ ] Accessibility lens: the read-only `.recipe-card-stars` displays render as '★'.repeat(rating) with no label, so a screen reader announces "black star black star black star" instead of the rating. Three spots: library recipe card (~4062), Today best-brew card (~5042), journal entry (~5318). The interactive rater already had labels (v2.48); these passive displays were missed
- [ ] Added role="img" + aria-label="N of 5 stars" to all three star spans (SR now reads the rating, ignores the glyph repetition). Visual unchanged; the ★ escapes preserved (only added attribute lines)
- [ ] npm run check green (2.67.0 synced); verified the three star spans expose role=img + "N of 5 stars" via preview
- [ ] Update toast after deploy (cache v2.67.0)

## Sprint 80 (v2.68.0) — resume the last-open recipe across sessions
- [ ] Product Strategist lens: on reopen, init always did loadRecipe(recipes[0].id) — the newest recipe by array position — with no memory of what you last had open. A user dialing in an older recipe yesterday, who has a newer one at index 0, reopened onto the wrong recipe; the renderThread continuity broke across sessions (cold-start feel)
- [ ] New additive key brewcraft_last: written in loadRecipe (on open) and saveToStorage (on any save, when currentRecipeId truthy). init now reads it and prefers that recipe if it still exists, else falls back to recipes[0]. Draft restore still takes precedence; deleted/missing id falls back gracefully
- [ ] npm run check green (2.68.0 synced); verified brewcraft_last is written on load + persists, and init resumes that recipe (not recipes[0]) via preview; missing-id falls back
- [ ] Update toast after deploy (cache v2.68.0)
- [ ] NOTE: storage keys now also include brewcraft_last (v2.68) — additive, no migration

## Sprint 81 (v2.69.0) — first-run onboarding overlay is now a real dialog
- [ ] Beginner User lens: onboarding content/flow is solid (3 clear steps, graceful Skip, skill persisted, starter hint after). But the .ob-overlay — the literal first screen a new user touches — was never a real dialog: no role/aria-modal, focus not moved into it, no Escape. Every .modal-overlay got this in v2.5.0 and the Brew-Along overlay in v2.33; onboarding was left behind. Matters most for a VoiceOver beginner on iPhone (primary platform)
- [ ] Added role=dialog + aria-modal=true + aria-label + tabindex=-1 to .ob-card; showOnboarding focuses the card and attaches an Escape→obSkip handler; obFinish detaches it. Full Tab focus-trap deferred (matches the v2.33 precedent)
- [ ] npm run check green (2.69.0 synced); verified dialog attributes present, Escape handler wired (keydown→obSkip closes + marks onboarded), and handler detached on finish via preview
- [ ] Update toast after deploy (cache v2.69.0)

## Sprint 82 (v2.70.0) — Brew-Along overlay scrolls instead of clipping on short screens
- [ ] Mobile Kitchen UX lens: the .ba-overlay used justify-content:center with no scroll. Measured: at 390x844 it fits and Start sits in the thumb zone (good); at 390x667 it fills exactly; but in LANDSCAPE (740x390 — a phone propped on the counter while brewing hands-free) content overflowed (411>390) with overflow:visible, so the Start button was clipped below the screen (unreachable) and the step label clipped above
- [ ] Changed .ba-overlay to justify-content:safe center + overflow-y:auto + overscroll-behavior:contain. safe center start-aligns when overflowing so the top stays reachable; overflow-y:auto adds scroll only when needed. Portrait unchanged (no overflow → no scroll, still perfectly centered, gapTop==gapBottom); landscape now scrolls with both Start (bottom) and step label (top) reachable
- [ ] npm run check green (2.70.0 synced); verified via preview at 390x844 (centered, no scroll), 390x667 (fits), 740x390 (scrolls, Start + step both reachable)
- [ ] Update toast after deploy (cache v2.70.0)

## Sprint 83 (v2.71.0) — the immersive Brew-Along gets a real completion moment
- [ ] Emotional Design lens: the Brew tab fires a warm "That's brewed. Let it settle. Take the first sip…" + Rate link at completion, but the immersive Brew-Along overlay (updateBATheater) only turned the ring green — the timer kept counting up on the last pour step with no closure, no hand-off. The more ceremonial mode had the flattest ending (its "That's brewed" message renders in #brewGuide, hidden BEHIND the overlay)
- [ ] Added a baDoneFired-guarded completion block in updateBATheater (sec>=baTotalSec): baStepLabel→"Brew complete", baTarget→"That's brewed", baTechnique→"Let it settle…", fill→100%, reveal a new hidden #baRateBtn (.btn-primary "Rate this cup →" → rateFromBrewAlong = exit + switchTab evaluate). Guarded baAutoAdvance with `if (baDoneFired) return;` so it stops clobbering baNextInfo. Reset in enterBrewAlong + resetTimer. The shared updateBrewGuide still fires the one-time beep/haptic (no double cue)
- [ ] npm run check green (2.71.0 synced); verified via preview: simulating sec>=baTotalSec shows the done text + reveals the rate button once, baAutoAdvance stops overwriting, rateFromBrewAlong exits BA + opens Taste, and reset re-hides it
- [ ] Update toast after deploy (cache v2.71.0)

## Sprint 84 (v2.72.0) — Insights: a ratio sweet-spot chip (no refractometer needed)
- [ ] Advanced Coffee User lens: the EY sweet-spot band is actionable but requires logged TDS, which most advanced users (no refractometer) never have — for them Insights gave only trend + best-origin (soft, not a target). No insight surfaced where their best cups cluster on ratio, the parameter everyone logs
- [ ] Added bestRatioCluster(): method-segmented (espresso ~1:2 never mixes with pour-over ~1:15), needs >=3 same-method 4★+ cups with ratio spread <=3 to count as a real cluster, returns median ratio. renderInsights pushes a chip ("Your best V60 cups cluster around 1:15.5 — a tested ratio to start a new bag") right after the EY chip, before the softer trend/origin chips (still capped at 3)
- [ ] npm run check green (2.72.0 synced); verified via preview: clustered 4★+ cups produce the chip with correct median + method; <3 cups or wide spread returns null (no chip); espresso and pour-over don't cross-contaminate
- [ ] Update toast after deploy (cache v2.72.0)

## Sprint 85 (v2.73.0) — aria-labels on 5 remaining unlabeled form controls
- [ ] Accessibility lens: ran an app-wide audit — 194 interactive elements (only 2 unnamed, and those are the intentionally aria-hidden .ba-tap zones with labeled Prev/Next equivalents) + 92 form controls. Found 5 controls with no accessible name (placeholder is NOT a reliable SR name): custom varietal input, custom grinder input, gearProfileSelect, gearNameInput, importFile. Motion (2 universal prefers-reduced-motion blocks + JS guard), focus rings, modals/dialogs, star displays all already solid
- [ ] Added aria-label to all 5: "Custom varietal name", "Custom grinder name", "Load a saved gear setup", "Name this gear setup", "Choose a backup file to import". Additive, matches the v2.23 labeling pass
- [ ] npm run check green (2.73.0 synced); re-ran the audit via preview — unlabeled form-control count now 0
- [ ] Update toast after deploy (cache v2.73.0)

## Sprint 86 (v2.74.0) — surface + protect the on-device calibration (backup nudge)
- [ ] Product Strategist lens: the moat is the accumulated on-device data (recipes, ratings, sweet spots, lineages), but nothing protected it — a user with many brews who never exports loses everything to a Safari storage eviction / phone switch (churn). The data "lives only here" was never made felt or backed up
- [ ] Added a calm passive #backupNudge line in the Journal (both views, via renderLibrary→renderBackupNudge): shows ONLY when recipes.length>=5 AND (never exported OR last backup >30 days). "N brews of your calibration live only on this device · last backup over a month ago. Tap Export All above to keep a copy you own." New additive key brewcraft_exported (ISO ts) set in exportAllRecipes; nudge self-hides after backup for 30 days. No toast/nag
- [ ] npm run check green (2.74.0 synced); verified via preview: <5 recipes hidden; >=5 + never-exported shows; after exportAllRecipes brewcraft_exported set + nudge hides; simulated >30-day-old export re-shows with the "over a month" copy
- [ ] Update toast after deploy (cache v2.74.0)
- [ ] NOTE: storage keys now also include brewcraft_exported (v2.74) — additive, no migration

## Sprint 87 (v2.75.0) — mark the first rated cup (first-run delight)
- [ ] Emotional Design lens: setRating handled praise/nudge, 5★ celebrate, and new-best-for-lineage, but the very first cup a user ever rates — the moment the brew journal becomes real — was treated identically to the 50th. Flat inaugural moment
- [ ] Added a one-time warm toast in setRating (non-silent, v>0): "That's your first rated cup — your brew journal starts here." Guarded by new persistent flag brewcraft_firstrated AND a check that no recipe is already rated, so it never false-fires for returning users (their next rating just sets the flag silently). New-best can't fire on a first rating (no ancestor), so no toast collision
- [ ] npm run check green (2.75.0 synced); verified via preview: first-ever rating fires the toast + sets flag; a second rating does NOT re-fire; a library with pre-existing rated recipes sets the flag WITHOUT the toast
- [ ] Update toast after deploy (cache v2.75.0)
- [ ] NOTE: storage keys now also include brewcraft_firstrated (v2.75) — additive, no migration

## Sprint 88 (v2.76.0) — dial reset buttons meet the 44px tap target
- [ ] Mobile Kitchen UX lens: inspected the precision dials — value sits above the drag strip (no thumb occlusion), reset on all 4 dials, presets on ratio/temp converting correctly with °C/°F (refreshTempUI), drag-snap + type + keyboard. All solid. The one miss: .dial-reset buttons rendered 30×30px, below the app's 44px standard — tapped one-handed at the grinder
- [ ] Bumped .dial-reset to 44×44 (matches .icon-btn; icon stays 15px). First tried a zero-visual-change ::after hit-area overlay but elementFromPoint verification showed it did NOT reliably enlarge the target in this engine, so switched to a genuine, verifiable 44px box
- [ ] REJECTED (again) the ruler touch-action:none→pan-y scroll-trap fix: pan-y risks a slightly-diagonal drag getting stolen by page scroll mid-adjustment (degrades the dial's PRIMARY interaction), unverifiable in headless — needs real-device feel-testing
- [ ] npm run check green (2.76.0 synced); verified via preview: all 4 dial-reset now 44x44, reset still restores the default
- [ ] Update toast after deploy (cache v2.76.0)

## Sprint 89 (v2.77.0) — keyless camera-OCR no longer dead-ends
- [ ] AI Product lens: the OCR scan flow is seamless WITH a key (photo → read → consent review of sc* fields → applyScan maps fields, expands bean section, toast; no auto-save). But a keyless user hit a wall — "add an API key" with no way forward. OCR can't have a rule fallback, but the graceful degradation is a redirect to manual entry (bean fields are behind the modal, not obvious)
- [ ] Rewrote the keyless scanKeyHint into two one-tap paths: "Add a key" (closeScan + openSettingsToKey, matches the v2.9 pattern) and "enter the bean details by hand" → new scanManualEntry() (closeScan, switchTab recipe, expand sec-bean via toggleSection if collapsed, scrollIntoView, focus beanOrigin). Only shown keyless
- [ ] npm run check green (2.77.0 synced); verified via preview: keyhint shows both link-btns; scanManualEntry closes the scan modal, expands the bean section, and focuses the origin field

## Sprint 90 (v2.78.0) — beginner method picker: one-line character note
- [ ] Beginner User lens: category headers orient (Gravity · pour-over & drip) but the ~20 method cards are bare icon+name (V60, Origami, Phin, Cafelat Robot…). A newcomer can't tell what cup each makes
- [ ] Added METHOD_BLURB map + updateMethodBlurb(): a beginner-only one-line character note under the picker that updates on select ("V60 — clean and bright, the pour-over standard"). display:none default, block under body.skill-beginner .method-blurb.show (mirrors v2.63 dial-in coach); experts/enthusiasts see nothing. Called in selectMethod + setMethod. No new storage, additive
- [ ] npm run check green (2.78.0 synced); verified via preview: beginner skill shows the blurb + it changes on method select (V60→Espresso→AeroPress); enthusiast/expert hide it; a method with no blurb removes .show
- [ ] Update toast after deploy (cache v2.78.0)

## Sprint 91 (v2.79.0) — measured extraction yield drives the dial-in
- [ ] Advanced Coffee User lens: a refractometer owner logs beverage weight + TDS → computeEY gives a measured EY, but it was only a trailing "Reference: …%" footnote in ruleDialIn, and the AI dial-in sent raw TDS in the JSON without computing/flagging EY or being told to use it. The most objective signal was on the table
- [ ] ruleDialIn (filter only; espresso path untouched): now leads with an objective verdict when EY is out of the 18–22% band ("Measured extraction 16.5% is below the target — objectively under-extracted; reconcile with the taste read"), and the in-band case became informative ("on point — chase balance via ratio/water, not grind"). getDialinAdvice now computes EY, adds a MEASURED EXTRACTION line to the prompt, and a sys clause: treat measured EY as ground truth, anchor direction, reconcile with taste
- [ ] npm run check green (2.79.0 synced); verified via preview: ruleDialIn output leads with the under/over verdict for EY 16/24 and the on-point line for EY 20; the AI userMsg includes the MEASURED EXTRACTION line when TDS logged (prompt-construction inspection, no live call)
- [ ] Update toast after deploy (cache v2.79.0)

## Sprint 92 (v2.80.0) — Journal Timeline leads with your best cup (peak-end warmth)
- [ ] Emotional Design lens: the Timeline is a competent log (warm dates, labeled stars, EY/version, notes) but your single best cup looks like every other entry — no peak, nothing inviting you to revisit/re-brew it. Today's "best with this bean" is bean-scoped; Insights' "best origin" is an average; neither names your proudest cup
- [ ] Added a .journal-best highlight at the top of renderJournal (Timeline only, unfiltered, recipes>=3 + >=1 rated): "Your best so far · <name> · ★★★★★", role=button + aria-label + Enter/Space, tap → loadRecipe + Recipe tab. Highest rating wins, ties broken by most-recent. Stars aria-hidden (label covers it). No new storage
- [ ] npm run check green (2.80.0 synced); verified via preview: highlight names the top-rated cup, opens it on click, hidden under 3 recipes / when searching/filtering / when nothing rated
- [ ] Update toast after deploy (cache v2.80.0)

## Sprint 93 (v2.81.0) — protect the running brew timer from an accidental Reset
- [ ] Mobile Kitchen UX lens: the Brew-tab timer buttons were Start · Reset · Lap — the destructive Reset sat between the two most-tapped during-brew actions (Start/Pause + Lap), so a wet-thumb mis-tap mid-pour wiped the running timer + lap-stamped pour times with no confirmation
- [ ] Reordered to Start · Lap · Reset (Reset leaves the hot path) AND guarded it: the Reset button now calls confirmResetTimer() → if timer running OR elapsed > 2s, a one-tap action toast ("Reset the timer? … [Reset]", non-blocking, auto-dismiss 6s); otherwise resets immediately (no nag on a fresh 00:00). resetTimer() itself unchanged, so programmatic callers (brewAgain/newRecipe) are unaffected. No confirm()/prompt()
- [ ] npm run check green (2.81.0 synced); verified via preview: running/elapsed Reset shows the confirm toast and only resets on its tap; a fresh 00:00 resets immediately; button order is Start/Lap/Reset
- [ ] Update toast after deploy (cache v2.81.0)

## Sprint 94 (v2.82.0) — screen-reader "working" cue for async AI calls
- [ ] Accessibility lens: all 6 AI panels + toast + brew guide already have live regions, and the RESULT announces (mutation while visible). But the LOADING state didn't: a reveal-then-fill panel (hidden→visible with "Thinking…" in the same tick) doesn't announce on VoiceOver/Safari, so a blind user firing dial-in/explain/suggest/patterns heard nothing for 3–5s and might re-tap, unsure it registered
- [ ] Added a shared sr-only #aiStatusSr live region + announceAI(): "Working on it…" set at the start of each async AI call, cleared on completion (so the panel's result mutation still reads). Wired in aiComplete (covers explainDiff/suggest/patterns) + getDialinAdvice (direct fetch). Scan left alone (its status mutates while already visible → already announces). Visual unchanged
- [ ] npm run check green (2.82.0 synced); verified via preview by stubbing fetch: aiStatusSr held "Working on it…" at fetch time and was cleared ('') after both success and error, for aiComplete and getDialinAdvice
- [ ] Update toast after deploy (cache v2.82.0)

## Sprint 95 (v2.83.0) — share-link import shows a recipe preview (growth loop)
- [ ] Product Strategist lens: the share growth loop works (link → app loads → import modal → recipient is now using BrewCraft), but the import modal showed only the recipe NAME — a recipient (often a first-time visitor) decided blind on an auto-name like "V60 · Jun 19", and the gift didn't feel tangible
- [ ] Added sharedRecipeSummary(r) + an #importModalSummary line in the hash-import modal: "V60 · 15g · 1:16 · Ethiopia Yirgacheffe · 5★" (method/dose/ratio/bean/rating from the decoded payload; hidden if empty). Informed import = higher conversion + the received recipe reads as a real gift. Paste-code path left as direct import (deliberate action). bean + rating already travel via stripForShare
- [ ] npm run check green (2.83.0 synced); verified via preview: a decoded recipe renders the summary line in the modal; an empty/minimal payload hides it
- [ ] Update toast after deploy (cache v2.83.0)

## Sprint 96 (v2.84.0) — plain-language orientation atop the Water section
- [ ] Beginner User lens: water tools are correctly hidden from beginners (Expert-only — good progressive disclosure, no beginner-facing gap). But "Expert" is self-selected curiosity, not water-chemistry literacy, and the Water section is the densest jargon (GH/KH/TDS with ideal ranges but no what/why). A user who opens it knows the target, not the meaning
- [ ] Added one calm orientation line at the top of the Water section body: "Water shapes the cup: GH (minerals) pulls flavour out; KH (buffer) tames acidity — too much flattens it. Aim for the ranges below, or just log your bottled water — all optional." Complements the per-field ideal ranges. Static markup, no JS/storage; section is collapsed-by-default so it's opt-in
- [ ] npm run check green (2.84.0 synced); verified via preview the line renders above the water fields
- [ ] Update toast after deploy (cache v2.84.0)

## Sprint 97 (v2.85.0) — pour schedule reconciles to total water, visibly + exactly
- [ ] Advanced Coffee User lens: the pour editor showed "Total: Xg / Yg" but gave no at-a-glance signal when the schedule was OFF target (a 30g over/under schedule is a real error), and autoDistribute rounded each pour independently so it could drift 1–2g from the target
- [ ] updatePourTotals now appends a status: "on target" (green, |Σ−water|≤2g) or "+Ng over" / "Ng short" (amber). autoDistributePours makes the LAST plain pour absorb the rounding remainder so the schedule sums EXACTLY to total water (bloom = max(dose×2, 10%) unchanged)
- [ ] npm run check green (2.85.0 synced); verified via preview: autoDistribute sums exactly to water (shows "on target"); a manual over/under shows the +over/short amber delta; tolerance ±2g
- [ ] Update toast after deploy (cache v2.85.0)

## Sprint 98 (v2.86.0) — dial-in result scrolls into view (one-handed)
- [ ] Mobile Kitchen UX lens: "Get Dial-In Advice" sits at the bottom of a tall section (chips + textarea + button), so the result (#dialinOut) and the "Brew Again" CTA render below the fold — the user taps, the button reads "… thinking", but the answer lands off-screen with nothing scrolling to it. Result reads fine (14px/1.75/pre-wrap); the gap is visibility
- [ ] Added scrollDialinIntoView() (scrollIntoView block:'nearest', smooth) called when the result shows: keyless branch (instant result) and AI branch (loading state, so the result stays in view as it fills in). block:'nearest' only moves if needed
- [ ] npm run check green (2.86.0 synced); verified via preview by stubbing scrollIntoView: invoked once on the keyless path and once on the AI path (at loading)
- [ ] Update toast after deploy (cache v2.86.0)

## Sprint 99 (v2.87.0) — honest label on the post-dial-in CTA
- [ ] AI Product lens: the dial-in CTA read "Brew Again with this plan", implying the AI's advice (e.g. "grind 2 clicks finer") was operationalized — but brewAgain() just clones the recipe into a fresh version and tells you to "change ONE variable" yourself. The plan is NOT auto-applied; the label over-claimed (the "AI feels bolted on" tell)
- [ ] Reworded the button to "Start the next version to try this" — honest about what it does (creates v(N+1) for you to apply the change), consistent with the existing toast. Rejected auto-applying parsed advice (fragile free-text parsing) and a structured-JSON-delta + Apply button (a real fork, not loop-sized — flagged)
- [ ] npm run check green (2.87.0 synced); verified via preview the button renders the new label
- [ ] Update toast after deploy (cache v2.87.0)

## Sprint 100 (v2.88.0) — Compare declares which cup won
- [ ] Advanced Coffee User lens: the side-by-side Compare table highlights differing rows (.diff) but is purely descriptive — it shows "Rating 3/5 vs 5/5" without declaring a winner. The comparison's whole point is "which was better?", and the user had to find the rating row and judge mentally
- [ ] openCompare now marks the higher-rated recipe's column header with a ✓ + success colour (new .compare-table th.cmp-win) and a title "Rated higher (5★ vs 3★)". Only when both are rated and differ; no mark on equal/unrated. Rating uses the user's own verdict (rejected an EY "winner" as ambiguous re: target midpoint)
- [ ] npm run check green (2.88.0 synced); verified via preview: A>B marks column A, B>A marks column B, equal/unrated marks neither
- [ ] Update toast after deploy (cache v2.88.0)

## Sprint 101 (v2.89.0) — Compare table conveys diff + winner to screen readers
- [ ] Accessibility lens: the Compare modal already gets dialog/focus/Escape via initModalA11y (.modal-overlay). But the comparison's signals were visual-only: .diff rows used colour+bold (no SR marker — WCAG 1.4.1), and the v2.88 winner ✓ read to SR as a cryptic "check mark". An SR user got "Dose, 15, 18" with no sense of what differs or who won
- [ ] addRow appends an sr-only " — differs" to changed rows' label cell (SR hears "Dose — differs, 15, 18"). The winner ✓ is now aria-hidden with an sr-only " (rated higher)" beside it (SR hears "Cup B, rated higher"). Both sr-only — zero visual change
- [ ] npm run check green (2.89.0 synced); verified via preview: a diff row's label cell contains an sr-only "— differs"; the winning th has aria-hidden ✓ + sr-only "(rated higher)"; non-diff rows + loser column have neither
- [ ] Update toast after deploy (cache v2.89.0)

## Sprint 102 (v2.90.0) — printed recipe card: complete bean context + unit-correct temp
- [ ] Advanced Coffee User lens: printRecipe was thorough on the brew (params, pour schedule, espresso, water, results, notes) but dropped the bean beyond "method · origin · roaster" in the sub-line — process, varietal, roast date, roast level, elevation were all absent (roast date/process are essential context for a reproducible specialty recipe). Also water temp was hardcoded "°C", ignoring a °F user's preference
- [ ] Added a "Bean" section to the print (Process/Varietal/Roast date/Roast level/Elevation, rendered only when present). Water temp now uses displayTemp(r.waterTemp) + the user's unit (°F/°C). Pure print-output change; no data/save impact
- [ ] npm run check green (2.90.0 synced); verified via preview: Bean section renders with the bean fields; temp shows the user's unit; both omit cleanly when empty/unset
- [ ] Update toast after deploy (cache v2.90.0)

## Sprint 103 (v2.91.0) — Insights charts redraw on rotate/resize
- [ ] Mobile Kitchen UX lens: chartBase is sound (uses clientWidth + DPR, so charts are crisp at 390px, and switchTab redraws on entering Lab). But there was NO resize/orientationchange handler — rotating the phone (or resizing) while on Insights left the canvas backing store at the old width, CSS-stretched blurry, until you left the tab and returned
- [ ] Added a debounced (200ms) window resize listener that calls drawStats() when tab-lab is active (mirrors the existing theme-change redraw). Rings are SVG (CSS-scaled), so only the stats canvases need re-raster
- [ ] npm run check green (2.91.0 synced); verified via preview: resizing the viewport while on Lab re-runs drawStats (canvas backing width tracks the new clientWidth); inactive-tab resize does nothing
- [ ] Update toast after deploy (cache v2.91.0)

## Sprint 104 (v2.92.0) — immersion brews don't say "drawdown"
- [ ] Beginner User lens: the brew guide + Brew-Along final-step text said "drawing down / drawdown" for every non-espresso method, including immersion (French Press/AeroPress/Clever/Hario Switch) where there's no drawdown — it's steep-then-press/plunge. Pour-over jargon misapplied to a steep confuses a beginner (parallels espresso-stays-espresso)
- [ ] Added isImmersion(method) helper; updateBrewGuide's final-step line now shows "steeping — done ~Xs" / "steeping — let it finish" for immersion (else the pour-over "drawing down" stays), and baAutoAdvance's last-step shows "Final step — steeping" for immersion. Method-scoped to the 4 steep-then-separate methods; pour-over/espresso unchanged
- [ ] npm run check green (2.92.0 synced); verified via preview: isImmersion true for FP/AeroPress/Clever/Switch + false for V60/Espresso; updateBrewGuide last-step renders "steeping" for an immersion method and "drawing down" for V60
- [ ] Update toast after deploy (cache v2.92.0)

## Sprint 105 (v2.93.0) — dial-in gives immersion-correct advice (not pour-over technique)
- [ ] AI Product lens: ruleDialIn branched espresso→espressoDialIn but routed immersion (FP/AeroPress/Clever/Switch) through the pour-over path — "slower later pours", "gentle circles / one swirl after bloom", "pour lower… filter clogging at drawdown", "level the bed". None apply to a steep. The AI dial-in guarded espresso but not immersion
- [ ] Added immersionDialIn(issues, r) (mirrors espressoDialIn): steep time / gentle stir / press language, keeps grind+temp+ratio+EY logic, no pours/swirls/bed/drawdown. ruleDialIn now routes isImmersion(r.method) to it. getDialinAdvice userMsg adds an IMMERSION NOTE (grind/temp/steep/ratio/stir only; no pour-over technique) parallel to the espresso NOTE
- [ ] npm run check green (2.93.0 synced); verified via preview: ruleDialIn for French Press returns steep/press language with no "pours/swirls/drawdown/bed"; V60 still returns pour-over advice; AI userMsg carries the IMMERSION NOTE for FP and the ESPRESSO NOTE for espresso

## Sprint 106 (v2.94.0) — espresso timer ring tracks the shot, not 3 minutes
- [ ] Advanced Coffee User lens: computeBrewTarget had no espresso branch — espresso has no pour cues (target 0) and logs espShotTime not totalBrewTime, so it fell to the 180s pour-over default. The brew-timer ring filled toward 3 min during a ~28s shot: it barely moved and never hit the "done" glow at the shot's target time — useless for the method where shot timing matters most
- [ ] computeBrewTarget now, when method is Espresso, sets brewTargetSec = espShotTime (or 30s if unset). Called at timer-start so it reads the current shot time. Ring fills over the shot and glows 'done' at target; pour-over/immersion targets unchanged
- [ ] npm run check green (2.94.0 synced); verified via preview: Espresso + espShotTime 28 → brewTargetSec 28 (not 180); unset shot → 30; V60 with no cues still → 180
- [ ] Update toast after deploy (cache v2.94.0)

## Sprint 107 (v2.95.0) — espresso gets its own shot-target completion moment
- [ ] Emotional Design lens: pour-over's "That's brewed" cue (beep+haptic+message+rate link) lives in updateBrewGuide, which returns early when guideSteps is empty — espresso has no pour schedule, so the cue NEVER fired. With v2.94 the ring now glows at the shot's target time, but silently; espresso's completion was flat vs pour-over's celebrated finish
- [ ] Added an espresso branch atop updateBrewGuide: at/after brewTargetSec it fires the same one-time beep/haptic, shows "✓ At target shot time — Cut it now, or pull longer…" + a "Rate this shot →" link, and announces "At your target shot time." to SR; before target it stays hidden. Espresso-specific copy (cut the shot, not pour-over "brew complete"). Reuses brewCompleteFired (reset in computeBrewTarget/resetTimer). Returns before the pour-over path
- [ ] npm run check green (2.95.0 synced); verified via preview: espresso past target shows the shot-done message + sets brewCompleteFired once; before target hidden; pour-over unchanged
- [ ] Update toast after deploy (cache v2.95.0)

## Sprint 108 (v2.96.0) — completion SR announce points to the rate hand-off
- [ ] Accessibility lens: the brewGuideSr live region is sound (always-present role=status, set once via brewCompleteFired, no per-tick spam; #brewGuide itself isn't a live region; separate from aiStatusSr). But at completion the VISIBLE guide shows a "Rate this cup/shot →" button while the SR announce ("That's brewed. Let it settle." / "At your target shot time.") never mentioned rating — so an SR user heard the alert but wasn't told the next step exists (the button isn't in a live region, so its appearance isn't announced)
- [ ] Enriched both completion announces: pour-over → "That's brewed. Let it settle, then rate the cup below."; espresso → "At your target shot time. Cut it, then rate the shot below." Visible message + cue unchanged; info-parity for SR only
- [ ] npm run check green (2.96.0 synced); verified via preview: brewGuideSr carries the rate hand-off for both pour-over and espresso completion
- [ ] Update toast after deploy (cache v2.96.0)

## Sprint 109 (v2.97.0) — grind bar names the target when off-band
- [ ] Advanced Coffee User lens: the grind UI is otherwise advanced-grade (grindInfo spec, caret + method-target band + in/off flag). But when the caret was outside the band, posLabel said only "off target" — flagging the miss without naming where to go. The exact target (clicks/turns) was only in the all-ranges reference text
- [ ] Changed the off-band posLabel from "off target" to "aim <range>" (data[grindBandKey(method)], e.g. "aim 20-30" / "aim 2.5-3.5 turns"); the caret's 'out' style still shows you're off, so the label is free to state the target. Same/shorter length, no crowding; in-range/approx/custom-grinder cases unchanged
- [ ] npm run check green (2.97.0 synced); verified via preview: Comandante + V60 (band 20-30) with grind 15 shows "aim 20-30"; grind 24 shows "in range"; custom grinder (no band) shows blank
- [ ] Update toast after deploy (cache v2.97.0)

## Sprint 110 (v2.98.0) — scan-review inputs meet the 44px tap target
- [ ] Mobile Kitchen UX lens: the 8 OCR scan-review inputs (.scan-f input — roaster/origin/process/varietal/roast date/level/bag size/elevation) rendered ~39px tall (padding:10px, no min-height), below the app's 44px standard (enforced for other form controls in v2.62/2.76/2.81). These are tapped/edited one-handed at the counter right after a bag scan
- [ ] Added min-height:44px to .scan-f input. iOS input-zoom already handled by the global pointer:coarse 16px rule. Single-column on phones (≤480px) so full-width + 44px tall; visual otherwise unchanged
- [ ] npm run check green (2.98.0 synced); verified via preview the scan-review inputs now report >=44px
- [ ] Update toast after deploy (cache v2.98.0)

## Sprint 111 (v2.99.0) — keyless espresso dial-in factors bean freshness
- [ ] AI Product lens: the AI dial-in path factors freshness, but the keyless espressoDialIn fallback didn't. Its "sour AND bitter together" branch diagnoses channeling and sends the user to redo WDT/level/tamp — yet gassy, too-fresh beans channel and read sour-and-harsh regardless of prep, and espresso wants more rest than filter. A user pulling day-2 beans chases prep fruitlessly
- [ ] (Rejected first: wiring measured EY into espressoDialIn — espresso yield is espYield not beverageWeight so EY isn't even computed, and the 18-22% filter band is contested for percolation espresso; importing it violates the espresso-specific guardrail)
- [ ] Added const fresh = freshnessInfo(r.roastDate) in espressoDialIn; in the under&&over (channeling) branch, when fresh.cls === 'fresh-degassing' (day <4, the window the app already flags) prepend a freshness line naming gas as the likely cause and to rest the beans before re-working the puck. Targeted (only that symptom + that freshness state), espresso-specific (rest > filter), uses the logged roast date
- [ ] npm run check green (2.99.0 synced); verified via preview: degassing roast date + sour&bitter shows the freshness line first; peak-window date omits it; espresso-only (filter/immersion paths untouched)
- [ ] Update toast after deploy (cache v2.99.0)

## Sprint 112 (v2.100.0) — beginner dial-in hint covers the Weak axis
- [ ] Beginner User lens: the dial-in's beginner-only coach hint (v2.63) explained only Sour (→finer) and Bitter (→coarser), but Weak/Watery is a top-3 beginner complaint AND the most misdiagnosed — the beginner instinct is "grind finer," which just makes it sour. ruleDialIn agrees weak-alone is strength/ratio ("more coffee"), not extraction
- [ ] Tightened the Sour/Bitter clauses ("usually means…—" → "= …,") to make room, then added a third axis: "Weak & watery = too little coffee, not grind." Copy-only, beginner-scoped (.dialin-coach-hint is display:none except body.skill-beginner); chips/advice/engine unchanged. Net length ~unchanged
- [ ] npm run check green (2.100.0 synced; version intentionally 2.100.0 not 3.0.0 per the no-"v3.0" directive); verified via preview the hint shows the Weak clause under skill-beginner and stays hidden for expert
- [ ] Update toast after deploy (cache v2.100.0)

## Sprint 113 (v2.101.0) — the "holding steady" insight reads the plateau's level
- [ ] Emotional Design lens: renderInsights celebrates an upswing ("the dial-in is working") and routes a dip to the Dial-In Assistant, but the plateau branch just stated a number ("Holding steady around X★ across N brews."). Same flat line whether stuck low (deflating, no path) or steady high (a missed affirmation)
- [ ] Split the else by recent avg (a2): >= 4.0 affirms earned consistency ("consistency at this level is its own kind of mastery"); < 4.0 stays warm but points forward ("solid and repeatable — nudge one variable in the Dial-In Assistant to climb higher"). 4.0 matches the app's own 4★-is-a-keeper line (v2.58 praise nudge). Copy + one threshold, no new UI, same data
- [ ] npm run check green (2.101.0 synced); verified via preview: stubbed recipes with recent avg 4.0 → mastery line; 3.0 → climb-higher line; both only when |recent-prior|<0.3 and >=4 rated
- [ ] Update toast after deploy (cache v2.101.0)

## Sprint 114 (v2.102.0) — total-water dial announces its unit to screen readers
- [ ] Accessibility lens (precision scrubber dials): the dials are otherwise strong (role=slider, tabindex 0, aria-valuemin/max + valuenow + valuetext, arrow/Shift/Home keys, visible .ruler:focus-visible ring, type-exact via the native .scrub-num input). But scrubberValueText gave totalWater the bare-number default ("250") while dose says "15 grams", temp "93 degrees Celsius", ratio "1 to 16" — a SR user adjusting the water dial heard a unitless number
- [ ] Added `if (field === 'totalWater') return val + ' grams';` so all four dials announce a complete value. App is gram-native (ounces flagged-against), so the unit is always correct. aria-valuetext only; no behaviour/visual change
- [ ] npm run check green (2.102.0 synced); verified via preview: ruler[data-field=totalWater] aria-valuetext now reads "<n> grams"; dose/ratio/temp valuetext unchanged
- [ ] Update toast after deploy (cache v2.102.0)

## Sprint 115 (v2.103.0) — share loop surfaces at the rating peak
- [ ] Product Strategist lens (share/growth loop): the recipient side is polished (preview card v2.83, warm hand-off v2.43), but the SENDER had no reason/moment to share — sharing lived only in the collapsed Share & Receive section. Asymmetry: the off cup (#ratingNudge, v<=3) offered a next action ("Get dial-in advice"), the great cup (#ratingPraise, v>=4) was a dead-end compliment at the exact moment the user is proudest and most likely to pass a recipe on
- [ ] Restructured #ratingPraise to mirror the nudge (hint line + btn-sm) and added shareFromPraise(): builds the share code via refreshSharePanel() then takes the lowest-friction path — navigator.share (native sheet, mobile) → copyShareLink (hosted desktop) → expand+scroll the Share section (local file://). Reuses existing share fns; no new storage, no clutter (only shows at >=4 stars)
- [ ] npm run check green (2.103.0 synced); verified via preview: praise box shows the button at 5 stars / hidden at <=3; shareFromPraise with navigator.share stubbed builds a #r= link and calls the native sheet
- [ ] Update toast after deploy (cache v2.103.0)

## Sprint 116 (v2.104.0) — trustworthy scanned roast dates
- [ ] AI Product lens (camera OCR): roast date is the highest-value field (drives freshness) but had two trust gaps. (1) Prompt said "roastDate ISO if any date is printed" — specialty bags print a roast date AND a best-before, so "any date" invited grabbing the best-before. (2) fillScanReview accepted any valid-format ISO incl. a FUTURE date (a mis-grabbed best-before); freshnessInfo returns null for future dates, so freshness silently vanished
- [ ] Prompt now targets the ROAST/ROASTED date only ("never a best before/best by/enjoy by/expiry; if only best-before is printed, use ''"). fillScanReview drops a roastDate that fails the ISO regex OR is in the future (new Date(rd) <= Date.now(); also catches impossible dates like 2026-13-45 → NaN). The "Read N fields" note now counts actual post-validation field values, so it never claims a date/size we just dropped
- [ ] npm run check green (2.104.0 synced); verified via preview: fillScanReview with a future roastDate → scRoastDate empty + count excludes it; with a valid past date → kept + counted; impossible date → dropped
- [ ] Update toast after deploy (cache v2.104.0)

## Sprint 117 (v2.105.0) — onboarding tier labels are parallel + concrete
- [ ] Beginner User lens (first-run): the skill-tier choice is the most consequential first decision but the 3 labels mixed framings (Beginner=help / Enthusiast=behavior / Expert=tools), and the middle one "Enthusiast — I dial in my cups" described a behavior a beginner doesn't understand yet rather than what the choice DOES. The subtitle promises it "tunes how much the app shows you" but only 2 labels hinted at that axis. (Structure is otherwise sound: Skip → obFinish leaves skill unset → init defaults to beginner; choice reversible in Settings)
- [ ] Reworded to parallel, show-more-axis copy keeping voice: "Beginner — keep it simple, guide me" / "Enthusiast — show more, I tweak my cups" / "Expert — every tool, nothing hidden". Copy-only; obChoose values/toasts/skill mapping unchanged
- [ ] npm run check green (2.105.0 synced); verified via preview the three ob-choice buttons render the new labels and still call obChoose('beginner'/'enthusiast'/'expert')
- [ ] Update toast after deploy (cache v2.105.0)

## Sprint 118 (v2.106.0) — "New Recipe" guards unsaved work
- [ ] Emotional Design lens (destructive moments): delete-recipe is exemplary (instant + 7s Undo + restore), but newRecipe() silently discarded the form — cleared brewcraft_draft, loadRecipeData({}), clearDirty() — with no confirm and no undo. The New Recipe button + Cmd/Ctrl+N would vaporize unsaved edits/a half-built recipe. Cold and punishing for a trusted companion
- [ ] Split newRecipe into a guard + doNewRecipe worker (mirrors confirmResetTimer/resetTimer v2.81): if isDirty, show a one-tap action-toast "Start a fresh recipe? Unsaved changes here will be lost." → "Start fresh" runs doNewRecipe; else proceed immediately. No confirm() (validator-safe). Only 2 callers (button + Cmd+N), both user-initiated — no internal flow affected
- [ ] npm run check green (2.106.0 synced); verified via preview: dirty form + newRecipe() keeps the form + shows the toast; tapping the toast btn wipes; clean form + newRecipe() wipes immediately
- [ ] Update toast after deploy (cache v2.106.0)
- [ ] Flagged follow-up: loadRecipe() (switching recipes from the library) also discards unsaved edits silently — bigger UX call (could nag on every switch), left for owner

## Sprint 119 (v2.107.0) — Brew-Along announces steps to screen readers
- [ ] Accessibility lens (live brew, SR): the Brew tab has #brewGuideSr (v2.44/2.96) but Brew-Along — the PRIMARY guided path (the big CTA) — is aria-modal and its changing content (#baStepLabel/#baTarget/#baTechnique) had no aria-live, and the only SR region (#brewGuideSr) sits OUTSIDE the modal (aria-modal hides it). So a blind user heard NOTHING on step advance or completion in immersive mode
- [ ] Added an .sr-only role=status aria-live=polite #baSr INSIDE #baOverlay. renderBAStep (discrete step changes — not the per-tick updateBATheater, so no spam) announces "Step N of M, <label>. Pour to <targetCum> grams. <technique>." updateBATheater's done branch (guarded by baDoneFired, fires once) announces "Brew complete. That's brewed. Let it settle, then rate the cup below." Mirrors the Brew-tab pattern
- [ ] npm run check green (2.107.0 synced); verified via preview: entering BA announces step 1 w/ cumulative target; baNext announces the next step; completion branch sets the done announce; per-tick updateBATheater does NOT rewrite #baSr mid-step
- [ ] Update toast after deploy (cache v2.107.0)

## Sprint 120 (v2.108.0) — degassing freshness guidance gets a forward hook
- [ ] Product Strategist lens (retention): the distinctive asset is the per-bean freshness timeline. Its guidance nudges across the lifecycle (peak = "great day to fine-tune", fading = "finish the bag soon"), but the degassing state was the only one with NO forward/return anchor — it told a fresh-bean user "don't over-judge this cup" (a dead end) without planting when it'll be good. (Bag tracking already does its own retention work: "running low, reorder soon" + low toast)
- [ ] Appended an anticipatory clause to freshnessGuidance's fresh-degassing branch: filter → "…it hits its stride around day 4." (matches freshnessInfo's day-4 peak start); espresso → "…espresso especially wants a few more days to settle." (reinforces v2.99). Converts the one discouraging state into a reason to come back. Copy-only; other states untouched
- [ ] npm run check green (2.108.0 synced); verified via preview: freshnessGuidance(degassing, filter/espresso) carries the new clause; peak/good/fading branches unchanged
- [ ] Update toast after deploy (cache v2.108.0)

## Sprint 121 (v2.109.0) — "Start the next version" lands in the lever zone
- [ ] Mobile Kitchen UX lens (grind-adjust after dial-in): brewAgain ("Start the next version to try this") creates the new version then switchTab('recipe'), which ends with window.scrollTo({top:0}) — dumping the user at the top (recipe name + Method), two sections above Brew Parameters where dose/ratio/grind/temp live. One-handed, they scroll past Method + Bean to find the lever the dial-in just told them to move
- [ ] After switchTab, brewAgain now scrollIntoView's #sec-params (smooth, block:start; v2.39 scroll-margin-top clears the sticky header) so they land in the lever zone. Non-presumptuous (params holds every dial-in lever, not just grind); all 3 brewAgain callers make a new version to change a param. (Carrying the SPECIFIC advice text forward stays part of the flagged structured-dial-in Apply fork)
- [ ] npm run check green (2.109.0 synced); verified via preview: brewAgain lands on the recipe tab, adds 1 version, and calls sec-params.scrollIntoView({behavior:smooth,block:start})
- [ ] Update toast after deploy (cache v2.109.0)

## Sprint 122 (v2.110.0) — keyless dial-in is honest about what it reads
- [ ] AI Product lens (transparency): the keyless coach is honestly labeled and uses real values, BUT the notes field invites "describe the cup in your own words" while ruleDialIn only reads chips. A keyless user who wrote a description but tapped no chip got ruleDialIn([])'s fallback "Select at least one issue chip, or describe the cup" — telling them to describe the cup they just described, and implying the rule coach reads free text (it can't)
- [ ] getDialinAdvice keyless branch: when !issues.length && notes, returns an honest line — "The built-in coach reads the taste chips, not written notes — tap the one closest to your cup above. Adding an API key brings in AI that can read your description." Also reworded ruleDialIn's empty fallback to drop the misleading "or describe the cup": "Tap the taste chip closest to your cup above — the built-in coach works from those." (covers the AI-failed catch path too)
- [ ] npm run check green (2.110.0 synced); verified via preview: keyless + notes-only → honest chips message; keyless + a chip → normal advice; ruleDialIn([]) → new fallback wording
- [ ] Update toast after deploy (cache v2.110.0)

## Sprint 123 (v2.111.0) — API key field has a show/hide to verify the paste
- [ ] Mobile Kitchen UX lens: the Anthropic API key field (labApiKey) was type=password with no reveal and no verify. On a phone you paste a 100+ char sk-ant-… key into a masked box and can't confirm it landed — a truncated/fumbled paste silently leaves you on the keyless path, discovered only later via an AI error on another screen. This single step gates EVERY AI feature
- [ ] Added a right-aligned "Show"/"Hide" link-btn (margin-left:auto in the flex label) → toggleApiKeyVisible() flips input.type password<->text + aria-pressed; default stays masked. Hardened the input: autocomplete/autocapitalize/autocorrect=off + spellcheck=false (so revealed text isn't mangled by the mobile keyboard, and it isn't captured as a login password). Hint now says "tap Show to check it pasted correctly"
- [ ] npm run check green (2.111.0 synced); verified via preview: toggle flips type to text + label Hide + aria-pressed true, back to password + Show; input carries autocapitalize/autocorrect/spellcheck off
- [ ] Update toast after deploy (cache v2.111.0)

## Sprint 124 (v2.112.0) — action-toasts pause their dismiss on hover/focus
- [ ] Accessibility lens: #toast is role=status aria-live=polite, and showActionToast builds an interactive Undo/confirm button inside it that auto-dismissed in 6-7s. WCAG 2.2.1 timing trap — a keyboard/SR user can't reliably reach the button in time, and worse, it could vanish WHILE they're engaging with it. The Undo (a core trust feature: recipe delete) was effectively mouse/touch-only
- [ ] Added shared armToastTimer() (wired once on #toast): pause (clearTimeout) on pointerenter + focusin, resume (re-arm with t._dur) on pointerleave + focusout. Routed both showToast (2600ms) and showActionToast (duration||6000) through it via t._dur. So focusing the Undo button stops the countdown — unlimited time to act; resumes on blur
- [ ] npm run check green (2.112.0 synced); verified via preview: showActionToast → t._timer armed; dispatch focusin on #toast → t._timer null (paused) + toast still shown; focusout → re-armed (number); clicking the button still removes show + runs fn (no re-arm)
- [ ] Update toast after deploy (cache v2.112.0)

## Sprint 125 (v2.113.0) — dial-in "worse" heads-up is change-count aware
- [ ] Advanced Coffee User lens (iterationHistory accuracy): the history itself is honest — lists real field diffs incl. beanOrigin (bean swap shows, avoiding misattribution), skips no-change versions (no false cause), reports outcome only when both rated. But the keyless "worse" heads-up said "your LAST change made the cup worse — revert it" even when the last version changed 2+ variables, implying a single cause and clean revert
- [ ] getDialinAdvice keyless: when hist[0] is "worse", count the actual diffs (data vs parent over DIFF_FIELDS). >1 → "your last version changed N things and scored lower — revert, then change just ONE variable at a time so you can tell what actually works"; ==1 → "your last change scored lower — consider reverting it…". More accurate + coaches single-variable discipline (clean attribution)
- [ ] npm run check green (2.113.0 synced); verified via preview: stubbed parent(5★)+child(3★) with 2 diffs → multi-change wording w/ count; 1 diff → single-change wording; non-worse → no heads-up
- [ ] Update toast after deploy (cache v2.113.0)

## Sprint 126 (v2.114.0) — Brew-Along no-pours dead-end becomes one-tap recoverable
- [ ] Beginner User lens: tapping "Brew-Along Mode" (the #1 CTA) on a recipe with no pour weights bailed with a passive toast "Add pour weights first (try Auto-Distribute)" — naming a feature the beginner must go find. A dead-end on the primary action
- [ ] enterBrewAlong empty-steps guard: if totalWater>0 and pour cards exist, show an action-toast "No pour weights yet — split the water into even pours?" with an "Auto-distribute" button → autoDistributePours() then re-enters Brew-Along. If no water, plain "Add a dose, water, and pour weights first". Reuses existing fns; no new storage
- [ ] npm run check green (2.114.0 synced); verified via preview: water set + empty weights → action toast, overlay NOT shown; tapping Auto-distribute fills weights + opens the overlay; water=0 + empty → plain toast, no auto-distribute offer
- [ ] Update toast after deploy (cache v2.114.0)

## Sprint 127 (v2.115.0) — Compare winner only crowns same-method cups
- [ ] Advanced Coffee User lens (Compare): the feature is comprehensive (2-tap select, all DIFF_FIELDS + Extraction % + Brew time + Rating + Tags, diff highlight, winner mark, SR-accessible). But the "✓ rated higher" winner fired even across different methods — declaring a 5★ espresso the winner over a 4★ V60 is apples-to-oranges; ratings across drink categories aren't comparable
- [ ] openCompare: gate the cmp-win mark on sameMethod ((a.method||'')===(b.method||'')). When methods differ AND a winner would otherwise have shown (both rated, ratings differ), reveal a caveat "Different brew methods — ratings aren't directly comparable, so no winner is marked." Same-method comparisons (the real dial-in use) keep the winner
- [ ] npm run check green (2.115.0 synced); verified via preview: same-method 5★ vs 4★ → winner ✓ on higher + caveat hidden; cross-method 5★ vs 4★ → NO winner + caveat shown; same-method equal ratings → no winner, no caveat
- [ ] Update toast after deploy (cache v2.115.0)

## Sprint 128 (v2.116.0) — keyless recipe suggester factors roast level
- [ ] AI Product lens: the AI suggester is bean+freshness+skill+goal aware, and ruleSuggest (keyless) gives a real attributed starting point (QUICK_RECIPES base + goal tweak). But ruleSuggest ignored the logged roast level — the one bean fact a rule engine can use. A keyless user with a dark roast got a suggestion that could brew too hot (bitter); the AI path already factored roastLevel
- [ ] ruleSuggest now takes roastLevel: dark/medium-dark → tempC −2 + rationale "Cooler water suits the darker roast"; light/light-medium → tempC +2 + "Hotter water helps extract the lighter roast"; medium unchanged. Temp only (no grind) to avoid compounding with the goal tweak; clamped 80–100. Both runSuggest callers pass d.roastLevel
- [ ] npm run check green (2.116.0 synced); verified via preview: ruleSuggest(V60, Balanced, 'Dark') temp 2 below the Medium baseline + dark rationale; 'Light' 2 above + light rationale; 'Medium' baseline; 'Medium-Dark'/'Light-Medium' match dark/light; clamped
- [ ] Update toast after deploy (cache v2.116.0)

## Sprint 129 (v2.117.0) — bag line names the coffee, not "a bag"
- [ ] Emotional Design lens: the bean is well-contextualized (freshness-as-character, best-result history, bag tracking), but bagLine read a generic "Bag: 120g of 250g left · ≈8 brews — running low, reorder soon" — as if it's any bag, not your coffee. Cold, and ambiguous when several beans are tracked
- [ ] bagLine now prefixes the bean identity (b.beanOrigin || b.roaster) → "Ethiopia Konga · 120g of 250g left · ≈8 brews — running low, reorder soon"; falls back to "Bag:" when unnamed. Shared by the Brew-landing todayBag + Recipe bagStatus + the low toast context. Warmer + tells you which bean to reorder. Uses existing data; no new storage
- [ ] npm run check green (2.117.0 synced); verified via preview: bagLine with beanOrigin → name-prefixed; roaster-only → roaster-prefixed; neither → "Bag:"; low case keeps "running low, reorder soon"
- [ ] Update toast after deploy (cache v2.117.0)

## Sprint 130 (v2.118.0) — elapsed-time displays carry role=timer + explicit aria-live=off
- [ ] Accessibility lens: the brew timer (#timerDisplay) + Brew-Along timer (#baTimer) are plain divs updating ~10x/s. They're correctly NOT live regions (SR-readable on demand via the live DOM value + adjacent "Elapsed Time" label; the brew is followable via the v2.44/2.96 step+completion announces). But the elapsed-time counter lacked the correct role=timer semantic, and there was no explicit guarantee against an SR treating the rapid updates as a polite live region (spam)
- [ ] Added role="timer" + aria-live="off" to both #timerDisplay and #baTimer: correct ARIA for an elapsed-time counter + a hard no-announce guarantee (role=timer's implicit aria-live is off; explicit off defends against any SR/heuristic). No aria-labelledby (would risk hiding the value); the adjacent "Elapsed Time" label still gives context. Value text + tick logic unchanged
- [ ] npm run check green (2.118.0 synced); verified via preview both timers have role=timer + aria-live=off and still update their text on tick
- [ ] Update toast after deploy (cache v2.118.0)

## Sprint 131 (v2.119.0) — share-link visitor isn't buried under onboarding
- [ ] Product Strategist lens (growth loop): a brand-new visitor opening a #r= share link hit BOTH showOnboarding() (welcome wizard) AND checkHashImport() ("Recipe received" modal) on the same load — a confusing double-modal that wastes the invite. The recipe is why they came; it should be the clean first moment
- [ ] init: compute hasShareLink (#r= in hash); suppress showOnboarding when a share link is present (and don't mark onboarded in that case, so a later plain visit can still greet them). Non-link loads unchanged (fresh → onboarding; returning → mark onboarded). checkHashImport then shows the import modal alone
- [ ] npm run check green (2.119.0 synced); verified via preview: cleared storage + #r= link + reload → import modal shown, onboarding overlay NOT shown; control (cleared storage, no link, reload) → onboarding shown
- [ ] Update toast after deploy (cache v2.119.0)

## Sprint 132 (v2.120.0) — grind names a target texture even with no grinder
- [ ] Beginner User lens (grind from guided→guess): beginners are guided (read-only grindReadout) and enthusiast/expert with a preset or grinder get descriptor/band guidance. The remaining gap: an enthusiast/expert building from scratch with NO grinder AND no preset saw an unanchored grind bar (pos null → blank posLabel) — a blind guess
- [ ] updateGrindVisual pos===null branch now names the method's target texture: grindBandKey → {espresso:2, pourOver:3, frenchPress:6} → "aim " + COARSE_LABELS[lvl] (e.g. "aim Medium-Fine" for V60, "aim Fine" espresso, "aim Coarse" French press). Reuses the v2.97 "aim X" posLabel pattern; no new element. Selecting a grinder still upgrades to exact clicks
- [ ] npm run check green (2.120.0 synced); verified via preview: no grinder + no coarseness + empty grindSize → V60 posLabel "aim Medium-Fine"; Espresso "aim Fine"; French Press "aim Coarse"; with a coarseness preset → unchanged ("approx"); with a grinder → band path unchanged
- [ ] Update toast after deploy (cache v2.120.0)

## Sprint 133 (v2.121.0) — "Explain my settings" cites the user's grind too
- [ ] AI Product lens: ruleExplainParams (keyless "What do these mean?") is genuinely contextual — cites the user's dose, ratio, water (computes cups), temp — but the Grind line was principle-only ("• Grind — finer slows…"), the one setting not tied to their value, even when grind is set. Slightly undercuts the "your settings" promise
- [ ] Compute gShown once (d.grindSize and/or COARSE_LABELS[grindCoarseness]) → " (yours: 18 · Medium-Fine)"; append to both the filter + espresso Grind lines. Empty when no grind set. AI path already says "be concrete about their actual numbers". No new storage
- [ ] npm run check green (2.121.0 synced); verified via preview: grindSize 18 + coarseness 3 → "Grind (yours: 18 · Medium-Fine) —…"; coarseness only → "(yours: Medium-Fine)"; none → plain "Grind —"; espresso branch likewise
- [ ] Update toast after deploy (cache v2.121.0)

## Sprint 134 (v2.122.0) — rating prompt reframed from grading to reflection
- [ ] Emotional Design lens: the rating is a rich daily touchpoint (pop+haptic, celebrate@5, reactive meaning via the <=3 nudge / >=4 praise bands, journey) — meaning WITHOUT a forced per-value label (which the lens itself cautions against; per-value words would violate it + duplicate the bands). The one clinical bit was the prompt label "Overall Rating" — product-grading language in an otherwise reflective Taste tab
- [ ] Reframed the eval-label "Overall Rating" → "How was this cup?" — a reflective question consistent with the existing question-style "What's off about the cup?" label; copy-only, no per-value labels forced
- [ ] npm run check green (2.122.0 synced); verified via preview the rating label reads "How was this cup?"
- [ ] Update toast after deploy (cache v2.122.0)

## Sprint 135 (v2.123.0) — Tab focus-trap for the immersive overlays
- [ ] Accessibility lens: .modal-overlay modals have a full focus-trap (initModalA11y), but .ba-overlay (Brew-Along) + .ob-overlay (onboarding) only got focus-into + Escape (v2.33/v2.69) — the Tab-wrap was deferred. A keyboard user could Tab past the last overlay button onto the visually-hidden page behind the immersive overlay, losing focus offscreen
- [ ] Extended initModalA11y: for #baOverlay + #obOverlay, add a Tab keydown handler (only when .show) that wraps focus at the visible-focusables boundary (last→first, Shift+Tab first→last); one-time guard (_tabTrap). (Escape + focus-into already exist from v2.33/v2.69)
- [ ] Also fixed a latent bug in BOTH focusables queries: `[href]` matched SVG `<use href>` icons (non-focusable) inside buttons → the boundary element was a `<use>` and the wrap never fired. Changed `[href]` → `a[href]` (focusable anchors only); hardens the existing modal trap too
- [ ] npm run check green (2.123.0 synced); verified via preview: in Brew-Along, focus last control + dispatch Tab → wraps to first; focus first + Shift+Tab → wraps to last; trap inert when overlay hidden
- [ ] Update toast after deploy (cache v2.123.0)

## Sprint 136 (v2.124.0) — hidden attribute now wins everywhere (Brew-Along Rate button)
- [ ] Mobile Kitchen UX / bug: #baRateBtn (.btn) is hidden=true until the Brew-Along completion (v2.71), but .btn{display:inline-flex} overrode the [hidden] UA rule — so once the overlay opened, "Rate this cup →" was VISIBLE through the whole guided brew; a mid-brew tap exits early to Taste. The author had patched this per-element (.grind-custom-row/.ai-panel/.tier-pill/.template-row[hidden]) but missed .btn
- [ ] Added one global guard `[hidden] { display:none !important; }` so the hidden attribute reliably wins over any flex/.btn display rule. Toggle behavior intact (hidden=false at completion → .btn display returns). Makes the 4 per-element patches redundant (left harmless)
- [ ] npm run check green (2.124.0 synced); verified via preview: in an open Brew-Along, baRateBtn display:none + offsetParent null while hidden; updateBATheater completion → hidden=false → visible
- [ ] Update toast after deploy (cache v2.124.0)

## Sprint 137 (v2.125.0) — backup bundle includes the custom flavor-tag vocabulary
- [ ] Product Strategist lens (data-ownership moat): exportAllRecipes bundled {recipes, beans, gear} and the toast claimed "everything the user built" — but the custom flavor-tag vocabulary (brewcraft_tags, v2.49 — flagged then as a follow-up) was omitted. A user who built personal tasting words loses that reusable chip set on restore / new device (recipes keep their flavorTags, but the vocabulary that re-appears for future brews is gone)
- [ ] Export bundle now carries tags: customTags (schema version 2→3). importRecipesFile restores data.tags additively, case-insensitive dedupe → brewcraft_tags + renderCustomTags(). Toast rebuilt as a clean extras-join "(+N beans, M setups, K tags)". Old v2 bundles still import (tags absent = no-op)
- [ ] npm run check green (2.125.0 synced); verified via preview: export bundle includes tags array; importRecipesFile with {tags:[...]} adds new tags (dedupes existing), persists brewcraft_tags, re-renders chips, toast shows tag count
- [ ] Update toast after deploy (cache v2.125.0)

## Sprint 138 (v2.126.0) — espresso pressure + pre-infusion are tracked in the iteration
- [ ] Advanced Coffee User lens (espresso round-trip): DIFF_FIELDS tracked espYield + espShotTime but NOT espPressure / espPreinfusion (real, stored, print-shown fields). A serious espresso user (Flair/lever/spec machine) who iterates on pressure or pre-infusion as their one variable got a "no change yet" version thread, a dial-in iterationHistory blind to it, and a Compare/version-diff that didn't surface it
- [ ] Added ['espPressure','Pressure (bar)'] + ['espPreinfusion','Pre-infusion'] to DIFF_FIELDS → now flow into renderThread, renderVersionDiff, iterationHistory (dial-in), openCompare, and paramsChanged (brewAgain). Consistent with the existing espYield/espShotTime treatment (empty → "—" for non-espresso, same as today)
- [ ] npm run check green (2.126.0 synced); verified via preview: iterationHistory for parent/child espresso recipes differing only in espPressure now reports "Pressure (bar) 9→6"; espPreinfusion change reported; DIFF_FIELDS length +2
- [ ] Update toast after deploy (cache v2.126.0)

## Sprint 139 (v2.127.0) — ratio sweet-spot cluster is scale-aware (espresso-trustworthy)
- [ ] Emotional/Advanced lens: bestRatioCluster (Insights "Your best <method> cups cluster around 1:X") used a flat spread tolerance of 3 — fine for filter (1:15–1:18), but for espresso a spread of 3 spans 1:2→1:5 (ristretto to lungo, totally different shots), so it would claim a "cluster" that isn't one and the celebratory insight rings hollow
- [ ] Tolerance now scales with the ratio magnitude: Math.max(0.4, median*0.2) → espresso median 2 → 0.4 (tight), filter median 16 → 3.2 (≈ old 3). Computes median first. Honors espresso-specificity; the insight is now a real cluster across methods
- [ ] npm run check green (2.127.0 synced); verified via preview: espresso 4★+ ratios [2.0,2.1,2.2] → cluster ~1:2.1; [2.0,2.5,3.5] → null (correctly rejected, was wrongly a cluster); filter [15,16,17] → cluster 1:16; filter [14,16,19] → null
- [ ] Update toast after deploy (cache v2.127.0)

## Sprint 140 (v2.128.0) — enthusiasts get a breadcrumb that water tuning exists
- [ ] Beginner/Strategist lens: water chemistry (a distinctive feature) is Expert-only (body.simple #sec-water display:none; skillToMode maps beginner+enthusiast→simple). So an ENTHUSIAST who's heard "water matters" has zero in-flow signal the feature exists — invisible until a tier flip they may not know unlocks it. Beginners are correctly shielded
- [ ] Added a calm enthusiast-only breadcrumb at the water position (order:4): ".water-grow" display:none by default, shown only under body.skill-enthusiast (NOT beginner, NOT expert). Copy: "Water chemistry — measure or mix your brewing water — is an Expert-mode tool. [Switch your level] when you want to go deeper" → openSettingsToSkill. Muted line, no box, grow-into framing (not pushy upsell)
- [ ] npm run check green (2.128.0 synced); verified via preview: under skill-enthusiast the .water-grow shows (display block) + #sec-water hidden; under skill-beginner BOTH hidden; under skill-expert .water-grow hidden + #sec-water shown
- [ ] Update toast after deploy (cache v2.128.0)

## Sprint 141 (v2.129.0) — scrubber rulers stop trapping vertical scroll (touch-action: pan-y)
- [ ] Mobile Kitchen UX (long-flagged since ~v2.39/2.76): the 4 precision scrubber rulers (dose/ratio/water/temp) had touch-action:none, so a thumb starting a vertical scroll ON a ruler couldn't scroll the page — the gesture was captured. pan-y was deferred for "real-device feel" fears (diagonal-steal)
- [ ] Re-examined and shipped touch-action:none → pan-y: the textbook value for a horizontal slider (vertical → page scroll, horizontal → scrub). The scrubber ALREADY listens for pointercancel (the event the browser fires when it takes over a vertical drag), so the existing end-handler cleanly aborts a scrub that becomes a scroll. Desktop/mouse path unaffected (touch-action is touch-only); one-line revert if iOS feel is off
- [ ] npm run check green (2.129.0 synced); verified via preview: CSS touch-action now pan-y; a horizontal pointer drag on the coffeeDose ruler still scrubs the value (scrub logic intact). NOTE: the vertical-scroll-while-on-ruler behavior is iOS-touch-specific and can't be exercised by synthetic events in desktop preview — pan-y is the standard pattern + pointercancel-backed; confirm feel on a real iPhone (revert to none if janky)
- [ ] Update toast after deploy (cache v2.129.0)

## Sprint 142 (v2.130.0) — keyless dial-in handles the Weak+Too-Intense contradiction
- [ ] AI Product lens: tapping the contradictory pair "Weak" + "Too Intense" made keyless ruleDialIn stack opposite commands — the weak branch "Tighten the ratio — more coffee" AND the strong branch "Loosen the ratio — less coffee" both fired. The coach looked broken. (Same latent issue in espresso/immersion bodies)
- [ ] Added a method-agnostic early-return at the top of ruleDialIn (before the espresso/immersion routing): when issues include BOTH 'weak' and 'strong', return a reframe — "they point opposite ways; thin → more coffee (tighter ratio), overpowering → more water (looser ratio/splash); fix the bigger problem and re-taste". Covers all methods in one place; the wording is method-agnostic
- [ ] npm run check green (2.130.0 synced); verified via preview: ruleDialIn(['weak','strong']) → the conflict reframe, no contradictory tighten+loosen lines; ['weak'] alone → normal tighten advice; ['strong'] alone → normal loosen advice; espresso method + ['weak','strong'] → same reframe (routed before espressoDialIn)
- [ ] Update toast after deploy (cache v2.130.0)
