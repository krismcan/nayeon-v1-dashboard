# Phase 8.35 — Engineering Workflow Assessment

**Assessment date:** 19 October 2026  
**Track:** Process and governance; **not a production Nayeon software release**.  
**Disposition:** Workflow assessment complete for decision-making; P0 read-only tools validated locally. The Git batch-transport implementation is **HOLD** and excluded from approved production scope.

## Verified baseline

- Product repository `krismcan/Mark-LV`, branch `nayeon-v1`, unchanged Phase 8.34 release commit `b0490cd9e72104a74a32dc5315cbc55bc4034676`; immutable annotated tag `nayeon-v1-phase-8-34-fake-reply-lifecycle-01`.
- Original workbook remains the private 16-sheet macro-enabled file. This **public document does not claim to have modified it**.
- Formal architecture completion **5/19**. End-user release acceptance **0/12**. Provisional maturity **20.8%**.
- Three authoritative Phase 8.34 full native Windows regressions each passed **2,805/2,805 tests**: 3,993.418, 4,239.088 and 4,274.073 seconds, respectively. Aggregate duration **12,506.579 seconds / ~208.44 minutes**. No change to those release gates is approved.

## Assessment findings

1. **Expensive security-test orchestration.** A single unmodified historical Git integrity proof took 6.144 seconds and issued 98 Git helper calls, consuming 5.969 seconds in Git. One unchanged alias-attack test took 85.739 seconds. This is a demonstrated hotspot, not yet the entire full-suite cost decomposition.
2. **Late cross-component defects.** Interactions among Save, Reset, Tk lifecycle and worker retirement should be explicitly modelled as an adversarial state matrix **before** implementation, not repaired serially at release review.
3. **Canonical workspace confusion.** An older primary checkout contains unrelated Phase 8.32 changes while the verified product and active assessment use clean isolated checkouts. The older work must be preserved and never reset or pulled over.
4. **Administrative drift.** Historical Codex handoffs and the previous public README contained stale milestone status despite more recent Git/workbook evidence. A current-state generator and idempotent release attestation are recommended.
5. **Product-readiness gap.** Comprehensive fake-only tests do not imply a consumer-ready assistant. No live provider integration or general autonomous computer-action authority is claimed.

## P0 improvements validated without touching product code

- A **read-only workspace preflight** checks exact Git root/branch/HEAD, annotated tag object and peel, plus clean worktree/index. It admits the isolated checkout and quarantines the older checkout. **10/10 negative tests passed.**
- A **passive native Windows unittest profiler** uses built-in `--durations 0`, explicit host Python and a pinned sealed SHA; the reply owner/worker group passed **42/42**, Tk reply group **46/46**. It can diagnose slow tests without weakening them.
- P0 evidence, internal review notes, and checksums were archived on the authorised development host. No secret or full private evidence was published.

## Git batch-performance experiment — explicit HOLD

The optimisation research observed byte-identical immutable blob reads via `git cat-file --batch`, with about **34% lower** time in several single-proof **shadow experiments**. This is **not** a proven full-regression speedup.

An adversarial check found a **HIGH** flaw in one integration approach: replacing the Git helper above the historical test injection seam allowed a malicious read to be masked. That approach is rejected. A lower-level transport preserved the seam in bounded tests. The external candidate later exposed and fixed resource cleanup, executor-refusal and late-result-after-revocation defects. Latest bounded protocol/lifecycle tests passed **13/13** and **9/9**. Two original historical tamper/seal tests passed **2/2** beneath the original injection hook.

The external prototype still lacks a **genuinely independent final security review**, complete mutation-race equivalence evidence and all three full Windows release tests. It is **not integrated, committed, pushed, tagged or authorised** as a product change. These unresolved items are to be carried as a separate bounded performance hardening proposal, not misrepresented as a closed security finding.

## Adopted process constraints for the next product milestone

1. **Design first:** define exact scope, trust boundary, interaction/state matrix, threat model and acceptance canaries before writing implementation.
2. **One active writer:** use a pinned LF-isolated checkout; never automatically clean, reset, overwrite or merge unknown historical work.
3. **Independent challenge:** require an independent reviewer GO for security-sensitive production changes; stop on unresolved HIGH/MEDIUM findings.
4. **Test strategically, release rigorously:** use fast focused/affected tests during development; preserve **three complete** native Windows regression gates at the established release stages.
5. **Immutable publication:** exact changed-file inventory, pinned parent, staged diff verification, immutable Git commit + annotated tag, postcommit regression and remote ref verification.
6. **Reconcile original records:** update the **same original** private master workbook, read back its values and identity, then publish an independently reviewed sanitised dashboard snapshot.
7. **State evidence clearly:** publish a short `GO/HOLD` disposition, next action, measured run-time and test counts, known unresolved defects and formal end-user release readiness.

## Handover / next steps

The next product feature must be planned against the verified Phase 8.34 parent. Performance batching remains a **separately reviewed security-sensitive proposal**, not a pretext to delay all product work or bypass a test gate. Prioritise the first genuinely user-facing consented AI interaction after security architecture review; do not declare 8.35 a product feature.

**Public status statement:** This assessment records process decisions and evidence only. The product release remains Phase 8.34; formal architecture remains **5/19**, acceptance remains **0/12** and the publicly scored capability maturity remains **20.8%**.
