const SCORECASTER_URL = 'https://scorecaster.vercel.app'
const REPO_URL = 'https://github.com/vv-glitchhub/scorecaster'

const steps = [
  {
    title: 'Run the database migration',
    detail: 'Open the Supabase SQL Editor and run supabase/scorecaster_auth_cloud.sql from the Scorecaster repository.',
  },
  {
    title: 'Configure Auth URLs',
    detail: 'Set the production Site URL to https://scorecaster.vercel.app and allow https://scorecaster.vercel.app/auth/confirm as a redirect URL.',
  },
  {
    title: 'Create the first account',
    detail: 'Open /login, create an account and complete email confirmation if it is enabled in Supabase.',
  },
  {
    title: 'Test local-to-cloud migration',
    detail: 'Add a manual pick in Quick Use, then open Cloud Sync and copy it to the authenticated account.',
  },
  {
    title: 'Verify user isolation',
    detail: 'Create a second test account and confirm that each account only sees its own cloud bets.',
  },
]

export default function ScorecasterSetupPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Scorecaster Activation</p>
          <h1 className="home-title">Finish the cloud setup.</h1>
          <h2 className="home-subtitle">The code is deployed. These checks activate real user accounts.</h2>
          <p className="home-lead">
            No service-role secret is needed in the browser. Authentication, the protected API and Row Level Security are already represented in the codebase.
          </p>
          <div className="home-actions">
            <a className="primary-button" href={`${SCORECASTER_URL}/login`}>Open Login</a>
            <a className="secondary-button" href={`${SCORECASTER_URL}/cloud-sync`}>Open Cloud Sync</a>
            <a className="secondary-button" href={`${SCORECASTER_URL}/production-status`}>Check Production</a>
            <a className="secondary-button" href={`${REPO_URL}/blob/main/docs/AUTH_CLOUD_SETUP.md`}>Full Setup Guide</a>
            <a className="secondary-button" href="/apps/scorecaster">Back to Scorecaster</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Activation Checklist</p>
          <h2 className="section-title">Complete these steps in order.</h2>
          <div className="home-module-grid">
            {steps.map((step, index) => (
              <article key={step.title} className="home-module-card min-h-0">
                <p className="home-module-label">Step {index + 1}</p>
                <h3 className="home-module-title">{step.title}</h3>
                <p className="home-module-text">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Definition of Done</p>
          <h2 className="section-title">Cloud activation is complete when two users cannot see each other&apos;s data.</h2>
          <article className="home-highlight-card">
            <p className="home-card-title">Required result</p>
            <p className="home-card-text">
              Login works, email confirmation returns to Scorecaster, local bets sync without duplicates, signout clears the session and Row Level Security isolates every account.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
