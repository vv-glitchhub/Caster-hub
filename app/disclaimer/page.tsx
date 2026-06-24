import MotionSurface from '../../components/MotionSurface'

const disclaimers = [
  ['Prototype only', 'Caster OS is currently a prototype and product concept. It should not be treated as a finished financial, health or betting product.'],
  ['No financial advice', 'Stockcaster and wealth-related content are for product demonstration and education only, not personal investment advice.'],
  ['No betting guarantee', 'Scorecaster and sports signals do not guarantee profit. Paper testing, risk control and responsible behavior are core principles.'],
  ['No medical advice', 'Relaxcaster supports calm, clarity and reflection, but it is not medical care, diagnosis or emergency support.'],
  ['AI limitations', 'AI recommendations may be incomplete or wrong. Important decisions should be reviewed carefully by the user.'],
  ['Human control', 'Caster OS should support decisions, not replace personal responsibility or professional judgment.'],
]

export default function DisclaimerPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS Disclaimer</p>
          <h1 className="home-title">Clear.</h1>
          <h2 className="home-subtitle">Boundaries.</h2>
          <p className="home-lead">
            Caster OS is designed as a decision intelligence prototype. It should support thinking, not replace judgment or professional advice.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/demo">Open Demo</a>
            <a className="secondary-button" href="/privacy">Privacy</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Important Notes</p>
          <h2 className="section-title">Launch-ready boundaries for a responsible prototype.</h2>
          <div className="home-module-grid">
            {disclaimers.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Disclaimer</p>
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
