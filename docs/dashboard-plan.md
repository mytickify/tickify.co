# Tickify Dashboard Plan (Shopify-Style)

This document outlines a Shopify-style dashboard for managing Users, Pages, and Events in Tickify. It aligns with the existing Next.js app router, Apollo GraphQL, Prisma, shadcn/ui, and the `site-builder` module.

## Goals
- Provide a cohesive admin experience modeled after Shopify’s dashboard patterns.
- Centralize management for Users, Pages, and Events.
- Reuse existing modules (`components/events/*`, `site-builder/*`, GraphQL APIs).
- Establish a scalable design system and IA for future features.

## Scope
- Dashboard shell: sidebar + top navigation
- Sections: Overview, Users, Pages, Events, Settings
- CRUD flows: Users, Pages (builder), Events (editor/preview)
- Permissions, search, filters, and basic analytics
- GraphQL schemas/resolvers and Prisma integration

---

## Design Language (Shopify-inspired)
- Emulate Shopify Polaris styling without copying proprietary assets.
- Theme via Tailwind/shadcn:
  - Neutrals: `#FAFBFC`, `#F6F7F8`, `#DFE3E8`, `#C4CDD5`, `#919EAB`, `#637381`, `#202223`
  - Primary: `#5C6AC4` (indigo), Accent: `#47C1BF` (teal)
  - Radius: 6–8px; Spacing scale `4, 8, 12, 16, 24, 32`
  - Elevation: subtle shadows for cards, sticky topbar
- Patterns:
  - AppFrame: persistent sidebar, topbar with search, account menu
  - PageHeader: title, primary action, breadcrumbs
  - Index/List: filters, segmented controls, table/list views
  - Resource Item: avatar/icon, title, subtitle, quick actions
  - Empty states: clear CTAs to create records

---

## Information Architecture
- Dashboard (shell)
  - Overview
    - KPIs: `Active Events`, `Total Users`, `Published Pages`
    - Recent activity feed
  - Users
    - List (filters, search)
    - Detail (profile, roles, activity)
    - Create/Edit
  - Pages
    - List (status, last updated)
    - Create/Edit via `site-builder` (builder + preview)
    - Publish settings
  - Events
    - List (date, status, tickets)
    - Create/Edit using existing `EventEditor`, `EventPreview`
    - Analytics summary
  - Settings
    - Organization, roles, API keys, themes

---

## Navigation & Layout (Next.js App Router)
- Route group: `app/(dashboard)/`
  - `layout.tsx`: AppFrame (sidebar + topbar)
  - `dashboard/page.tsx`: Overview
  - `dashboard/users/*`: list, detail, new
  - `dashboard/pages/*`: list, editor, new
  - `dashboard/events/*`: list, editor, new
  - `dashboard/settings/*`
- Keep existing public site under `app/page/` and `app/(events)/` as-is.

---

## UI Components (shadcn/ui + custom)
- Shell: `Sidebar`, `Topbar`, `PageHeader`, `KPIWidget`, `ResourceList`, `Table`, `FiltersBar`
- Forms: `Form`, `Input`, `Select`, `Textarea`, `Tabs`
- Pages integration:
  - Use `site-builder/SiteBuilder` for edit/create
  - Render previews via `site-builder/components/Renderer`
- Events integration:
  - Reuse `components/events/EventEditor`, `EventPreview`, `EventCard`, `EventsList`
- Accessibility: keyboard nav, focus states, high contrast support

---

## Data Models (Prisma)
Note: Align with existing `prisma/schema.prisma` (migrations include `add_site_pages`).

- User
  - `id`, `email`, `name`, `role` (enum: Admin, Editor, Viewer), `createdAt`, `updatedAt`
- Page (likely `SitePage`)
  - `id`, `title`, `slug`, `status` (Draft/Published), `json` (builder schema), `publishedAt`, `updatedAt`
- Event
  - `id`, `title`, `description`, `startAt`, `endAt`, `status`, `venue`, `tickets` (relation), `updatedAt`

If any fields already exist, reuse them; add only what's missing.

---

## GraphQL API
- Schemas/types:
  - `User`, `Page`, `Event`, `Mutation`, `Query`
- Queries:
  - `users(filter, pagination)`, `user(id)`
  - `pages(filter, pagination)`, `page(id|slug)`
  - `events(filter, pagination)`, `event(id)`
- Mutations:
  - `createUser`, `updateUser`, `deleteUser`
  - `createPage`, `updatePage`, `publishPage`, `deletePage`
  - `createEvent`, `updateEvent`, `publishEvent`, `deleteEvent`
- Resolvers:
  - Hook into Prisma client (`lib/prisma.ts`)
  - Validate permissions via `lib/auth.ts` before writes
- Client:
  - Use `providers/apollo.tsx` and `lib/apollo-client.ts`
  - Co-locate queries in page components within `app/(dashboard)/*`

---

## Auth & Permissions
- Auth: Use current auth client (`lib/auth-client.ts`/`lib/auth.ts`)
- Roles:
  - Admin: full CRUD across all sections
  - Editor: manage Pages and Events
  - Viewer: read-only access
- Route protection:
  - Middleware or server components gating based on session role
  - Client guards for hiding actions (buttons/forms)

---

## Pages Flow (Builder)
- New Page:
  - From Pages List → “Create Page”
  - Launch `SiteBuilder` with starter template
  - Save draft to Prisma (`json` schema field)
  - Preview using Renderer
  - Publish triggers `publishPage` (set status, publishedAt)
- Edit Page:
  - Load existing `json` into builder
  - Versioning: soft history (optional phase 2)

---

## Events Flow
- New Event:
  - From Events List → “Create Event”
  - Use `EventEditor` with form steps (details, schedule, tickets)
  - Preview using `EventPreview`
  - Publish sets status to Active
- Analytics (phase 2):
  - Aggregate KPIs: tickets sold, revenue, attendees

---

## Users Flow
- User List:
  - Search, filters by role/status
  - Invite user (email → pending)
- User Detail:
  - Profile, role assignment, activity log
- Audit trails (phase 2):
  - Track mutations per actor

---

## Performance & Quality
- Performance budgets: LCP < 2.5s (dashboard pages), avoid N+1 queries
- Accessibility: semantic landmarks, keyboard support, aria labels
- Testing:
  - Unit: GraphQL resolvers and utility functions
  - Integration: dashboard pages rendering with mocked Apollo
  - E2E: critical flows (create/publish Page/Event)

---

## Milestones
1) Foundation (Shell + Routing)
- Create `app/(dashboard)/layout.tsx` with Sidebar/Topbar
- Add Overview page with KPIs via GraphQL

2) Pages (Builder Integration)
- Pages list + create/edit routes
- Integrate `site-builder` for edit/preview
- GraphQL: queries/mutations for pages

3) Events (Existing Components)
- Events list + create/edit routes
- Wire `EventEditor`/`EventPreview` to GraphQL

4) Users & Permissions
- Users list/detail
- Role-based access across routes and mutations

5) Polish & QA
- Theming, empty states, filters
- Tests, accessibility, performance pass

---

## Deliverables
- `app/(dashboard)/` routes and shell
- GraphQL schemas/resolvers for Users, Pages, Events
- Prisma migrations (if needed) with careful alignment to existing models
- Reusable UI components (shell, lists, forms)
- Documentation updates in README and this plan

---

## Risks & Notes
- Avoid copying Shopify assets; emulate patterns with shadcn/Tailwind.
- Ensure `site-builder` JSON schema matches persisted `Page` model.
- Session role must be enforced server-side for write actions.