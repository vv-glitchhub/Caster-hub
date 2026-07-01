import MotionSurface from '../../../../components/MotionSurface'
import { explainFault } from '../../../../lib/carcaster-engine'

const faults = [
  explainFault({
    code: 'P2177',
    symptom: 'Rough idle, hesitation and low-RPM jerking after warm driving.',
    system: 'Powertrain'
  }),
  explainFault({
    symptom: 'Left rear parking sensor beeps constantly and screen shows obstacle touching the car.',
    system: 'Parking assist'
  }),
  explainFault({
    symptom: 'Reverse camera does not show image when reverse gear is selected.',
    system: 'Camera / infotainment'
  })
]

export default function CarcasterFaultsPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Carcaster Fault Workspace</p>
          <h1 className="home-title">Faults</h1>
          <h2 className="home-subtitle">Separate problems. Clear next checks.</h2>
          <p className="home-lead">
            Carcaster tracks engine, sensor, camera and assist faults separately so the repair path does not become confused.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/apps/carcaster">Back to Carcaster</a>
            <a className="secondary-button" href="/apps/carcaster/maintenance">Maintenance</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Active Fault Cards</p>
          <h2 className="section-title">Each issue gets its own track.</h2>
          <div className="home-module-grid">
            {faults.map((fault, index) => (
              <MotionSurface key={`${fault.code}-${index}`} className="home-module-card">
                <p className="home-module-label">{fault.system} · {fault.urgency}</p>
                <h3 className="home-module-title">{fault.code}</h3>
                <p className="home-module-text">{fault.summary}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Repair Message Draft</p>
          <h2 className="section-title">Ready to send to a workshop.</h2>
          <MotionSurface className="home-module-card min-h-0">
            <p className="home-module-label">Draft</p>
            <h3 className="home-module-title">Ask for diagnosis before replacing parts.</h3>
            <p className="home-module-text">{faults[0].repairShopMessage}</p>
          </MotionSurface>
        </div>
      </section>
    </main>
  )
}
