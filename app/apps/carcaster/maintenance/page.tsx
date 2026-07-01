import MotionSurface from '../../../../components/MotionSurface'
import { calculateOwnershipCosts, getMaintenanceStatus } from '../../../../lib/carcaster-engine'

const maintenance = [
  { title: 'Lean condition diagnosis', status: 'planned' as const, cost: 175 },
  { title: 'Intake and PCV check', status: 'planned' as const, cost: 95 },
  { title: 'Parking sensor check', status: 'planned' as const, cost: 120 },
  { title: 'Oil and filter service', status: 'done' as const, cost: 180 },
  { title: 'Inspection readiness', status: 'planned' as const, cost: 80 }
]

const status = getMaintenanceStatus(maintenance)
const costs = calculateOwnershipCosts(maintenance, { km: 500, consumption: 4, price: 2.2 })

export default function CarcasterMaintenancePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Carcaster Maintenance</p>
          <h1 className="home-title">Service</h1>
          <h2 className="home-subtitle">Timeline and costs.</h2>
          <p className="home-lead">A maintenance workspace for planned checks, completed work, fuel assumptions and ownership visibility.</p>
          <div className="home-actions">
            <a className="primary-button" href="/apps/carcaster">Back to Carcaster</a>
            <a className="secondary-button" href="/apps/carcaster/faults">Faults</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Status</p>
          <h2 className="section-title">{status.nextAction}</h2>
          <div className="home-highlight-grid">
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Total</p><p className="home-card-text">{status.total} items</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Planned</p><p className="home-card-text">{status.planned}</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Done</p><p className="home-card-text">{status.done}</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Estimated total</p><p className="home-card-text">€{costs.total}</p></MotionSurface>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Timeline</p>
          <h2 className="section-title">Work items.</h2>
          <div className="home-module-grid">
            {maintenance.map((item) => (
              <MotionSurface key={item.title} className="home-module-card min-h-0">
                <p className="home-module-label">{item.status}</p>
                <h3 className="home-module-title">{item.title}</h3>
                <p className="home-module-text">Estimated / logged cost: €{item.cost}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
