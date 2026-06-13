# UI/UX Spec: Evidence Ledger

## design-thesis

**Evidence Ledger**: Mishima Computing K.K. performs its own trust product on itself.

Each current view must make the same checkable move: frozen company text is staged next to a verifiable proof artifact that a visitor, crawler, or reviewer can inspect without relying on JavaScript. The memorable surface is not a badge wall or a marketing metric; it is the company showing legal personhood, operating discipline, and traceable engineering evidence beside the claims it already publishes.

Per-view check:

| view | lead decision | adjacent proof artifact |
| --- | --- | --- |
| `/` | JA lead, EN visible support | first viewport: legal personhood facts plus exactly one proof artifact; later sections deep-link to `kessan/`, `reports/waterfall-agents/`, `agent-readiness/manifest.json`, GitHub, and `contact/` |
| `/about/` | JA lead redirect | redirect remains a frozen route to `../#about`; proof adjacency is supplied by the index company profile and kessan notice |
| `/reports/` | JA lead redirect | redirect remains a frozen route to `../#reports`; proof adjacency is supplied by the report cards and `reports/waterfall-agents/` |
| `/reports/waterfall-agents/` | JA lead, EN visible support | report body, governance terms, roles table, and GitHub repository CTA |
| `/agent-readiness/` | JA lead, EN visible support | `agent-readiness/manifest.json`, JSON-LD, robots/sitemap references, and the page's own AI-readable architecture |
| `/contact/` | JA lead, EN visible support | serverless contact demo and its Cloudflare Workers/GitHub catalog explanation |
| `/kessan/` | JA lead, EN visible support | electronic public notice coordinates, legal timeline, and first-term preparation status |
| `/privacy/` | JA lead, EN visible support | measurement-policy disclosure and contact paths |
| `/incidents/20260604-powershell-mojibake.md` | JA incident lead with EN labels | published incident post-mortem and UTF-8 no-BOM prevention record |

The frozen metric cards `100%`, `< 10ms`, and `24 / 7` are explicitly not proof artifacts. They may survive verbatim, but they must be staged below the first viewport and outside proof-artifact counts.

## interpretation-scope

| dimension | state | owner note |
| --- | --- | --- |
| wording | `FROZEN` | Stage B must preserve existing body text, JS-injected UI text, metadata text, machine-file labels, and manifest text as blocks, except the recorded wording=FREE carve-out for the five `/` trust-register display labels. |
| structure | `FREE` | Stage B may regroup existing blocks into an Evidence Ledger trust register, subject to the no-new-page baseline. |
| order | `FREE` | Stage B may reorder frozen blocks to make proof adjacency visible. |
| staging | `FREE` | Stage B may move existing blocks above or below the fold, including demoting the metric cards. |
| format | `FREE` | Stage B may change layout, tables, cards, responsive behavior, and motion, within static HTML/CSS/JS constraints. |

## five layers

### strategy

Audience: prospective customers, technical evaluators, AI/search agents, crawlers, and owner reviewers who need to know whether Mishima Computing is a real legal and engineering entity.

Promise: the company sells trust, traceability, AI-agent readiness, distributed infrastructure, serverless workflow integration, and technical validation; the site must show that same discipline through its own public evidence.

Product posture: a sober engineering boutique, not a certification-heavy compliance vendor. The site should feel decisive through proof density, legible bilingual presentation, and clear entity facts.

Non-goals: no Stage B implementation in this spec, no content rewrite, no translation rewrite, no new public pages, no build framework, no package manager, no analytics or third-party embed additions, no CI or script changes, no production infrastructure changes, and no adoption claim.

Effect class: all design effects are claim-class-1 per `anchor:evaluation-instruments#claim-classes`: credibility, focus, scanability, legibility, and appeal. The spec makes no class-2 performance or market-effect claims.

Reference posture: `tailscale` and `deepseek-/en` may be cited in Stage B notes only as fetch-verified exemplars for evidence-led technical disclosure. `antgroup` may appear only as hypothesis-class if it is mentioned at all.

### scope

Human-facing surfaces in scope:

