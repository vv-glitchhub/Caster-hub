import MotionSurface from '../../components/MotionSurface'

const phases = [
  ['Phase 01', 'Foundation', 'Hub, dashboard, agent, system health, module map and shared OS shell.'],
  ['Phase 02', 'Memory', 'Supabase-backed memory, saved layouts, profiles and user-specific context.'],
  ['Phase 03', 'Live Intelligence', 'Real market data, sports signals, health state and life planning inputs.'],
  ['Phase 04', 'Agent Actions', 'Caster AI starts taking safe actions across modules with confirmation.'],
  ['Phase 05', 'Autonomous OS', 'Daily brief, alerts, learning loop, risk control and personal optimization.'],
]

const buildTracks = [
  ['Core Product', 'Make the OS shell, dashboard and agent feel like one premium product.'],
  ['Data Layer', 'Connect memory, widgets, profiles and product signals into one context graph.'],
  ['Intelligence Layer', 'Add scoring, recommendations, signal quality and risk explanations.'],
  ['User Layer', 'Add accounts, saved preferences, onboarding and personal dashboard state.'],
  ['Business Layer', 'Prepare pitch, pricing, demo flow and investor-ready product story.'],
]

export default function RoadmapPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS Roadmap</p>
          <h1 className="home-title">Build.</h1>
          <h2 className="home-subtitle">Then scale.</h2>
          <p className="home-lead">
            The roadmap turns Caster OS from a cinematic prototype into a connected AI operating system with memory, live signals and safe agent actions.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/modules">View OS Map</a>
            <a className="secondary-button" href="/system">System Health</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Execution Phases</p>
          <h2 className="section-title">From prototype to operating system.</h2>
          <div className="home-module-grid">
            {phases.map(([phase, title, text]) => (
              <MotionSurface key={phase} className="home-module-card min-h-0">
                <p className="home-module-label">{phase}</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Build Tracks</p>
          <h2 className="section-title">The work should move in parallel tracks.</h2>
          <div className="home-module-grid">
            {buildTracks.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Caster OS</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
