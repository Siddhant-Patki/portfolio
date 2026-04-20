# CI/CD Agent

## Identity
Deployment and pipeline specialist. You manage GitHub Actions workflows, Railway configuration,
GitHub Pages deployment, and branch protection rules.

---

## GitHub Secrets Required

### Frontend secrets (GitHub repo → Settings → Secrets → Actions)
| Secret Name | Value |
|------------|-------|
| VITE_API_URL | https://<railway-url>.up.railway.app |

### Backend secrets
| Secret Name | Value |
|------------|-------|
| RAILWAY_TOKEN | from Railway dashboard |
| RAILWAY_SERVICE_NAME | portfolio-backend |
| SMTP_HOST | smtp.gmail.com |
| SMTP_PORT | 587 |
| SMTP_USER | sidpatki123@gmail.com |
| SMTP_PASS | Gmail App Password (not account password) |
| SMTP_FROM | sidpatki123@gmail.com |
| CONTACT_EMAIL | sidpatki123@gmail.com |
| SUPABASE_URL | https://<project>.supabase.co |
| SUPABASE_ANON_KEY | anon key from Supabase dashboard |
| ALLOWED_ORIGIN | https://siddhant-patki.github.io |

---

## Branch Protection (manual setup in GitHub UI)

Settings → Branches → Add rule → Branch name pattern: `main`
- [x] Require a pull request before merging
- [x] Require status checks to pass before merging
  - Add check: "Type Check → Lint → Test → Build" (frontend job)
  - Add check: "Type Check → Lint → Test → Deploy" (backend job)
- [x] Require branches to be up to date before merging
- [x] Do not allow bypassing the above settings

---

## GitHub Pages Setup (manual in GitHub UI)

Settings → Pages → Source: Deploy from a branch → Branch: `gh-pages` / `/ (root)`
The `gh-pages` branch is auto-created by `peaceiris/actions-gh-pages` on first successful deploy.
Requires `permissions: contents: write` in the frontend workflow.

---

## Critical: Vite Base URL for GitHub Pages

`vite.config.ts` must set:
```typescript
base: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/',
```
Without `/portfolio/`, all assets return 404 on GitHub Pages.

---

## Workflow Path Filters

Both workflows use `paths:` filters:
- `frontend.yml` triggers only on `frontend/**` changes
- `backend.yml` triggers only on `backend/**` changes

This means documentation-only commits and cross-workspace changes don't waste CI minutes.

---

## Railway Setup Steps

1. Create account at railway.app
2. New Project → Deploy from GitHub → select `portfolio` repo
3. Set root directory: `backend/`
4. Add all backend environment variables from the secrets table above
5. Set build command: `npm run build`
6. Set start command: `node dist/index.js`
7. Enable automatic deploys from `main` branch
8. Copy the Railway service URL → add to GitHub Secrets as `VITE_API_URL`

---

## README Badges

Add to `README.md` after first successful CI run:
```markdown
![Frontend CI](https://github.com/Siddhant-Patki/portfolio/actions/workflows/frontend.yml/badge.svg)
![Backend CI](https://github.com/Siddhant-Patki/portfolio/actions/workflows/backend.yml/badge.svg)
```

---

## Common Issues & Fixes

**"gh-pages branch does not exist"**
First deploy creates it. If action fails, check `permissions: contents: write` is in the workflow.

**"VITE_API_URL is undefined in build"**
Must be passed explicitly in the workflow step:
```yaml
- run: npm run build
  env:
    VITE_API_URL: ${{ secrets.VITE_API_URL }}
```

**Railway TypeScript build fails**
Railway default: `npm install && npm start`. Override:
- Build command: `npm run build` (runs tsup)
- Start command: `node dist/index.js`

**CORS error in production**
`ALLOWED_ORIGIN` must exactly match `https://siddhant-patki.github.io` — no trailing slash,
correct protocol.

**E2E job is skipped**
The E2E job uses `needs: ci`. If the `ci` job fails, E2E is skipped automatically. Fix the
unit test / build failure first.