| surface | current role | frozen text inventory source |
| --- | --- | --- |
| `/` | company index with hero, company profile, services, reports, GitHub, contact CTA, modal shell, shared footer | `index.html` body text and metadata |
| `/about/` | redirect to company overview | `about/index.html` title, refresh target, script redirect, and fallback paragraph |
| `/reports/` | redirect to report section | `reports/index.html` title, refresh target, script redirect, and fallback paragraph |
| `/reports/waterfall-agents/` | long-form governance report | `reports/waterfall-agents/index.html` body text and metadata |
| `/agent-readiness/` | AI search and agent-readiness service page | `agent-readiness/index.html` body text, metadata, JSON-LD, FAQ text, flowchart labels, plan table |
| `/contact/` | inquiry form plus serverless catalog demo | `contact/index.html` body text, placeholders, form labels, metadata |
| `/kessan/` | electronic public notice page | `kessan/index.html` body text and metadata |
| `/privacy/` | measurement-policy disclosure | `privacy/index.html` body text and metadata |
| `/incidents/20260604-powershell-mojibake.md` | published incident record | markdown headings, summary facts, root cause, resolution, prevention measures |

Machine-facing and JS-injected inventory in scope for preservation, not restructuring:

| source | text blocks to preserve |
| --- | --- |
| `assets/js/app.js` | language toggle labels `EN` and `JA`; aria labels `Switch to English` and `日本語に切り替え`; contact textarea placeholders; modal report titles, dates, categories, body headings, and body paragraphs; contact prefill templates; submit state `送信中...` / `Sending...`; success state `送信が完了しました！` / `Message Sent Successfully!`; retry button; failure alert |
| HTML metadata | `<title>`, meta descriptions, canonical/alternate titles, JSON-LD names, descriptions, FAQ question/answer text, offer names, organization facts |
| `llms.txt` | heading, blockquote summary, core page labels, service labels, compliance/policy labels, contact labels |
| `sitemap.xml` | URL list, lastmod/changefreq/priority values as machine labels |
| `agent-readiness/manifest.json` | manifest name, version, canonical URL, publisher labels, purpose, capabilities, page titles, agent guidance, allowed public use, do-not-assume text |
| `robots.txt` | crawler-policy comments, user-agent labels, allow rules, sitemap URL |

Excluded interactions: no new public HTML page for `incidents/` or `docs/` unless the owner explicitly rules that HTML surfacing is allowed. Baseline is deep-linking from the trust register to existing markdown and existing HTML surfaces.

### structure

The site structure becomes an Evidence Ledger trust register, not a new sitemap. Register entries use bilingual human labels over frozen deep-link targets, so the visible text names the trust function while the hrefs remain the existing legal, engineering, readiness, incident, and contact surfaces.

1. Personhood: JA legal name, EN legal support name, registered office, representative, scheduled establishment, capital, origin lab.
2. Public notice: `決算公告` / `Public Notice` over frozen target `/kessan/` and the notice coordinates.
3. Engineering provenance: `技術レポート AG-2026-001` / `Technical Report AG-2026-001` over frozen target `/reports/waterfall-agents/`, GitHub organization, and public repository links already present.
4. Agent readiness: `AI対応マニフェスト` / `Agent Readiness Manifest` over frozen target `/agent-readiness/manifest.json`, plus `/agent-readiness/`, JSON-LD, `llms.txt`, `sitemap.xml`, and `robots.txt` inventory.
5. Operational candor: `インシデント記録` / `Incident Report` over frozen target `/incidents/20260604-powershell-mojibake.md`, UTF-8 no-BOM discipline, and ADR-0001 static HTML rationale.
6. Serverless proof: `お問い合わせ` / `Contact` over frozen target `/contact/` contact form demo and Cloudflare Workers/GitHub catalog explanation.

Deep-link baseline: trust-register entries link to existing surfaces and markdown files with bilingual human labels rather than raw path display text. HTML rendering of incidents or docs is an owner-ruling-gated option only; Stage B must not presume it.

Separable structural bets and fallbacks:

