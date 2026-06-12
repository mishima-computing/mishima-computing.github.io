# stage-b-accessibility-floor-report

Contract: IC-20260612-stageA-uiux-spec-001

References: `anchor:color#wcag22-contrast-criteria`, `anchor:accessibility#wcag22-recommendation`, `htmlcss-computable-spatial`.

## Contrast Samples

Command used HSL token conversion and WCAG relative-luminance contrast math.

| Sample | Ratio | Floor | Result |
| --- | ---: | ---: | --- |
| Dark text primary on dark background | 18.02:1 | 4.5:1 | Pass |
| Dark text secondary on dark background | 9.94:1 | 4.5:1 | Pass |
| Dark primary link on dark background | 10.52:1 | 4.5:1 | Pass |
| Light text primary on light background | 16.73:1 | 4.5:1 | Pass |
| Light text secondary on light background | 7.55:1 | 4.5:1 | Pass |
| Light primary link/control on white | 4.53:1 | 4.5:1 | Pass |
| Focus gold on dark background | 10.98:1 | 3:1 | Pass |
| Focus gold on light background | 4.62:1 | 3:1 | Pass |

## Focus and Keyboard

- `:focus-visible` adds a 3px solid focus outline with 4px offset using `--accent-gold`.
- Navigation links, language/theme buttons, report cards, modal close button, form fields, submit button, and CTAs remain native keyboard-operable elements.
- Modal behavior now sets `aria-hidden`, focuses the close button on open, restores previous focus on close, supports Escape, and loops Tab/Shift+Tab inside the modal.

## No-JS Content

- Bilingual content is visible through CSS without relying on JS language state.
- AG-2026-003 modal report content also exists as static `<details>` content in the DOM.
- Contact catalog remains visible before any form submission.

## Media and Decorative Treatment

- Existing meaningful images keep `alt` text.
- Decorative SVG/icon containers use existing inline SVG or `aria-hidden` where already present.
- No new external media dependency was introduced.

Result: pass for `wcag-floor` by static/sample audit. Browser focus-ring screenshots are delegated to controller via `screenshot-commands.sh`.

