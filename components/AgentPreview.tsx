import MotionSurface from './MotionSurface'

const recommendations = [
  ['Priority 01', 'Review portfolio risk before adding new exposure.'],
  ['Priority 02', 'Check Scorecaster alerts after market movement confirms value.'],
  ['Priority 03', 'Pause pressure-driven choices until clarity improves.'],
]

export default function AgentPreview() {
  return (
    <MotionSurface className="agent-preview-card">
      <div className="agent-preview-head">
        <div>
          <p className="home-module-label">Caster AI</p>
          <h3>Daily Decision Brief</h3>
        </div>
        <span>ONLINE</span>
      </div>

      <div className="agent-preview-list">
        {recommendations.map(([label, text]) => (
          <div className="agent-preview-item" key={label}>
            <p>{label}</p>
            <span>{text}</span>
          </div>
        ))}
      </div>

      <div className="agent-preview-quality">
        <span>Signal quality</span>
        <strong>HIGH</strong>
      </div>
    </MotionSurface>
  )
}
