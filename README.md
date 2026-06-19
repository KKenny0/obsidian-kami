# Kami Reader — Obsidian Theme

> **Inspired by [tw93/kami](https://github.com/tw93/kami). Not affiliated with or
> endorsed by tw93. All visual design tokens trace to the original kami project
> (MIT); this repo is an Obsidian-side adaptation.**

An Obsidian theme inspired by [tw93/kami](https://github.com/tw93/kami). Translates
kami's print-grade typographic system — warm parchment surface, ink-blue accent,
serif-led hierarchy, warm-gray neutrals — onto the Obsidian editor.

> Status: **Phase 1 — personal use, validating the visual transfer.**
> Not yet submitted to the Obsidian Theme Gallery.

---

## Visual Language

Aligned to [kami v1.1.0](https://kami.tw93.fun/index-zh.html).

| Token | Light | Dark | Role |
|---|---|---|---|
| Parchment / Deep Dark | `#f5f4ed` | `#141413` | Primary note background |
| Ivory / Dark Ivory | `#faf9f5` | `#1a1917` | Sidebars, surfaces |
| Warm Sand | `#e8e6dc` | `#353330` | Borders, dividers |
| Dark Surface / Warm Ivory | `#30302e` | `#e8e3d2` | Body text |
| Ink Blue / Ink Light | `#1B365D` | `#2D5A8A` | Accent: headings, links, selection, CTA |
| Olive | `#504e49` | `#b4b09e` | Quote / caption text |
| Warm Highlight | `#f3e3a8` | `#5a4a1f` | `==mark==` highlight |
| Tag Tint | `#E4ECF5` | `#E4ECF5` | Tag background (solid, never rgba) |

All neutrals carry a yellow-brown warm undertone (no cold blue-grays) in **both**
light and dark variants. Ink blue is used sparingly — the print-design ≤5% rule
is relaxed for the editor context but the intent holds: accent only, never chrome.

---

## Typography

```css
--font-text-theme: "Charter", "Georgia",
                   "LXGW WenKai Screen", "LXGW WenKai",
                   "Source Han Serif SC", "Noto Serif CJK SC",
                   "Songti SC", "STSong", "SimSun", serif;
```

- **Charter** — English serif. macOS-native (`/System/Library/Fonts/Charter.ttc`),
  no install needed. Falls back to Georgia on other platforms. This is the font
  kami itself uses for English.
- **LXGW WenKai Screen** — CJK 楷书, OFL 1.1. Screen variant optimized for
  low-DPI displays. Closes the gap with kami's original 仓耳今楷02 (which is
  commercial-restricted).
- **JetBrains Mono** — Code, OFL 1.1.
- **Inter** — UI / interface, OFL 1.1.

### Optional font install

Only LXGW WenKai Screen needs manual install. Without it, CJK falls back to
`Songti SC` (macOS) / `SimSun` (Windows) — readable but loses the kaiti warmth.

- **LXGW WenKai Screen** — https://github.com/lxgw/LxgwWenKai-Screen/releases
  (grab `LXGWWenKaiScreen-Regular.ttf` + `Bold.ttf`)
- JetBrains Mono (optional, code already falls back to SF Mono / Cascadia):
  https://www.jetbrains.com/lp/mono/

---

## Installation (macOS Sequoia + App Store Obsidian)

> ⚠️ **Why this isn't a normal "drop folder in themes/" install.**
>
> Mac App Store Obsidian runs in a sandbox. macOS Sequoia 15+ tags every file
> created by `cp` from Terminal with `com.apple.provenance`. The sandbox then
> refuses to load those files as theme resources — Obsidian silently skips the
> theme folder and falls back to whatever it last loaded successfully.
> `xattr -cr` cannot remove `com.apple.provenance` (SIP-protected).
>
> The workaround: ship kami as a **CSS snippet** instead of a theme, and inject
> it via Obsidian's own Vault API from the DevTools console. Files written by
> `app.vault` carry Obsidian provenance and load normally.

### One-time setup

1. Confirm Appearance → Themes is set to **Default** (no other theme should
   be active; another theme's `body.<name>-theme` class will out-spec kami's
   `body.theme-light` selector).
2. From this directory, generate the inject script:
   ```bash
   ./sync.sh
   ```
3. Open the generated `inject-kami-snippet.js`, `Cmd+A` select all, `Cmd+C` copy.
4. In Obsidian: `Cmd+Option+I` → Console tab → `Cmd+V` paste → Enter.
   You should see `✓ kami.css created (... chars)`.
5. Settings → Appearance → scroll to **CSS Snippets** → enable **kami**.

### Iterating on the CSS

```bash
# Edit theme.css, then:
./sync.sh
# Re-copy inject-kami-snippet.js contents → paste into Obsidian Console.
# Then toggle the kami snippet off → on to force reload.
```

Hot-reload of modified snippets is **not** automatic — Obsidian reads snippet
files at startup. After re-injecting via `app.vault.modify`, toggle the snippet
off and on in Settings → Appearance → CSS Snippets to pull the new content.

---

## Coverage

Phase 1 targets full visual coverage:

- ✅ Base color tokens (60+ variables, both light and dark palettes)
- ✅ **Dark variant** — Deep Dark `#141413` + Ink Light `#2D5A8A`, preserving
  the same yellow-brown undertone and single-accent restraint as light mode.
- ✅ Reading View: headings, body, lists (em-dash markers), tables, blockquote
  (2pt ink-blue rail + olive text, no bg), code, frontmatter, embeds
- ✅ Editing View (CodeMirror 6): syntax tokens, cursor, selection, active
  line, formatting marks
- ✅ UI chrome: titlebar, tabs, ribbon, file explorer, status bar, command
  palette, settings panel, modals, menus, toggles, checkboxes, scrollbars
- ✅ Reduced-motion preference respected

Not covered (deferred):
- PDF Export stylesheet (kami is print-native; this is a Phase 1.5 candidate)
- Style Settings plugin schema (Phase 2 — lets users tune color temperature,
  font, contrast)
- Plugin-specific overrides (Dataview, Templater, Excalidraw) — verify as
  encountered

---

## Phase 2 — Publishing

Triggered only if Phase 1 one-week dogfooding confirms the visual transfer holds.

Phase 2 work:
1. **Solve the sandbox install problem for end users.** The Vault-API inject
   flow only works for the developer. End users on App Store Obsidian will
   hit the same provenance wall. Options to evaluate:
   - Document the snippet workflow as the install path (clunky but works).
   - Submit to Theme Gallery and verify whether Obsidian's own downloader
     produces files with the right provenance (likely yes — Obsidian writes
     them itself).
   - Ship as a community plugin that injects the CSS programmatically.
2. Audit hardcoded font names → expose via Style Settings.
3. Write `data-theme.json` Style Settings schema.
4. Screenshot set (light reading view, editing view, command palette, settings).
5. Submit PR to `obsidianmd/obsidian-releases` → `community-css.json`.
6. Optional: subset LXGW WenKai Screen Regular to top-3500 characters and
   bundle as woff2 (~1MB) for the intended look out-of-the-box.

---

## Design Decisions

1. **Forked from Obsidian Default, not Minimal.** Minimal carries its own
   design language; mixing parchment into it produces visual dissonance.
   Minimal also uses `body.minimal-theme` class selectors (specificity 0,1,1)
   that beat kami's old `:root` (0,0,1). Default has no such class.
2. **Variables on `body.theme-light` / `body.theme-dark`, not `:root`.**
   Obsidian's built-in app.css defines base vars under `.theme-light` /
   `.theme-dark` (specificity 0,1,0). `:root` (0,0,1) loses the cascade;
   `body.theme-light` (0,1,1) wins.
3. **Charter, not Newsreader.** kami v1.1.0 specifies Charter for English;
   it's also macOS-native, removing a font-install step.
4. **Tag backgrounds use solid `#E4ECF5`, never rgba.** kami explicitly bans
   rgba tag backgrounds (WeasyPrint double-rect bug in PDF export).
5. **Ring + whisper shadows, never hard drop shadows.** kami spec; hard
   drop shadows look heavy in print and on screen.
6. **Em-dash list markers, not bullets.** kami Dash List — "短横线代替圆点，
   更书卷气".
7. **Blockquote: 2pt ink-blue rail + olive text, no background, no italic.**
   Restraint over decoration.
8. **LXGW WenKai Screen over Source Han Serif.** Kami's original (仓耳今楷02)
   is a kaiti; Source Han Serif is a print songti. The kaiti keeps the
   calligraphic warmth that defines kami's character.
9. **No synthetic bold weights.** Kami forbids fake bold; headings use 500/600
   actual weights only.
10. **Shipped as snippet, not theme, in Phase 1.** Workaround for macOS
    Sequoia sandbox; see Installation section.

---

## Fragile Assumptions to Verify in Phase 1

1. **Parchment background is comfortable for long editing sessions on screen.**
   If after a week you instinctively switch back to a cooler light or a dark
   theme, the transfer fails. Pivot option: "Kami-Lite" — keep ink-blue accent,
   swap parchment for ivory `#faf9f5` or near-white.
2. **Kaiti is legible at body size on screen during active writing.** Screen
   variant of LXGW WenKai specifically addresses this, but real verification
   requires a week of dogfooding. If kaiti fatigues, fall back to Source Han
   Serif via the CSS variable.

---

## File Layout

```
kami-obsidian/
├── manifest.json              # Phase 2 Theme Gallery submission metadata
├── theme.css                  # Source of truth for all kami styles
├── sync.sh                    # Regenerates inject-kami-snippet.js from theme.css
├── inject-kami-snippet.js     # Generated by sync.sh — paste into Obsidian Console
└── README.md                  # This file
```

`inject-kami-snippet.js` is a **build artifact**, not source. Regenerate via
`./sync.sh` after any `theme.css` change.

---

## Credits

- Visual system & design tokens: [tw93/kami](https://github.com/tw93/kami) — MIT
- Fonts: Charter (OFL, macOS-native), LXGW WenKai (OFL), JetBrains Mono (OFL),
  Inter (OFL)
