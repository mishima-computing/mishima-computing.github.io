# Vendored third-party runtime

## three.js 0.186.1 (MIT)

* `three.module.min.js` — from `https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.min.js`
* `three.core.min.js`   — from `https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.core.min.js`

Vendored rather than loaded from a CDN so the site has no third-party runtime
dependency (no CDN outage, no cross-origin request, no CSP exception needed).

**One local modification**: upstream `three.module.min.js` imports its core as
`./three.core.js`, which is the *unminified* filename. The specifier is
rewritten here to `./three.core.min.js` so the two vendored minified files
resolve against each other. Re-apply this rewrite when bumping the version.

Consumer: `assets/js/seiryu.js` (hero background).
