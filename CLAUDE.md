# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Production build (run this to check for type errors)
npm run lint       # ESLint
npm run seed       # Seed Supabase with QuantSun course data (node scripts/seed.mjs)
```

There are no automated tests. Use `npm run build` to verify TypeScript correctness before deploying.

## Architecture

**StudyHub** is a Next.js 15 App Router community platform for sharing study resources. Users post requests describing what they're looking for; other users answer with resource links.

### Auth: Clerk (not Supabase Auth)

Clerk handles all authentication. Supabase is used **only as a database** — never for auth.

- Server components/API routes: `auth()`, `currentUser()` from `@clerk/nextjs/server`
- Client components: `useUser()` from `@clerk/nextjs`
- **Never** import from `@supabase/ssr` or `@/lib/supabase/client` / `server` — those files don't exist. The only Supabase client is `adminSupabase` from `@/lib/supabase/admin` (service role key, bypasses RLS).
- Protected routes (`/request`, `/my-requests`) are guarded in `src/middleware.ts`

### Database: Supabase (Postgres)

Key tables:
- `posts` — study resource requests. `author_id` is a Clerk user ID string (text, not uuid).
- `resources` — answers to posts. Each is a URL with `language`, `price`, `type`, `description` (comment), and `votes` score. `submitted_by_id` is a Clerk user ID string.
- `resource_votes` — per-user vote tracking (`resource_id`, `user_id`, `direction`). Used to implement toggle-off and vote-flip logic.

All DB access goes through `adminSupabase`. RLS policies exist but are permissive since the service role bypasses them anyway.

### Data Flow

**Request flow** (`/request` → `RequestForm.tsx`):
1. User fills title + description
2. POST `/api/classify` → Gemini `gemini-1.5-flash` returns `{ subject, topics[] }`
3. User selects subject from a full list and toggles AI-suggested topic tags
4. GET `/api/posts?topics=...` fetches similar existing posts (shown in new tab when clicked)
5. Draft saved to `sessionStorage` so user can browse similar posts and return
6. POST `/api/posts` creates the post using the Clerk username server-side

**Answer flow** (`AddAnswerForm.tsx` on post detail page):
1. Multi-step: URL → language → price → type → comment
2. On URL advance: Microlink API (`api.microlink.io`) fetches link preview (title, description, thumbnail) — non-blocking, optional
3. POST `/api/posts/[id]/resources`

**Voting** (`AnswerCard.tsx` + `/api/resources/[id]/vote`):
- Tracks per-user votes in `resource_votes` table
- Same direction = toggle off (delete row, revert score)
- Opposite direction = flip (update row, ±2 delta)

### UI Conventions

Dark glassmorphic theme — **no Tailwind color classes for brand colors**, always inline styles:
- Primary accent: `#C8956A` (amber/brown headings), `#C17F3A` (buttons)
- Muted text: `#9A7A62`, `#5a3828`
- Card backgrounds: `rgba(255,255,255,0.025)` with `border: 1px solid rgba(180,90,40,0.18)`
- Body background: `#110703`
- Fonts: Syne (headings), DM Sans (body), JetBrains Mono (labels/badges) — loaded via `next/font/google`

Subject badge colors are managed by `src/lib/subjectColors.ts` — always use `getSubjectColors(subject).style` for subject badges.

Clerk sign-in/sign-up appearance is configured in `src/app/layout.tsx` via the `appearance` prop on `ClerkProvider` (including element-level overrides for social buttons, inputs, etc.).

### Key File Map

| Path | Purpose |
|------|---------|
| `src/lib/supabase/admin.ts` | Single Supabase client (service role) |
| `src/lib/subjectColors.ts` | Subject → badge color mapping |
| `src/lib/sidebarData.ts` | Static data for /resources, /internships, /competitions |
| `src/lib/novu.ts` + `src/lib/novu/workflows.ts` | Novu email/in-app notifications for new resource answers |
| `src/middleware.ts` | Clerk route protection |
| `src/components/RequestForm.tsx` | Full request creation flow (classify → tags → similar → submit) |
| `src/components/AddAnswerForm.tsx` | Multi-step answer submission with Microlink preview |
| `src/components/AnswerCard.tsx` | Displays a resource answer with voting |
| `src/components/RealtimePost.tsx` | Client shell for post detail page (holds answer list + form state) |
| `supabase/migrations/` | SQL migrations — run manually in Supabase SQL Editor |

### Next.js 15 Gotchas

- Route params are async: always `const { id } = await params` (type: `params: Promise<{ id: string }>`)
- No event handlers in server components — use `'use client'` or Tailwind `hover:` classes
- Pages that need Clerk server-side data need `export const dynamic = 'force-dynamic'`

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
GEMINI_API_KEY
NOVU_API_KEY          # optional — notifications silently no-op if missing
```
