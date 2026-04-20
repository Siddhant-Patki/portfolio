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
- [x] Branch protection configured on `main` in GitHub UI (Ruleset: "Protect main", Active)

### Known issues / deferred items
- Branch protection rules must be configured manually in GitHub UI before Phase 1 begins
- LinkedIn profile exact URL not yet confirmed — store in `src/constants/nav.ts` when known
- Aceternity UI and Magic UI specific component selections to confirm before Phase 3
  (CardSpotlight, BackgroundBeams, Particles, ShimmerButton — review at their docs sites)

---

## Phase 1 — CI/CD Pipelines + TypeScript + ESLint + Prettier
**Date completed:** 2026-04-20
**Status:** ✅ Complete

### What was built / changed
- `frontend/`: Vite 8 + React 19 + TypeScript 6 scaffold via `npm create vite@latest`
- `frontend/tsconfig.app.json`: strict mode, path aliases (`@/*`, `@components/*`, etc.),
  `verbatimModuleSyntax`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- `frontend/tsconfig.node.json`: strict config for Vite config files
- `frontend/eslint.config.js`: flat config — typescript-eslint (type-checked), react-hooks, jsx-a11y, prettier
- `frontend/package.json`: added scripts — `type-check`, `test`, `test:coverage`, `test:e2e`, `lint`, `format`, `storybook`
- `frontend/.env.example`: `VITE_API_URL` placeholder
- `backend/`: npm init + dev dependencies (typescript, ts-node-dev, tsup, eslint, prettier)
- `backend/tsconfig.json`: strict mode, CommonJS, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- `backend/eslint.config.js`: flat config — typescript-eslint (type-checked) + prettier
- `backend/src/index.ts`: minimal entry point stub
- `backend/.env.example`: all required env var placeholders documented
- `.github/workflows/frontend.yml`: tsc → lint → vitest → build → gh-pages deploy + E2E job
- `.github/workflows/backend.yml`: tsc → lint → supertest → tsup build → Railway deploy

### Decisions made
- **TypeScript 6 `ignoreDeprecations: "6.0"`** on both configs — `baseUrl` (frontend) and
  `moduleResolution: Node10` (backend) deprecated in TS6 but still correct for their targets
- **`verbatimModuleSyntax: true`** replaces `esModuleInterop` for frontend — the two conflict
  in TypeScript 5+; `verbatimModuleSyntax` is the correct modern Vite/Bundler setting
- **`skipLibCheck: true`** on both — prevents spurious errors from copy-paste library types
  (Aceternity UI, Magic UI, R3F components may have imperfect `.d.ts` files)

### Verification checklist
- [x] `npx tsc --noEmit` exits 0 in `frontend/`
- [x] `npx tsc --noEmit` exits 0 in `backend/`
- [ ] `npm run lint` exits 0 in `frontend/` (after Vitest install in Phase 2)
- [ ] `npm run build` produces `frontend/dist/` (after Phase 2 cleanup)
- [ ] GitHub Actions first CI run green — add link here after first push to main
- [ ] Branch protection status checks added in GitHub UI after first CI run

### Known issues / deferred items
- Vitest, RTL, Playwright not yet installed — `test:coverage` step in CI will fail until Phase 2
- Vite scaffold's default `App.tsx` has unused imports — cleaned up in Phase 2
- E2E Playwright job in CI will be skipped until Playwright installed (Phase 5)

---
