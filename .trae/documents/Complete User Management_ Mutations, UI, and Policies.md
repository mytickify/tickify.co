## Objectives

* Finalize user management with robust `createUser` and `updateUser` behavior, clear errors, and admin/self authorization.

* Add a Users Edit page and client-side validations aligned with server policies.

* Ensure type-safety via codegen and add tests to validate resolver logic.

## Resolver Enhancements

* Update `graphql/resolvers/user.ts`:

  * Enforce clear duplicate email handling: throw a specific error code/message (e.g., `USER_EXISTS`), don’t silently return existing.

  * Clarify password behavior in `updateUser`: either disallow (reject with `PASSWORD_CHANGE_NOT_SUPPORTED`) or implement via Better Auth API.

    * If implementing: call Better Auth password update for self or admin; update policy to allow self-password change and admin resets.

  * Keep strict authorization: admin-only `createUser`; `updateUser` allowed for admin or the same user.

  * Normalize inputs (trim, lowercase email) and validate required fields for create.

## Schema and Types (as needed)

* Keep `UserInput` unified. If password change is supported:

  * Document behavior in resolver (no schema changes required).

* Regenerate types with `npm run codegen` after updates.

## UI Changes: Edit User Page

* Add `app/(dashboard)/dashboard/users/[id]/edit/page.tsx`:

  * Fetch user by `id` (GraphQL query, or reuse existing `users` data source if present).

  * Form fields: `name`, `email`, `image` (optional), and optionally `password` + `confirmPassword` only if password change is supported.

  * Submit to `updateUser` mutation; show success and handle server errors with friendly messages.

  * Client-side validations: required name/email, email format; password length and match if present.

## UI Improvements: Create User Page

* Already using `createUser`:

  * Trim inputs; lowercase email before submit.

  * Show duplicate email message based on resolver’s `USER_EXISTS` error.

  * Keep password confirmation validation.

## Error Handling and UX

* Map resolver error codes to human-readable toasts/messages:

  * `USER_EXISTS` → “A user with this email already exists.”

  * `UNAUTHORIZED` → “You don’t have permission to perform this action.”

  * `PASSWORD_CHANGE_NOT_SUPPORTED` → “Password changes are not supported here.”

## Security and Authorization

* Confirm role-based checks using `isAdminForUserId` are applied consistently.

* Optionally extend `createUser` to accept a `role` (admin-only) and upsert into `UserRole` for initial role assignment.

  * Minimal change: keep roles separate for now; add role assignment UI later if needed.

## Testing

* Add resolver unit tests (if test framework present) or lightweight integration scripts: 

  * Create user with password → user exists in Prisma; proper auth flow invoked.

  * Create user duplicate → specific error thrown.

  * Update user (admin and self) → authorized; unauthorized user rejected.

  * Optional: password update flow tests.

* Smoke test UI pages: submit create and edit forms, validate error messages.

## Validation and Build

* Run `npm run codegen` to update types.

* Run lint and fix new warnings/errors if any.

## Rollout

* Deploy change behind admin-only navigation entry for Edit User.

* Monitor logs for resolver errors; iterate on messages.

## Acceptance Criteria

* `createUser` and `updateUser` enforce policies and return consistent errors.

* Admin can create users; edit page works for admin and self-update.

* UI shows clear validation and error messages.

* Types are regenerated and compile clean.

Please confirm this plan. Once approved, I’ll implement the resolver updates, add the Edit User page, wire the mutations, and validate end-to-end.
