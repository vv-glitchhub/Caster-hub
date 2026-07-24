import CommandCenter from '../../components/CommandCenter'
import MotionSurface from '../../components/MotionSurface'

export const dynamic = 'force-dynamic'

type AppHealth = {
  app?: string
  status?: string
  mode?: string
  deployment?: string
  commit?: string | null
  nextStep?: string
  timestamp?: string
  services?: Record<string, unknown>
}

const systems = [
  ['Core', 'Online', 'Caster Hub health, build CI and production deployment are active.'],
  ['Autonomy', 'Active', 'Live health, freshness checks, readiness scoring and action ranking run through one safe control loop.'],
  ['Agent', 'Ready', 'Recommendations and context layer are available for the connected product surfaces.'],
  ['Memory', 'Local V1', 'Local seed memory, browser workspaces and backup tools remain available.'],
  ['Products', 'Connected', 'Scorecaster and Stockcaster report live health to the shared OS layer.'],
  ['Analytics', 'Enabled', 'Vercel analytics and deployment status are connected.'],
  ['Safety', 'Active', 'Risk controls, RLS plans, approval gates and responsible-use boundaries are documented.'],
]

const roadmap = [
  ['Now', 'Activate Scorecaster Supabase migration and verify two-user isolation.'],
  ['Next', 'Reuse the validated account pattern for Stockcaster holdings and watchlist sync.'],
  ['Then', 'Move Carcaster and Travelcaster local workspaces into the same account and cloud model.'],
]

async function loadHealth(url: string): Promise<AppHealth | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch(url, {
      cache: 'no-store',
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

export default async function SystemPage() {
  const scorecasterUrl = 'https://scorecaster.vercel.app'
  const stockcasterUrl = process.env.STOCKCASTER_URL || 'https://stockcaster.vercel.app'

  const [scorecasterHealth, stockcasterHealth] = await Promise.all([
    loadHealth(`${scorecasterUrl}/api/health`),
    loadHealth(`${stockcasterUrl}/api/health`),
  ])

  const liveApps = [
    {
      name: 'Scorecaster',
      baseUrl: scorecasterUrl,
      health: scorecasterHealth,
      primaryPath: '/quick-use',
      secondaryPath: '/production-status',
      extraPath: '/cloud-sync',
      extraLabel: 'Cloud Sync',
    },
    {
      name: 'Stockcaster',
      baseUrl: stockcasterUrl,
      health: stockcasterHealth,
      primaryPath: '/quick-use',
      secondaryPath: '/production-status',
      extraPath: '/core-status',
      extraLabel: 'Caster Core',
    },
  ]

  const onlineCount = liveApps.filter((app) => app.health?.status === 'ok').length

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS System</p>
          <h1 className="home-title">System.</h1>
          <h2 className="home-subtitle">{onlineCount}/{liveApps.length} live apps online.</h2>
          <p className="home-lead">
            A unified operating view for Caster Hub, live product health, cloud readiness, local workspaces and the next activation tasks.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/autonomy">Open Autonomy</a>
            <a className="secondary-button" href="/dashboard">Dashboard</a>
            <a className="secondary-button" href="/agent">Ask Agent</a>
            <a className="secondary-button" href="/api/health">Hub Health JSON</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Live App Mesh</p>
          <h2 className="section-title">Production apps report directly to Caster Hub.</h2>
          <div className="home-module-grid">
            {liveApps.map((app) => {
              const online = app.health?.status === 'ok'
              const serviceCount = app.health?.services
                ? Object.values(app.health.services).filter(Boolean).length
                : 0

              return (
                <MotionSurface key={app.name} className="home-module-card min-h-0">
                  <p className="home-module-label">{online ? 'ONLINE' : 'CHECK REQUIRED'}</p>
                  <h3 className="home-module-title">{app.name}</h3>
                  <p className="home-module-text">
                    Mode: {app.health?.mode || 'unknown'} · Deployment: {app.health?.deployment || 'unavailable'} · Ready signals: {serviceCount}
                  </p>
                  <p className="home-module-text">
                    Commit: {app.health?.commit ? app.health.commit.slice(0, 8) : 'unknown'}
                  </p>
                  <p className="home-module-text">
                    Next: {app.health?.nextStep || 'Verify the production URL and health endpoint.'}
                  </p>
                  <div className="home-actions">
                    <a className="primary-button" href={`${app.baseUrl}${app.primaryPath}`}>Open App</a>
                    <a className="secondary-button" href={`${app.baseUrl}${app.secondaryPath}`}>Status</a>
                    <a className="secondary-button" href={`${app.baseUrl}${app.extraPath}`}>{app.extraLabel}</a>
                  </div>
                </MotionSurface>
              )
            })}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">System Status</p>
          <h2 className="section-title">Caster OS is becoming one connected platform.</h2>
          <div className="home-module-grid">
            {systems.map(([name, status, text]) => (
              <MotionSurface key={name} className="home-module-card min-h-0">
                <p className="home-module-label">{status}</p>
                <h3 className="home-module-title">{name}</h3>
                <p className="home-module-text">{text}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-core-grid home-container">
          <div>
            <p className="section-label">Core Map</p>
            <h2 className="section-title">The same engines and contracts power every surface.</h2>
            <p className="home-section-lead">
              The Hub, live app health, local storage contracts, account roadmap and product pages now share one operating layer.
            </p>
          </div>
          <CommandCenter />
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Roadmap</p>
          <h2 className="section-title">From connected production apps to one shared account.</h2>
          <div className="home-module-grid">
            {roadmap.map(([phase, text]) => (
              <MotionSurface key={phase} className="home-module-card min-h-0">
                <p className="home-module-label">{phase}</p>
                <h3 className="home-module-title">{phase}</h3>
                <p className="home-module-text">{text}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
