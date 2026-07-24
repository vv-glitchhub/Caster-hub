import MotionSurface from '../../components/MotionSurface'
import { buildReleaseCenterSnapshot } from '../../lib/release-center'

export const dynamic = 'force-dynamic'

const statusLabel = {
  complete: 'COMPLETE',
  code_ready: 'CODE READY',
  blocked: 'BLOCKED',
  planned: 'PLANNED',
} as const

export default function ReleaseCenterPage() {
  const snapshot = buildReleaseCenterSnapshot()

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster Roadmap Control</p>
          <h1 className="home-title">Release Center.</h1>
          <h2 className="home-subtitle">One truthful view of what is finished and what still blocks production.</h2>
          <p className="home-lead">
            The release center separates merged features, production-ready code, external configuration blockers and future work.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="#release-items">Open roadmap status</a>
            <a className="secondary-button" href="/brief">Daily Brief</a>
            <a className="secondary-button" href="/api/release-center">Release JSON</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Current Delivery State</p>
          <h2 className="section-title">Code completion is not confused with production activation.</h2>
          <div className="home-highlight-grid">
            <MotionSurface className="home-highlight-card"><p className="home-card-title">{snapshot.complete}</p><p className="home-card-text">Complete and usable</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">{snapshot.codeReady}</p><p className="home-card-text">Code ready, configuration pending</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">{snapshot.blocked}</p><p className="home-card-text">Blocked by production dependencies</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">{snapshot.planned}</p><p className="home-card-text">Planned roadmap items</p></MotionSurface>
          </div>
        </div>
      </section>

      <section id="release-items" className="home-section">
        <div className="home-container">
          <p className="section-label">Roadmap Status</p>
          <h2 className="section-title">Every major product has a concrete next action.</h2>
          <div className="home-module-grid">
            {snapshot.items.map((item) => (
              <MotionSurface key={item.id} className="home-module-card min-h-0">
                <p className="home-module-label">{item.product} · {statusLabel[item.status]}</p>
                <h3 className="home-module-title">{item.title}</h3>
                <p className="home-module-text">{item.detail}</p>
                <p className="home-module-text"><strong>Next:</strong> {item.nextAction}</p>
                <a className="secondary-button" href={item.href}>Open item</a>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Production Blockers</p>
          <h2 className="section-title">These items require real infrastructure or explicit product decisions.</h2>
          <div className="home-highlight-grid">
            {snapshot.blockers.map((blocker, index) => (
              <MotionSurface key={blocker} className="home-highlight-card">
                <p className="home-card-title">Blocker {index + 1}</p>
                <p className="home-card-text">{blocker}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
