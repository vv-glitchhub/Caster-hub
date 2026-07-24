export type ReleaseStatus = 'complete' | 'code_ready' | 'blocked' | 'planned'

export type ReleaseItem = {
  id: string
  product: string
  title: string
  status: ReleaseStatus
  detail: string
  nextAction: string
  href: string
}

export type ReleaseCenterSnapshot = {
  generatedAt: string
  complete: number
  codeReady: number
  blocked: number
  planned: number
  items: ReleaseItem[]
  blockers: string[]
}

export function buildReleaseCenterSnapshot(): ReleaseCenterSnapshot {
  const items: ReleaseItem[] = [
    {
      id: 'scorecaster-shadow-learning',
      product: 'Scorecaster',
      title: 'Governed Shadow Learning',
      status: 'code_ready',
      detail: 'Merged to main with green CI, CodeQL and regression checks.',
      nextAction: 'Apply reviewed Supabase migrations and complete protected production probes.',
      href: 'https://github.com/vv-glitchhub/scorecaster/pull/71',
    },
    {
      id: 'caster-autonomy',
      product: 'Caster Hub',
      title: 'Autonomy Command Center',
      status: 'complete',
      detail: 'Health monitoring, prioritised actions and approval boundaries are merged.',
      nextAction: 'Keep provider health endpoints configured and monitored.',
      href: '/autonomy',
    },
    {
      id: 'caster-notifications',
      product: 'Caster Hub',
      title: 'Shared Notification Center',
      status: 'complete',
      detail: 'Cross-application notification ranking is merged and read-only.',
      nextAction: 'Connect future product-specific notification feeds through reviewed adapters.',
      href: '/notifications',
    },
    {
      id: 'caster-profile',
      product: 'Caster Hub',
      title: 'Shared Profile Gateway',
      status: 'code_ready',
      detail: 'Local-first profile preferences and account entry points are merged.',
      nextAction: 'Choose and configure the shared identity provider before enabling cloud sync.',
      href: '/profile',
    },
    {
      id: 'caster-brief',
      product: 'Caster Hub',
      title: 'Daily Caster Brief',
      status: 'complete',
      detail: 'A deterministic ecosystem summary is merged and available through page and API.',
      nextAction: 'Add scheduled delivery only after notification channels and user consent exist.',
      href: '/brief',
    },
    {
      id: 'stockcaster-cloud',
      product: 'Stockcaster',
      title: 'Cloud Portfolio Foundation',
      status: 'code_ready',
      detail: 'RLS-protected portfolio, holdings and watchlist schema is merged.',
      nextAction: 'Apply the migration, connect authenticated Supabase clients and run two-user isolation tests.',
      href: 'https://github.com/vv-glitchhub/Stockcaster-/pull/6',
    },
    {
      id: 'carcaster-cloud',
      product: 'Carcaster',
      title: 'Vehicle Cloud Domain',
      status: 'code_ready',
      detail: 'User-owned vehicle profiles and vehicle events schema is merged.',
      nextAction: 'Apply migration, add explicit import and verify account export and deletion.',
      href: '/apps/carcaster',
    },
    {
      id: 'travelcaster-cloud',
      product: 'Travelcaster',
      title: 'Travel Cloud Domain',
      status: 'code_ready',
      detail: 'User-owned trips and trip items schema is merged.',
      nextAction: 'Apply migration, add explicit import and keep booking execution outside the application.',
      href: '/apps/travelcaster',
    },
    {
      id: 'shared-sso',
      product: 'Caster Core',
      title: 'Shared Single Sign-On',
      status: 'blocked',
      detail: 'A safe implementation depends on a production identity provider and verified redirect domains.',
      nextAction: 'Configure identity provider, callback domains, RLS policies, export and deletion flows.',
      href: '/profile',
    },
    {
      id: 'mobile-apps',
      product: 'Caster Ecosystem',
      title: 'Native Mobile Distribution',
      status: 'planned',
      detail: 'Mobile-first web surfaces exist, but store-ready native releases are not complete.',
      nextAction: 'Define release scope, signing, privacy disclosures, store accounts and crash reporting.',
      href: '/roadmap',
    },
  ]

  return {
    generatedAt: new Date().toISOString(),
    complete: items.filter((item) => item.status === 'complete').length,
    codeReady: items.filter((item) => item.status === 'code_ready').length,
    blocked: items.filter((item) => item.status === 'blocked').length,
    planned: items.filter((item) => item.status === 'planned').length,
    items,
    blockers: [
      'Production Supabase migrations have not been applied through this repository workflow.',
      'Shared identity provider, redirect domains and authenticated clients still require production configuration.',
      'Two-user RLS isolation, account export and deletion must pass before cloud synchronization is enabled.',
      'Payments, brokerage execution, booking execution and vehicle remote control remain intentionally out of scope.',
    ],
  }
}