| bet | default decision | recorded fallback |
| --- | --- | --- |
| hero demotion | first viewport becomes personhood-first with one proof artifact; frozen metric cards move below the fold | if contested, keep the existing hero text but add per-view proof-artifact adjacency immediately after it |
| bilingual model | JA lead on all views, EN visible support in the same DOM | if block-multiset semantics fail, keep both languages always visible without a JS toggle |
| register grouping | index-level register groups proof artifacts by trust function | if register grouping feels too heavy, keep existing section order but add proof captions and deep links beside each frozen block |

### frame

First viewport rule: the first viewport must contain legal personhood, exactly one proof artifact, and one action. It must not contain the unverifiable metric cards as proof.

Index section frame:

| section family | frame rule |
| --- | --- |
| company profile | table remains valid for registered facts; on narrow screens each row must remain scannable without horizontal-only access |
| services | existing three cards remain frozen text blocks; each card must point to a proof neighbor rather than becoming a decorative promise |
| reports | report cards remain entry points; modal-only content must not be the only visible path to report text |
| GitHub | organization link and repository references act as provenance proof; avoid decorative badge-wall treatment |
| contact | form and architecture catalog are paired as action plus proof; the catalog must remain readable before any form submission |
| public notice | legal timeline and notice coordinates stay table/list based for scanability |
| privacy | disclosure text stays compact and directly linked to contact paths |

Responsive rules:

- JA measure target: approximately 15-40ch for dense paragraphs and labels.
- EN measure target: approximately 45-75ch for paragraph blocks.
- Mixed-script handling follows `anchor:typography-cjk-latin` with JLREQ/CLREQ-aware spacing, no negative letter spacing, and no viewport-width font scaling.
- Tables must provide stable responsive dimensions through wrapping, stacked rows, or overflow affordances that preserve labels and values.
- Buttons and form controls must have stable dimensions so language changes do not create layout shifts.

### presentation

Tone: sober disclosure register with restrained Mishima/Fuji identity. Mishima/Fuji motifs are presentation texture only; they must not replace proof artifacts.

Color and contrast: `anchor:color` and `anchor:accessibility` are binding. Body text must meet WCAG 2.2 AA 4.5:1 contrast; large text and non-text UI boundaries must meet 3:1; focus indicators must be visible in both themes.

Bilingual decision:

- JA is lead language on every current view.
- EN is visible support on every current bilingual block.
- No content visibility may depend on JavaScript execution.
- Stage B must dry-run the existing block-multiset wording gate before editing bilingual spans.
- If paired-span gate semantics are uncertain, fallback is both languages always visible in the DOM with no language-toggle dependency.

Motion-restraint decision:

- Only opacity and transform may animate.
- `grid-bg`, `glow-orb`, and `pulse` ambient motion must be made static or removed.
- Timing must cite `anchor:motion#nng-animation-duration` and `proves:/timing-ranges`; this spec deliberately avoids fixed millisecond constants.
- `prefers-reduced-motion` must remove all animation and transition motion, not merely shorten it.
- WCAG 2.2 SC 2.2.2, 2.3.1, and 2.3.3 are binding acceptance checks.

Motion proves table:

| cause | state | response | continuity | recovery |
| --- | --- | --- | --- | --- |
| focus or hover on link/button | affordance is available | opacity/transform only within the cited immediate-feedback band | control remains in place and readable | reduced-motion has no movement |
| opening an existing modal | report detail is now active | opacity/transform only within the cited context-change band | focus is trapped and Escape closes | reduced-motion opens without animation |
| contact submission state | form is submitting or returned a result | text/status swap proves submission state; no ambient movement | original button text is restored on failure | reduced-motion has no movement |
| theme or language control | preference changed | content visibility remains DOM-readable; control label changes | no content is removed from non-JS readers | fallback keeps both languages visible |

Accessibility floors:

- WCAG 2.2 AA contrast: 4.5:1 body text, 3:1 large text and non-text contrast.
- Visible focus for keyboard users.
- Keyboard operability for navigation, buttons, modal close, and form submission.
- Alt text for meaningful images and empty/hidden treatment for decorative media.
- Motion compliance for SC 2.2.2, 2.3.1, and 2.3.3.
- Content readable without JavaScript per ADR-0001 rationale.

