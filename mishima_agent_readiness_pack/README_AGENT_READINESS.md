# Mishima Computing AI Search / Agent Readiness Pack

This package adds the first implementation layer for **AI検索・AIエージェント対応**.

## What it adds

- `agent-readiness/index.html` — public service page for AI search and browser-agent readiness
- `agent-readiness/manifest.json` — machine-readable public manifest for agents
- `robots.txt` — crawler policy with sitemap declaration
- `sitemap.xml` — public URL discovery map
- `tools/apply_agent_readiness.py` — safe patch script for homepage navigation, homepage JSON-LD, and footer links

## Apply

From a local clone of `mishima-computing/mishima-computing.github.io`:

```bash
unzip mishima_agent_readiness_pack.zip
python3 mishima_agent_readiness_pack/tools/apply_agent_readiness.py --repo .

git diff
git add index.html robots.txt sitemap.xml agent-readiness
git commit -m "feat(agent-readiness): add AI search and agent-readable layer"
git push
```

## Validate after deploy

- Open `https://mishima-computing.github.io/agent-readiness/`
- Open `https://mishima-computing.github.io/agent-readiness/manifest.json`
- Open `https://mishima-computing.github.io/robots.txt`
- Open `https://mishima-computing.github.io/sitemap.xml`
- Test structured data with Google's Rich Results Test or Schema Markup Validator
- In Search Console, submit `https://mishima-computing.github.io/sitemap.xml` and request indexing for `/` and `/agent-readiness/`

## Notes

This package does not promise or imply guaranteed inclusion in AI search results. It makes public company and technical-catalog information clearer, crawlable, and easier for search AI and browser agents to interpret correctly.
