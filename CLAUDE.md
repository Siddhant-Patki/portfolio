# CLAUDE.md — Siddhant Patki Portfolio

Read this file completely before taking any action.

---

## Project Overview

Personal developer portfolio for Siddhant Patki — Full-Stack Developer and Masters student
at Hof University of Applied Sciences, Germany (M.Eng. Software Engineering for Industrial
Applications). Built as a hands-on learning project for CI/CD, testing, and backend integration.

**Live URLs:**
- Frontend: https://siddhant-patki.github.io/portfolio
- Backend API: https://<railway-service>.up.railway.app

---

## Monorepo Structure

```
portfolio/
├── CLAUDE.md          ← you are here
├── frontend/          ← React + Vite + TypeScript
├── backend/           ← Node.js + Express + TypeScript
├── docs/              ← BUILD_LOG.md (living documentation)
└── .github/workflows/ ← CI/CD pipelines
```

Both `frontend/` and `backend/` are independent Node.js projects with their own
`package.json`, `tsconfig.json`, and `eslint.config.ts`.

---

## Absolute Code Rules (Never Violate)

### TypeScript
- `strict: true` in both tsconfigs. `noImplicitAny`, `strictNullChecks`, `noUncheckedIndexedAccess`,
  `exactOptionalPropertyTypes` — all enabled.
- Zero TypeScript errors. No `@ts-ignore` without written justification.
- No `any`. Use `unknown` + type narrowing.

### Styling
- Tailwind CSS is the ONLY styling method. No inline styles. No CSS modules. No styled-components.
- `style={{ }}` is banned.
- Conditional classes via `cn()` from `src/lib/cn.ts`.

### Animations
- Framer Motion is the ONLY animation library. No CSS transitions for interactive animations.
- Every animated component must check `useReducedMotion()` and disable motion when true.

### Components
- Every component in `sections/` and `layout/` must have a co-located `.test.tsx`.
- All content data lives in `src/constants/`. Components are display-only, receive data as props.

---

## Testing Requirements

- **Vitest + RTL**: every section/layout component — renders, interactions, accessibility
- **Supertest**: every API endpoint — happy path, validation, rate limit, server error
- **Playwright**: all major user flows — hero animation, navigation, contact form, project modal
- **Coverage threshold**: 80% lines/functions (enforced in vitest.config.ts)
- TypeScript errors block CI before tests even run

---

## Branch Strategy

| Branch | Purpose | Deploys To |
|--------|---------|------------|
| `dev`  | Active development | Nothing |
| `main` | Production only, protected | GitHub Pages + Railway |

Never commit directly to `main`. Feature branches: `feat/<name>`, fixes: `fix/<name>`.

---

## CI/CD Flow

```
push to dev → (no auto-deploy)
open PR → main
  → frontend.yml: tsc → lint → vitest → build → [E2E] → gh-pages deploy
  → backend.yml:  tsc → lint → supertest → build → Railway deploy
all checks pass → merge allowed
```

---

## Environment Variables

### Frontend (.env.local — never commit)
```
VITE_API_URL=http://localhost:3001
```

### Backend (.env — never commit)
```
PORT=3001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=sidpatki123@gmail.com
SMTP_PASS=<gmail-app-password>
SMTP_FROM=sidpatki123@gmail.com
CONTACT_EMAIL=sidpatki123@gmail.com
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_ANON_KEY=<anon-key>
ALLOWED_ORIGIN=https://siddhant-patki.github.io
NODE_ENV=development
```

---

## Agent Coordination Flow

```
frontend-agent builds component
      ↓
testing-agent writes tests (Vitest + RTL)
      ↓
frontend-agent verifies tests pass
      ↓
testing-agent writes Playwright scenario
      ↓
cicd-agent ensures workflow captures new test
      ↓
docs-agent updates BUILD_LOG.md with what changed + verification checklist
```

CRITICAL: testing-agent is NEVER skipped. docs-agent runs at the end of every phase.

---

## Tech Stack Reference

**Frontend:** React 18 + Vite 5 + TypeScript 5 (strict) | Tailwind CSS | Framer Motion |
Lenis | React Three Fiber + Three.js | shadcn/ui + Aceternity UI + Magic UI | Lucide React |
Clash Display font (Fontshare CDN)

**Backend:** Node.js 20 + Express 4 + TypeScript 5 (strict) | Nodemailer | Supabase JS v2 |
Zod | Helmet | express-rate-limit | tsup

**Testing:** Vitest + @vitest/coverage-v8 | React Testing Library | Playwright | Supertest |
Storybook 8

**Images/Media:** Supabase Storage for image files; PostgreSQL stores URL strings only.

---

## Currently Section — Maintenance Note

`src/constants/currently.ts` is hardcoded. Update it manually at the start of each new semester
or when the "current project" changes. No deploy needed for this section beyond committing the
constant change.

---

## Current Build Phase

- [x] Phase 0: CLAUDE.md + agents + repo structure
- [ ] Phase 1: CI/CD + ESLint + Prettier + TS config
- [ ] Phase 2: Frontend foundation (Vite + React + Tailwind + Lenis + dark theme)
- [ ] Phase 3: Components (CustomCursor → Navbar → Footer → Hero → About → Experience → Projects → Skills → Currently → Contact)
- [ ] Phase 4: Backend (Express + Supabase + Nodemailer + Supertest tests)
- [ ] Phase 5: Playwright E2E
- [ ] Phase 6: Storybook
- [ ] Phase 7: Performance audit + mobile + final deploy

Update this checklist as phases complete.

---

## Developer Info

- Name: Siddhant Patki
- Email: sidpatki123@gmail.com
- GitHub: https://github.com/Siddhant-Patki
- LinkedIn: confirm exact URL before hardcoding anywhere — store in `src/constants/nav.ts`
