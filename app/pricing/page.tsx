import MotionSurface from '../../components/MotionSurface'

const tiers = [
  ['Free', '€0', 'Explore the public demo, OS map, pitch, roadmap and basic dashboard preview.'],
  ['Pro', '€19/mo', 'Personal dashboard, saved layouts, memory, profiles and deeper agent recommendations.'],
  ['Premium', '€49/mo', 'Live intelligence, alerts, advanced risk analysis and multi-module agent workflows.'],
  ['Business', 'Custom', 'Decision intelligence systems for teams, operators, creators and specialist workflows.'],
]

const included = [
  ['Dashboard OS', 'Focus, widgets, memory, profiles and system overview.'],
  ['Caster AI', 'Decision brief, next actions and context-aware recommendations.'],
  ['Product Modules', 'Wealth, gaming, health and life intelligence surfaces.'],
  ['Shared Core', 'Risk, behavior, probability and decision quality layer.'],
]

export default function PricingPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS Pricing</p>
          <h1 className="home-title">Simple.</h1>
          <h2 className="home-subtitle">Then scalable.</h2>
          <p className="home-lead">
            A pricing concept for turning Caster OS into a premium subscription product with personal, premium and business layers.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/demo">Open Demo</a>
            <a className="secondary-button" href="/business">Business Model</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Pricing Concept</p>
          <h2 className="section-title">Start free. Upgrade when the OS becomes useful.</h2>
          <div className="home-module-grid">
            {tiers.map(([name, price, text]) => (
              <MotionSurface key={name} className="home-module-card min-h-0">
                <p className="home-module-label">{name}</p>
                <h3 className="home-module-title">{price}</h3>
                <p className="home-module-text">{text}</p>
                <p className="home-module-link">Caster OS</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Included Value</p>
          <h2 className="section-title">The price is for one connected decision layer.</h2>
          <div className="home-module-grid">
            {included.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Included</p>
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
