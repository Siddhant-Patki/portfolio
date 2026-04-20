# Branch Protection Setup

Branch protection for `main` must be configured manually in the GitHub UI.
CI checks don't exist yet at Phase 0 — configure this before Phase 1 ends
once the first workflow run has completed (GitHub requires at least one run
before a check can be selected as required).

## Steps

1. Go to: https://github.com/Siddhant-Patki/portfolio/settings/branches
2. Click **Add rule**
3. Branch name pattern: `main`
4. Enable the following:

- [x] **Require a pull request before merging**
  - Required approvals: 1 (or 0 if solo project — your choice)
- [x] **Require status checks to pass before merging**
  - Search and add: `Type Check → Lint → Test → Build` (frontend workflow job name)
  - Search and add: `Type Check → Lint → Test → Deploy` (backend workflow job name)
  - Note: these only appear after the first CI run completes
- [x] **Require branches to be up to date before merging**
- [x] **Do not allow bypassing the above settings**

5. Click **Save changes**

## Why

This ensures no broken code reaches `main`. Every PR must pass TypeScript checking,
linting, and all tests before it can be merged. Deployments to GitHub Pages and
Railway only trigger on pushes to `main`, so this gate protects production.
