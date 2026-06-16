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
