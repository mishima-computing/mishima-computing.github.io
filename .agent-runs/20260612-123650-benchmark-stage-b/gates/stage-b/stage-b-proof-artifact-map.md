# stage-b-proof-artifact-map

Contract: IC-20260612-stageA-uiux-spec-001

Metric cards `100%`, `< 10ms`, and `24 / 7` are excluded from proof counts.

| View/section | Frozen block staged | Adjacent proof artifact or trust-register deep link | Verification excerpt |
| --- | --- | --- | --- |
| `/` first viewport | `三嶋電算株式会社` / `Mishima Computing K.K.` plus profile rows | `kessan/` via `電子公告を見る (決算公告)` / `View Electronic Public Notices` | `index.html` first `.hero-first-viewport` contains `.hero-proof a[href="kessan/"]` and moved `#profile-details` table. |
| `/` about | `会社情報` / `Company Overview`; overview paragraphs | Trust register links to `/kessan/`, `/reports/waterfall-agents/`, `/agent-readiness/manifest.json`, `/incidents/20260604-powershell-mojibake.md`, `/contact/` | `index.html` `.trust-register` is adjacent to about copy. |
| `/` services | Three frozen service cards | `AG-2026-001`, `GitHub Org`, `AG-2026-003` proof-neighbor links | `index.html` service cards include `.proof-neighbor`. |
| `/` reports | `AG-2026-001`, `AG-2026-002`, `AG-2026-003` report cards | `reports/waterfall-agents/`, `agent-readiness/`, and static AG-2026-003 report detail | `index.html` report 3 includes `.static-report-detail`; report 1 and 2 link to existing pages. |
| `/` GitHub | `Open Source & Community`; GitHub CTA | `https://github.com/mishima-computing` | Existing organization link remains adjacent to paragraph. |
| `/` contact CTA | `サーバーレス実証デモ ＆ カタログ` / `Serverless Live Demo & Catalog` | `contact/` live form/catalog page | Existing CTA remains adjacent to contact proof copy. |
| `/agent-readiness/` hero | `AI Search Readiness Add-on` | `manifest.json`, `llms.txt`, `sitemap.xml`, `robots.txt` | Added `.proof-strip` in `agent-readiness/index.html`. |
| `/contact/` | Contact form labels and catalog | Cloudflare Workers/GitHub architecture catalog | Existing two-column form/catalog layout remains; catalog visible before submission. |
| `/kessan/` | Electronic public notice card and coordinates | Notice coordinate table with registered URL and legal basis | Existing `#notice-card` and `#notice-coords` remain. |
| `/privacy/` | Measurement policy disclosure | Email and contact paths | Existing card and buttons remain. |
| `/reports/waterfall-agents/` | Governance report body, tables, CTA | GitHub repository CTA and consultation CTA | Existing report body and CTA remain. |
| `/incidents/20260604-powershell-mojibake.md` | Published incident record | UTF-8 no-BOM prevention record | File unchanged; linked from index trust register. |

Result: pass for `proof-artifact-density-per-index-section`.

