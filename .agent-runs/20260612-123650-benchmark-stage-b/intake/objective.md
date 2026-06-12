# ONE-SHOT BENCHMARK, Stage B: Implement the Evidence Ledger spec

Implement docs/design/uiux-spec.md (ratified Stage A, contract
IC-20260612-stageA-uiux-spec-001) on the actual site. The spec is the
single source of design truth — Stage B adds NO design decisions beyond
it; where the spec is silent, the cited cards/anchors decide; where both
are silent, choose the most restrained option and record it.

## Binding gates (mechanical, run before handing back)

1. wording-preservation: 100% of frozen blocks per the spec inventory
   (HTML body, JS-injected text, metadata, llms.txt, sitemap, robots,
   manifest) — block-multiset, order-insensitive.
2. All 7 Decidable propositions verified, each producing its named
   verification artifact under .agent-runs/<run>/gates/stage-b/.
3. check_encoding.py clean (UTF-8 no BOM — the incident on this very
   site is published in incidents/).
4. WCAG floors per spec (contrast samples, focus visibility).
5. No JS-required content visibility (bilingual blocks statically in DOM).

## Deliverables

The redesigned site (HTML/CSS, static, GitHub Pages, relative paths) +
the gate artifacts + the section-rhythm and proof-artifact maps the spec
names. Screenshots for the perceptual artifacts: Chrome headless
--screenshot --window-size=1280,2400 (desktop) and 390,2400 (mobile)
for / and the two deepest content pages.

## Non-goals

Content rewriting, new pages, JS frameworks, build steps, analytics,
editing docs/design/uiux-spec.md, scripts/, CI.
