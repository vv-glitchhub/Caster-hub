export type ProductGateStatus = 'complete' | 'code-ready' | 'external-blocker'

export type ProductGate = {
  title: string
  status: ProductGateStatus
  evidence: string
  nextAction: string
}

export type ProductExcellence = {
  product: string
  codeScore: number
  productionScore: number
  gates: ProductGate[]
}

export function buildProductExcellence(): ProductExcellence[] {
  const external = {
    supabase: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    serviceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    casterMigration: process.env.CASTER_DOMAIN_MIGRATION_VERIFIED === 'true',
    casterRls: process.env.CASTER_RLS_TWO_USER_VERIFIED === 'true',
    lifecycle: process.env.CASTER_ACCOUNT_LIFECYCLE_VERIFIED === 'true',
  }

  return [
    {
      product: 'Scorecaster',
      codeScore: 95,
      productionScore: process.env.SCORECASTER_PRODUCTION_ACTIVATED === 'true' ? 100 : 72,
      gates: [
        { title: 'Decision intelligence and V13 governors', status: 'complete', evidence: 'Merged model, audit, settlement and hard-cap implementation.', nextAction: 'Keep regression tests mandatory.' },
        { title: 'Installable live-data-safe PWA', status: 'complete', evidence: 'API and live decisions remain network-only.', nextAction: 'Run device acceptance tests.' },
        { title: 'Production migrations and protected workers', status: process.env.SCORECASTER_PRODUCTION_ACTIVATED === 'true' ? 'complete' : 'external-blocker', evidence: 'Requires the real Supabase project, secrets and provider probes.', nextAction: 'Run the documented production activation workflow.' },
      ],
    },
    {
      product: 'Stockcaster',
      codeScore: 90,
      productionScore: external.supabase && external.casterRls ? 85 : 62,
      gates: [
        { title: 'Portable portfolio, watchlist and history', status: 'complete', evidence: 'JSON/CSV export, restore, snapshots and local deletion are merged.', nextAction: 'Continue usability testing.' },
        { title: 'Cloud lifecycle API', status: 'code-ready', evidence: 'Authenticated export, bounded import and confirmed deletion are implemented.', nextAction: 'Apply migrations and enable flags only after RLS tests.' },
        { title: 'Verified production market data', status: 'external-blocker', evidence: 'Requires selected providers, keys, freshness monitoring and legal review.', nextAction: 'Choose and configure primary and fallback providers.' },
      ],
    },
    {
      product: 'Caster Hub',
      codeScore: 94,
      productionScore: external.supabase && external.serviceRole && external.lifecycle ? 90 : 68,
      gates: [
        { title: 'Shared operating surfaces', status: 'complete', evidence: 'Brief, notifications, autonomy, release and readiness centers are merged.', nextAction: 'Hide developer surfaces from standard users before public launch.' },
        { title: 'Portable local account data', status: 'complete', evidence: 'Profile and domain data support versioned export, import and deletion.', nextAction: 'Maintain backwards-compatible export contracts.' },
        { title: 'Shared production identity', status: external.lifecycle ? 'complete' : 'external-blocker', evidence: 'Cloud account export and deletion code exists but needs real-project verification.', nextAction: 'Configure Auth, redirects, RLS and two-user lifecycle tests.' },
      ],
    },
    {
      product: 'Carcaster',
      codeScore: 78,
      productionScore: external.casterMigration && external.casterRls ? 75 : 48,
      gates: [
        { title: 'Vehicle profile, faults and maintenance', status: 'complete', evidence: 'Editable local workspace with costs, states and portability.', nextAction: 'Add multi-vehicle UX and richer diagnostic evidence.' },
        { title: 'Private cloud domain', status: external.casterMigration && external.casterRls ? 'complete' : 'code-ready', evidence: 'Schema, RLS and cloud account lifecycle paths are implemented.', nextAction: 'Apply migration and verify two-user isolation.' },
        { title: 'Trusted automotive data', status: 'external-blocker', evidence: 'VIN, repair data and service schedules require licensed or reviewed providers.', nextAction: 'Select providers and define source-confidence rules.' },
      ],
    },
    {
      product: 'Travelcaster',
      codeScore: 74,
      productionScore: external.casterMigration && external.casterRls ? 72 : 44,
      gates: [
        { title: 'Budget and itinerary workspace', status: 'complete', evidence: 'Local trip items, categories, budget persistence and portability are available.', nextAction: 'Add trip profiles, dates and offline printable itinerary.' },
        { title: 'Private cloud domain', status: external.casterMigration && external.casterRls ? 'complete' : 'code-ready', evidence: 'Trip schemas, RLS and account lifecycle paths are implemented.', nextAction: 'Apply migration and verify ownership.' },
        { title: 'Live travel intelligence', status: 'external-blocker', evidence: 'Maps, weather, transport, flight and hotel data need provider selection and keys.', nextAction: 'Add providers one category at a time with timestamps and source labels.' },
      ],
    },
    {
      product: 'Relaxcaster',
      codeScore: 68,
      productionScore: 42,
      gates: [
        { title: 'Safe local check-in MVP', status: 'complete', evidence: 'Calm, clarity, decision and talk modes with private history and explicit safety boundary.', nextAction: 'Run accessibility and user-language review.' },
        { title: 'Portable user data', status: 'complete', evidence: 'Relaxcaster check-ins join the versioned Caster local export and deletion flow.', nextAction: 'Keep sensitive data local until a reviewed cloud design exists.' },
        { title: 'Clinical and crisis safety review', status: 'external-blocker', evidence: 'Public wellness launch requires professional review, localization and escalation testing.', nextAction: 'Commission a qualified safety and content review before public release.' },
      ],
    },
  ]
}
