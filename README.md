# 🎟️ Ticket App - Event Creation Platform

A modern event ticketing platform with live event customization, inspired by Posh, DICE, and Handstamp. Create beautiful, personalized event pages with real-time preview and sell tickets effortlessly.

## ✨ Features

- **Live Event Editor** - Design your event page with real-time preview
- **Custom Themes** - 5 preset themes (Vibrant, Ocean, Sunset, Forest, Neon) with full customization
- **Multiple Layouts** - Choose from Single Column, Two Column, Card, or Minimal layouts
- **Ticket Management** - Create multiple ticket tiers with different pricing
- **Event Personalization** - Every event gets its own unique colors, fonts, and style
- **Responsive Design** - Beautiful on all devices
- **Additional Features** - Photo gallery, guest uploads, live chat, collaborators

## 🎨 Creative Themes

This app uses vibrant, modern color schemes with full per-event customization:

- **Vibrant**: Orange/Yellow gradients for energetic events
- **Ocean**: Blue tones for aquatic/calm events  
- **Sunset**: Red/Orange for evening events
- **Forest**: Green tones for nature events
- **Neon**: Purple/Cyan for night events and parties

Each event can be fully customized with custom colors, fonts, gradients, and layouts.

## 🛠️ Built With

- **Next.js 15** (App Router, React Server Components)
- **TypeScript** (Full type safety)
- **Tailwind CSS** (Utility-first styling)
- **shadcn/ui** (Beautiful, accessible component library)
- **date-fns** (Date formatting)
- **clsx + tailwind-merge** (Conditional classes)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Authentication (Better Auth) + Prisma

This project integrates Better Auth with Prisma Postgres to provide authentication.

### Setup

- Install dependencies:
  - `npm install -D prisma`
  - `npm install @prisma/client @prisma/extension-accelerate better-auth`

- Configure environment variables in `.env`:
  - `BETTER_AUTH_SECRET` — generate via `npx @better-auth/cli@latest secret`
  - `BETTER_AUTH_URL` — your app URL (e.g., `http://localhost:3000`)
  - `DATABASE_URL` — Postgres connection string

- Initialize Prisma:
  - `npx prisma init`
  - Edit `prisma/schema.prisma` if needed and then `npx prisma generate`
  - Create your database and run migrations (example):
    - `npx prisma migrate dev --name init`

### Files added

- `lib/prisma.ts`: Shared Prisma client instance
- `lib/auth.ts`: Better Auth server configuration using Prisma adapter
- `app/api/auth/[...all]/route.ts`: Next.js route mounting Better Auth handlers
- `lib/auth-client.ts`: Better Auth React client for sign-in/sign-up and session
- `app/auth/page.tsx`: Minimal UI to test email/password flows

### Notes

- The Prisma schema includes models required by Better Auth: `User`, `Session`, `Account`, `Verification`.
- Migrations require a reachable Postgres instance configured via `DATABASE_URL`.
- If your app runs on a port other than `3000`, add it to `trustedOrigins` or set `BETTER_AUTH_URL` accordingly.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
