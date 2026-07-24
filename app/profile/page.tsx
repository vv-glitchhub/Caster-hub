import SharedProfileClient from '../../components/SharedProfileClient'

export const metadata = {
  title: 'Shared Profile | Caster Hub',
  description: 'Local-first shared Caster profile and secure account gateway.',
}

export default function ProfilePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster Identity Layer</p>
          <h1 className="home-title">Profile.</h1>
          <h2 className="home-subtitle">One preference layer, secure app boundaries.</h2>
          <p className="home-lead">
            Save shared preferences locally, open connected application accounts and prepare the ecosystem for a reviewed cloud identity migration.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="#profile-workspace">Open profile</a>
            <a className="secondary-button" href="/notifications">Notifications</a>
            <a className="secondary-button" href="/autonomy">Autonomy</a>
          </div>
        </div>
      </section>

      <section id="profile-workspace" className="home-section">
        <div className="home-container">
          <p className="section-label">Shared Account Foundation</p>
          <h2 className="section-title">Useful now, migration-safe later.</h2>
          <p className="home-section-lead">
            No password or production session is stored in Caster Hub. This workspace only stores non-sensitive preferences in local browser storage.
          </p>
          <SharedProfileClient />
        </div>
      </section>
    </main>
  )
}
