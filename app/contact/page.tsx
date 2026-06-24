import MotionSurface from '../../components/MotionSurface'

const contactPaths = [
  ['Demo request', 'Use the demo flow to present Caster OS and collect feedback from trusted people first.'],
  ['Partnership', 'Caster OS can be discussed as a platform for personal AI, decision intelligence and product modules.'],
  ['Investment', 'Use the pitch, business, pricing and roadmap pages as the first product story.'],
  ['Development', 'The next technical step is production accounts, persistent memory, saved layouts and live integrations.'],
]

const links = [
  ['Demo', '/demo'],
  ['Pitch', '/pitch'],
  ['Business', '/business'],
  ['Pricing', '/pricing'],
  ['Roadmap', '/roadmap'],
  ['Launch', '/launch'],
]

export default function ContactPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS Contact</p>
          <h1 className="home-title">Start.</h1>
          <h2 className="home-subtitle">The conversation.</h2>
          <p className="home-lead">
            Caster OS is ready for private demo discussions, feedback, product direction and business conversations.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/demo">Run Demo</a>
            <a className="secondary-button" href="/pitch">Open Pitch</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Contact Paths</p>
          <h2 className="section-title">Different conversations need different proof.</h2>
          <div className="home-module-grid">
            {contactPaths.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Contact</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Useful Links</p>
          <h2 className="section-title">Send the right page for the right discussion.</h2>
          <div className="home-module-grid">
            {links.map(([title, href]) => (
              <MotionSurface key={title} href={href} className="home-module-card min-h-0">
                <p className="home-module-label">Open</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">Continue to the {title.toLowerCase()} page.</p>
                <p className="home-module-link">Open →</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
