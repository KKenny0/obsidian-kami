# Screenshot Refresh Checklist

This directory holds the screenshots embedded in `README.md` /
`README.zh-CN.md`. Use this checklist when refreshing screenshots for a new
release, and save with the exact filenames below so the README embeds keep
working.

## Shot list (7 required)

All screenshots should be **1440px wide** (or retina equivalent), PNG, no
annotations or watermarks. Capture on a clean vault with at least one
representative long-form note open.

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

## Optional (defer)

- `graph-view.png` — graph view with kami-warm nodes (only after graph
  styling is implemented, currently not in Phase 2a)
- `pdf-export.png` — PDF export preview (deferred to Phase 1.5)
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
