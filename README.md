# Nayeon v1 — Public Development Dashboard

Public, **read-only** interactive dashboard summarising a reviewed, sanitised 17 October 2026 snapshot of the privately maintained Nayeon v1 architecture progress workbook.

- Architecture: 5/19 phases closed (26.3%).
- Release acceptance: 0/12 gates verified.
- Authoritative regression: 2,572/2,572 passing.
- Capability maturity shown as *evidence classifications*, not an unverified readiness percentage.

Only public display assets and curated aggregate data are committed here. Original master workbook, private evidence, macros and secrets are deliberately excluded.

## GitHub Pages

This repository serves a plain static site from the root of `main` through GitHub Pages. Pages must be configured by a repository administrator under **Settings > Pages > Build and deployment > Deploy from a branch > main > /(root)**. The site is public even though visitors cannot write to it.

The `data/snapshot.js` data is publicly readable by every visitor; do not put private information in it. `Content-Security-Policy` is in a meta element because GitHub Pages does not implement Cloudflare's `_headers` custom-response feature. It is not a substitute for host-supplied response headers.

To publish a new milestone, independently verify workbook and Git evidence, generate and review a new sanitised snapshot offline, then commit only the approved public files. Never automate raw master-workbook publishing. Do not treat architecture percent as product-readiness percent.

This repository is separate from the Nayeon engineering repository and does not implement Phase 8.32.
