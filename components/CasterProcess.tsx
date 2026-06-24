import MotionSurface from './MotionSurface'

const steps = [
  ['01', 'Signal', 'Inputs from life, wealth, gaming, health and goals.'],
  ['02', 'Context', 'Caster connects the inputs into one operating view.'],
  ['03', 'Decision', 'The agent turns context into the next best step.'],
  ['04', 'Module', 'The user moves into the right product surface.'],
  ['05', 'Memory', 'The outcome improves the next recommendation.'],
]

export default function CasterProcess() {
  return (
    <section className="home-section">
      <div className="home-container">
        <p className="section-label">Caster Process</p>
        <h2 className="section-title">From signal to decision.</h2>
        <p className="home-section-lead">
          The public alpha should feel like a premium operating system: signals enter, context forms, the agent recommends and the user moves into the right module.
        </p>

        <div className="home-module-grid">
          {steps.map(([step, title, text]) => (
            <MotionSurface key={step} className="home-module-card min-h-0">
              <p className="home-module-label">{step}</p>
              <h3 className="home-module-title">{title}</h3>
              <p className="home-module-text">{text}</p>
            </MotionSurface>
          ))}
        </div>
      </div>
    </section>
  )
}