Static delivery: Stage B must remain plain HTML/CSS/JS on GitHub Pages with no framework, SSG, package manager, external font requirement, new external script, or asset dependency mandated by this spec.

Encoding: Stage B must preserve UTF-8 no-BOM discipline and run the encoding check, reflecting the published mojibake incident.

## composition acceptance propositions

| proposition | type | threshold | objective-derived rationale | Stage B verification artifact |
| --- | --- | --- | --- | --- |
| proof-artifact-density-per-index-section | Decidable | Each index-level content section has at least 1 adjacent proof artifact or trust-register deep link. The metric cards `100%`, `< 10ms`, and `24 / 7` count as 0 proof artifacts. | Evidence Ledger requires every claim-bearing section to show verifiable support, while excluding unverifiable metrics from proof. | `stage-b-proof-artifact-map` listing section, frozen block, proof artifact URL/file, and adjacency screenshot/text excerpt. |
| first-viewport-personhood-proof-action | Decidable | The first viewport contains legal personhood, exactly 1 proof artifact, and exactly 1 primary action; the metric cards are below the first viewport. | The first impression should establish a real K.K. and one checkable proof before promotional breadth. | `stage-b-first-viewport-capture` with desktop/mobile screenshots and DOM outline. |
| section-type-run-length | Decidable | No more than 2 consecutive sections share the same section type: promise, proof, register, action, disclosure, or long-form. | Prevents the trust register from becoming monotonous while staying mechanically countable. | `stage-b-section-rhythm-table` naming each section type in order. |
| bilingual-visible-support | Decidable | 100% of bilingual content blocks expose JA lead and EN support in the DOM without requiring JS for visibility. | The current site serves humans, crawlers, and agents; language support cannot disappear for non-JS readers. | `stage-b-bilingual-dom-audit` plus pre-edit block-multiset dry-run result. |
| wording-preservation | Decidable | 100% of frozen text blocks from HTML body, JS-injected UI text, metadata, `llms.txt`, `sitemap.xml`, `robots.txt`, and `manifest.json` are preserved as blocks unless the owner separately authorizes wording changes. | Stage A is wording-FROZEN; Stage B can change staging and format but not text content. | `stage-b-wording-inventory-diff` using block hashes or multiset output. |
| motion-restraint | Decidable | 0 non-opacity/transform animations; 0 ambient looping motion; 100% removal under `prefers-reduced-motion`. | Motion should prove state changes, not decorate continuously. | `stage-b-motion-audit` listing CSS selectors, properties, timing-range citations, and reduced-motion result. |
| wcag-floor | Decidable | 100% of sampled body text passes 4.5:1; 100% of sampled large text and non-text UI passes 3:1; focus is visible on all interactive controls. | Accessibility floors are non-negotiable for legibility and operability. | `stage-b-accessibility-floor-report` with contrast samples and keyboard path notes. |
| section-rhythm-variety | Advisory | Prefer at least 3 section families within the first 5 major sections. | Variety improves scanability and appeal, but owner taste may prioritize a stricter register. | `stage-b-section-rhythm-table` annotated with owner-taste note. |

## wording-preservation inventory

The following inventory is the Stage B source map. It inventories real current files and requires preservation as blocks; it does not authorize replacement wording outside the five-label trust-register carve-out recorded below.

Carve-out re-baseline: the `/` trust-register visible anchor labels are wording=FREE only for these five replacements: `/kessan/` becomes `決算公告` / `Public Notice`; `/reports/waterfall-agents/` becomes `技術レポート AG-2026-001` / `Technical Report AG-2026-001`; `/agent-readiness/manifest.json` becomes `AI対応マニフェスト` / `Agent Readiness Manifest`; `/incidents/20260604-powershell-mojibake.md` becomes `インシデント記録` / `Incident Report`; `/contact/` becomes `お問い合わせ` / `Contact`. The href targets remain frozen deep links, and the wording-preservation diff baseline treats only these five visible label strings as authorized replacements.

