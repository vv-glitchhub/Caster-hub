import MotionSurface from './MotionSurface'

const graphs = [
  {
    title: 'Scorecaster Edge Graph',
    label: 'Gaming Intelligence',
    value: '+7.2%',
    text: 'Value gap between model probability and market implied probability.',
    path: 'M8 70 C18 54 26 62 36 44 C46 26 54 42 64 30 C74 18 82 28 92 16',
  },
  {
    title: 'Stockcaster Trend Graph',
    label: 'Wealth Intelligence',
    value: '82/100',
    text: 'Momentum, macro pressure, news quality and portfolio risk combined.',
    path: 'M8 66 C18 58 26 50 36 52 C48 54 54 34 64 36 C76 38 82 24 92 22',
  },
  {
    title: 'Relaxcaster Control Graph',
    label: 'Health Intelligence',
    value: 'Stable',
    text: 'Pressure, recovery, impulse level and clarity state mapped into action timing.',
    path: 'M8 48 C20 46 28 52 38 48 C50 42 56 44 66 46 C78 48 84 40 92 42',
  },
]

export default function IntelligenceGraphs() {
  return (
    <div className="home-module-grid">
      {graphs.map((graph) => (
        <MotionSurface key={graph.title} className="home-module-card">
          <p className="home-module-label">{graph.label}</p>
          <h3 className="home-module-title">{graph.title}</h3>
          <div className="mt-8 rounded-3xl border border-white/10 bg-black/25 p-4">
            <svg viewBox="0 0 100 80" className="h-40 w-full overflow-visible" role="img" aria-label={graph.title}>
              <defs>
                <linearGradient id={`${graph.title}-gradient`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="rgba(147,197,253,0.15)" />
                  <stop offset="50%" stopColor="rgba(147,197,253,0.9)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.95)" />
                </linearGradient>
              </defs>
              {[20, 40, 60].map((y) => (
                <line key={y} x1="6" y1={y} x2="94" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" />
              ))}
              <path d={graph.path} fill="none" stroke={`url(#${graph.title}-gradient)`} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="92" cy={graph.path.endsWith('16') ? '16' : graph.path.endsWith('22') ? '22' : '42'} r="3" fill="white" />
            </svg>
          </div>
          <p className="mt-6 text-4xl font-semibold tracking-tight text-white">{graph.value}</p>
          <p className="home-module-text">{graph.text}</p>
        </MotionSurface>
      ))}
    </div>
  )
}
