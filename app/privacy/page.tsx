import MotionSurface from '../../components/MotionSurface'

const principles = [
  ['Minimal data', 'Caster OS should only collect what is needed to provide the product experience.'],
  ['User control', 'Users should understand what context, memory and preferences are used by the system.'],
  ['Transparency', 'AI recommendations should explain the reason, confidence and relevant context behind decisions.'],
  ['Security first', 'Accounts, memory and integrations should be designed with strong access control before production use.'],
]

const sections = [
  ['Prototype status', 'This public version is a product prototype. Some data, memory and recommendations may be simulated or seed-based until production systems are connected.'],
  ['Analytics', 'The app may use privacy-conscious analytics to understand page usage and improve the product experience.'],
  ['Future accounts', 'When accounts are added, Caster OS should clearly separate profile data, memory, preferences and connected product data.'],
  ['Contact', 'For demo, partnership or investment discussions, use the pitch and business pages as the product overview.'],
]

export default function PrivacyPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS Privacy</p>
          <h1 className="home-title">Trust.</h1>
          <h2 className="home-subtitle">By design.</h2>
          <p className="home-lead">
            Privacy and trust are part of the product. Caster OS should help users make better decisions without hiding how context is used.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/dashboard">Open Dashboard</a>
            <a className="secondary-button" href="/system">System Health</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Principles</p>
          <h2 className="section-title">The AI layer should be useful, clear and controlled.</h2>
          <div className="home-module-grid">
            {principles.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Privacy</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Policy Notes</p>
          <h2 className="section-title">Launch notes for the current prototype.</h2>
          <div className="home-module-grid">
            {sections.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Note</p>
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
