import MotionSurface from '../../../components/MotionSurface'
import { calculateOwnershipCosts, createCarProfile, explainFault, getMaintenanceStatus } from '../../../lib/carcaster-engine'

const car = createCarProfile({ mileageKm: 236000 })
const fault = explainFault({
  code: 'P2177',
  symptom: 'Rough idle, hesitation and low-RPM jerking. Parking sensor also beeps constantly in reverse.',
  system: 'Powertrain'
})
const maintenance = [
  { title: 'Engine diagnostic and lean condition check', status: 'planned' as const, cost: 175 },
  { title: 'Parking sensor live data and wiring check', status: 'planned' as const, cost: 120 },
  { title: 'Oil and filter service', status: 'done' as const, cost: 180 },
  { title: 'Inspection readiness review', status: 'planned' as const, cost: 80 }
]
const maintenanceStatus = getMaintenanceStatus(maintenance)
const costs = calculateOwnershipCosts(maintenance, { km: 152, consumption: 4, price: 2.2 })

export default function CarcasterAppPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Carcaster MVP</p>
          <h1 className="home-title">Carcaster</h1>
          <h2 className="home-subtitle">Diagnostics, costs and maintenance.</h2>
          <p className="home-lead">
            AI car ownership assistant for fault codes, symptoms, repair-shop communication, service planning and fuel cost decisions.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/apps/carcaster/faults">Open Faults</a>
            <a className="secondary-button" href="/apps/carcaster/maintenance">Open Maintenance</a>
            <a className="secondary-button" href="/modules">Back to Modules</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Workspaces</p>
          <h2 className="section-title">Carcaster is now split into focused views.</h2>
          <div className="home-module-grid">
            <MotionSurface href="/apps/carcaster/faults" className="home-module-card">
              <p className="home-module-label">Fault Workspace</p>
              <h3 className="home-module-title">Faults</h3>
              <p className="home-module-text">Track engine, parking sensor and camera issues separately with repair-shop message drafts.</p>
              <p className="home-module-link">Open Faults →</p>
            </MotionSurface>
            <MotionSurface href="/apps/carcaster/maintenance" className="home-module-card">
              <p className="home-module-label">Service Workspace</p>
              <h3 className="home-module-title">Maintenance</h3>
              <p className="home-module-text">Track service items, estimated costs, planned checks and fuel assumptions.</p>
              <p className="home-module-link">Open Maintenance →</p>
            </MotionSurface>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Primary Car Profile</p>
          <h2 className="section-title">{car.year} {car.make} {car.model}</h2>
          <div className="home-highlight-grid">
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Engine</p><p className="home-card-text">{car.engine}</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Fuel</p><p className="home-card-text">{car.fuelType}</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Transmission</p><p className="home-card-text">{car.transmission}</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Mileage</p><p className="home-card-text">{car.mileageKm?.toLocaleString('fi-FI')} km</p></MotionSurface>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Fault Intelligence</p>
          <h2 className="section-title">{fault.code}: {fault.system} · {fault.urgency.toUpperCase()} urgency</h2>
          <div className="home-module-grid">
            <MotionSurface className="home-module-card">
              <p className="home-module-label">Explanation</p>
              <h3 className="home-module-title">Likely checks first.</h3>
              <p className="home-module-text">{fault.summary}</p>
            </MotionSurface>
            <MotionSurface className="home-module-card">
              <p className="home-module-label">Repair Shop Message</p>
              <h3 className="home-module-title">Ready to send.</h3>
              <p className="home-module-text">{fault.repairShopMessage}</p>
            </MotionSurface>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Maintenance and Costs</p>
          <h2 className="section-title">Planned work, fuel estimate and ownership visibility.</h2>
          <div className="home-highlight-grid">
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Maintenance items</p><p className="home-card-text">{maintenanceStatus.total} total · {maintenanceStatus.planned} planned · {maintenanceStatus.done} done</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Next action</p><p className="home-card-text">{maintenanceStatus.nextAction}</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Estimated costs</p><p className="home-card-text">€{costs.total} total in this scenario</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Fuel assumption</p><p className="home-card-text">{costs.fuelAssumption}</p></MotionSurface>
          </div>
        </div>
      </section>
    </main>
  )
}
