import MotionSurface from './MotionSurface'

const recommendations = [
  ['Priority 01', 'Review portfolio risk before adding new exposure.'],
  ['Priority 02', 'Check Scorecaster alerts after market movement confirms value.'],
  ['Priority 03', 'Pause pressure-driven choices until clarity improves.'],
]

export default function AgentPreview() {
  return (
    <MotionSurface className="min-h-[31rem] p-7">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="home-module-label">Caster AI</p>
          <h3 className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-white">Daily Decision Brief</h3>
        </div>
        <span className="rounded-full border border-blue-200/20 bg-blue-400/10 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.24em] text-blue-100/80">
          ONLINE
        </span>
      </div>

      <div className="mt-9 space-y-3">
        {recommendations.map(([label, text]) => (
          <div className="rounded-2xl border border-white/10 bg-black/25 p-4" key={label}>
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-blue-100/55">{label}</p>
            <span className="mt-3 block text-base leading-7 text-white/70">{text}</span>
          </div>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] p-4">
        <span className="text-sm uppercase tracking-[0.24em] text-white/45">Signal quality</span>
        <strong className="text-sm tracking-[0.24em] text-white">HIGH</strong>
      </div>
    </MotionSurface>
  )
}
