# Mishima Computing K.K. / 三嶋電算株式会社

This repository hosts the official website of Mishima Computing K.K.

🌐 **Live Site**: [https://mishima-computing.github.io/](https://mishima-computing.github.io/)

## Live Showcase: AI Search Readiness

This website itself serves as a **live implementation showcase** for our AI Search Readiness Add-on (`/agent-readiness/`). It demonstrates:
- **Semantic HTML & Structured Data**: Designed to be cleanly parsed by Search AI, LLMs, and browser-based AI agents.
- **Lightweight Measurement**: Utilizes Cloudflare Web Analytics to observe information dynamics and inquiry paths without tracking individual user identities across the web.

## Developer Notes

### Inline SVGs and CSS Resets

When using modern CSS resets (like Tailwind's Preflight or modern-normalize), `<svg>` elements are often forced to `display: block;` globally. 
If you attempt to align an inline SVG icon (like a GitHub logo) with text inside a link or paragraph using `vertical-align`, it may still cause unwanted line breaks because the `block` display property takes precedence.

**Solution**: Explicitly set `display: inline-block;` on the SVG element to override the global reset and allow natural text wrapping:

```html
<!-- Example: Perfectly aligning an SVG icon with text -->
<svg style="display: inline-block; vertical-align: -0.125em; margin-right: 0.2em;" ...>
  <path d="..."/>
</svg>
```
