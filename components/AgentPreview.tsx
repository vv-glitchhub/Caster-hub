import MotionSurface from './MotionSurface'

const recommendations = [
  ['Priority 01', 'Review today\'s portfolio risk before adding new exposure.'],
  ['Priority 02', 'Check Scorecaster edge alerts only after odds movement confirms value.'],
  ['Priority 03', 'Pause high-pressure decisions until clarity state improves.'],
]

export default function AgentPreview() {
  return (
    <MotionSurface className="agent-preview">
      <div className="agent-preview-header">
        <div>
          <p className="home-module-label">Caster AI</p>
          <h3>Daily Decision Brief</h3>
        </div>
        <span>ONLINE</span>
      </div>

      <div className="agent-preview-body">
        {recommendations.map(([label, text]) => (
          <div className="agent-preview-row" key={label}>
            <p>{label}</p>
            <span>{text}</span>
          </div>
        ))}
      </div>

      <div className="agent-preview-footer">
        <span>Signal quality</span>
        <strong>HIGH</strong>
      </div>
    </MotionSurface>
  )
}
