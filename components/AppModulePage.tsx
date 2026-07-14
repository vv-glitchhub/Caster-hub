import MotionSurface from './MotionSurface'
import type { CasterApp } from '../lib/caster-apps'

function externalProps(href?: string) {
  return href?.startsWith('http')
    ? { target: '_blank', rel: 'noreferrer' }
    : {}
}

export default function AppModulePage({ app }: { app: CasterApp }) {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">{app.label}</p>
          <h1 className="home-title">{app.name}</h1>
          <h2 className="home-subtitle">{app.domain}</h2>
          <p className="home-lead">{app.summary}</p>
          <p className="home-card-text">Status: {app.status}</p>
          <div className="home-actions">
            {app.liveUrl ? (
              <a className="primary-button" href={app.liveUrl} {...externalProps(app.liveUrl)}>Open Live App</a>
            ) : (
              <a className="primary-button" href="/dashboard">Open Dashboard</a>
            )}
            {app.statusPath ? <a className="secondary-button" href={app.statusPath}>Service Status</a> : null}
            {app.accountUrl ? <a className="secondary-button" href={app.accountUrl} {...externalProps(app.accountUrl)}>Account</a> : null}
            {app.syncUrl ? <a className="secondary-button" href={app.syncUrl} {...externalProps(app.syncUrl)}>Cloud Sync</a> : null}
            {app.healthUrl ? <a className="secondary-button" href={app.healthUrl} {...externalProps(app.healthUrl)}>Health API</a> : null}
            <a className="secondary-button" href="/modules">Back to Modules</a>
            {app.repo ? <a className="secondary-button" href={app.repo} {...externalProps(app.repo)}>GitHub Repo</a> : null}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Product Promise</p>
          <h2 className="section-title">{app.promise}</h2>
          <div className="home-highlight-grid">
            {app.metrics.map((metric) => (
              <MotionSurface key={metric} className="home-highlight-card">
                <p className="home-card-title">{metric}</p>
                <p className="home-card-text">Tracked by the Caster intelligence layer.</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">MVP Surface</p>
          <h2 className="section-title">The first version is built around useful daily actions.</h2>
          <div className="home-module-grid">
            {app.features.map((feature) => (
              <MotionSurface key={feature} className="home-module-card">
                <p className="home-module-label">Feature</p>
                <h3 className="home-module-title">{feature}</h3>
                <p className="home-module-text">Core module capability for the first usable product version.</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">AI Agent</p>
          <h2 className="section-title">Every app gets a focused agent with clear responsibilities.</h2>
          <div className="home-module-grid">
            {app.agent.map((item) => (
              <MotionSurface key={item} className="home-module-card min-h-0">
                <p className="home-module-label">Agent Skill</p>
                <h3 className="home-module-title">{item}</h3>
                <p className="home-module-text">This becomes part of the shared Caster AI action layer.</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Next Build Sprint</p>
          <h2 className="section-title">Immediate coding tasks.</h2>
          <div className="home-module-grid">
            {app.next.map((item, index) => (
              <MotionSurface key={item} className="home-module-card min-h-0">
                <p className="home-module-label">Step {index + 1}</p>
                <h3 className="home-module-title">{item}</h3>
                <p className="home-module-text">Ready to be turned into code, database schema or API work.</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
