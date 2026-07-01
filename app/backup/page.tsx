import LocalDataExport from '../../components/LocalDataExport'

export default function BackupPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster Backup</p>
          <h1 className="home-title">Backup</h1>
          <h2 className="home-subtitle">Save your local app data.</h2>
          <p className="home-lead">Copy your local Carcaster and Travelcaster data before cloud sync is connected.</p>
          <div className="home-actions">
            <a className="primary-button" href="#backup">Open Backup</a>
            <a className="secondary-button" href="/start">Back to Start</a>
          </div>
        </div>
      </section>

      <div id="backup">
        <LocalDataExport />
      </div>
    </main>
  )
}
