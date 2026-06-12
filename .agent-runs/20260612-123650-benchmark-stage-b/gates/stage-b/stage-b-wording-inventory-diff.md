# stage-b-wording-inventory-diff

Contract: IC-20260612-stageA-uiux-spec-001
Run: 20260612-123650-benchmark-stage-b

## Method

- Pre-edit dry run used SHA-256 block/file hashes over all frozen inventory carriers: HTML pages, incident markdown, `assets/js/app.js`, `llms.txt`, `sitemap.xml`, `robots.txt`, and `agent-readiness/manifest.json`.
- Paired JA/EN spans were treated as separate frozen blocks. Stage B CSS must not hide either language by default.
- JS-injected strings were treated as frozen string literals. Behavior-only JS edits were allowed only where string literals stayed intact.
- Machine files were treated as frozen text carriers and were not edited.

## Pre-edit Hashes

```text
b6e70a14a962b4b666c0a46cddc8cddf04c67895a9cdb0d2f93095aecb3b8b63  index.html
22dc6f9c7472d51dbe377642a54103f963696550b303e8c9d4876c9e281741df  about/index.html
aa4129e4d81760144d682fe1aa5a91294ed65d2c38dcf9884392b3f7cd85f235  reports/index.html
74b7d6419d1a1799404d035373a721e938f394f6b2e074b90ad99b2d3363423d  reports/waterfall-agents/index.html
f036b1eb6b206e31ed21dab8cf880436e38416ab636c98edadf0018769e80210  agent-readiness/index.html
2a9bfeb8845cae86fc8a1a004dad1eb7792286c395bca451e212b7a54a9a5729  contact/index.html
2fffc75466bb91810344e28e92ceb7c7899468800c744b3ced0e96b68915716d  kessan/index.html
6f68687fdf0efb879c44521cce66487b8fa42b39dda0464bc9f979853afb0775  privacy/index.html
2db895b898b69627c824c0a17992ff469d4829337658d12dc865e2b11c058276  incidents/20260604-powershell-mojibake.md
464102266060522819697ebf9f2a1c636574ba4dcb4c843de5aed7a405e6af81  assets/js/app.js
e08457ac37a51f2203b854d8097dca9c7d3ebf1259b6f5e06af5e1c65732cd82  llms.txt
317933e584de3801e1db693b836c599154f3e1925f453f3f87bc26577d64c6d2  sitemap.xml
7540e7b74d03d24e2c95747feba856659d5a05812ba9bc8c43df95945a5a496f  robots.txt
e6d2797c74416eaf032f03a4542fb01dd89167d0fc22adf18b609f858fd1a2a1  agent-readiness/manifest.json
```

## Post-edit Hashes

```text
163f93de02010dc7125a28a4a3af0473597471f59cdd663e7fa5d9b98de16bbe  index.html
22dc6f9c7472d51dbe377642a54103f963696550b303e8c9d4876c9e281741df  about/index.html
aa4129e4d81760144d682fe1aa5a91294ed65d2c38dcf9884392b3f7cd85f235  reports/index.html
74b7d6419d1a1799404d035373a721e938f394f6b2e074b90ad99b2d3363423d  reports/waterfall-agents/index.html
f7e33a27e36ac96d21986c7e6766d8ea2bedeeda4a5e43450b39e6d13be27dff  agent-readiness/index.html
55a93676dbcdaab9bd9cc83e6f2ae0d8f62841765a9d78278d0434d6988fbd65  contact/index.html
2fffc75466bb91810344e28e92ceb7c7899468800c744b3ced0e96b68915716d  kessan/index.html
6f68687fdf0efb879c44521cce66487b8fa42b39dda0464bc9f979853afb0775  privacy/index.html
2db895b898b69627c824c0a17992ff469d4829337658d12dc865e2b11c058276  incidents/20260604-powershell-mojibake.md
4d7dd7fd51fe3444f60801d355df95fbd48b8a02c84d8ea43308287c2839ecb8  assets/js/app.js
e08457ac37a51f2203b854d8097dca9c7d3ebf1259b6f5e06af5e1c65732cd82  llms.txt
317933e584de3801e1db693b836c599154f3e1925f453f3f87bc26577d64c6d2  sitemap.xml
7540e7b74d03d24e2c95747feba856659d5a05812ba9bc8c43df95945a5a496f  robots.txt
e6d2797c74416eaf032f03a4542fb01dd89167d0fc22adf18b609f858fd1a2a1  agent-readiness/manifest.json
683751072535674d5d99fa7e8a1c907858292af2b15a56f66e4ce2d60fafc484  assets/css/style.css
```

## Result

- Unchanged frozen redirect, report, kessan, privacy, incident, machine, sitemap, robots, llms, and manifest carriers retained their hashes.
- Changed carriers were `index.html`, `agent-readiness/index.html`, `contact/index.html`, `assets/css/style.css`, and `assets/js/app.js`.
- HTML changes moved existing blocks, added proof links, restored static visibility, and did not edit metadata or machine-file wording.
- JS changes disabled pointer glow and added modal focus containment. Frozen JS string literals for language labels, modal content, contact placeholders, prefill templates, submit states, success states, retry button, and failure alert were preserved.
- `python3 scripts/check_encoding.py` passed after edits.

