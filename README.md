# Preproute — Test Management Application

A test-authoring tool for creating tests, adding questions, and publishing them.
It implements the full five-step flow — **Login → Dashboard → Create/Edit Test →
Add Questions → Preview & Publish** — against the Preproute admin/moderator API.

---

## Tech Stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Routing | React Router |
| State management | Zustand (with `persist` for auth) |
| Data fetching | Axios |
| Forms & validation | React Hook Form + Zod (`@hookform/resolvers`) |
| UI | Tailwind CSS v4 + shadcn/ui (Base UI primitives) |
| Rich text | Tiptap (question editor) |
| Long lists | `react-window` (virtualized dashboard table/cards) |
| Production server | Express (`server.js`) — static host + API proxy |

---

## Getting Started

### Prerequisites

- Node `24.14.0` (see [`.nvmrc`](.nvmrc); `^20.19 || >=22.12` also works)
- npm

### Install & run

```bash
nvm use          # optional, picks up .nvmrc
npm install
npm run dev      # http://localhost:5173
```

In development, Vite proxies every `/api/*` request to the staging backend
(`https://admin-moderator-backend-staging.up.railway.app`), so there are no CORS
issues and the browser only ever talks to the dev server. See
[`vite.config.ts`](vite.config.ts).

### Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run start` | Run the Express server (`server.js`) — serves `dist/` and proxies `/api` |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier |

---

## Environment Variables

All are optional and have sensible defaults, so the app runs with zero config.

| Variable | Used by | Default | Purpose |
| --- | --- | --- | --- |
| `VITE_USER_AUTH_KEY` | client | `user-storage` | `localStorage` key for the persisted auth store |
| `BACKEND_URL` | `server.js` | staging Railway URL | Upstream the production server proxies `/api` to |
| `PORT` | `server.js` | `3000` | Port the production server listens on |

The API base URL is always the relative path `/api` (see
[`src/config/index.ts`](src/config/index.ts)); the environment decides where that
gets proxied (Vite in dev, Express in prod).

---

## Project Structure

```
src/
├── components/          # Shared components (form fields, header, dropdowns)
│   └── ui/              # shadcn/ui primitives
├── config/             # Axios instance, API URLs, constants
├── guards/             # ProtectedRoute (auth gate)
├── pages/
│   ├── login/
│   └── prepTests/
│       ├── dashboard/  # Test list (virtualized table + mobile cards)
│       ├── create/     # Create test
│       ├── edit/       # Edit test
│       ├── questions/  # Add questions (Tiptap editor)
│       └── preview/    # Preview & publish
├── services/           # API calls (auth.ts, tests.ts)
├── store/              # Zustand stores (useUser, useLoadedTest)
├── types/              # Shared TypeScript types
├── utils/              # Helpers, response/test mappers
└── validations/        # Zod schemas + inferred types
```

---

## API Integration & Auth

- **Login** (`POST /auth/login`) returns a JWT that is stored in the persisted
  Zustand auth store (`localStorage`).
- Every other request attaches `Authorization: Bearer <token>`; all API calls
  live in [`src/services`](src/services).
- `ProtectedRoute` redirects unauthenticated users to `/login`.
- The API returns `subject` / `topics` / `sub_topics` as **names**, while the
  create/edit form works in **ids**. The mapping in
  [`src/utils/test-mapper.ts`](src/utils/test-mapper.ts) and
  `getTestForEditApi` resolves names ↔ ids so edit pre-fills correctly.

### Endpoints used

`/auth/login` · `/subjects` · `/topics/subject/:id` · `/sub-topics/topic/:id` ·
`/tests` (list/create) · `/tests/:id` (get/update/delete/publish) ·
`/questions/bulk` · `/questions/fetchBulk`

---

## Requirement Coverage

| Page / Feature | Status |
| --- | --- |
| Login with validation + JWT storage | ✅ |
| Dashboard: list, view, edit, delete, create | ✅ |
| Dashboard: filter / search | ✅ (bonus) |
| Create/Edit test with dependent Subject → Topic → Sub-topic dropdowns | ✅ |
| Marking scheme, difficulty, time, marks | ✅ |
| Save as Draft | ✅ |
| Add Questions (rich text, 4 options, correct answer, explanation) | ✅ |
| Add / edit / delete questions, min 1 required | ✅ |
| Preview & Publish | ✅ |
| Form validation throughout (Zod) | ✅ |
| Responsive layout | ✅ |

---

## Deployment

Configured for Railway (see [`railway.json`](railway.json)):

```
build:  npm run build
start:  node server.js   # serves dist/ and proxies /api -> BACKEND_URL
```

`server.js` also provides an SPA fallback so client-side routes work on refresh
and deep links.
