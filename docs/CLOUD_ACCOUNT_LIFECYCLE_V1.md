# Caster Cloud Account Lifecycle V1

## Scope

`/api/account/cloud` is the server-side lifecycle boundary for the shared Carcaster and Travelcaster Supabase domain.

It does not accept passwords, service keys, payment data or application sessions in request bodies.

## GET export

Requirements:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- a valid Supabase user access token in `Authorization: Bearer <user-jwt>`
- the reviewed `supabase/caster_cloud_domains_v1.sql` migration
- RLS policies verified with two users

The route validates the token with Supabase Auth and queries each domain table with the same user JWT. RLS is therefore the authorization boundary. The response includes only rows visible to that authenticated user.

Covered tables:

- `caster_vehicle_profiles`
- `caster_vehicle_events`
- `caster_trips`
- `caster_trip_items`

## DELETE account

Permanent deletion is fail-closed and requires all of the following:

- a valid Supabase user access token
- `SUPABASE_SERVICE_ROLE_KEY` available only to the server runtime
- `CASTER_ACCOUNT_DELETION_ENABLED=true`
- `x-caster-delete-confirmation: DELETE-MY-CASTER-ACCOUNT`
- `x-caster-confirm-email` exactly matching the verified account email

The server verifies the caller first and then deletes only that verified Supabase Auth user. The domain schema references `auth.users(id)` with `on delete cascade`, so owned Carcaster and Travelcaster rows are removed by the database relationship.

## Activation order

1. Apply `supabase/caster_cloud_domains_v1.sql`.
2. Verify grants and RLS policies for the authenticated role.
3. Run a two-user read, update and delete isolation test.
4. Test GET export for both users and compare row ownership.
5. Test account deletion in a disposable project.
6. Verify that another user's rows remain intact.
7. Verify any Supabase Storage ownership separately before deletion.
8. Set `CASTER_ACCOUNT_LIFECYCLE_VERIFIED=true`.
9. Set `CASTER_ACCOUNT_DELETION_ENABLED=true` only in the reviewed production environment.

## Non-goals

- no automatic cloud migration
- no cross-application password or token copying
- no financial execution
- no travel booking or purchasing
- no remote vehicle control
