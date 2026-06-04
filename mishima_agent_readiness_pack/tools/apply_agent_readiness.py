#!/usr/bin/env python3
'''Apply the Mishima Computing AI search / agent-readiness pack.

Run from the repository root:
    python3 tools/apply_agent_readiness.py

Or from anywhere:
    python3 tools/apply_agent_readiness.py --repo /path/to/mishima-computing.github.io
'''
from __future__ import annotations

import argparse
import shutil
from pathlib import Path

PACK_ROOT = Path(__file__).resolve().parents[1]
SITE_ROOT = PACK_ROOT / "site"
MARKER = "mishima-agent-readiness-jsonld"

HOME_JSONLD_SCRIPT = '<!-- Agent-readiness structured data -->\n  <script type="application/ld+json" id="mishima-agent-readiness-jsonld">\n{\n  "@context": "https://schema.org",\n  "@graph": [\n    {\n      "@type": "Organization",\n      "@id": "https://mishima-computing.github.io/#organization",\n      "name": "三嶋電算株式会社",\n      "alternateName": "Mishima Computing K.K.",\n      "url": "https://mishima-computing.github.io/",\n      "logo": "https://github.com/mishima-computing.png",\n      "description": "AIエージェント、分散クラウドインフラ、高信頼性業務システムの設計および技術検証を行うエンジニアリング・ブティック。",\n      "email": "info@mishima-computing.github.io",\n      "sameAs": [\n        "https://github.com/mishima-computing",\n        "https://github.com/mishima-computing/mishima-computing.github.io"\n      ],\n      "address": {\n        "@type": "PostalAddress",\n        "streetAddress": "2-19-23 Kanda Sudacho, Daiwa Akihabara Bldg 2F",\n        "addressLocality": "Chiyoda-ku",\n        "addressRegion": "Tokyo",\n        "addressCountry": "JP"\n      },\n      "areaServed": "JP",\n      "knowsAbout": [\n        "AI agent readiness",\n        "Generative AI search optimization",\n        "Semantic HTML",\n        "Structured data",\n        "Cloudflare Workers",\n        "GitOps",\n        "Kubernetes",\n        "CI/CD",\n        "Technical validation"\n      ]\n    },\n    {\n      "@type": "WebSite",\n      "@id": "https://mishima-computing.github.io/#website",\n      "url": "https://mishima-computing.github.io/",\n      "name": "Mishima Computing K.K. | 三嶋電算株式会社",\n      "inLanguage": [\n        "ja",\n        "en"\n      ],\n      "publisher": {\n        "@id": "https://mishima-computing.github.io/#organization"\n      }\n    }\n  ]\n}\n  </script>\n'

NAV_INSERT = '''          <li>
            <a href="./agent-readiness/" class="nav-link">
              <span class="lang-ja">AI検索対応</span>
              <span class="lang-en">Agent Ready</span>
            </a>
          </li>
'''

FOOTER_INSERT = '''          <li><a href="./agent-readiness/"><span class="lang-ja">AI検索対応</span><span class="lang-en">Agent Readiness</span></a></li>
'''

CTA_INSERT = '''            <a href="./agent-readiness/" class="btn btn-secondary" id="cta-agent-readiness">
              <span class="lang-ja">AI検索対応を見る</span>
              <span class="lang-en">Agent Readiness</span>
            </a>
'''


def copy_site_files(repo: Path) -> None:
    for source in SITE_ROOT.rglob("*"):
        if source.is_dir():
            continue
        rel = source.relative_to(SITE_ROOT)
        dest = repo / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, dest)
        print(f"copied: {rel}")


def patch_homepage(repo: Path) -> None:
    index_path = repo / "index.html"
    text = index_path.read_text(encoding="utf-8")
    original = text

    if 'rel="canonical" href="https://mishima-computing.github.io/"' not in text:
        text = text.replace(
            '  <meta name="description" class="lang-en" content="Mishima Computing K.K. is a high-tech engineering boutique specialized in autonomous AI agents, distributed cloud infrastructure, and mission-critical system validation.">',
            '  <meta name="description" class="lang-en" content="Mishima Computing K.K. is a high-tech engineering boutique specialized in autonomous AI agents, distributed cloud infrastructure, and mission-critical system validation.">' + "\n" +
            '  <link rel="canonical" href="https://mishima-computing.github.io/">'
        )

    if MARKER not in text:
        text = text.replace("</head>", HOME_JSONLD_SCRIPT + "</head>")

    if './agent-readiness/' not in text:
        nav_anchor = '''          <li>
            <a href="/kessan/" class="nav-link">
              <span class="lang-ja">決算公告</span>
              <span class="lang-en">Public Notices</span>
            </a>
          </li>
'''
        text = text.replace(nav_anchor, NAV_INSERT + nav_anchor)

        cta_anchor = '''            <a href="#reports" class="btn btn-secondary" id="cta-secondary">
              <span class="lang-ja">技術資料を閲覧</span>
              <span class="lang-en">Read Reports</span>
            </a>
'''
        text = text.replace(cta_anchor, cta_anchor + CTA_INSERT)

        footer_anchor = '''          <li><a href="/kessan/"><span class="lang-ja">決算公告</span><span class="lang-en">Public Notices</span></a></li>
'''
        text = text.replace(footer_anchor, FOOTER_INSERT + footer_anchor)

    if text != original:
        index_path.write_text(text, encoding="utf-8")
        print("patched: index.html")
    else:
        print("unchanged: index.html")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", type=Path, default=Path.cwd(), help="Path to repository root")
    args = parser.parse_args()
    repo = args.repo.resolve()
    if not (repo / "index.html").exists():
        raise SystemExit(f"index.html not found in {repo}")
    copy_site_files(repo)
    patch_homepage(repo)
    print("\nDone. Review with: git diff")


if __name__ == "__main__":
    main()
