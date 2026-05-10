# Liverr Frontend

React + Vite frontend for the Liverr freelance marketplace project.

## Responsibilities

- Public marketplace pages
- Signup, login, logout, and password reset UI
- Role-aware navigation for clients, freelancers, and admins
- Gig browsing, search, filters, and detail pages
- Gig creation for freelancers
- Order, review, message, and verification screens
- Admin dashboard screens for users, gigs, orders, and transactions

## Setup

```bash
npm install
npm run dev
```

## Useful Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

The frontend communicates with the Express API through `VITE_API_BASE_URL`.

## Environment

Create `.env` from `.env.example` for local development:

```bash
cp .env.example .env
```

Set `VITE_API_BASE_URL` to the backend API base URL:

```text
VITE_API_BASE_URL=http://localhost:3000/api/auth
```

For Vercel, set `VITE_API_BASE_URL` to:

```text
https://your-backend.vercel.app/api/auth
```
