import MotionSurface from '../../components/MotionSurface'

const demoSteps = [
  ['01', 'The Vision', 'Open with the idea: Caster is not another app. It is an AI operating layer for decisions.', '/'],
  ['02', 'The Process', 'Explain the flow: signal, context, decision, module and memory. This is the core product logic.', '/'],
  ['03', 'The Dashboard', 'Show the command center, widgets, memory, focus and intelligence graphs.', '/dashboard'],
  ['04', 'The Agent', 'Show Caster AI as the interface that turns context into the next step.', '/agent'],
  ['05', 'The Ecosystem', 'Show modules: Wealth, Gaming, Health, Life and System working as one platform.', '/modules'],
  ['06', 'The Business', 'Move into pitch, business model and pricing after the product has been understood.', '/pitch'],
]

const proofPoints = [
  ['Luxury tech', 'The experience should feel premium, calm and cinematic.'],
  ['Cinematic UI', 'The product story is guided instead of feeling like a normal website.'],
  ['AI ecosystem', 'The value is one agent across many decision surfaces.'],
  ['Data intelligence', 'The system turns scattered signals into practical next actions.'],
]

export default function DemoPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Public Alpha Demo Flow</p>
          <h1 className="home-title">Present.</h1>
          <h2 className="home-subtitle">The operating system.</h2>
          <p className="home-lead">
            The demo should feel like a product reveal: first the vision, then the process, then the dashboard, agent, ecosystem and business layer.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/">Start From Vision</a>
            <a className="secondary-button" href="/dashboard">Open Dashboard</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Presentation Process</p>
          <h2 className="section-title">Guide people through the story, not just the pages.</h2>
          <div className="home-module-grid">
            {demoSteps.map(([step, title, text, href]) => (
              <MotionSurface key={step} href={href} className="home-module-card min-h-0">
                <p className="home-module-label">Step {step}</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
                <p className="home-module-link">Open →</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Visual Direction</p>
          <h2 className="section-title">The public alpha should feel premium before it explains itself.</h2>
          <div className="home-module-grid">
            {proofPoints.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Direction</p>
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
