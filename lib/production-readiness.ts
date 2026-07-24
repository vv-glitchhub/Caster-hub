export type ReadinessStatus = 'ready' | 'blocked' | 'missing'

export type ReadinessCheck = {
  id: string
  area: string
  title: string
  status: ReadinessStatus
  detail: string
  nextAction: string
  environmentVariable?: string
}

const requiredEnvironment = [
  ['NEXT_PUBLIC_SUPABASE_URL', 'Shared Supabase project URL'],
  ['NEXT_PUBLIC_SUPABASE_ANON_KEY', 'Shared public Supabase client key'],
  ['SUPABASE_SERVICE_ROLE_KEY', 'Server-only Supabase service key'],
  ['CASTER_AUTH_REDIRECT_URL', 'Reviewed Caster authentication callback URL'],
] as const

export function buildProductionReadiness() {
  const environmentChecks: ReadinessCheck[] = requiredEnvironment.map(([key, title]) => ({
    id: `env-${key.toLowerCase()}`,
    area: 'Environment',
    title,
    status: process.env[key] ? 'ready' : 'missing',
    detail: process.env[key]
      ? `${key} is configured in the current deployment.`
      : `${key} is not available to the current server runtime.`,
    nextAction: process.env[key]
      ? 'Keep the value server-scoped where required and verify it in the target deployment.'
      : `Add ${key} to the production deployment without committing the secret to GitHub.`,
    environmentVariable: key,
  }))

  const migrationChecks: ReadinessCheck[] = [
    {
      id: 'migration-caster-domains',
      area: 'Database',
      title: 'Caster domain migration applied',
      status: process.env.CASTER_DOMAIN_MIGRATION_VERIFIED === 'true' ? 'ready' : 'blocked',
      detail: 'Carcaster and Travelcaster cloud tables must exist with forced row-level security.',
      nextAction: 'Apply supabase/caster_domain_cloud_v1.sql and verify ownership policies with two separate users.',
      environmentVariable: 'CASTER_DOMAIN_MIGRATION_VERIFIED',
    },
    {
      id: 'rls-two-user-test',
      area: 'Security',
      title: 'Two-user RLS isolation verified',
      status: process.env.CASTER_RLS_TWO_USER_VERIFIED === 'true' ? 'ready' : 'blocked',
      detail: 'User A must never be able to read, update or delete User B data.',
      nextAction: 'Run the documented two-user isolation test against every shared profile, vehicle and trip table.',
      environmentVariable: 'CASTER_RLS_TWO_USER_VERIFIED',
    },
    {
      id: 'account-lifecycle',
      area: 'Privacy',
      title: 'Account export and deletion verified',
      status: process.env.CASTER_ACCOUNT_LIFECYCLE_VERIFIED === 'true' ? 'ready' : 'blocked',
      detail: 'Cloud activation requires tested export and deletion coverage for all user-owned records.',
      nextAction: 'Implement and test authenticated export and deletion before enabling cloud synchronization.',
      environmentVariable: 'CASTER_ACCOUNT_LIFECYCLE_VERIFIED',
    },
    {
      id: 'auth-redirects',
      area: 'Identity',
      title: 'Authentication redirect domains reviewed',
      status: process.env.CASTER_AUTH_REDIRECTS_VERIFIED === 'true' ? 'ready' : 'blocked',
      detail: 'Only approved production and local callback URLs may be accepted by the identity provider.',
      nextAction: 'Review redirect allowlists for Caster Hub, Scorecaster and Stockcaster.',
      environmentVariable: 'CASTER_AUTH_REDIRECTS_VERIFIED',
    },
  ]

  const checks = [...environmentChecks, ...migrationChecks]
  const ready = checks.filter((check) => check.status === 'ready').length
  const blocked = checks.filter((check) => check.status === 'blocked').length
  const missing = checks.filter((check) => check.status === 'missing').length

  return {
    generatedAt: new Date().toISOString(),
    status: blocked === 0 && missing === 0 ? 'ready' : 'blocked',
    total: checks.length,
    ready,
    blocked,
    missing,
    checks,
    guardrails: [
      'Secrets are inspected only by presence and are never returned by this endpoint.',
      'No migration, credential update or external write is executed automatically.',
      'Cloud synchronization remains disabled until all security and account lifecycle checks pass.',
      'Financial execution, travel purchases and vehicle remote control remain outside this activation path.',
    ],
  }
}
