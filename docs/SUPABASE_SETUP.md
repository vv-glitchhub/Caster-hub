# Supabase setup for Caster OS

This guide connects the local memory foundation to a real Supabase backend.

## 1. Create Supabase project

Create a new Supabase project and copy:

- Project URL
- Public anon key

## 2. Add Vercel environment variables

In Vercel project settings, add:

```txt
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key
```

Then redeploy the project.

## 3. Run database schema

Open Supabase SQL Editor and run:

```txt
database/schema.sql
```

This creates:

- caster_profiles
- caster_goals
- caster_projects
- caster_preferences
- caster_memories

## 4. Confirm Caster OS status

Open:

```txt
/admin
```

The Supabase status card should move from local mode to Supabase ready after environment variables are configured.

## 5. Next implementation step

Update `lib/memory-service.ts` so `loadMemories()` reads from `caster_memories` instead of local seed memory.

The UI should not need to change because Dashboard and Agent already read through the memory service abstraction.