### shared body blocks

- Brand: `Mishima Computing`; `三嶋電算株式会社`; image alt `Mishima Computing Logo`.
- Navigation labels: `会社概要` / `About`; `事業領域` / `Services`; `技術レポート` / `Reports`; `決算公告` / `Public Notices`; `お問合せ` / `Contact`.
- Controls: language toggle `EN`; theme aria label `Toggle Dark/Light Mode`; language aria label `Switch Language`.
- Footer description: `AIエージェント、分散クラウドインフラ、高信頼性業務システムの設計および技術検証を行うエンジニアリング・ブティック。` / `Engineering boutique specializing in AI agents, distributed clouds, and enterprise validation.`
- Footer labels: `サイトマップ` / `Sitemap`; `お問合せ / その他` / `Contact / Info`; `GitHub Org`; `Representative GitHub`; `プライバシー` / `Privacy`.
- Copyright and location: `© 2026 Mishima Computing K.K. / 三嶋電算株式会社. All rights reserved.`; `本店: 東京都千代田区 | 創設地: 静岡県三島市` / `HQ: Chiyoda-ku, Tokyo | Lab: Mishima City, Shizuoka`.

### `/`

- Hero pill: `自律型エージェント ＆ インフラ検証` / `Autonomous Agents & Infrastructure`.
- H1: `湧水の如き清流の論理で、未来の電算を拓く。` / `Flowing Logic, Engineering the Future.`
- Hero tagline block beginning `富士の裾野から湧き出る清らかな水のように` and EN block beginning `Like the pristine spring waters born from Mount Fuji`.
- CTA labels: `会社を知る` / `Discover Us`; `技術資料を閲覧` / `Read Reports`.
- Metrics: `100%` with `自律エージェント検証` / `Autonomous Testing`; `< 10ms` with `極低遅延エッジ推論` / `Edge Latency`; `24 / 7` with `常時稼働インフラ` / `Continuous Ops`.
- Company overview: `会社情報` / `Company Overview`; two overview paragraphs; CTA `電子公告を見る (決算公告)` / `View Electronic Public Notices`; trust-register labels `決算公告` / `Public Notice`, `技術レポート AG-2026-001` / `Technical Report AG-2026-001`, `AI対応マニフェスト` / `Agent Readiness Manifest`, `インシデント記録` / `Incident Report`, and `お問い合わせ` / `Contact` over their frozen deep-link targets.
- Profile rows: `社名`, `代表取締役`, `本店所在地`, `創設ラボ`, `設立`, `資本金` with current values including `村田 曜啓`, `2026年6月 (予定)`, and `10,000円`.
- Services: `自律型エージェント開発` / `Autonomous Agents`; `クラウド・エッジ推論基盤` / `Distributed Cloud`; `自動システム技術検証` / `Technical Validation`, with current card paragraphs.
- Reports: `AG-2026-001`, `AG-2026-002`, `AG-2026-003`, dates, titles, summaries, bullets, and `全文を読む` / `Read Full Report`.
- GitHub section: `Open Source & Community`; `GitHubで私たちの電算を開放する` / `Discover Our Tech on GitHub`; current paragraph; `GitHubでOrganizationを見る` / `View GitHub Organization`.
- Contact CTA: `サーバーレス実証デモ ＆ カタログ` / `Serverless Live Demo & Catalog`; `お問合せ窓口を開く` / `Get in Touch`; current paragraph; `お問合せ ＆ デモ画面へ進む` / `Proceed to Contact & Demo`.
- Modal shell placeholders: `Category`; `Report Title`; `Date:`; `2026.05.01`; `Author: Mishima Lab`; close label `Close modal`.

### redirects

- `/about/`: title `Mishima Computing K.K. | 三嶋電算株式会社`; redirect URL `../#about`; fallback `Redirecting to Company Overview...`.
- `/reports/`: title `Mishima Computing K.K. | 三嶋電算株式会社`; redirect URL `../#reports`; fallback `Redirecting to Technical Reports...`.

