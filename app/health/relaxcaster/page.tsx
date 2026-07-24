import ProductOSExpansion from '../../../components/ProductOSExpansion'
import RelaxcasterWorkspace from '../../../components/RelaxcasterWorkspace'

const modes = [
  ['Calm', 'Breathing, reset and quiet focus.'],
  ['Clarity', 'Facts, feelings and next steps.'],
  ['Decision', 'Pause impulsive action and compare reversible options.'],
  ['Talk', 'Prepare a clear and respectful message.'],
]

const principles = [
  ['Private by default', 'Check-ins stay on the current device until reviewed cloud storage is activated.'],
  ['No diagnosis', 'Relaxcaster supports reflection but does not diagnose or replace professional care.'],
  ['One next step', 'Every mode ends with one small, concrete and reversible action.'],
  ['Crisis boundary', 'Immediate danger is always directed to emergency and human support.'],
]

export const metadata = {
  title: 'Relaxcaster | Caster OS',
  description: 'A private local-first workspace for calm, clarity, decisions and safer communication.',
}

export default function HealthRelaxcasterPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />

        <div className="home-hero-inner">
          <p className="home-eyebrow">Relaxcaster MVP</p>
          <h1 className="home-title">Calm.</h1>
          <h2 className="home-subtitle">Then clarity.</h2>
          <p className="home-lead">
            A private, local-first wellness workspace for emotional regulation, clearer choices and safer communication.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="#relaxcaster-workspace">Start check-in</a>
            <a className="secondary-button" href="/account">Account & data</a>
          </div>
        </div>
      </section>

      <RelaxcasterWorkspace />

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Modes</p>
          <h2 className="section-title">Four focused tools instead of an open-ended chatbot.</h2>
          <div className="home-module-grid">
            {modes.map(([title, text]) => (
              <div key={title} className="motion-surface home-module-card">
                <p className="home-module-label">Relaxcaster</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Responsible design</p>
          <h2 className="section-title">Helpful boundaries are part of the product.</h2>
          <div className="home-module-grid">
            {principles.map(([title, text]) => (
              <div key={title} className="motion-surface home-module-card">
                <p className="home-module-label">Guardrail</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductOSExpansion
        label="Relaxcaster"
        title="A usable wellness MVP now, reviewed cloud identity later."
        text="The current product stores check-ins locally, makes its safety boundary explicit and can later join the shared account lifecycle after privacy and two-user isolation tests pass."
      />
    </main>
  )
}
