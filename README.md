# TeamOps MVP

A lightweight 2-page MVP built with SvelteKit (Svelte 5) to demonstrate product thinking, UI/UX judgment, and performance-aware frontend architecture.

The application consists of:

- Dashboard — system overview with usage insights, alerts, and recent activity
- Profile — user account summary with account details and actions

The goal is not feature completeness, but clarity of structure, data flow, and execution quality.

---

## Tech Stack

- SvelteKit (Svelte 5 runes)
- Vanilla CSS with design tokens
- Inter font
- Progressive Web App (PWA)
- No external UI or chart libraries (intentional for performance)

---

## Pages

### Dashboard

Purpose: Provide a fast-loading overview of system state and recent events.

Features:

- Summary statistics (SSR)
- Usage overview bar chart (CSR)
- Alerts (CSR)
- Recent activity (CSR)
- Loading and empty states
- Responsive layout with mobile bottom navigation

**Data loading strategy**

- Summary stats are loaded server-side for fast first meaningful paint.
- Usage trend, alerts, and activity are loaded client-side to avoid blocking initial render and to simulate deferred, non-critical data.

This mirrors a common real-world pattern:

- Critical overview → SSR
- Secondary insights → CSR

A lightweight CSS-based bar chart is used instead of a charting library to avoid unnecessary client-side dependencies for a simple MVP.

---

### Profile

Purpose: Display authenticated user information and account actions.

Features:

- Hero header with avatar, role, and status
- Account details in a structured key/value layout
- Primary and secondary actions
- Responsive layout
- Loading skeleton matching final layout

**Data loading strategy**

Profile data is loaded via `+page.server.js` to represent user-specific, authenticated content.

Even though mock data is used, this reflects how sensitive profile data would typically be handled in production.

---

## Performance & Architecture

Key decisions:

- Root route redirects directly to `/dashboard`
- Server-side rendering for user profile and dashboard summary stats
- Client-side rendering for charts, alerts, and activity
- Minimal data sent to the client
- No heavy UI or charting libraries
- Responsive layouts without breakpoint-heavy designs
- Mobile-friendly bottom navigation
- Design tokens for consistent styling

These choices prioritize:

- Fast initial render
- Reduced JavaScript payload
- Clear separation of concerns
- Pragmatic MVP delivery

---

## Progressive Web App

The application is installable as a Progressive Web App:

- Web manifest configured
- Service worker registered
- App shell cached
- Standalone mobile experience

This improves perceived performance and provides an app-like experience on supported devices.

---

## Project Structure

```text
.
├── package.json
├── vite.config.js
├── svelte.config.js
└── src/
    ├── routes/
    │   ├── dashboard/
    │   ├── profile/
    │   ├── +layout.svelte
    │   └── +page.server.js
    ├── lib/
    │   └── mocks/
    ├── styles/
    │   ├── tokens.css
    │   └── global.css
    └── assets/
        └── favicon.svg
```

- Global layout and navigation live in `+layout.svelte`
- Domain mock data is colocated under `lib/mocks`
- Page-specific aggregated data lives inside page loaders
- Styles use design tokens for consistency

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Open the app in your browser:

http://localhost:5173

---
