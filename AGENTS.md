# Universal AI Agent Rules (Optimized for Antigravity)

> **Architecture:** Executive Micro-Kernel (< 5 KB) with Progressive Disclosure.
> Core behavioral guardrails are active inline below. All domain specifications and procedural skills are decoupled and loaded dynamically on-demand via `read_file` only when needed.
> Project-specific guidelines take precedence over universal rules in case of conflict.

---

## 1. Think Before Coding (Zero-Guessing & Clarification Gate)
- **Evaluate Ambiguity**: Check incoming requirements via the GSCA matrix (Goal, Scope, Constraints, Acceptance Criteria) using `python "Z:\Z, general\harness\agy\eval\evaluate_ambiguity.py"`.
- **Zero Guessing Invariant**: When requirements are unclear, ambiguous, or missing boundaries, the Agent is STRICTLY FORBIDDEN from guessing or making silent assumptions. STOP and ask clarifying questions via `ask_question` (or clear text) before writing any code.
- **Said vs. Assumed Separation**: Explicitly distinguish verified requirements from technical assumptions. If assumptions introduce risk or multiple options, clarify before coding.
- **Local Learning Ledger**: Check `AGENTS_LEARNING.md` in project root at task start to avoid repeating past mistakes.
- **System Prompt Archival**: Every turn MUST archive active system instructions and rules with timestamp and SHA-256 hash to `agy/history/prompt_history.jsonl`.
- **High-Risk Confirmation**: Data deletion, destructive migrations, or breaking changes require explicit user confirmation prior to execution.

## 2. Simplicity First (Ponytail Coding Discipline & YAGNI)
- **Smallest Viable Diff**: Implement the minimum code that fully satisfies requirements. Absolutely zero speculative features, zero premature wrappers, zero unrequested abstractions.
- **Decision Ladder**: (1) Skip unneeded, (2) Reuse existing codebase, (3) Language stdlib, (4) Installed packages, (5) One-liner if clear, (6) Minimal viable code.
- **Ponytail Pre-Completion Review**: Review changed code before declaring done. Verify correctness, edge cases, zero dead code, and zero bloat.

## 3. Surgical Changes & Codebase Respect
- **Surgical Diffs**: Touch ONLY lines and files directly required for the task. Zero drive-by refactoring; never reformat unrelated code, never alter surrounding styles.
- **Pre-Write Self-Audit**: In reasoning prior to calling `write_file` or `edit_file`, verify: minimal diff, zero suppress directives, no unrequested abstractions, Decimal for currency, UTC for timestamps.
- **Anti-Suppression Invariant**: STRICTLY FORBIDDEN to use suppress directives: `@ts-ignore`, `@ts-expect-error`, `eslint-disable`, `# noqa`, `# type: ignore`, `#pragma warning disable`, `[SuppressMessage]`. Never loosen linters or weaken assertions.
- **Security & Clean Git**: Zero hardcoded secrets, zero PII in logs. Conventional Commits (`feat`, `fix`, `docs`). Never `git push --force`. Whitelist repo root: zero loose scratch files; route temp artifacts to `temp/`.
- **Language Discipline**: Code, commits, comments in **English**; User communication and UI labels in **Vietnamese**; Rule definitions strictly **English**.

## 4. Goal-Driven Verification & Quality Gate
- **Test-First for Bug Fixes**: Write a regression test reproducing the issue (fail first, pass after fix) before modifying code.
- **Verification Before Completion**: Execute project build, lint, and test commands (`npm test`, `pytest`). Read real terminal outputs (exit code 0 mandatory) before reporting completion.
- **Media Debugging Invariant**: Video rendering and media synthesis debugging MUST use minimal samples (video <= 10s, max 1 comment).

---

## Progressive Disclosure Rule Router (Load On-Demand Only When Needed)

> To keep prompt token overhead minimal (< 1,000 tokens), detailed domain specifications are decoupled.
> The Agent MUST call `read_file` on the corresponding rule file BEFORE creating or modifying code in that domain:

| Domain / Context Trigger | Detailed Rule Specification | Trigger Scenarios & Keywords | Action Before Modifying Code |
| :--- | :--- | :--- | :--- |
| **Database & Financial Consistency** | `agy/rules/30-data-storage-consistency.md` | Decimal currency, UTC timestamp, UUIDv7, schema, migration, outbox, cache | `read_file("agy/rules/30-data-storage-consistency.md")` |
| **UI Design, Components & Styling** | `agy/rules/40-ui-style.md` | UI, component, CSS, Tailwind, style, button, table, form, modal, Figma | `read_file("agy/rules/40-ui-style.md")` |
| **Repository Topology & Clean Architecture** | `agy/rules/15-directory-structure.md` | Directory, topology, refactor layers, domain rules, presentation, infrastructure | `read_file("agy/rules/15-directory-structure.md")` |
| **Security, Secrets & Git Management** | `agy/rules/10-security.md` | Secrets, .env, auth, PII, .gitignore, crypto credentials, git commit standards | `read_file("agy/rules/10-security.md")` |
| **Self-Improving Agent & Harness Engine** | `agy/rules/50-self-improving-agent.md` | Harness, self-improving, learn, golden benchmark, Pareto probe, telemetry | `read_file("agy/rules/50-self-improving-agent.md")` |
| **Procedural Skills Lifecycle** | `agy/rules/05-skill-usage.md` | Skill authoring, eval, benchmark skill, tool execution, procedural memory | `read_file("agy/rules/05-skill-usage.md")` |
| **Extended Universal Rules & Architecture** | `agy/rules/00-general.md` | Deep workflow, dependency management, clean code principles, full invariants | `read_file("agy/rules/00-general.md")` |

> **Skills On-Demand Principle:** Skills in `<skills>` are not inline in AGENTS.md. When a skill is relevant, consult its description and invoke `read_file` on its `SKILL.md` before execution.
