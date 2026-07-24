import AccountPortabilityClient from '../../components/AccountPortabilityClient'

export const metadata = {
  title: 'Account Data | Caster Hub',
  description: 'Export, restore and delete browser-local Caster account data.',
}

export default function AccountPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster Account Lifecycle</p>
          <h1 className="home-title">Your data.</h1>
          <h2 className="home-subtitle">Portable, visible and removable.</h2>
          <p className="home-lead">
            Back up recognized local Caster Hub data, restore it on another browser and delete it from the current device without exposing credentials.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="#account-tools">Open account tools</a>
            <a className="secondary-button" href="/profile">Shared profile</a>
            <a className="secondary-button" href="/production-readiness">Cloud readiness</a>
          </div>
        </div>
      </section>

      <section id="account-tools" className="home-section">
        <div className="home-container">
          <p className="section-label">Local Account Controls</p>
          <h2 className="section-title">Export before delete. Validate before import.</h2>
          <p className="home-section-lead">
            These controls operate only on known Caster Hub localStorage keys. They cannot access Scorecaster or Stockcaster sessions, passwords, tokens, payments or unrelated browser data.
          </p>
          <AccountPortabilityClient />
        </div>
      </section>
    </main>
  )
}
