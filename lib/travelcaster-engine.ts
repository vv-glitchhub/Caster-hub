export type TripProfile = {
  id?: string
  destination: string
  startDate?: string
  endDate?: string
  hotel?: string
  budget?: number
  mood?: string
}

export type TripItem = {
  title: string
  type: 'food' | 'activity' | 'route' | 'hotel' | 'shopping' | 'practical'
  cost?: number
  durationMinutes?: number
  priority?: 'low' | 'medium' | 'high'
  note?: string
}

export function createTripProfile(input: Partial<TripProfile> = {}): TripProfile {
  return {
    id: input.id || `trip-${Date.now()}`,
    destination: input.destination || 'Warsaw',
    startDate: input.startDate,
    endDate: input.endDate,
    hotel: input.hotel,
    budget: Number(input.budget || 0),
    mood: input.mood || 'relaxed, premium, good food, easy routes'
  }
}

export function calculateTripBudget(items: TripItem[] = [], budget = 0) {
  const planned = items.reduce((sum, item) => sum + Number(item.cost || 0), 0)
  const remaining = Number(budget || 0) - planned
  const byType = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + Number(item.cost || 0)
    return acc
  }, {})

  return {
    budget: round(Number(budget || 0)),
    planned: round(planned),
    remaining: round(remaining),
    status: remaining < 0 ? 'OVER_BUDGET' : remaining < Number(budget || 0) * 0.15 ? 'TIGHT' : 'OK',
    byType
  }
}

export function buildDayPlan(items: TripItem[] = [], preferences = { maxItems: 5, maxMinutes: 480 }) {
  const sorted = [...items].sort((a, b) => priorityScore(b.priority) - priorityScore(a.priority))
  const selected: TripItem[] = []
  let minutes = 0

  for (const item of sorted) {
    const duration = Number(item.durationMinutes || 60)
    if (selected.length >= preferences.maxItems) continue
    if (minutes + duration > preferences.maxMinutes) continue
    selected.push(item)
    minutes += duration
  }

  return {
    items: selected,
    totalMinutes: minutes,
    summary: selected.length ? `Plan has ${selected.length} items and about ${Math.round(minutes / 60)} hours of activity.` : 'No items selected yet.'
  }
}

export function generatePackingList(profile: TripProfile, weather = 'normal') {
  const base = ['passport or ID', 'phone charger', 'payment cards', 'comfortable shoes', 'medication if needed']
  const premium = profile.mood?.includes('premium') ? ['smart casual outfit', 'watch or nicer accessory', 'evening shirt'] : []
  const weatherItems = weather.includes('rain') ? ['umbrella', 'light rain jacket'] : ['sunglasses']

  return [...base, ...premium, ...weatherItems]
}

export function createPracticalTips(profile: TripProfile) {
  const destination = profile.destination.toLowerCase()
  const tips = ['Save hotel address offline.', 'Keep payment card and backup card separate.', 'Check airport/train route before travel day.']

  if (destination.includes('warsaw') || destination.includes('poland')) {
    tips.push('Currency is PLN, although cards are widely accepted.')
    tips.push('Use Bolt or public transport for easy city movement.')
    tips.push('Book premium restaurants early if you want tasting menus.')
  }

  return tips
}

function priorityScore(priority: TripItem['priority']) {
  if (priority === 'high') return 3
  if (priority === 'medium') return 2
  return 1
}

function round(value: number) {
  return Math.round(Number(value || 0) * 100) / 100
}
