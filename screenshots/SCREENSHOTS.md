# Screenshot Refresh Checklist

This directory holds the screenshots embedded in `README.md` /
`README.zh-CN.md`. Use this checklist when refreshing screenshots for a new
release, and save with the exact filenames below so the README embeds keep
working.

## Shot list (10 required)

All screenshots should be **1440px wide** (or retina equivalent), PNG, no
annotations or watermarks. Capture only from the synthetic visual fixture vault
in `kami-reader-companion/tests/fixtures/visual-vault`. Never use a personal,
customer, or production vault. Before publishing, verify that every visible
vault name, path, note title, body line, tab, and sidebar item comes from that
fixture.

### 1. `light-reading.png` — Light mode, Reading View

- Theme: Light mode (default)
- View mode: Reading View (`Cmd+E` toggle until preview)
- Content: a long-form note with H1/H2/H3, body, blockquote, list, table,
  inline code, tag — exercising as many typography primitives as possible
- Width: full editor

### 2. `light-editing.png` — Light mode, Live Preview

- Theme: Light mode
- View mode: Live Preview (default editing mode)
- Content: same representative note, showing Markdown formatting marks faded
  into background

### 3. `dark-reading.png` — Dark variant, Reading View

- Theme: Dark mode
- View mode: Reading View
- Content: same note, demonstrating Deep Dark `#141413` + Ink Light `#2D5A8A`
  palette transfer

### 4. `callouts.png` — Callout severity ladder

- A single note containing all four severity tiers in sequence:

  ```markdown
  > [!note] Default
  > 2pt ink-blue rail

  > [!tip] Gentle
  > 2.5pt rail — tip / success / question

  > [!warning] Warning
  > 3pt rail — warning / caution / bug

  > [!danger] Danger
  > 3pt rail + faint warm-red wash — danger / error / failure
  ```

### 5. `embed-featured-card.png` — Featured Card embed

- Embed another note via `![[other-note]]`
- Demonstrate whisper shadow + 16pt radius
- Choose `other-note` content that shows the card framing visibly (e.g.
  a short paragraph + a small image)

### 6. `command-palette.png` — Command palette

- Trigger command palette (`Cmd+P`)
- Show suggestions list with ink-blue selected-row tint

### 7. `settings-panel.png` — Settings panel

- Open Settings → Appearance
- Demonstrate warm-sand Secondary buttons + ink-blue Primary CTA + Default
  theme selected

### 8. `workspace-light.png` — Light mode, complete Workspace shell

- Theme: Light mode with Kami Reader applied
- Capture the **full Obsidian window** at 1440px wide
- Keep both left and right sidebars open, with multiple root tabs visible
- Show an active file, the View Header, and the attached status bar
- Use the same representative long-form note as the other reading/editing shots

### 9. `workspace-dark.png` — Dark mode, complete Workspace shell

- Theme: Dark mode with Kami Reader applied
- Capture the **full Obsidian window** at 1440px wide
- Keep both left and right sidebars open, with multiple root tabs visible
- Show an active file, the View Header, and the attached status bar
- Use the same representative long-form note as `workspace-light.png`

### 10. `pdf-export-white.png` — White-paper PDF export

- Start once from Light mode and once from Dark mode; both exports must render
  the page white with the same dark ink text and Ink Blue accents
- Include headings, Latin and CJK body text, callouts, task items, a code block,
  inline code, and a table with at least two body rows
- Treat Obsidian's decision to omit the Properties block from PDF export as app
  behavior; verify editable metadata separately in the on-screen white preview
- Verify warm parchment remains only inside document surfaces and even table
  rows; the outer page must not inherit the screen theme
- Do not change page size or printer margins as part of theme verification

## Optional (defer)

- `graph-view.png` — graph view with kami-warm nodes (only after graph
  styling is implemented, currently not in Phase 2a)
- `checkbox-completion.png` — Reading View screenshot from
  `checkbox-completion-demo.md`, showing a checked parent task whose child
  content remains readable instead of being struck through

## How to capture on macOS

```bash
# After setting up the scene in Obsidian, capture full window:
Cmd+Shift+4 then Space then click Obsidian window
# Or use screencapture CLI:
screencapture -i -o ./screenshots/light-reading.png
```

Save filenames must match the list exactly (lowercase, hyphen-separated).
README embeds use these paths and will break silently if a file is missing
or renamed.

On Windows, use Obsidian's native **Export to PDF** command and capture the
fixture-only PDF preview or exported page. The same privacy boundary applies:
never include a personal vault, Windows account path, or unrelated app window.

## Workspace-shell acceptance — 2026-08-02

Tested in Obsidian 1.13.4 on macOS with the generated `kami.css` injected
into an isolated temporary vault. The fixture was the same 8,995-word note in
both modes; the source vault was read-only and was not used as the test vault.

| Check | Result | Evidence / boundary |
| --- | --- | --- |
| Light and dark modes | Pass | `workspace-light.png`, `workspace-dark.png` |
| Focused and unfocused window | Partial | Focused state passed; unfocused styling was not retained as release evidence |
| Left and right sidebars open | Pass | Both screenshots show continuous sidebar planes |
| Sidebars collapsed | Not run | Avoided changing the final screenshot scene |
| Single and multiple tabs | Pass | Single-tab startup and the final two-tab scene were both exercised |
| Split panes and stacked tabs | Not run | No safe non-persistent run in this pass |
| File default and active states | Pass | File explorer shown in both screenshots |
| File hover, selected, and drag-over states | Not run | Transient drag state not retained as release evidence |
| Text inputs | Pass | Frontmatter text, date, and tag controls shown in both screenshots |
| Ribbon and collapsed-sidebar Ribbon | Partial | Expanded Ribbon passed; collapsed-sidebar state not run |
| View Header and actions | Pass | Title, navigation, edit, and overflow actions shown |
| Status bar short and long metadata | Partial | Long metadata passed at 8,995 words / 24,305 characters; short state not run |
| Settings and normal modal | Pass | Appearance settings and external-link confirmation modal were exercised and dismissed |
| Command palette, quick switcher, context menu | Not run | Deferred; no release screenshot depends on these overlays |
| Reading View and Live Preview | Partial | Reading View passed; Live Preview not run against this fixture |
| Keyboard-only focus traversal | Not run | Requires a dedicated accessibility pass |
| Reduced motion | Static only | CSS media-query coverage checked; OS preference was not changed |
| Narrow desktop window | Not run | Full-window 1440px release shots were the acceptance target |
| Mobile / tablet | Unverified | No real mobile or tablet environment was available |

`Pass` means observed in the real Obsidian renderer. `Static only`, `Partial`,
`Not run`, and `Unverified` are deliberately not treated as runtime proof.
