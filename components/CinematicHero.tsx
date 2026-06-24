export default function CinematicHero() {
  return (
    <section className="cinematic-hero-v3">
      <div className="cinematic-hero-bg" />
      <div className="cinematic-hero-grid" />
      <div className="cinematic-hero-orbit orbit-one" />
      <div className="cinematic-hero-orbit orbit-two" />
      <div className="cinematic-hero-content">
        <p className="cinematic-kicker">Caster OS Public Alpha</p>
        <h1 className="cinematic-wordmark">CASTER</h1>
        <p className="cinematic-statement">The operating layer for human intelligence.</p>
        <p className="cinematic-lead">
          One premium AI layer that turns signals from life, wealth, health and gaming into clear next decisions.
        </p>
        <div className="cinematic-actions">
          <a className="primary-button" href="/demo">Enter OS</a>
          <a className="secondary-button" href="/pitch">Watch the vision</a>
        </div>
      </div>
      <div className="cinematic-status-panel" aria-label="Caster OS live status">
        <span>CORE ONLINE</span>
        <span>AGENT READY</span>
        <span>PUBLIC ALPHA</span>
      </div>
    </section>
  )
}
