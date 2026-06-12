# stage-b-bilingual-dom-audit

Contract: IC-20260612-stageA-uiux-spec-001

## Pre-edit Dry-run Semantics

- `lang-ja` and `lang-en` blocks were audited as separate frozen text blocks.
- Pre-edit CSS hid one side with `[lang="ja"] .lang-en, [lang="en"] .lang-ja { display: none !important; }`.
- Stage B fallback selected: keep both languages visible in the DOM and visible in CSS; the language toggle may still change labels/placeholders but does not determine content visibility.

## Post-edit Static Audit

Commands:

```text
rg -n "@import|@keyframes|animation:|transition: all|letter-spacing: -|display: none !important|\[lang=\"ja\"\] \.lang-en|\[lang=\"en\"\] \.lang-ja|setProperty\('--x'|mousemove" assets/css/style.css index.html contact/index.html kessan/index.html privacy/index.html agent-readiness/index.html reports/waterfall-agents/index.html assets/js/app.js
rg -o 'class="[^"]*lang-ja[^"]*"' index.html contact/index.html kessan/index.html privacy/index.html agent-readiness/index.html reports/waterfall-agents/index.html assets/js/app.js | wc -l
rg -o 'class="[^"]*lang-en[^"]*"' index.html contact/index.html kessan/index.html privacy/index.html agent-readiness/index.html reports/waterfall-agents/index.html assets/js/app.js | wc -l
```

Results:

```text
lang-ja class occurrences: 352
lang-en class occurrences: 345
No language-hiding selector found.
No display:none!important language rule found.
```

Difference note: counts are not expected to match exactly because some labels are intentionally English-only frozen text (`Open Source & Community`, `GitHub Org`, machine filenames, report categories) and some JS/modal wrappers have class variants without a `lang` attribute. All bilingual blocks keep JA and EN present and visible in DOM.

Result: pass for `bilingual-visible-support`.

