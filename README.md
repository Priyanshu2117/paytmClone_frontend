# 💸 Paytm Clone — Frontend

A Paytm-inspired payments app frontend built with React 19, TypeScript, and Vite. Features authentication, a user dashboard, peer-to-peer money transfers, protected routing, and lazy-loaded pages.

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** — lightning-fast dev server & build tool
- **React Router v7** — client-side routing with protected routes
- **ESLint** — code linting

## Project Structure

```
src/
├── api/                  # API service layer
├── assets/               # Static assets (images, SVGs)
├── components/           # Reusable UI components
├── pages/
│   ├── auth/             # Login & SignUp pages
│   ├── context/          # React context providers
│   ├── dashboard/        # User dashboard
│   ├── sendMoney/        # P2P money transfer
│   └── LazyLoadedPages/  # Code-split lazy-loaded pages
├── routes/
│   ├── AppRoutes.tsx     # Route definitions & Navbar
│   └── ProtectedRoute.tsx# Auth guard (token-based)
├── types/                # TypeScript type definitions
├── App.tsx               # Root component
└── main.tsx              # Entry point
```

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm

### Installation

```bash
git clone <repo-url>
cd paytmFrontend
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Routes

| Path         | Access    | Description          |
| ------------ | --------- | -------------------- |
| `/login`     | Public    | Login page           |
| `/signup`    | Public    | Sign up page         |
| `/dashboard` | Protected | User dashboard       |
| `/send`      | Protected | Send money page      |
| `/lazyLoad`  | Protected | Lazy-loaded demo page|

Protected routes require a valid `token` in localStorage. Unauthenticated users are redirected to `/`.

## Key Features

- **Token-based auth guard** — ProtectedRoute checks localStorage for a JWT before rendering child routes
- **Lazy loading** — Code-split pages via `React.lazy()` + `Suspense` for better initial load performance
- **Modular architecture** — Pages, routes, API layer, and types are cleanly separated

## License

This project is for educational/study purposes.
