export type AppHealth = {
  app?: string
  status?: string
  mode?: string
  deployment?: string
  commit?: string | null
  nextStep?: string
  timestamp?: string
  services?: Record<string, unknown>
}

export type AutonomyState = 'operational' | 'attention' | 'critical'
export type AppState = 'online' | 'degraded' | 'offline' | 'local'
export type ActionExecution = 'automatic' | 'approval_required' | 'manual'
export type ActionPriority = 'critical' | 'high' | 'medium' | 'low'

export type AutonomyApp = {
  slug: string
  name: string
  role: string
  state: AppState
  mode: string
  deployment: string
  commit: string | null
  readyServices: number
  totalServices: number
  nextStep: string
  healthUrl: string | null
  appUrl: string
  stale: boolean
}

export type AutonomyAction = {
  id: string
  app: string
  title: string
  detail: string
  priority: ActionPriority
  execution: ActionExecution
  href: string
}

export type AutonomySnapshot = {
  generatedAt: string
  state: AutonomyState
  score: number
  onlineApps: number
  monitoredApps: number
  automaticActions: number
  approvalActions: number
  manualActions: number
  apps: AutonomyApp[]
  actions: AutonomyAction[]
  guardrails: string[]
}

type RemoteAppDefinition = {
  slug: string
  name: string
  role: string
  baseUrl: string
  healthPath: string
  primaryPath: string
}

const REQUEST_TIMEOUT_MS = 5000
const STALE_AFTER_MS = 15 * 60 * 1000

const serviceLabels: Record<string, string> = {
  authLayer: 'account layer',
  cloudSyncApi: 'cloud synchronization',
  supabaseConfigured: 'Supabase configuration',
  oddsApiConfigured: 'odds data provider',
  openAiConfigured: 'AI provider',
  marketDataConfigured: 'verified market data',
  localPortfolio: 'local portfolio',
  localWatchlist: 'local watchlist',
  portfolioEngine: 'portfolio engine',
  watchlistEngine: 'watchlist engine',
  marketBriefEngine: 'market brief engine',
}

function getRemoteApps(): RemoteAppDefinition[] {
  const scorecasterUrl = process.env.SCORECASTER_URL || 'https://scorecaster.vercel.app'
  const stockcasterUrl = process.env.STOCKCASTER_URL || 'https://stockcaster.vercel.app'

  return [
    {
      slug: 'scorecaster',
      name: 'Scorecaster',
      role: 'Sports intelligence, paper tracking and risk control',
      baseUrl: scorecasterUrl,
      healthPath: '/api/health',
      primaryPath: '/quick-use',
    },
    {
      slug: 'stockcaster',
      name: 'Stockcaster',
      role: 'Portfolio, market intelligence and data trust',
      baseUrl: stockcasterUrl,
      healthPath: '/api/health',
      primaryPath: '/quick-use',
    },
  ]
}

async function loadHealth(url: string): Promise<AppHealth | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })

    if (!response.ok) return null
    return (await response.json()) as AppHealth
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

function isStale(timestamp?: string) {
  if (!timestamp) return false
  const parsed = Date.parse(timestamp)
  if (!Number.isFinite(parsed)) return false
  return Date.now() - parsed > STALE_AFTER_MS
}

function serviceCounts(services?: Record<string, unknown>) {
  const booleanServices = Object.values(services || {}).filter(
    (value): value is boolean => typeof value === 'boolean',
  )

  return {
    ready: booleanServices.filter(Boolean).length,
    total: booleanServices.length,
  }
}

function normalizeRemoteApp(definition: RemoteAppDefinition, health: AppHealth | null): AutonomyApp {
  const stale = isStale(health?.timestamp)
  const online = health?.status === 'ok'
  const counts = serviceCounts(health?.services)

  return {
    slug: definition.slug,
    name: definition.name,
    role: definition.role,
    state: !health ? 'offline' : online && !stale ? 'online' : 'degraded',
    mode: health?.mode || 'unknown',
    deployment: health?.deployment || 'unavailable',
    commit: health?.commit || null,
    readyServices: counts.ready,
    totalServices: counts.total,
    nextStep: health?.nextStep || 'No production next step reported.',
    healthUrl: `${definition.baseUrl}${definition.healthPath}`,
    appUrl: `${definition.baseUrl}${definition.primaryPath}`,
    stale,
  }
}

function localApps(): AutonomyApp[] {
  return [
    {
      slug: 'carcaster',
      name: 'Carcaster',
      role: 'Car profile, diagnostics, service history and ownership costs',
      state: 'local',
      mode: 'local-first',
      deployment: 'Caster Hub',
      commit: null,
      readyServices: 3,
      totalServices: 3,
      nextStep: 'Move local profiles, faults and service history to the shared account layer after RLS validation.',
      healthUrl: null,
      appUrl: '/apps/carcaster',
      stale: false,
    },
    {
      slug: 'travelcaster',
      name: 'Travelcaster',
      role: 'Trips, budgets, itinerary and practical travel memory',
      state: 'local',
      mode: 'local-first',
      deployment: 'Caster Hub',
      commit: null,
      readyServices: 2,
      totalServices: 2,
      nextStep: 'Add a persistent trip profile and shared account migration before live booking integrations.',
      healthUrl: null,
      appUrl: '/apps/travelcaster',
      stale: false,
    },
  ]
}

