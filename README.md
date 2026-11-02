# Nayeon v1 — Public Development Dashboard

Public, **read-only** interactive dashboard summarising a sanitised **2 November 2026** snapshot from the original private Nayeon v1 architecture/progress workbook.

- **Last product milestone:** Phase 10.1 — remotely verified offline perception metadata contracts; no camera/screen capture or provider activation.
- **Engineering workflow assessment:** Phase 8.35 documented, published and reconciled to the original same-ID workbook on 19 October 2026; this is not an additional product capability release. [Read its decisions and unresolved gates](docs/phase-8-35-workflow-assessment.md).
- **Architecture:** 5/19 phases closed (26.3%).
- **Release acceptance:** 0/12 gates verified.
- **Authoritative product regression:** 3,108/3,108 passing in **each** of the Phase 10.1 unstaged, exactly staged and immediate-child native Windows runs.
- **Capability maturity:** **22.1% provisional** under scoring rubric v1.0 across 15 required v1 capabilities; not consumer-release sign-off. [Scoring method](SCORING_METHOD.md).

Only public display assets and curated aggregate data are committed here. The original master workbook, private engineering evidence, original macro-enabled format, credentials and machine paths are deliberately excluded.

## GitHub Pages

The repository serves a static site from the root of `main` through GitHub Pages. Public visitors have read-only access. The snapshot data served under `data/` is publicly readable; never place private data in it. The HTML Content-Security-Policy meta element is not a substitute for web-server response headers.

## Source of truth and publication order

The private **original same-ID master workbook** is the formal planning/audit source. The separate product repository and its immutable annotated tags establish Git release truth. The public site only publishes a reviewed and sanitised snapshot after those sources have been reconciled.

For **product** milestones, retain exact scope/independent review, focused+affected tests, and **all three full native Windows regression gates**: pre-stage, staged and postcommit. Commit/tag verification, GitHub synchronisation, original-workbook same-ID update and public snapshot reconciliation follow in that order. Fail closed on mismatches; never silently create a replacement master workbook.

For **governance-only assessments**, publish a separate decision record without increasing product milestones, test counts, architecture closure or release-gate completion. Phase 8.35's read-only investigation identified a potential performance improvement, but its persistent Git-blob batching implementation remains **HOLD pending independent security review and product release tests**. See the [assessment](docs/phase-8-35-workflow-assessment.md).

The public numerical snapshot reports verified **Phase 10.1**, not a hypothetical Phase 8.35 product seal or completed major Phase 10.

## Phase 8.35 dashboard visibility

Phase 8.35 is a **completed governance-only assessment**, displayed once in the **development roadmap** with its review link. It is **not** duplicated in the top product milestone KPI, product-release `milestones` data or native regression history. The latest sealed product is Phase 8.37; formal architecture completion remains 5/19 and consumer release acceptance remains 0/12.

## October–November 2026 — foundation and compact-history dashboard display

The *unchanged* private-workbook-derived snapshot includes the original formal
phases 0–7: 0, 1, 5, 6, 7 COMPLETE and 2, 3, 4 IN PROGRESS. The Roadmap tab
now shows those exact states in a compact clickable list, with links to the
existing phase-detail dialog. The milestone timeline displays Phase 8.35 (governance) once and Phase 10.1 (sealed offline perception contracts) as the latest product milestone; earlier milestones including Phase 8.37 and BYOK Increment B expand on demand.
Formal architecture and end-user release-gate counts remain unchanged; the product milestone and engineering regression evidence advance to verified Phase 10.1. The dashboard uses locally available system
fonts instead of attempting to render absent CSP-blocked webfonts.

## 2 November 2026 — Phase 10.1 verified release

Phase 10.1 delivers **offline perception metadata and source-integrity contracts only**, through exactly **32 approved changed files** (six added, 26 modified). The independent final assurance review cleared source-identity and isolated Phase 9 preservation questions; no outstanding HIGH/MEDIUM source defect is identified within this bounded scope.

Three complete native Windows regressions each passed **3,108/3,108**, with native exit code 0. GitHub commit `be6c126dc5f3a6814925bb95009ef2b2e6be80b7` and annotated tag `nayeon-v1-phase-10-1-offline-perception-foundation-01` (tag object `c96dcea845bbab00a142d69341378d0f07f4b47f`) were atomically pushed and remotely read back. The **same original 16-sheet macro-enabled master XLSM** was updated in place; its raw downloaded SHA-256 `5f4c3aefc40e909c70609d4173373c3d03f4d9e9673284d96aef3b22e7808502` matched the prepared payload.

Phase 10 as a whole is **IN PROGRESS**: 5 of 19 major architecture phases complete, 6 in progress, 8 planned. End-user release gates remain **0/12**. The provisional Vision maturity score is **1/4** for the independently reviewed offline contract only; overall provisional maturity is **22.1%**, with no real screen/camera capture, redaction attestation, provider action, credential access, voice, installer or user-facing perception acceptance.
