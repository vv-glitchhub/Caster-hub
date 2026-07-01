import MotionSurface from '../../components/MotionSurface'

const apps = [
  {
    name: 'Scorecaster',
    href: '/apps/scorecaster',
    status: 'Ready for production sprint',
    use: 'Open sports intelligence, risk control and betting analysis direction.',
    next: 'Use Scorecaster repo for live odds and betting workspace.'
  },
  {
    name: 'Stockcaster',
    href: '/apps/stockcaster',
    status: 'Ready for production sprint',
    use: 'Open investing intelligence, watchlist, portfolio and market brief direction.',
    next: 'Use Stockcaster repo for market brief and investing demo.'
  },
  {
    name: 'Carcaster',
    href: '/apps/carcaster',
    status: 'Usable MVP demo in hub',
    use: 'Open car profile, fault intelligence, maintenance and cost workspaces.',
    next: 'Start with faults and maintenance.'
  },
  {
    name: 'Travelcaster',
    href: '/apps/travelcaster',
    status: 'Usable MVP demo in hub',
    use: 'Open trip profile, itinerary, budget, packing and practical tips.',
    next: 'Start with itinerary and budget.'
  }
]

const routes = [
  ['/backup', 'Backup local data'],
  ['/dashboard', 'Caster dashboard'],
  ['/modules', 'All modules'],
  ['/apps/carcaster/faults', 'Carcaster faults'],
  ['/apps/carcaster/maintenance', 'Carcaster maintenance'],
  ['/apps/travelcaster/itinerary', 'Travelcaster itinerary'],
  ['/apps/travelcaster/budget', 'Travelcaster budget']
]

export default function StartPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Start Using Caster</p>
          <h1 className="home-title">Aloita sovellusten käyttö.</h1>
          <h2 className="home-subtitle">Yksi aloitussivu kaikille Caster-apeille.</h2>
          <p className="home-lead">
            Tämä sivu näyttää mistä aloitat, mitä voit käyttää heti ja miten varmuuskopioit selaimeen tallennetun datan.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/apps/carcaster">Use Carcaster</a>
            <a className="secondary-button" href="/apps/travelcaster">Use Travelcaster</a>
            <a className="secondary-button" href="/backup">Backup Data</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Apps</p>
          <h2 className="section-title">Käyttöjärjestys.</h2>
          <div className="home-module-grid">
            {apps.map((app) => (
              <MotionSurface key={app.name} href={app.href} className="home-module-card">
                <p className="home-module-label">{app.status}</p>
                <h3 className="home-module-title">{app.name}</h3>
                <p className="home-module-text">{app.use}</p>
                <p className="home-module-text">{app.next}</p>
                <p className="home-module-link">Open {app.name} →</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Direct Routes</p>
          <h2 className="section-title">Nopeat linkit käyttöön.</h2>
          <div className="home-highlight-grid">
            {routes.map(([href, label]) => (
              <MotionSurface key={href} href={href} className="home-highlight-card">
                <p className="home-card-title">{label}</p>
                <p className="home-card-text">{href}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">How to use now</p>
          <h2 className="section-title">Mitä voit tehdä heti selaimessa.</h2>
          <div className="home-module-grid">
            <MotionSurface className="home-module-card">
              <p className="home-module-label">1</p>
              <h3 className="home-module-title">Syötä dataa</h3>
              <p className="home-module-text">Carcaster ja Travelcaster tallentavat nyt omat rivit selaimeen.</p>
            </MotionSurface>
            <MotionSurface className="home-module-card">
              <p className="home-module-label">2</p>
              <h3 className="home-module-title">Käytä workspaces</h3>
              <p className="home-module-text">Avaa faults, maintenance, itinerary ja budget sivut.</p>
            </MotionSurface>
            <MotionSurface href="/backup" className="home-module-card">
              <p className="home-module-label">3</p>
              <h3 className="home-module-title">Varmuuskopioi</h3>
              <p className="home-module-text">Kopioi localStorage JSON talteen ennen pilvitallennusta.</p>
              <p className="home-module-link">Open Backup →</p>
            </MotionSurface>
          </div>
        </div>
      </section>
    </main>
  )
}
