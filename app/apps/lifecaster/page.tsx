import MotionSurface from '../../../components/MotionSurface'

const today = [
  ['01', 'Ship one visible improvement', 'Move the product forward in a way that users can see.'],
  ['02', 'Protect energy', 'Avoid adding complexity before the current launch polish is stable.'],
  ['03', 'Collect feedback', 'Ask 3 people what they understood in the first 20 seconds.'],
]

const goals = [
  ['Caster OS', 'Public Alpha', 'Live and improving'],
  ['Product', 'Daily app value', 'Dashboard + agent'],
  ['Business', 'VIP feedback', 'First 50 users'],
  ['Personal', 'Focus', 'One priority at a time'],
]

const modules = [
  ['Goals', 'Define what matters and what should be ignored.'],
  ['Projects', 'Convert big ideas into weekly execution.'],
  ['Habits', 'Build routines without turning life into a spreadsheet.'],
  ['Decisions', 'Preview choices before committing time, money or energy.'],
]

export default function LifecasterAppPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Lifecaster App</p>
          <h1 className="home-title">Life.</h1>
          <h2 className="home-subtitle">With direction.</h2>
          <p className="home-lead">
            The first real Caster app: a daily operating surface for goals, projects, habits and decisions.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/dashboard">Open Dashboard</a>
            <a className="secondary-button" href="/agent">Ask Agent</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Today</p>
          <h2 className="section-title">The app starts with the next visible move.</h2>
          <div className="home-module-grid">
            {today.map(([number, title, text]) => (
              <MotionSurface key={number} className="home-module-card min-h-0">
                <p className="home-module-label">Priority {number}</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Life System</p>
          <h2 className="section-title">Goals become projects. Projects become daily action.</h2>
          <div className="home-module-grid">
            {goals.map(([name, phase, status]) => (
              <MotionSurface key={name} className="home-module-card min-h-0">
                <p className="home-module-label">{phase}</p>
                <h3 className="home-module-title">{name}</h3>
                <p className="home-module-text">{status}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">App Modules</p>
          <h2 className="section-title">Lifecaster will become the daily life app inside Caster OS.</h2>
          <div className="home-module-grid">
            {modules.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Lifecaster</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
