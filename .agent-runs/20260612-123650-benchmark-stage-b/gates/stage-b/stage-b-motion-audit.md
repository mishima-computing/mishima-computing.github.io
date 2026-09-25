# stage-b-motion-audit

Contract: IC-20260612-stageA-uiux-spec-001

References: `anchor:motion#nng-animation-duration`, `proves:/timing-ranges`, `htmlcss-motion-implementation`.

## Static Scan

Command:

```text
rg -n "@import|@keyframes|animation:|transition: all|letter-spacing: -|display: none !important|\[lang=\"ja\"\] \.lang-en|\[lang=\"en\"\] \.lang-ja|setProperty\('--x'|mousemove" assets/css/style.css index.html contact/index.html kessan/index.html privacy/index.html agent-readiness/index.html reports/waterfall-agents/index.html assets/js/app.js
```

Result:

```text
assets/css/style.css:1286:    animation: none !important;
```

The only `animation:` occurrence is the reduced-motion removal rule.

## Transition Selectors

All remaining transitions are opacity and/or transform only:

```text
.fuji-silhouette: opacity
.nav-link::after: transform, opacity
.icon-btn: transform, opacity
.lang-btn: transform, opacity
.btn: transform, opacity
.card: transform, opacity
.card::before: opacity
.card-icon: transform, opacity
.report-card .read-more svg: transform
.modal: opacity
.modal-content: transform
.modal-close: transform, opacity
.form-control: opacity
```

## Removed or Disabled Motion

- Ambient `pulse-glow`, `spin-slow`, and `shine` keyframes removed.
- `.hero-pill .pulse` is static.
- `initCardGlowEffects()` is no longer called and returns immediately; pointer-follow background motion is disabled.
- `prefers-reduced-motion: reduce` removes all transitions and animations.

Result: pass for `motion-restraint`.

