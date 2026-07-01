import MotionSurface from '../../../components/MotionSurface'
import { buildDayPlan, calculateTripBudget, createPracticalTips, createTripProfile, generatePackingList } from '../../../lib/travelcaster-engine'

const trip = createTripProfile({
  destination: 'Warsaw, Poland',
  hotel: 'Casino hotel / premium base',
  budget: 850,
  mood: 'relaxed, premium, good food, easy routes, cat cafe, museum, shopping'
})

const items = [
  { title: 'Hotel check-in and champagne reset', type: 'hotel' as const, cost: 80, durationMinutes: 90, priority: 'high' as const, note: 'Start slow and make the hotel the base.' },
  { title: 'Tasting menu with wine pairing', type: 'food' as const, cost: 190, durationMinutes: 180, priority: 'high' as const, note: 'All-out dinner night.' },
  { title: 'Cat cafe oxytocin stop', type: 'activity' as const, cost: 18, durationMinutes: 75, priority: 'high' as const, note: 'Relaxed emotional reset.' },
  { title: 'Warsaw history museum block', type: 'activity' as const, cost: 20, durationMinutes: 150, priority: 'medium' as const, note: 'Keep it focused, not too heavy.' },
  { title: 'Shopping / local Stockmann-style department store', type: 'shopping' as const, cost: 120, durationMinutes: 120, priority: 'medium' as const, note: 'Premium browsing and practical purchases.' },
  { title: 'Easy Bolt route buffer', type: 'route' as const, cost: 45, durationMinutes: 60, priority: 'medium' as const, note: 'Keep moving simple.' },
  { title: 'Cigar lounge / cocktail slot', type: 'food' as const, cost: 95, durationMinutes: 120, priority: 'medium' as const, note: 'Only when energy is good.' }
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
          <p className="home-lead">
            AI travel assistant for destinations, hotel notes, routes, premium plans, packing, budget and practical reminders.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/modules">Back to Modules</a>
            <a className="secondary-button" href="/dashboard">Open Dashboard</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Trip Profile</p>
          <h2 className="section-title">{trip.destination}</h2>
          <div className="home-highlight-grid">
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">Hotel</p>
              <p className="home-card-text">{trip.hotel}</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">Mood</p>
              <p className="home-card-text">{trip.mood}</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">Budget</p>
              <p className="home-card-text">€{budget.budget} · {budget.status}</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">Remaining</p>
              <p className="home-card-text">€{budget.remaining}</p>
            </MotionSurface>
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
                <p className="home-module-label">Stop {index + 1} · {item.type}</p>
                <h3 className="home-module-title">{item.title}</h3>
                <p className="home-module-text">{item.note} Estimated cost €{item.cost}. Duration {item.durationMinutes} min.</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Budget Breakdown</p>
          <h2 className="section-title">Planned €{budget.planned} from €{budget.budget}.</h2>
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
          <p className="section-label">Practical Memory</p>
          <h2 className="section-title">Packing and local reminders stay visible.</h2>
          <div className="home-module-grid">
            <MotionSurface className="home-module-card">
              <p className="home-module-label">Packing</p>
              <h3 className="home-module-title">Smart list.</h3>
              <p className="home-module-text">{packing.join(', ')}</p>
            </MotionSurface>
            <MotionSurface className="home-module-card">
              <p className="home-module-label">Local Tips</p>
              <h3 className="home-module-title">Warsaw basics.</h3>
              <p className="home-module-text">{tips.join(' ')}</p>
            </MotionSurface>
            <MotionSurface className="home-module-card">
              <p className="home-module-label">Next Build</p>
              <h3 className="home-module-title">Trips database.</h3>
              <p className="home-module-text">Next step is trip profiles, saved places, itinerary forms, budget items and route links.</p>
            </MotionSurface>
          </div>
        </div>
      </section>
    </main>
  )
}
