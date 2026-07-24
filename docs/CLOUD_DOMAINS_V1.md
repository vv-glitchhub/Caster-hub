# Caster Cloud Domains V1

This migration provides private cloud storage foundations for Carcaster and Travelcaster.

## Carcaster

- vehicle profiles
- faults, services, inspections, expenses and notes
- odometer and cost history
- user-owned rows protected by RLS

## Travelcaster

- trips and budgets
- flights, hotels, transport, activities, restaurants, notes and expenses
- user-owned rows protected by RLS

## Activation gates

1. Apply `supabase/caster_cloud_domains_v1.sql`.
2. Configure an authenticated Supabase client.
3. Verify anonymous access is denied.
4. Run two-user isolation tests for all four tables.
5. Add explicit local-to-cloud import with duplicate prevention.
6. Add account export and deletion coverage.
7. Enable cloud sync only after the previous steps pass.

## Safety boundary

- no automatic bookings
- no payments or purchases
- no vehicle control or remote commands
- no hidden background migration
- local data remains available until the user explicitly imports it
