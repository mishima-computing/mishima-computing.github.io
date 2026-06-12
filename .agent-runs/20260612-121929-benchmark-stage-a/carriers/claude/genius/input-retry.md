role: genius
role_spec: roles/genius.md
adapter: .claude/agents/genius.md
schema: schemas/genius-packet.schema.json
allowed_files: none (read-only role)
forbidden_files: all writes forbidden
expected_output: .agent-runs/20260612-121929-benchmark-stage-a/carriers/claude/genius/result.json
run_id: 20260612-121929-benchmark-stage-a

# ONE-SHOT BENCHMARK, Stage A: Corporate homepage UI/UX specification

This is the final exam of the UI/UX knowledge rebuild
(anchor:evaluation-instruments#hp-benchmark-readiness). The org gets ONE
shot: Stage A ratifies a spec, Stage B implements it, the owner judges
the result with a taste gate (pass/fail, no iteration). Baseline: the
previous attempt failed the owner taste gate ("つまらない") — its
post-mortem is ratified knowledge (design-thesis requirement,
interpretation-scope, order-insensitive content gate all exist because
of it).

## Owner decisions (binding)

- Scope: the full site mishima-computing.github.io (Mishima Computing
  K.K. corporate site; static HTML on GitHub Pages; pages: index, about,
  contact, privacy, docs, kessan, incidents, reports, agent-readiness).
- Content WORDING is 100% preserved: every text block survives verbatim
  (order-insensitive block-multiset gate, mechanical). All else is the
  org's to decide.
- interpretation-scope (owner-declared): wording FROZEN; structure FREE;
  order FREE; staging FREE; format FREE.
- Pass/fail: owner taste gate only. One presentation.
- Audience reality: Japanese K.K. whose product is trust/traceability
  tooling for AI organizations; bilingual JA/EN surfaces exist on the
  current site.

## Stage A deliverable (docs-only, ratified by merge)

docs/design/uiux-spec.md containing, per .agent-org/intake-template.md:

1. design-thesis: the positive memorable move. This is the spec's core —
   the previous failure was a ban-only spec. The thesis must be specific
   enough that Stage B can be checked against it.
2. The five layers (strategy/scope/structure/frame/presentation)
   instantiated for THIS site with its real content.
3. composition acceptance propositions with per-objective thresholds
   (proof-artifact density, section-type sequence, first-viewport
   proposition, etc. from ui-composition-patterns) — each marked
   Decidable (mechanically checkable in Stage B) or Advisory.
4. Bilingual decision per ui-bilingual-typography: lead language per
   view, per-script tokens, measure budgets — applied to the actual
   JA/EN content present.
5. Feel surfaces if any (proves:/timing-ranges discipline; this is a
   static corporate site — motion restraint per
   anchor:motion#nng-animation-duration and WCAG motion criteria is a
   design decision to make explicitly, not omit).

## Named profiles (objective-driven selection, forwarded verbatim)

ui-corporate-trust-genre, ui-composition-patterns,
ui-bilingual-typography, ui-information-design, ui-feel-foundations
(motion restraint decision). Anchors via card citations; exemplars.md
entries are hypothesis-class only (antgroup unverified).

## Hard constraints

Stage A is docs-only (no HTML/CSS edits). The spec must claim only
claim-class-1 effects (anchor:evaluation-instruments#claim-classes).
Static-site reality: no build framework, no JS dependency for content
visibility, GitHub Pages hosting. Accessibility floors per
anchor:accessibility and anchor:color WCAG entries are non-negotiable
acceptance criteria, not advisory.

## Non-goals

Implementation (Stage B), content rewriting/translation, new pages,
analytics, CMS, perceptual-gate tooling (#44), changing scripts/ or CI.

Substrate: read the ACTUAL SITE first (index.html, about/, kessan/, incidents/, agent-readiness/ — the unusual disclosure surfaces), then ui/ cards and exemplars.md. External verification in step 5: (a) verify the exemplars.md registry entries are live and date-pin them (tailscale.com, deepseek.com — antgroup is unverified-class, note only); (b) research what 2025-2026 corporate sites of trust-infrastructure companies (security/audit/compliance SaaS) actually do for first-viewport proposition + proof-artifact density — find 2-3 VERIFIABLE current examples with URLs and dates as hypothesis-class evidence for the thesis; (c) verify JIS/JP accessibility reference if the spec leans on it (JIS X 8341-3 = WCAG mapping — confirm the public pointer). Pointer-style; hypothesis-class clearly separated from canonical.
Output budget: JSON object first character, no preamble or code fences; each string <=200 chars; kept_hypotheses <=3 by default with schema cap 5; every array <=6 items; total output is controller-measured, <=32000 bytes; evidence summaries are pointers plus one-line summaries, never essays. The handoff_to_aufheben hard cap is 600 characters — draft it, count it, and trim to under 500 BEFORE emitting.
Set role_id to "genius". Return pure JSON conforming to the schema. Include ONLY the properties defined in the schema; if you drop a field, remove the key entirely.

RETRY NOTE (mechanical): your previous output failed schema validation on exactly one point: kept_hypotheses[2].mechanism exceeded the 400-character leaf cap. Reproduce the same findings; keep every leaf string under 400 characters.
