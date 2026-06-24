import MotionSurface from '../../components/MotionSurface'

const terms = [
  ['Prototype use', 'Caster OS is currently a prototype and may change rapidly as features, design and product direction evolve.'],
  ['Responsible decisions', 'The platform is designed to support thinking and planning, not replace personal responsibility or expert advice.'],
  ['AI output', 'AI-generated recommendations should be treated as suggestions that require user review and judgment.'],
  ['Product modules', 'Wealth, gaming and health modules are demonstration surfaces until production integrations and safeguards are complete.'],
  ['Availability', 'The public demo may be updated, changed or temporarily unavailable during active development.'],
  ['Future accounts', 'When user accounts are added, terms should be expanded to cover data handling, paid plans, cancellation and support.'],
]

export default function TermsPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS Terms</p>
          <h1 className="home-title">Use.</h1>
          <h2 className="home-subtitle">With clarity.</h2>
          <p className="home-lead">
            A lightweight terms page for the prototype phase so the public demo has clear boundaries before production launch.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/launch">Launch Checklist</a>
            <a className="secondary-button" href="/disclaimer">Disclaimer</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Terms Notes</p>
          <h2 className="section-title">Simple rules for the current prototype.</h2>
          <div className="home-module-grid">
            {terms.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Terms</p>
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
