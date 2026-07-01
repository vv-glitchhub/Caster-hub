import MotionSurface from '../../../../components/MotionSurface'
import { calculateTripBudget } from '../../../../lib/travelcaster-engine'

const items = [
  { title: 'Hotel champagne reset', type: 'hotel' as const, cost: 80, durationMinutes: 90, priority: 'high' as const },
  { title: 'Tasting menu with wine pairing', type: 'food' as const, cost: 190, durationMinutes: 180, priority: 'high' as const },
  { title: 'Cat cafe', type: 'activity' as const, cost: 18, durationMinutes: 75, priority: 'high' as const },
  { title: 'Museum', type: 'activity' as const, cost: 20, durationMinutes: 150, priority: 'medium' as const },
  { title: 'Shopping', type: 'shopping' as const, cost: 120, durationMinutes: 120, priority: 'medium' as const },
  { title: 'Local routes', type: 'route' as const, cost: 45, durationMinutes: 60, priority: 'medium' as const }
]

const budget = calculateTripBudget(items, 850)

export default function TravelcasterBudgetPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Travelcaster Budget</p>
          <h1 className="home-title">Budget</h1>
          <h2 className="home-subtitle">€{budget.remaining} remaining.</h2>
          <p className="home-lead">Planned spend is €{budget.planned} from a €{budget.budget} trip budget. Status: {budget.status}.</p>
          <div className="home-actions">
            <a className="primary-button" href="/apps/travelcaster">Back to Travelcaster</a>
            <a className="secondary-button" href="/apps/travelcaster/itinerary">Itinerary</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Breakdown</p>
          <h2 className="section-title">Know where the money goes.</h2>
          <div className="home-highlight-grid">
            {Object.entries(budget.byType).map(([type, value]) => (
              <MotionSurface key={type} className="home-highlight-card">
                <p className="home-card-title">{type}</p>
                <p className="home-card-text">€{value}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Items</p>
          <h2 className="section-title">Planned costs.</h2>
          <div className="home-module-grid">
            {items.map((item) => (
              <MotionSurface key={item.title} className="home-module-card min-h-0">
                <p className="home-module-label">{item.type}</p>
                <h3 className="home-module-title">{item.title}</h3>
                <p className="home-module-text">€{item.cost}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