function integrationActions(app: AutonomyApp, health: AppHealth | null): AutonomyAction[] {
  if (!health?.services) return []

  return Object.entries(health.services)
    .filter(([, value]) => value === false)
    .map<AutonomyAction>(([service]) => ({
      id: `${app.slug}-${service}`,
      app: app.name,
      title: `Activate ${serviceLabels[service] || service}`,
      detail: 'This integration needs credentials, provider validation or database configuration. Caster will not enable it without explicit approval.',
      priority: service === 'supabaseConfigured' || service === 'marketDataConfigured' ? 'high' : 'medium',
      execution: 'approval_required',
      href: app.slug === 'scorecaster' ? '/apps/scorecaster/setup' : '/apps/stockcaster',
    }))
}

function remoteActions(app: AutonomyApp, health: AppHealth | null): AutonomyAction[] {
  const actions: AutonomyAction[] = []

  if (app.state === 'offline') {
    actions.push({
      id: `${app.slug}-restore-health`,
      app: app.name,
      title: 'Restore production health connection',
      detail: 'The health endpoint did not respond within five seconds. Verify deployment, domain and provider availability before trusting app status.',
      priority: 'critical',
      execution: 'manual',
      href: app.healthUrl || app.appUrl,
    })
    return actions
  }

  if (app.stale) {
    actions.push({
      id: `${app.slug}-stale-health`,
      app: app.name,
      title: 'Investigate stale health data',
      detail: 'The reported health timestamp is older than 15 minutes. The autonomous monitor will keep retrying, but production freshness needs verification.',
      priority: 'high',
      execution: 'manual',
      href: app.healthUrl || app.appUrl,
    })
  }

  actions.push(...integrationActions(app, health))

  if (health?.nextStep) {
    actions.push({
      id: `${app.slug}-next-step`,
      app: app.name,
      title: health.nextStep,
      detail: 'This is the next production action reported by the application itself. Review it before Caster changes external systems or user data.',
      priority: 'high',
      execution: 'approval_required',
      href: app.appUrl,
    })
  }

  return actions
}

function localActions(app: AutonomyApp): AutonomyAction[] {
  return [
    {
      id: `${app.slug}-cloud-migration`,
      app: app.name,
      title: app.nextStep,
      detail: 'Local-first mode remains usable. Cloud migration must preserve local data, prevent duplicates and pass two-user isolation tests.',
      priority: 'medium',
      execution: 'approval_required',
      href: app.appUrl,
    },
  ]
}

const priorityWeight: Record<ActionPriority, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
}

function calculateScore(apps: AutonomyApp[]) {
  const remoteApps = apps.filter((app) => app.healthUrl)
  let score = 40

  remoteApps.forEach((app) => {
    if (app.state === 'online') score += 20
    if (app.state === 'degraded') score += 10

    if (app.totalServices > 0) {
      score += Math.round((app.readyServices / app.totalServices) * 10)
    } else if (app.state === 'online') {
      score += 5
    }
  })

  return Math.max(0, Math.min(100, score))
}

export async function buildAutonomySnapshot(): Promise<AutonomySnapshot> {
  const definitions = getRemoteApps()
  const healthResults = await Promise.all(
    definitions.map((definition) => loadHealth(`${definition.baseUrl}${definition.healthPath}`)),
  )

  const remoteApps = definitions.map((definition, index) =>
    normalizeRemoteApp(definition, healthResults[index]),
  )
  const apps = [...remoteApps, ...localApps()]

  const actions: AutonomyAction[] = [
    {
      id: 'caster-continuous-health-watch',
      app: 'Caster Core',
      title: 'Continue autonomous health monitoring',
      detail: 'Caster refreshes the command view every 30 seconds, ranks new problems and never invents a healthy status when a source is unavailable.',
      priority: 'low',
      execution: 'automatic',
      href: '/autonomy',
    },
    ...remoteApps.flatMap((app, index) => remoteActions(app, healthResults[index])),
    ...apps.filter((app) => app.state === 'local').flatMap(localActions),
  ]

  actions.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority])

  const score = calculateScore(apps)
  const state: AutonomyState = score >= 80 ? 'operational' : score >= 50 ? 'attention' : 'critical'

  return {
    generatedAt: new Date().toISOString(),
    state,
    score,
    onlineApps: apps.filter((app) => app.state === 'online').length,
    monitoredApps: apps.length,
    automaticActions: actions.filter((action) => action.execution === 'automatic').length,
    approvalActions: actions.filter((action) => action.execution === 'approval_required').length,
    manualActions: actions.filter((action) => action.execution === 'manual').length,
    apps,
    actions,
    guardrails: [
      'Health checks, freshness detection and priority ranking may run automatically.',
      'Credentials, purchases, financial actions, external messages and destructive changes always require approval.',
      'Unavailable or stale data is shown as unavailable or degraded; Caster never fabricates a healthy result.',
      'Scorecaster remains sports analysis, paper tracking and risk-control software, not a real-money betting executor.',
    ],
  }
}
