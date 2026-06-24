const specs = [
  ['01', 'Signal layer', 'Life, wealth, health and gaming inputs enter one shared intelligence layer.'],
  ['02', 'Agent layer', 'Caster AI reads context and converts noise into a next action.'],
  ['03', 'Action layer', 'The user opens the right module and stays in control of the decision.'],
]

export default function CinematicReveal() {
  return (
    <section className="cinematic-reveal">
      <div className="cinematic-backdrop" />
      <div className="cinematic-inner">
        <div className="cinematic-copy">
          <p className="section-label">Product Reveal</p>
          <h2 className="cinematic-title">A decision operating system, not another dashboard.</h2>
          <p className="cinematic-text">
            Caster OS is designed to feel like a premium technology reveal: quiet, cinematic, intelligent and focused on the moment where a person needs to decide.
          </p>
        </div>

        <div className="cinematic-device" aria-label="Caster OS cinematic interface preview">
          <div className="device-topline">
            <span>CASTER CORE</span>
            <strong>LIVE</strong>
          </div>
          <div className="device-orbit">
            <span className="orbit-ring ring-a" />
            <span className="orbit-ring ring-b" />
            <span className="orbit-pulse" />
            <div className="orbit-core">AI</div>
          </div>
          <div className="device-modules">
            {specs.map(([step, title, text]) => (
              <div key={step} className="device-module">
                <p>{step}</p>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
