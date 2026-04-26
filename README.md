# Nabiev Store

A modern admin dashboard built with **Vite + React 19 + TypeScript + shadcn/ui**, featuring full Clerk authentication, internationalization, a theme toggle, and a real **Claude AI** chat assistant powered by the Anthropic API.

---

## Features

- **Authentication** — Clerk-powered sign-in / sign-up with a custom split-panel UI that matches the shadcn design system
- **Live Clerk user data** — Sidebar avatar, name, and email pull from `useUser()`; header `<UserButton />` for account management and sign-out
- **Dashboard** — Stats cards, recent orders, and overview metrics
- **Order Management** — Track and fulfil orders at scale
- **Customer Insights** — Manage customer data and relationships
- **Product Catalog** — Inventory management
- **Analytics** — Real-time business metrics
- **AI Chat (Claude)** — Streaming chat with `claude-haiku-4-5` via the Anthropic SDK, with full GitHub-flavored Markdown rendering (headers, lists, code blocks, tables, blockquotes)
- **Voice mode UI** — LiveKit-powered audio visualizer (Aura)
- **Internationalization** — English, Korean, and Uzbek (i18next)
- **Dark / Light mode** — Persistent theme with system-preference detection. Toggle via the header dropdown (Sun / Moon / System) or press the `D` key anywhere outside an input
- **Fully responsive** — Mobile-aware sidebar and layout

---

## Tech Stack

| Layer            | Library                                                   |
| ---------------- | --------------------------------------------------------- |
| Build tool       | Vite 7                                                    |
| Framework        | React 19 + TypeScript                                     |
| Styling          | Tailwind CSS 4 + shadcn/ui (Radix Nova preset)            |
| Authentication   | `@clerk/react`                                            |
| AI               | `@anthropic-ai/sdk` (Claude API)                          |
| Markdown         | `react-markdown` + `remark-gfm`                           |
| Icons            | Lucide React                                              |
| Real-time / voice| LiveKit (`@livekit/components-react`)                     |
| i18n             | `i18next` + `react-i18next`                               |
| Animations       | `motion` + `tw-animate-css`                               |
| Fonts            | Geist Variable                                            |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A Clerk account ([clerk.com](https://clerk.com))
- An Anthropic API key ([console.anthropic.com](https://console.anthropic.com))

### Installation

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

- Get your Clerk publishable key from the [Clerk dashboard](https://dashboard.clerk.com).
- Get your Anthropic API key from the [Anthropic console](https://console.anthropic.com).

> ⚠️ **Security warning:** `VITE_ANTHROPIC_API_KEY` is bundled into the client JS and visible in DevTools. This is acceptable for **local development only**. Do **NOT** deploy this build to a public URL — anyone could lift the key. For production, move the Claude calls behind a backend proxy (Vercel / Cloudflare Worker / small Node server) and remove the `VITE_` prefix so the key stays server-side.

### Run the dev server

```bash
npm run dev
```

The app starts at `http://localhost:5173`. You'll see the sign-in page first — create an account or sign in to access the dashboard, then click **AI Agent** in the sidebar to chat with Claude.

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
├── App.tsx                       # Main app + AuthGuard wrapper, header with ThemeToggle + UserButton
├── main.tsx                      # Entry: ClerkProvider + ThemeProvider
├── index.css                     # Tailwind + design tokens (OKLCH)
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   ├── auth/
│   │   ├── auth-guard.tsx        # Gates the app behind Clerk auth
│   │   ├── sign-in-page.tsx      # Split-panel sign-in
│   │   └── sign-up-page.tsx      # Split-panel sign-up
│   ├── agent-chat/
│   │   ├── agent-chat-ui.tsx     # Streaming Claude chat + voice mode
│   │   └── markdown-message.tsx  # GFM markdown renderer (themed to shadcn)
│   ├── dashboard/                # Sidebar, stats, recent orders
│   ├── orders/ customers/ products/ analytics/ support/ settings/
│   ├── theme-provider.tsx        # Dark/light theme context
│   ├── theme-toggle.tsx          # Sun/Moon/System dropdown
│   └── language-switcher.tsx
├── hooks/
├── lib/
│   ├── i18n.ts                   # i18next setup
│   ├── claude.ts                 # Anthropic SDK client + system prompt
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
   - **Signed-out** → split-panel sign-in / sign-up page (with brand panel + form)
   - **Signed-in** → dashboard
3. The header shows `<UserButton />` for account management and sign-out
4. The sidebar footer shows the live Clerk user (avatar, name, email) via `useUser()`

---

## AI Chat Integration

The **AI Agent** page in the sidebar uses the official Anthropic SDK to stream chat with Claude:

- **Model:** `claude-haiku-4-5` (configured in [src/lib/claude.ts](src/lib/claude.ts))
- **Streaming:** Tokens stream in live via `claude.messages.stream()` — the assistant bubble fills as text arrives
- **Status badge:** Derives from real API state — `Connected` (idle) → `Thinking` (request in flight, no tokens yet) → `Speaking` (streaming) → `Connected`
- **Conversation memory:** Full message history is sent on every turn (Claude API is stateless)
- **Prompt caching:** System prompt uses `cache_control: { type: "ephemeral" }` for cheaper repeated calls within the cache TTL
- **Markdown rendering:** Assistant responses render through [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) with custom shadcn-themed components for headers, lists, code blocks, tables, blockquotes, and links
- **Error handling:** API errors render as a red bubble inline instead of crashing
- **Keyboard:** Enter sends, Shift+Enter inserts a newline; input + buttons disable while streaming

To change the model, edit `CLAUDE_MODEL` in [src/lib/claude.ts](src/lib/claude.ts).

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

**Two ways to switch theme:**

1. The Sun / Moon icon in the header opens a dropdown with **Light**, **Dark**, and **System** options
2. Press the `D` key anywhere outside an input to toggle between light and dark

Theme choice persists in `localStorage`.

---

## Internationalization

Three languages are bundled out of the box:

- English (`en`)
- Korean (`ko`)
- Uzbek (`uz`)

Translations live in `src/locales/*.json`. Switch languages with the language switcher in the header.

---

## Deployment Notes

This project is currently set up for **local development**. Before deploying:

1. **Move the Anthropic API key to a backend.** Create a small server (Vercel function, Cloudflare Worker, etc.) that holds `ANTHROPIC_API_KEY` server-side and exposes a single endpoint your frontend calls. Remove `VITE_` from the env-var name and remove `dangerouslyAllowBrowser: true` from [src/lib/claude.ts](src/lib/claude.ts).
2. **Configure Clerk for production.** Swap `pk_test_...` for `pk_live_...` and add your production domain to Clerk's allowed origins.
3. **Set the production redirect URL** for Clerk sign-out (`afterSignOutUrl` in [src/main.tsx](src/main.tsx)).

---

## License

Private project.