### `/kessan/`

- Metadata title and descriptions for `決算公告 - Mishima Computing K.K. | 三嶋電算株式会社`.
- H1: `電子公告` / `Electronic Public Notices`.
- Intro: `会社法第440条第3項に基づき、貸借対照表に係る情報を継続して開示しています。` / corresponding EN block.
- Notice card: `第1期 決算公告（貸借対照表）` / `1st Term Balance Sheet`; `準備中 (工事中)` / `Under Construction`; `第1期決算公告は準備中です` / `First Term Notice in Preparation`.
- Legal timeline rows: `会社設立（第1期スタート）`; `第1期 期末（決算日の到来）`; `定時株主総会 ＆ 電子公告掲載`, with dates and EN support.
- Coordinates: `公告の基礎情報` / `Public Notice Coordinates`; `公告方法`; `掲載URL`; `根拠法令`; current URL and legal basis.

### `/contact/`

- Metadata title `お問合せ ＆ サーバーレス実証デモ | Mishima Computing K.K.` and description.
- Hero/form: `安全・迅速なサーバーレス窓口` / `Secure & Fast Serverless Portal`; `お問い合わせ・お見積` / `Contact & Estimate Request`; current intro paragraph.
- Form labels and placeholders: `お名前 / 貴社名` / `Name / Company`; `Taro Mishima`; `メールアドレス` / `Email Address`; `taro@example.com`; `お問い合わせ内容` / `Your Message`; `ご相談内容やお見積のご要件をご自由にご記入ください...`; `お問合せを送信する` / `Send Message`.
- Catalog: `Live Technology Catalog`; `本フォームのサーバーレス構成` / `Our Serverless Architecture`; current catalog paragraph.
- Catalog item headings: `ランニングコスト 0円（無料枠の範囲内）`; `堅牢なセキュリティ設計（認証情報をブラウザに露出しない）`; `すべてをコードで管理（GitOps方式）`; `即時通知で運用負荷を最小に`; `GitHub Issuesによる高度な顧客サポート`, with EN headings and paragraphs.

### `/privacy/`

- Metadata title `Privacy | Mishima Computing K.K.` and description.
- Pill `Privacy`; H1 `プライバシー` / `Privacy`.
- Lead paragraph describing measurement policy.
- Card heading `Webサイト改善のための計測について` / `Website Improvement Measurement`.
- Current two card paragraphs and buttons `Email`, `お問い合わせ` / `Contact`.

### `/agent-readiness/`

- Metadata title `AI検索・AIエージェント対応 | Mishima Computing K.K.` and description.
- Hero: `AI Search Readiness Add-on`; `既存HPに追加できるAI検索対応アドオン` / `AI Search Readiness Add-on for Existing Sites`; current hero paragraph; `無料でAI検索・HP診断を依頼する` / `Request Free AI Diagnostics`; `プランを見る` / `View Plans`.
- Challenge section: `こんな課題はありませんか？` / `Common Challenges`; current note; five current challenge bullets.
- Pathways section: `AIが会社情報を取得する4つの経路` / `4 Pathways of AI Information Retrieval`; current note; flowchart labels and four pathway cards.
- Machine box: `※学習用クローラーへの配慮 (robots.txtの設計)` / `*Consideration for Training Crawlers (robots.txt)`, with current paragraphs.
- Add-ons: `アドオンで追加・改善するもの` / `What We Add & Improve`; card headings `情報構造の最適化`, `機械可読シグナルの追加`, `問い合わせ・マップ導線`, `AIクローラー向け平文案内` and EN support.
- Measurement: `効果測定：プライバシーを尊重する軽量アナリティクス` / `Measurement: Privacy-First Lightweight Analytics`; current note, image caption, three card headings and paragraphs, CTA.
- Process table: `作り直し不要の進め方` / `Implementation Process`; rows `1. 現状診断` through `5. 継続改善`.
- Plans table: `提供プラン` / `Service Plans`; four current plan rows.
- FAQ: current five visible FAQ items and JSON-LD FAQ text blocks.
- Policy: preserve the current JA/EN policy heading and paragraphs in `/agent-readiness/` as existing text while making no new claim from them.

