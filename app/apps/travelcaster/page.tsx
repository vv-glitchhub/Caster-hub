import MotionSurface from '../../../components/MotionSurface'
import { buildDayPlan, calculateTripBudget, createPracticalTips, createTripProfile, generatePackingList } from '../../../lib/travelcaster-engine'

const trip = createTripProfile({ destination: 'Warsaw, Poland', hotel: 'Premium hotel base', budget: 850, mood: 'relaxed, premium, good food, easy routes' })
const items = [
  { title: 'Hotel reset', type: 'hotel' as const, cost: 80, durationMinutes: 90, priority: 'high' as const, note: 'Start slow.' },
  { title: 'Tasting menu', type: 'food' as const, cost: 190, durationMinutes: 180, priority: 'high' as const, note: 'Main evening plan.' },
  { title: 'Cat cafe', type: 'activity' as const, cost: 18, durationMinutes: 75, priority: 'high' as const, note: 'Relaxed stop.' },
  { title: 'Museum', type: 'activity' as const, cost: 20, durationMinutes: 150, priority: 'medium' as const, note: 'Focused visit.' },
  { title: 'Shopping', type: 'shopping' as const, cost: 120, durationMinutes: 120, priority: 'medium' as const, note: 'Premium browsing.' }
]
const budget = calculateTripBudget(items, trip.budget)
const dayPlan = buildDayPlan(items, { maxItems: 5, maxMinutes: 540 })
const packing = generatePackingList(trip, 'normal')
const tips = createPracticalTips(trip)

export default function TravelcasterAppPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Travelcaster MVP</p>
          <h1 className="home-title">Travelcaster</h1>
          <h2 className="home-subtitle">Trips, budget and day plans.</h2>
          <p className="home-lead">AI travel assistant for destinations, routes, plans, packing, budget and reminders.</p>
          <div className="home-actions">
            <a className="primary-button" href="/apps/travelcaster/itinerary">Open Itinerary</a>
            <a className="secondary-button" href="/apps/travelcaster/budget">Open Budget</a>
            <a className="secondary-button" href="/modules">Back to Modules</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Workspaces</p>
          <h2 className="section-title">Travelcaster is now split into focused views.</h2>
          <div className="home-module-grid">
            <MotionSurface href="/apps/travelcaster/itinerary" className="home-module-card">
              <p className="home-module-label">Planning</p>
              <h3 className="home-module-title">Itinerary</h3>
              <p className="home-module-text">Build a realistic day plan without overload.</p>
              <p className="home-module-link">Open Itinerary →</p>
            </MotionSurface>
            <MotionSurface href="/apps/travelcaster/budget" className="home-module-card">
              <p className="home-module-label">Money</p>
              <h3 className="home-module-title">Budget</h3>
              <p className="home-module-text">Track planned spend by category.</p>
              <p className="home-module-link">Open Budget →</p>
            </MotionSurface>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Trip Profile</p>
          <h2 className="section-title">{trip.destination}</h2>
          <div className="home-highlight-grid">
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Hotel</p><p className="home-card-text">{trip.hotel}</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Mood</p><p className="home-card-text">{trip.mood}</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Budget</p><p className="home-card-text">€{budget.budget} · {budget.status}</p></MotionSurface>
            <MotionSurface className="home-highlight-card"><p className="home-card-title">Remaining</p><p className="home-card-text">€{budget.remaining}</p></MotionSurface>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">AI Day Planner</p>
          <h2 className="section-title">{dayPlan.summary}</h2>
          <div className="home-module-grid">
            {dayPlan.items.map((item, index) => (
              <MotionSurface key={item.title} className="home-module-card">
                <p className="home-module-label">Stop {index + 1}</p>
                <h3 className="home-module-title">{item.title}</h3>
                <p className="home-module-text">{item.note} Cost €{item.cost}. Duration {item.durationMinutes} min.</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Practical Memory</p>
          <h2 className="section-title">Packing and reminders.</h2>
          <div className="home-module-grid">
            <MotionSurface className="home-module-card"><p className="home-module-label">Packing</p><h3 className="home-module-title">Smart list.</h3><p className="home-module-text">{packing.join(', ')}</p></MotionSurface>
            <MotionSurface className="home-module-card"><p className="home-module-label">Tips</p><h3 className="home-module-title">Basics.</h3><p className="home-module-text">{tips.join(' ')}</p></MotionSurface>
          </div>
        </div>
      </section>
    </main>
  )
}
