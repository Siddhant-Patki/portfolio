# Portfolio Build Log

_Maintained by docs-agent. Updated at the end of every phase and after every major change.
Append-only — do not edit or delete earlier entries._

---

## Phase 0 — Project Setup
**Date completed:** 2026-04-20
**Status:** ✅ Complete

### What was built / changed
- `CLAUDE.md` created at project root — master context for all Claude Code agents
- `.claude/agents/frontend-agent.md` created — governs component building rules
- `.claude/agents/backend-agent.md` created — governs Express API rules
- `.claude/agents/testing-agent.md` created — governs test coverage requirements
- `.claude/agents/cicd-agent.md` created — governs GitHub Actions and deployments
- `.claude/agents/docs-agent.md` created — governs this document
- `docs/BUILD_LOG.md` created (this file)
- `.gitignore` created at project root
- `.prettierrc` created at project root
- `.prettierignore` created at project root
- `README.md` updated with project description and badge placeholders
- `.github/BRANCH_PROTECTION.md` created — documents manual GitHub UI setup steps
- `frontend/` and `backend/` directory stubs created

### Decisions made
- **Single-page anchor navigation** chosen over React Router — eliminates GitHub Pages
  HTML5 pushState routing problem; all sections on one scrolling page
- **Fontshare CDN** chosen for Clash Display font delivery — purpose-built for this font,
  free, fast, no GDPR concerns vs Google Fonts
- **R3F scope limited** — only hero background uses React Three Fiber; project card tilt
  uses CSS perspective + `useTilt.ts` hook (saves ~600KB bundle weight)
- **Gmail App Password** chosen for contact email — simple for portfolio scale;
  can migrate to Resend.com if deliverability issues arise
- **Supabase Storage** for image/photo files — PostgreSQL stores URL strings only;
  never store binary data in the database
- **Hardcoded `currently.ts`** — update manually each semester, no DB needed for this section

### Verification checklist
- [x] `CLAUDE.md` exists and is complete
- [x] All 5 agent files exist in `.claude/agents/`
- [x] `docs/BUILD_LOG.md` created
- [x] `dev` and `main` branches exist on remote
- [ ] Branch protection configured on `main` in GitHub UI (manual step — do before Phase 1)

### Known issues / deferred items
- Branch protection rules must be configured manually in GitHub UI before Phase 1 begins
- LinkedIn profile exact URL not yet confirmed — store in `src/constants/nav.ts` when known
- Aceternity UI and Magic UI specific component selections to confirm before Phase 3
  (CardSpotlight, BackgroundBeams, Particles, ShimmerButton — review at their docs sites)

---
