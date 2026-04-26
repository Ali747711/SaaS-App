# Nabiev Store

A modern admin dashboard built with **Vite + React 19 + TypeScript + shadcn/ui**, featuring full Clerk authentication, internationalization, and a LiveKit-powered AI agent.

---

## Features

- **Authentication** — Clerk-powered sign-in / sign-up with a custom split-panel UI that matches the shadcn design system
- **Dashboard** — Stats cards, recent orders, and overview metrics
- **Order Management** — Track and fulfil orders at scale
- **Customer Insights** — Manage customer data and relationships
- **Product Catalog** — Inventory management
- **Analytics** — Real-time business metrics
- **AI Agent** — LiveKit-powered chat agent with audio visualizer
- **Internationalization** — English, Korean, and Uzbek (i18next)
- **Dark / Light mode** — Persistent theme with system-preference detection (toggle with the `D` key)
- **Fully responsive** — Mobile-aware sidebar and layout

---

## Tech Stack

| Layer            | Library                                                   |
| ---------------- | --------------------------------------------------------- |
| Build tool       | Vite 7                                                    |
| Framework        | React 19 + TypeScript                                     |
| Styling          | Tailwind CSS 4 + shadcn/ui (Radix Nova preset)            |
| Authentication   | `@clerk/react`                                            |
| Icons            | Lucide React                                              |
| Real-time        | LiveKit (`@livekit/components-react`)                     |
| i18n             | `i18next` + `react-i18next`                               |
| Animations       | `motion` + `tw-animate-css`                               |
| Fonts            | Geist Variable                                            |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A Clerk account ([clerk.com](https://clerk.com))

### Installation

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

Get your publishable key from the [Clerk dashboard](https://dashboard.clerk.com).

### Run the dev server

```bash
npm run dev
```

The app starts at `http://localhost:5173`. You'll see the sign-in page first — create an account or sign in to access the dashboard.

---

## Available Scripts

| Command             | Purpose                              |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the Vite dev server            |
| `npm run build`     | Type-check and build for production  |
| `npm run preview`   | Preview the production build locally |
| `npm run typecheck` | Run TypeScript type checks           |
| `npm run lint`      | Run ESLint                           |
| `npm run format`    | Format `.ts` / `.tsx` with Prettier  |

---

## Project Structure

```
src/
├── App.tsx                       # Main app + AuthGuard wrapper
├── main.tsx                      # Entry: ClerkProvider + ThemeProvider
├── index.css                     # Tailwind + design tokens (OKLCH)
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   ├── auth/
│   │   ├── auth-guard.tsx        # Gates the app behind Clerk auth
│   │   ├── sign-in-page.tsx      # Split-panel sign-in
│   │   └── sign-up-page.tsx      # Split-panel sign-up
│   ├── dashboard/                # Sidebar, stats, recent orders
│   ├── orders/ customers/ products/ analytics/ support/ settings/
│   ├── agent-chat/               # LiveKit agent UI
│   ├── theme-provider.tsx        # Dark/light theme context
│   └── language-switcher.tsx
├── hooks/
├── lib/
│   ├── i18n.ts                   # i18next setup
│   └── utils.ts                  # `cn()` utility
└── locales/
    ├── en.json
    ├── ko.json
    └── uz.json
```

---

## Authentication Flow

The app uses Clerk's prebuilt `<SignIn />` and `<SignUp />` components wrapped in custom shadcn-styled layouts:

1. `main.tsx` wraps the tree with `<ClerkProvider>` (publishable key from `.env`)
2. `<AuthGuard>` in `App.tsx` checks `useAuth()`:
   - **Loading** → skeleton screen
   - **Signed-out** → split-panel sign-in / sign-up page
   - **Signed-in** → dashboard
3. The header shows `<UserButton />` for account management and sign-out
4. The sidebar footer shows the live Clerk user (avatar, name, email) via `useUser()`

---

## Adding shadcn Components

```bash
npx shadcn@latest add <component>
```

Example:

```bash
npx shadcn@latest add dialog
```

Components are added to `src/components/ui/`.

---

## Theming

The app uses Tailwind CSS 4 with **OKLCH** colors and CSS custom properties. Tokens are defined in `src/index.css`:

- `--background`, `--foreground`, `--primary`, `--muted`, `--border`, `--card`, `--sidebar-*`, `--chart-*`
- Radius scales: `--radius-sm` → `--radius-4xl`
- Dark mode is toggled via the `.dark` class on `<html>`

Press `D` anywhere in the app (outside an input) to toggle dark / light.

---

## Internationalization

Three languages are bundled out of the box:

- English (`en`)
- Korean (`ko`)
- Uzbek (`uz`)

Translations live in `src/locales/*.json`. Switch languages with the language switcher in the header.

---

## License

Private project.
