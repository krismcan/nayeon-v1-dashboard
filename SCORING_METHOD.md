# Nayeon v1 — Public capability maturity assessment

**Snapshot:** 17 October 2026 · **Model:** 1.0-provisional · **Status:** Analyst-assessed, not a signed release acceptance result.

## Boundary and formula

The population is **15 required BYOK v1 capabilities** from the private 16-item Capability Review. The optional **commercial backend** is excluded. Five public dashboard pillars each have exactly **20%** weight. Within each pillar, capabilities have equal weight.

For pillar *p*, maturity % = 100 × (sum of the 0–4 ratings for included capabilities) / (4 × number of included capabilities). Overall maturity % = sum of the five pillar percentages × 0.20.

Scores are verified against master Build Plan, Capability Review, Phase Evidence, Implementation Progress and Release Gates records. Unverified design or legacy estimates score zero. An isolated or simulated test does not earn integrated consumer-readiness points.

## Maturity scale

| Grade | Required qualification |
|---|---|
| 0 | No qualifying tested implementation. |
| 1 | Reviewed isolated contract, synthetic/fake-only test or offline foundation. |
| 2 | Verified bounded real-Windows/local workflow or interface; full integrated consumer use not implied. |
| 3 | Independently observed complete, real-user Windows application journey with non-simulated dependency integration; not yet released. |
| 4 | Independent clean-device consumer acceptance for the defined user journey. |

## Capability evidence register

| Pillar | Capability | Rating /4 | Bounded evidence | Not yet proven | Master reference |
|---|---|---:|---|---|---|
| core | OpenApp reference | 2 | Bounded OpenApp reference behavior was demonstrated and sealed. | Not a packaged, broadly available assistant action. | Capability Review!E6; Phase Evidence!D9 |
| core | Trusted Core | 2 | Tested generic intent-routing, permission and session foundations support bounded workflows. | No normal consumer AI journey accepted. | Capability Review!E7; Phase Evidence!F9:F10 |
| core | Filesystem | 2 | Phase 5 closed after bounded file actions and Windows validation. | Rename, move, trash, recursive flows and end-user UI are not covered. | Capability Review!E8; Phase Evidence!D11 |
| security | Security & compliance | 1 | Independent security reviews and scoped trust controls are documented. | Full release assurance or certification is not complete. | Capability Review!E9; Phase Evidence!F22; Phase 8.31 review |
| security | Computer control | 2 | Phase 6 closed after bounded real Windows computer-control testing. | General GUI automation and normal-user integration are not accepted. | Capability Review!E10; Phase Evidence!D12 |
| security | Secure BYOK | 1 | Sealed, independently reviewed fake-only Tk credential and recovery test foundation. | No live consumer credential handling or provider validation is accepted. | Capability Review!E11; Release Gates!D8:D9; Implementation Progress!A156:H156 |
| intelligence | Memory | 0 | No qualifying persistent personal memory workflow is evidenced. | Phase 9 not started. | Capability Review!D12; Build Plan!G14 |
| interaction | Voice | 0 | No working end-to-end voice workflow is evidenced. | Phase 12 not started. | Capability Review!D13; Build Plan!G17 |
| intelligence | Assistant identity & configuration | 1 | Typed identity/preferences contracts and bounded offline presentation settings are tested. | No accepted first-run identity and permissions onboarding. | Capability Review!E14; Phase Evidence!D13; Release Gates!C7 |
| interaction | Vision | 0 | No verified v1 screen/camera perception workflow. | Phase 10 not started. | Capability Review!D15; Build Plan!G15 |
| interaction | Browser | 0 | No verified v1 controlled browser inspect/act/verify workflow. | Phase 11 not started. | Capability Review!D16; Build Plan!G16 |
| product | Proactive events | 0 | No verified bounded proactive event workflow. | Phase 13 not started. | Capability Review!D17; Build Plan!G18 |
| interaction | Desktop UI | 2 | Phase 8.30 Windows offline Tk workspace and Phase 8.31 bounded conversation session were independently tested. | Offline only: no integrated live AI chat, installed consumer client or acceptance gate. | Capability Review!E18; Implementation Progress!A158:H159; Release Gates!C6/C10 |
| intelligence | Autonomy | 0 | No verified multi-step policy-aware autonomous task delivery. | Phase 18 not started. | Capability Review!D19; Build Plan!G23 |
| product | Packaging & installer | 0 | No verified signed installer, clean-device start or update/rollback. | Phase 17 not started. | Capability Review!D20; Release Gates!C6/C17 |

## Reproducible totals

| Pillar | Earned points | Possible points | Maturity |
|---|---:|---:|---:|
| Core & Infrastructure | 6 | 12 | 50.0% |
| Security & Control | 4 | 12 | 33.3% |
| Intelligence & Memory | 1 | 12 | 8.3% |
| Interaction | 2 | 16 | 12.5% |
| Product & Operations | 0 | 8 | 0.0% |
| **Overall (equal-pillar-weighted)** | — | — | **20.8%** |

**Separate immutable-at-snapshot counters:** architecture phases **5/19 (26.3%)**, release acceptance gates **0/12**, full Windows regression **2,572/2,572 PASS**, latest closed milestone **8.31**.

## Limitations and review discipline

- **Provisional**, not formally independently signed-off. Readiness scale and reviewer judgments are made explicit and may be revised by an authorised evidence review.
- A grade 2 is not evidence that exactly 50% of a feature's total effort is done: it is a discrete maturity stage.
- Desktop UI receives grade 2 **only for the real bounded Phase 8.30/8.31 Windows offline workspace**. Formal Phase 15 remains **NOT STARTED**; no live provider AI conversation or signed installer is accepted.
- Secure BYOK receives grade 1 because first-run integration is **fake-only** and no live provider credential validation or consumer deployment acceptance has passed.
- Security gets grade 1 for documented scoped controls/review, **not** a certification, audit, or security assurance claim.
- Scores of 0 do not mean design ideas do not exist; they mean qualifying tested v1 behavior is not evidenced.
- Historical workbook bars, 40%, 72%, and the unweighted legacy average are **not** reused.
- Workbook names and public sheet coordinates are trace references only; the original workbook, macros and sensitive engineering artifacts are not published.

To change a score, review new audited workbook + Git evidence, independently verify the relevant behavior and tests, update the corresponding narrative and rating, rerun the validation script, and publish an approved public snapshot as a single commit. Never auto-export the private workbook to this public repository.

**Engineering fork checkpoint:** c9d1b012b79b01897439775fb344819a9cf5367a · 17 October 2026.
