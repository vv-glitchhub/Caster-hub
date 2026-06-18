const engines = [
  ['Probability Engine', 'Market probability, model confidence and signal strength.'],
  ['Risk Engine', 'Exposure, volatility, bankroll and emotional risk control.'],
  ['Decision Engine', 'Turns signals into clear next actions and priorities.'],
  ['Behavior Engine', 'Monitors pressure, impulse and decision quality.'],
]

export default function CommandCenter() {
  return (
    <div className="command-center">
      <div className="command-core">
        <span>CASTER CORE</span>
        <strong>Decision Intelligence</strong>
      </div>
      <div className="command-grid">
        {engines.map(([title, text], index) => (
          <div className="command-module" key={title} style={{ animationDelay: `${index * -1.4}s` }}>
            <p>{title}</p>
            <span>{text}</span>
          </div>
        ))}
      </div>
      <div className="command-flow command-flow-one" />
      <div className="command-flow command-flow-two" />
    </div>
  )
}
