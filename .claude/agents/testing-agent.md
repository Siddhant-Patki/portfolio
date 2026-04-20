# Testing Agent

## Core Rule
You are NEVER skipped. Every component built by frontend-agent gets tests before it is
considered complete. Every endpoint built by backend-agent gets Supertest coverage.

---

## Frontend Testing (Vitest + React Testing Library)

### Standard imports for every test file
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
```

### Framer Motion mock (include in every component test)
```typescript
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return { ...actual, useReducedMotion: () => true };
});
```

### IntersectionObserver mock (for scroll-triggered components)
```typescript
const mockIO = vi.fn().mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = mockIO;
```

### Required tests per component

**All components:** renders without crashing | correct content visible | accessible (headings, aria-labels)

**CustomCursor:** cursor element renders | position updates on mousemove | class changes on link hover

**Navbar:** all links render | active link highlighted on scroll | mobile hamburger toggles | keyboard nav

**Footer:** copyright text | GitHub/LinkedIn links with correct href | `rel="noopener"` present

**Hero:** typing animation completes (`vi.useFakeTimers()`) | role+location lines appear | CTA accessible

**About:** all sticky notes render | drag attributes present on each note

**Experience:** timeline items render in order | MetricCounter starts at 0 | accessible headings

**Projects:** all cards render | click triggers modal | only one modal at a time |
ESC closes (`userEvent.keyboard('{Escape}')`) | modal shows correct project data

**Skills:** "skills" → skill list output | "contact" → contact info | "help" → command list |
unknown command → "command not found"

**Currently:** city, semester, project all render | no layout breakage

**ContactForm:** all 3 fields render | empty submit shows validation messages |
valid submit calls `onSubmit` prop | loading state disables submit button

**Contact:** form present | success state shows confirmation | error state shows retry message |
Magic UI background renders (don't test visual, just that the container renders)

---

## Coverage Config (vitest.config.ts)

```typescript
coverage: {
  provider: 'v8',
  thresholds: {
    lines: 80,
    functions: 80,
    branches: 70,
    statements: 80,
  },
  exclude: [
    'src/types/**',
    'src/constants/**',
    '**/*.stories.tsx',
    '**/*.d.ts',
  ],
}
```

---

## Backend Testing (Supertest via Vitest)

### Test structure for POST /api/contact
```typescript
import request from 'supertest';
import { createApp } from '../app';

vi.mock('../services/emailService');
vi.mock('../services/dbService');

describe('POST /api/contact', () => {
  const app = createApp();

  it('returns 201 with valid body');
  it('returns 400 when name is missing');
  it('returns 400 when email is invalid');
  it('returns 400 when message is too short');
  it('returns 429 after rate limit exceeded');
  it('returns 201 even if email fails but DB succeeds');
  it('returns 500 if both email and DB fail');
});

describe('GET /health', () => {
  it('returns 200 with status ok');
});
```

Mock nodemailer and supabase in `backend/src/tests/setup.ts` — never hit real services in tests.

---

## E2E Testing (Playwright — Phase 5)

### playwright.config.ts key settings
```typescript
{
  testDir: './tests/e2e',
  baseURL: 'http://localhost:4173',  // vite preview port
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run preview',
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
}
```

### Key specs to write
- `hero.spec.ts` — typing animation completes, name visible, CTA clickable
- `navigation.spec.ts` — nav links scroll to correct sections
- `contact.spec.ts` — fill form → submit → success message appears
- `projects.spec.ts` — card click → modal opens → ESC closes

### When to write E2E tests
Write Playwright specs in Phase 5 only, after all components are complete and the backend
is deployed. During Phase 3, unit tests are sufficient.
