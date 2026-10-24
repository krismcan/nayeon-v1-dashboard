# Nayeon v1 — Public Development Dashboard

Public, **read-only** interactive dashboard summarising a sanitised **24 October 2026** snapshot from the original private Nayeon v1 architecture/progress workbook.

- **Last product milestone:** Phase 8.37 — remotely verified offline provider request draft; no live provider transmission.
- **Engineering workflow assessment:** Phase 8.35 documented, published and reconciled to the original same-ID workbook on 19 October 2026; this is not an additional product capability release. [Read its decisions and unresolved gates](docs/phase-8-35-workflow-assessment.md).
- **Architecture:** 5/19 phases closed (26.3%).
- **Release acceptance:** 0/12 gates verified.
- **Authoritative product regression:** 2,954/2,954 passing in **each** of the Phase 8.37 pre-stage, staged and postcommit Windows runs.
- **Capability maturity:** **20.8% provisional** under scoring rubric v1.0 across 15 required v1 capabilities; not consumer-release sign-off. [Scoring method](SCORING_METHOD.md).

Only public display assets and curated aggregate data are committed here. The original master workbook, private engineering evidence, original macro-enabled format, credentials and machine paths are deliberately excluded.

## GitHub Pages

The repository serves a static site from the root of `main` through GitHub Pages. Public visitors have read-only access. The snapshot data served under `data/` is publicly readable; never place private data in it. The HTML Content-Security-Policy meta element is not a substitute for web-server response headers.

## Source of truth and publication order

The private **original same-ID master workbook** is the formal planning/audit source. The separate product repository and its immutable annotated tags establish Git release truth. The public site only publishes a reviewed and sanitised snapshot after those sources have been reconciled.

For **product** milestones, retain exact scope/independent review, focused+affected tests, and **all three full native Windows regression gates**: pre-stage, staged and postcommit. Commit/tag verification, GitHub synchronisation, original-workbook same-ID update and public snapshot reconciliation follow in that order. Fail closed on mismatches; never silently create a replacement master workbook.

For **governance-only assessments**, publish a separate decision record without increasing product milestones, test counts, architecture closure or release-gate completion. Phase 8.35's read-only investigation identified a potential performance improvement, but its persistent Git-blob batching implementation remains **HOLD pending independent security review and product release tests**. See the [assessment](docs/phase-8-35-workflow-assessment.md).

The public numerical snapshot currently reports verified **Phase 8.37**, not a hypothetical Phase 8.35 product seal.

## Phase 8.35 dashboard visibility

Phase 8.35 is a **completed governance-only assessment**, displayed once in the **development roadmap** with its review link. It is **not** duplicated in the top product milestone KPI, product-release `milestones` data or native regression history. The latest sealed product is Phase 8.37; formal architecture completion remains 5/19 and consumer release acceptance remains 0/12.

## October 2026 — foundation and compact-history dashboard display

The *unchanged* private-workbook-derived snapshot includes the original formal
phases 0–7: 0, 1, 5, 6, 7 COMPLETE and 2, 3, 4 IN PROGRESS. The Roadmap tab
now shows those exact states in a compact clickable list, with links to the
existing phase-detail dialog. The milestone timeline displays Phase 8.35
(governance) once and Phase 8.37 (sealed product) as the latest product milestone; earlier product milestones and historical regression/Git checkpoints expand on demand.
Formal architecture and end-user release-gate counts remain unchanged; the product milestone and engineering regression evidence advance to verified Phase 8.37. The dashboard uses locally available system
fonts instead of attempting to render absent CSP-blocked webfonts.
