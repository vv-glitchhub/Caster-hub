import LaunchCTA from '../../components/LaunchCTA'

const widgets = [
  ['Goals', 'Track the life targets that matter most.'],
  ['Projects', 'Turn big ideas into weekly execution.'],
  ['Habits', 'Build routines without spreadsheet pressure.'],
  ['Future', 'Preview choices before committing.'],
]

const lifeStats = [
  ['78%', 'Caster OS'],
  ['32%', 'Golf'],
  ['41%', 'Wealth'],
  ['4', 'Projects'],
]

const samplePlan = [
  ['Today', 'Ship one visible milestone.'],
  ['This week', 'Polish the public prototype.'],
  ['This month', 'Move memory and agent flows forward.'],
  ['Next', 'Turn planning into weekly execution.'],
]

export default function LifePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />

        <div className="home-hero-inner">
          <p className="home-eyebrow">Lifecaster</p>
          <h1 className="home-title">Life.</h1>
          <h2 className="home-subtitle">As a system.</h2>
          <p className="home-lead">
            A personal operating layer for goals, projects, habits, decisions and future planning.
          </p>

          <div className="home-highlight-grid">
            {lifeStats.map(([value, label]) => (
              <div key={label} className="motion-surface home-highlight-card">
                <p className="home-card-title">{value}</p>
                <p className="home-card-text">{label}</p>
              </div>
            ))}
          </div>

          <div className="home-actions">
            <a className="primary-button" href="/dashboard">Open Dashboard</a>
            <a className="secondary-button" href="/agent">Ask Agent</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Life Intelligence</p>
          <h2 className="section-title">Turn direction into daily movement.</h2>
          <p className="home-section-lead">
            Lifecaster makes goals, projects and habits feel like a calm operating system instead of a messy task list.
          </p>

          <div className="home-core-grid" style={{ marginTop: '3.5rem' }}>
            <div className="motion-surface home-core-card">
              <div className="home-core-pill">Focus Plan</div>
              <div className="home-core-items">
                {samplePlan.map(([phase, text]) => (
                  <div key={phase} className="home-core-item">
                    <strong>{phase}</strong>
                    <br />
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="section-label">AI Coach</p>
              <h2 className="section-title">One visible milestone at a time.</h2>
            </div>
          </div>

          <div className="home-module-grid">
            {widgets.map(([title, text]) => (
              <div key={title} className="motion-surface home-module-card">
                <p className="home-module-label">Lifecaster</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
                <p className="home-module-link">Life OS</p>
              </div>
            ))}
          </div>

          <LaunchCTA
            eyebrow="Lifecaster"
            title="Turn life direction into a daily system."
            description="Continue to the main Caster OS dashboard and connect goals, widgets and AI recommendations."
            tone="light"
          />
        </div>
      </section>
    </main>
  )
}
