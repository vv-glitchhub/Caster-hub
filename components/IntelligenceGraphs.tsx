import MotionSurface from './MotionSurface'

const graphs = [
  {
    id: 'scorecaster-edge',
    title: 'Scorecaster Edge',
    label: 'Gaming Intelligence',
    value: '+7.2%',
    text: 'Value gap between model probability and market implied probability.',
    path: 'M8 70 C18 54 26 62 36 44 C46 26 54 42 64 30 C74 18 82 28 92 16',
    y: '16',
  },
  {
    id: 'stockcaster-trend',
    title: 'Stockcaster Trend',
    label: 'Wealth Intelligence',
    value: '82/100',
    text: 'Momentum, macro pressure, news quality and portfolio risk combined.',
    path: 'M8 66 C18 58 26 50 36 52 C48 54 54 34 64 36 C76 38 82 24 92 22',
    y: '22',
  },
  {
    id: 'relaxcaster-control',
    title: 'Relaxcaster Control',
    label: 'Health Intelligence',
    value: 'Stable',
    text: 'Pressure, recovery, impulse level and clarity state mapped into action timing.',
    path: 'M8 48 C20 46 28 52 38 48 C50 42 56 44 66 46 C78 48 84 40 92 42',
    y: '42',
  },
]

export default function IntelligenceGraphs() {
  return (
    <div className="home-module-grid intelligence-graph-grid">
      {graphs.map((graph) => (
        <MotionSurface key={graph.id} className="home-module-card intelligence-graph-card">
          <p className="home-module-label">{graph.label}</p>
          <h3 className="home-module-title">{graph.title}</h3>
          <div className="intelligence-graph-frame">
            <svg viewBox="0 0 100 80" role="img" aria-label={graph.title}>
              <defs>
                <linearGradient id={`${graph.id}-gradient`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="rgba(147,197,253,0.15)" />
                  <stop offset="50%" stopColor="rgba(147,197,253,0.9)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.95)" />
                </linearGradient>
              </defs>
              {[20, 40, 60].map((y) => (
                <line key={y} x1="6" y1={y} x2="94" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" />
              ))}
              <path d={graph.path} fill="none" stroke={`url(#${graph.id}-gradient)`} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="92" cy={graph.y} r="3" fill="white" />
            </svg>
          </div>
          <p className="intelligence-graph-value">{graph.value}</p>
          <p className="home-module-text">{graph.text}</p>
        </MotionSurface>
      ))}
    </div>
  )
}
