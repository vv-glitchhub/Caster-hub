import ProductOSExpansion from '../../../components/ProductOSExpansion'

const modes = [
  ['Calm', 'Breathing, reset and quiet focus.'],
  ['Clarity', 'Facts, feelings and next steps.'],
  ['Recovery', 'Sleep, rest and energy rhythm.'],
  ['Reflection', 'Small prompts and daily review.'],
]

const wellnessStats = [
  ['4 / 6', 'Breathing'],
  ['Steady', 'Energy'],
  ['Low', 'Noise'],
  ['Reset', 'Mode'],
]

const calmPlan = [
  ['Now', 'Slow breathing and reduce input.'],
  ['Next', 'Short walk or light movement.'],
  ['Later', 'Reflect before making decisions.'],
  ['Tonight', 'Protect sleep and lower stimulation.'],
]

export default function HealthRelaxcasterPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />

        <div className="home-hero-inner">
          <p className="home-eyebrow">Relaxcaster</p>
          <h1 className="home-title">Calm.</h1>
          <h2 className="home-subtitle">Then clarity.</h2>
          <p className="home-lead">
            A wellness layer for calm, recovery, emotional control and clearer daily decisions.
          </p>

          <div className="home-highlight-grid">
            {wellnessStats.map(([value, label]) => (
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
          <p className="section-label">Today</p>
          <h2 className="section-title">Health should feel peaceful, not technical.</h2>
          <p className="home-section-lead">
            Relaxcaster keeps the interface calm and human. The goal is not more data. The goal is control.
          </p>

          <div className="home-core-grid" style={{ marginTop: '3.5rem' }}>
            <div className="motion-surface home-core-card">
              <div className="home-core-pill">Reset Plan</div>
              <div className="home-core-items">
                {calmPlan.map(([phase, text]) => (
                  <div key={phase} className="home-core-item">
                    <strong>{phase}</strong>
                    <br />
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="section-label">Wellness OS</p>
              <h2 className="section-title">Slow. Clear. Light.</h2>
            </div>
          </div>

          <div className="home-module-grid">
            {modes.map(([title, text]) => (
              <div key={title} className="motion-surface home-module-card">
                <p className="home-module-label">Relaxcaster</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
                <p className="home-module-link">Wellness AI</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductOSExpansion
        label="Relaxcaster"
        title="Human state now connects to the full Caster OS layer."
        text="The wellness module links calm, recovery and clarity with agent recommendations, shared memory and decision timing."
      />
    </main>
  )
}
