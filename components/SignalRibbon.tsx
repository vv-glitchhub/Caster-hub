const labels = ['Luxury Tech', 'Cinematic UI', 'AI Ecosystem', 'Data Intelligence', 'Decision OS']

export default function SignalRibbon() {
  return (
    <div className="signal-ribbon" aria-label="Caster OS direction">
      <div className="signal-ribbon-track">
        {labels.concat(labels).map((label, index) => (
          <span key={`${label}-${index}`}>{label}</span>
        ))}
      </div>
    </div>
  )
}