### `/reports/waterfall-agents/`

- Metadata title `AG-2026-001 | Mishima Computing K.K.` and description.
- Header: `AG-2026-001`; `2026.06.03`; `AIに、ウォーターフォールを守らせる。` / `Making AI Agents Honor Waterfall Discipline`; subtitle beginning `「成果物だけでなく、その作り方ごと納品する」`.
- Summary block: current JA and EN paragraphs and three check questions.
- Section headings: `1. 設計思想`; `2. なぜ必要か`; `3. 上流工程・SLCP・ウォーターフォール語彙との接続`; `上流統制としてのAIエージェント運用`; `4. 6つの役割と境界`; `責任分界と受入`; `非機能要求としてのAI運用`; `5. 中核契約`; `6. 非目標 (Non-goals)`.
- Governance tables: AI governance term rows from `workspace classification` through `cloud-sync hard stop`; role rows from `Human Owner` through `Local Tooling Pod`; current JA/EN cell text.
- Diagram labels: `AI Agent Waterfall Control Loop / AIエージェント工程統制ループ`, numbered nodes, side labels, and evidence-package labels.
- CTA: `オープンソースで公開中` / `Available Open Source`; current paragraph; `GitHub リポジトリ` / `GitHub Repository`; `技術検証のご相談` / `Consult with Us`.

### `/incidents/20260604-powershell-mojibake.md`

- Heading: `Incident Report: PowerShell Default Encoding Mojibake (2026-06-04)`.
- Sections: `概要 (Summary)`, `根本原因 (Root Cause)`, `解決策・復旧手順 (Resolution)`, `再発防止策 (Preventive Measures)`.
- Facts: `発生日時: 2026年6月4日 14:13頃 (JST)`, `影響範囲: リポジトリ内の全HTMLファイル（7ファイル）`, `検知: デプロイ直後、ユーザーによる目視確認で発覚`.
- Prevention labels: `エンコーディングの明示`, `ネイティブツールの優先使用`, `コミット前の Diff 検証`, `CIによるエンコーディングの自動監査（事後検出）`.

### JS-injected text

- Language labels and aria labels listed under shared body blocks.
- Contact dynamic placeholder: `Please describe your inquiry, project scope, or estimation requirements...`.
- Modal report keys: `report-agents`, `report-cloud`, `report-validation`; titles, dates, categories `Agent Systems`, `Cloud Infrastructure`, `Technical Validation`; current modal body headings and paragraphs.
- Contact prefill templates: `無料でAI検索・HP診断を依頼する`; `Request a Free AI Search & HP Diagnostic`; `技術検証（PoC）およびシステム構築について相談する`; `Consult about Technical Validation (PoC) & System Development`; bracketed field labels.
- Submit/success/failure states listed in the scope table.

### metadata and machine files

- Preserve all current HTML titles, descriptions, canonical URLs, JSON-LD names/descriptions/questions/answers/offer labels, and alternate manifest title.
- Preserve `llms.txt` heading, summary, page list, service list, compliance/policy list, and contact list as wording inventory.
- Preserve `sitemap.xml` URL entries and machine labels.
- Preserve `agent-readiness/manifest.json` text values.
- Preserve `robots.txt` crawler policy comments and rules.

## Stage B verification sequence

1. Run the block-multiset wording gate dry-run before edits; record semantics for paired JA/EN spans and JS-injected text.
2. Build `stage-b-wording-inventory-diff` from the inventory above; fail the Stage B handoff if frozen blocks are missing.
3. Build `stage-b-proof-artifact-map`; verify metric cards are excluded.
4. Capture first viewport on desktop and mobile; verify personhood, one proof artifact, one action.
5. Audit bilingual DOM visibility with JavaScript disabled.
6. Audit motion selectors, timing-range citations, and reduced-motion behavior.
7. Audit WCAG floors for contrast, focus, keyboard, alt text, and motion SC entries.
8. Run UTF-8 no-BOM encoding check before owner presentation.
