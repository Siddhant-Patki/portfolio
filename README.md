# Siddhant Patki — Developer Portfolio

![Frontend CI](https://github.com/Siddhant-Patki/portfolio/actions/workflows/frontend.yml/badge.svg)
![Backend CI](https://github.com/Siddhant-Patki/portfolio/actions/workflows/backend.yml/badge.svg)

Personal portfolio for Siddhant Patki — Full-Stack Developer and Masters student at
Hof University of Applied Sciences, Germany.

**Live:** https://siddhant-patki.github.io/portfolio

---

## Stack

**Frontend:** React 18 + Vite 5 + TypeScript (strict) | Tailwind CSS | Framer Motion |
Lenis | React Three Fiber | shadcn/ui + Aceternity UI + Magic UI | Clash Display

**Backend:** Node.js + Express + TypeScript | Nodemailer | Supabase (PostgreSQL) | Zod

**Testing:** Vitest + React Testing Library | Playwright | Supertest | Storybook

**CI/CD:** GitHub Actions → GitHub Pages (frontend) + Railway (backend)

---

## Monorepo Structure

```
portfolio/
├── frontend/    # React + Vite app
├── backend/     # Express API server
├── docs/        # BUILD_LOG.md — living build documentation
└── .github/     # CI/CD workflows
```

---

## Development

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && npm install && npm run dev
```

---

## Build Phases

See [docs/BUILD_LOG.md](docs/BUILD_LOG.md) for a complete phase-by-phase build log
with verification checklists.
