# Siddhant Patki — Developer Portfolio

![Frontend CI](https://github.com/Siddhant-Patki/portfolio/actions/workflows/frontend.yml/badge.svg)
![Backend CI](https://github.com/Siddhant-Patki/portfolio/actions/workflows/backend.yml/badge.svg)

Personal portfolio for Siddhant Patki — Full-Stack Developer and Masters student at
Hof University of Applied Sciences, Germany (M.Eng. Software Engineering for Industrial Applications).

**Live site:** https://siddhant-patki.github.io/portfolio
**Backend API:** https://portfolio-production-3355.up.railway.app

---

## Stack

**Frontend:** React 18 + Vite 5 + TypeScript (strict) | Tailwind CSS | Framer Motion |
Lenis | React Three Fiber | Clash Display (Fontshare)

**Backend:** Node.js + Express + TypeScript | Resend (email) | Supabase (PostgreSQL) | Zod |
Helmet | express-rate-limit | tsup

**Testing:** Vitest + React Testing Library | Playwright | Supertest | Storybook 8

**CI/CD:** GitHub Actions → GitHub Pages (frontend) + Railway (backend)

---

## Monorepo Structure

```
portfolio/
├── frontend/    # React + Vite app → deployed to GitHub Pages
├── backend/     # Express API server → deployed to Railway
├── docs/        # BUILD_LOG.md — living build documentation
└── .github/     # CI/CD workflows (frontend.yml, backend.yml)
```

---

## Development

```bash
# Frontend (http://localhost:5173)
cd frontend && npm install && npm run dev

# Backend (http://localhost:3001)
cd backend && npm install && npm run dev
```

### Environment variables

Frontend — create `frontend/.env.local`:
```
VITE_API_URL=http://localhost:3001
```

Backend — create `backend/.env`:
```
PORT=3001
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=your@email.com
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_ANON_KEY=<anon-key>
ALLOWED_ORIGIN=http://localhost:5173
NODE_ENV=development
```

---

## CI/CD Flow

```
PR: dev → main
  frontend/** changed → frontend.yml: tsc → lint → vitest → build → gh-pages deploy
  backend/** changed  → backend.yml:  tsc → lint → supertest → tsup build
merge to main → Railway auto-deploys backend
```

---

## Build Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 0 | CLAUDE.md + agents + repo structure | ✅ |
| 1 | CI/CD + ESLint + Prettier + TS config | ✅ |
| 2 | Frontend foundation (Vite + React + Tailwind + Lenis) | ✅ |
| 3 | All sections + components | ✅ |
| 4 | Backend (Express + Supabase + Resend + Supertest) | ✅ |
| 5 | Playwright E2E | 🔄 |
| 6 | Storybook | 🔄 |
| 7 | Performance audit + mobile + final deploy | ⏳ |

See [docs/BUILD_LOG.md](docs/BUILD_LOG.md) for the full phase-by-phase build log.
