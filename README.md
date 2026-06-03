# Mishima Computing K.K. / 三嶋電算株式会社

This repository hosts the official website of Mishima Computing K.K.

🌐 **Live Site**: [https://mishima-computing.github.io/](https://mishima-computing.github.io/)

## Live Showcase: AI Search Readiness

This website itself serves as a **live implementation showcase** for our AI Search Readiness Add-on (`/agent-readiness/`). We treat this repository as an experimental playground and a catalog of best practices. 

Key architectural implementations you can observe in this repo include:

### 1. Static HTML Preference over JS Hydration
Core content and navigation (`header`, `footer`) are hardcoded in static HTML rather than dynamically injected via JavaScript. This ensures that simple LLM scrapers (like `OAI-SearchBot`) and browser-based AI agents can immediately parse the full DOM tree and internal links without needing to execute JavaScript or wait for framework hydration.

### 2. Frictionless Lead Tracking via URL Parameters
Instead of relying on heavy cookie-based tracking to see which CTA a user clicked, we use a lightweight URL parameter approach (`?subject=...&src=...`). 
The frontend JavaScript (`assets/js/app.js`) intercepts these parameters, logs the source to a hidden input for the backend, and automatically pre-populates a structured inquiry template into the user's textarea. This provides clear attribution for the business while significantly reducing the cognitive load for the user.

### 3. Privacy-first Analytics
We explicitly avoid individual user tracking across the web. Instead, we use Cloudflare Web Analytics to measure aggregate page views, core web vitals, and referral paths. This ensures we can observe the "information dynamics" (which pages are read, where do they drop off) while respecting visitor privacy and minimizing JavaScript payloads.

### 4. Comprehensive JSON-LD Structured Data
Important pages inject complete Schema.org JSON-LD blocks (e.g., `FAQPage`, `Service`, `Organization`, `WebPage`, `BreadcrumbList`) in the `<head>` or at the top of the `<body>`. This guarantees that Search Generative Experiences (SGE) and AI tools can deterministically extract our company information, service offerings, and FAQs without guessing based on visual CSS layouts.

---

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
