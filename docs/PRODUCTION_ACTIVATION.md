# Caster Production Activation

This checklist separates merged application code from real production activation.

## Required environment

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)
- `CASTER_AUTH_REDIRECT_URL`

Never commit secret values to GitHub.

## Required verification signals

Set these to `true` only after the corresponding test has passed in production:

- `CASTER_DOMAIN_MIGRATION_VERIFIED`
- `CASTER_RLS_TWO_USER_VERIFIED`
- `CASTER_ACCOUNT_LIFECYCLE_VERIFIED`
- `CASTER_AUTH_REDIRECTS_VERIFIED`

## Activation order

1. Create or select the production Supabase project.
2. Apply the reviewed Caster domain migration.
3. Enable and verify forced row-level security.
4. Test every user-owned table with two separate authenticated users.
5. Configure reviewed authentication redirect domains.
6. Implement and verify authenticated account export.
7. Implement and verify complete account deletion.
8. Run a local-to-cloud import dry run with duplicate protection.
9. Enable cloud synchronization behind a feature flag.
10. Observe logs and rollback on any ownership or data-integrity failure.

## Non-goals

- No financial execution or brokerage integration.
- No automatic travel purchase or booking.
- No remote vehicle control.
- No automatic migration of browser data without explicit user action.
- No client exposure of the Supabase service-role key.

## Runtime status

Use `/production-readiness` for the human-readable view and `/api/production-readiness` for the machine-readable snapshot.
