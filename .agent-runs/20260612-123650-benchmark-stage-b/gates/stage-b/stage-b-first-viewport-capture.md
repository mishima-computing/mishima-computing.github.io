# stage-b-first-viewport-capture

Contract: IC-20260612-stageA-uiux-spec-001

## DOM Outline

```text
main
  section#hero-section.hero
    div.container
      div.hero-first-viewport
        div.hero-ledger
          div.hero-ledger-copy
            div.hero-pill: 会社情報 / Company Overview
            div.entity-title.hero-title: 三嶋電算株式会社 / Mishima Computing K.K.
            div.hero-proof
              a.proof-link[href="kessan/"]: 電子公告を見る (決算公告) / View Electronic Public Notices
            div.hero-cta.hero-cta-single
              a.btn.btn-primary[href="#about"]#cta-primary: 会社を知る / Discover Us
          table#profile-details.profile-table.hero-profile-table
            rows: 社名, 代表取締役, 本店所在地, 創設ラボ, 設立, 資本金
      div.hero-content.hero-claim
        h1#main-headline: 湧水の如き清流の論理で、未来の電算を拓く。 / Flowing Logic, Engineering the Future.
        a#cta-secondary[href="#reports"]: 技術資料を閲覧 / Read Reports
      div.hero-metrics
        metric cards: 100%, < 10ms, 24 / 7
```

## Gate Assertions

- Legal personhood in first viewport: `div.entity-title` and `table#profile-details`.
- Exactly one proof artifact in first viewport: `a.proof-link[href="kessan/"]`.
- Exactly one primary action in first viewport: `a#cta-primary[href="#about"]`.
- Metric cards are outside `.hero-first-viewport`; they follow `.hero-content.hero-claim`, below the first viewport region created by `min-height: calc(100vh - 5rem)`.

## Screenshot Status

This environment has no browser per Stage B intake. Controller screenshot commands are written to `screenshot-commands.sh`.

