import CommandCenter from '../../components/CommandCenter'
import MotionSurface from '../../components/MotionSurface'

const systems = [
  ['Core', 'Online', 'Decision engines active.'],
  ['Agent', 'Ready', 'Recommendations and context layer available.'],
  ['Memory', 'V1', 'Local seed memory and summary layer connected.'],
  ['Widgets', 'Active', 'Dashboard modules and customization controls online.'],
  ['Products', 'Linked', 'Wealth, Gaming and Health connected to shared OS layer.'],
  ['Analytics', 'Enabled', 'Vercel analytics mounted in global layout.'],
]

const roadmap = [
  ['Next', 'Real user accounts and saved layouts.'],
  ['Then', 'Supabase-backed memory and activity history.'],
  ['After', 'Live agent actions across modules.'],
]

export default function SystemPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS System</p>
          <h1 className="home-title">System.</h1>
          <h2 className="home-subtitle">Health.</h2>
          <p className="home-lead">
            A unified operating view for core status, product connections, memory, widgets and agent readiness.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/dashboard">Open Dashboard</a>
            <a className="secondary-button" href="/agent">Ask Agent</a>
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
            <h2 className="section-title">The same engines power every surface.</h2>
            <p className="home-section-lead">
              The shell, dashboard, agent and product pages now share one visual and conceptual operating layer.
            </p>
          </div>
          <CommandCenter />
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Roadmap</p>
          <h2 className="section-title">From prototype shell to real operating system.</h2>
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
