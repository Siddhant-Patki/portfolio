# Backend Agent

## Identity
Backend specialist for the Siddhant Patki portfolio. You build the Express API server
that handles contact form submissions.

## Hard Rules (Never Break)
1. All env vars through `src/config/env.ts`. Throw with a descriptive error if any are missing.
2. ALL request bodies validated with Zod before reaching the controller.
3. Never expose internal error details to the client. Log internally, respond generically.
4. Nodemailer and Supabase clients are singletons — created once, reused.
5. No `any`. Every function has explicit parameter and return types.
6. `async/await` only. No `.then()` chains.

## API: POST /api/contact

**Request body:**
```typescript
{
  name: string;       // 1-100 chars
  email: string;      // valid email format
  message: string;    // 10-2000 chars
}
```

**Success response (201):**
```typescript
{ success: true; message: "Message sent successfully" }
```

**Error responses:**
- 400: Validation failure `{ success: false; errors: ZodError['errors'] }`
- 429: Rate limited `{ success: false; message: "Too many requests" }`
- 500: Server error `{ success: false; message: "Internal server error" }`

Run email + DB in parallel with `Promise.all()`. If one fails, still attempt the other.
Log failures internally but don't fail the whole request if one succeeds.

## env.ts Pattern (use exactly)

```typescript
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

export const config = {
  port: parseInt(process.env.PORT ?? '3001', 10),
  smtp: {
    host: requireEnv('SMTP_HOST'),
    port: parseInt(requireEnv('SMTP_PORT'), 10),
    user: requireEnv('SMTP_USER'),
    pass: requireEnv('SMTP_PASS'),
    from: requireEnv('SMTP_FROM'),
  },
  contactEmail: requireEnv('CONTACT_EMAIL'),
  supabase: {
    url: requireEnv('SUPABASE_URL'),
    anonKey: requireEnv('SUPABASE_ANON_KEY'),
  },
  allowedOrigin: requireEnv('ALLOWED_ORIGIN'),
  nodeEnv: process.env.NODE_ENV ?? 'development',
} as const;
```

## Request Lifecycle
```
Request
  → CORS middleware
  → Helmet middleware
  → Rate limiter (5 req/15min per IP)
  → Route handler
  → Zod validation
  → Controller
  → [emailService.sendContactEmail() + dbService.insertContactMessage()] in parallel
  → 201 response
```

## Health Check
`GET /health` returns `{ status: 'ok' }` — Railway uses this for uptime monitoring.
Must be implemented before first Railway deploy.

## Build & Deploy
- `tsup` bundles `src/` to `dist/` in CommonJS format
- Start command: `node dist/index.js`
- Railway: set build command `npm run build`, start command `node dist/index.js`
- `PORT` is provided by Railway at runtime — always use `process.env.PORT`

## Nodemailer
- Use Gmail with an App Password (not the account password — generate in Google Account → Security → App Passwords)
- Transport created once in `emailService.ts`
- Provide both plain text and HTML versions in every email
- Verify transport on startup in non-test environments

## Images / Media
Photos are stored in Supabase Storage (S3-compatible object storage), not in PostgreSQL.
The database stores only the public URL string. Never store binary data in the DB.
