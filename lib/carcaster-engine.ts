export type CarProfile = {
  id?: string
  make: string
  model: string
  year: number
  engine?: string
  fuelType?: string
  transmission?: string
  mileageKm?: number
}

export type FaultEntry = {
  code?: string
  symptom?: string
  severity?: 'low' | 'medium' | 'high'
  system?: string
  note?: string
}

export type MaintenanceEntry = {
  title: string
  date?: string
  mileageKm?: number
  cost?: number
  status?: 'done' | 'planned' | 'overdue'
}

export function createCarProfile(input: Partial<CarProfile> = {}): CarProfile {
  return {
    id: input.id || `car-${Date.now()}`,
    make: input.make || 'Volkswagen',
    model: input.model || 'Passat Variant',
    year: Number(input.year || 2012),
    engine: input.engine || '1.4 TSI bensiini/kaasu',
    fuelType: input.fuelType || 'CNG / petrol',
    transmission: input.transmission || 'automatic',
    mileageKm: Number(input.mileageKm || 0)
  }
}

export function explainFault(entry: FaultEntry = {}) {
  const code = (entry.code || '').toUpperCase()
  const symptom = entry.symptom || ''
  const notes: string[] = []
  let urgency: 'low' | 'medium' | 'high' = entry.severity || 'medium'

  if (code === 'P2177') {
    notes.push('P2177 usually means the engine is running too lean off idle on bank 1.')
    notes.push('First checks: intake leak, PCV valve, MAF sensor, fuel pressure, vacuum hoses and exhaust leak before oxygen sensor.')
    urgency = 'medium'
  }

  if (symptom.toLowerCase().includes('rough') || symptom.toLowerCase().includes('nykii')) {
    notes.push('Rough idle or low-RPM jerking increases the chance of air/fuel mixture, ignition or vacuum related issue.')
  }

  if (symptom.toLowerCase().includes('parking') || symptom.toLowerCase().includes('peruutus')) {
    notes.push('Parking sensor issues should be separated from engine faults. Check sensor surface, wiring, module and live sensor readings.')
  }

  if (!notes.length) {
    notes.push('Save the fault code, symptoms, date and mileage. Start with simple visual checks before replacing expensive parts.')
  }

  return {
    code: code || 'NO_CODE',
    urgency,
    system: entry.system || inferSystem(code, symptom),
    summary: notes.join(' '),
    repairShopMessage: buildRepairShopMessage(entry, notes)
  }
}

export function calculateOwnershipCosts(items: MaintenanceEntry[] = [], fuel = { km: 0, consumption: 4, price: 2.2 }) {
  const maintenanceTotal = items.reduce((sum, item) => sum + Number(item.cost || 0), 0)
  const fuelCost = Number(fuel.km || 0) * (Number(fuel.consumption || 0) / 100) * Number(fuel.price || 0)

  return {
    maintenanceTotal: round(maintenanceTotal),
    fuelCost: round(fuelCost),
    total: round(maintenanceTotal + fuelCost),
    fuelAssumption: `${fuel.consumption} kg/100km @ ${fuel.price} €/kg`
  }
}

export function getMaintenanceStatus(items: MaintenanceEntry[] = []) {
  const overdue = items.filter((item) => item.status === 'overdue')
  const planned = items.filter((item) => item.status === 'planned')
  const done = items.filter((item) => item.status === 'done')

  return {
    total: items.length,
    overdue: overdue.length,
    planned: planned.length,
    done: done.length,
    nextAction: overdue.length ? 'Handle overdue maintenance first.' : planned.length ? 'Review planned maintenance.' : 'No maintenance action saved yet.'
  }
}

function inferSystem(code: string, symptom: string) {
  if (code.startsWith('P')) return 'Powertrain'
  if (symptom.toLowerCase().includes('parking') || symptom.toLowerCase().includes('peruutus')) return 'Parking assist'
  if (symptom.toLowerCase().includes('camera')) return 'Camera / infotainment'
  return 'General'
}

function buildRepairShopMessage(entry: FaultEntry, notes: string[]) {
  return `Hei, autossa on oire: ${entry.symptom || 'ei oiretta kirjattu'}. Vikakoodi: ${entry.code || 'ei vikakoodia kirjattu'}. Havainto: ${notes.join(' ')} Voitteko tarkistaa ensin perussyyt ja antaa kustannusarvion ennen osien vaihtoa?`
}

function round(value: number) {
  return Math.round(Number(value || 0) * 100) / 100
}
