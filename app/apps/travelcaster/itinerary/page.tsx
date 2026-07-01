import MotionSurface from '../../../../components/MotionSurface'
import { buildDayPlan } from '../../../../lib/travelcaster-engine'

const items = [
  { title: 'Hotel reset', type: 'hotel' as const, cost: 80, durationMinutes: 90, priority: 'high' as const, note: 'Start with a calm base.' },
  { title: 'Cat cafe', type: 'activity' as const, cost: 18, durationMinutes: 75, priority: 'high' as const, note: 'Relaxed stop.' },
  { title: 'Museum block', type: 'activity' as const, cost: 20, durationMinutes: 150, priority: 'medium' as const, note: 'Keep it focused.' },
  { title: 'Premium dinner', type: 'food' as const, cost: 190, durationMinutes: 180, priority: 'high' as const, note: 'Main evening event.' },
  { title: 'Cocktail slot', type: 'food' as const, cost: 45, durationMinutes: 90, priority: 'medium' as const, note: 'Only if energy is good.' }
]

const plan = buildDayPlan(items, { maxItems: 5, maxMinutes: 540 })

export default function TravelcasterItineraryPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Travelcaster Itinerary</p>
          <h1 className="home-title">Itinerary</h1>
          <h2 className="home-subtitle">Day plan without overload.</h2>
          <p className="home-lead">{plan.summary}</p>
          <div className="home-actions">
            <a className="primary-button" href="/apps/travelcaster">Back to Travelcaster</a>
            <a className="secondary-button" href="/apps/travelcaster/budget">Budget</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Selected Stops</p>
          <h2 className="section-title">Premium but realistic.</h2>
          <div className="home-module-grid">
            {plan.items.map((item, index) => (
              <MotionSurface key={item.title} className="home-module-card">
                <p className="home-module-label">Stop {index + 1} · {item.type}</p>
                <h3 className="home-module-title">{item.title}</h3>
                <p className="home-module-text">{item.note} Cost €{item.cost}. Duration {item.durationMinutes} min.</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
