export default function NotFound() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS</p>
          <h1 className="home-title">404.</h1>
          <h2 className="home-subtitle">Signal lost.</h2>
          <p className="home-lead">
            This route is not connected to the operating layer yet. Return to the dashboard or explore the OS map.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/dashboard">Open Dashboard</a>
            <a className="secondary-button" href="/modules">View OS Map</a>
          </div>
        </div>
      </section>
    </main>
  )
}
