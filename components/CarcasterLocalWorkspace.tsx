'use client'

import { useEffect, useMemo, useState } from 'react'

type CarProfile = {
  nickname: string
  make: string
  model: string
  year: number
  engine: string
  fuelType: string
  transmission: string
  registration: string
  mileageKm: number
}

type Fault = {
  id: string
  code: string
  symptom: string
  system: string
}

type Service = {
  id: string
  title: string
  cost: number
  status: 'planned' | 'done'
}

const profileKey = 'caster.carcaster.profile'
const faultKey = 'caster.carcaster.faults'
const serviceKey = 'caster.carcaster.services'

const emptyProfile: CarProfile = {
  nickname: 'My car',
  make: '',
  model: '',
  year: 0,
  engine: '',
  fuelType: '',
  transmission: '',
  registration: '',
  mileageKm: 0,
}

const currency = new Intl.NumberFormat('fi-FI', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 2,
})

export default function CarcasterLocalWorkspace() {
  const [hydrated, setHydrated] = useState(false)
  const [profile, setProfile] = useState<CarProfile>(emptyProfile)
  const [faults, setFaults] = useState<Fault[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [faultCode, setFaultCode] = useState('P2177')
  const [symptom, setSymptom] = useState('')
  const [serviceTitle, setServiceTitle] = useState('')
  const [serviceCost, setServiceCost] = useState('')

  useEffect(() => {
    setProfile(readObject(profileKey, emptyProfile))
    setFaults(readList<Fault>(faultKey))
    setServices(readList<Service>(serviceKey))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(profileKey, JSON.stringify(profile))
  }, [hydrated, profile])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(faultKey, JSON.stringify(faults))
  }, [faults, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(serviceKey, JSON.stringify(services))
  }, [hydrated, services])

  const totalCost = useMemo(
    () => services.reduce((sum, item) => sum + Number(item.cost || 0), 0),
    [services],
  )

  const completedServices = useMemo(
    () => services.filter((item) => item.status === 'done').length,
    [services],
  )

  const vehicleName = [profile.year || null, profile.make, profile.model]
    .filter(Boolean)
    .join(' ')

  function updateProfile<K extends keyof CarProfile>(key: K, value: CarProfile[K]) {
    setProfile((current) => ({ ...current, [key]: value }))
  }

  function addFault() {
    if (!symptom.trim()) return

    const code = faultCode.trim().toUpperCase() || 'NO_CODE'
    setFaults((current) => [
      {
        id: `fault-${Date.now()}`,
        code,
        symptom: symptom.trim(),
        system: inferSystem(code),
      },
      ...current,
    ])
    setSymptom('')
  }

  function addService() {
    if (!serviceTitle.trim()) return

    const parsedCost = Number(serviceCost.replace(',', '.'))
    setServices((current) => [
      {
        id: `service-${Date.now()}`,
        title: serviceTitle.trim(),
        cost: Number.isFinite(parsedCost) && parsedCost > 0 ? parsedCost : 0,
        status: 'planned',
      },
      ...current,
    ])
    setServiceTitle('')
    setServiceCost('')
  }

  function toggleService(id: string) {
    setServices((current) =>
      current.map((service) =>
        service.id === id
          ? { ...service, status: service.status === 'done' ? 'planned' : 'done' }
          : service,
      ),
    )
  }

  function resetAll() {
    const confirmed = window.confirm('Poistetaanko Carcasterin paikallisesti tallennetut tiedot?')
    if (!confirmed) return

    setProfile(emptyProfile)
    setFaults([])
    setServices([])
  }

  return (
    <section className="home-section">
      <div className="home-container">
        <p className="section-label">Your Local Carcaster</p>
        <h2 className="section-title">Tallenna auton profiili, viat ja huollot selaimeen.</h2>
        <p className="home-section-lead">
          Tiedot tallennetaan vain tämän laitteen localStorageen. Pilvitallennus ja käyttäjäkohtainen Supabase-synkronointi ovat seuraava tuotantovaihe.
        </p>

        <div className="home-module-card min-h-0">
          <p className="home-module-label">Car profile</p>
          <h3 className="home-module-title">{vehicleName || profile.nickname || 'My car'}</h3>
          <p className="home-module-text">Muutokset tallentuvat automaattisesti tälle laitteelle.</p>
          <div className="form-stack">
            <input
              className="caster-input"
              value={profile.nickname}
              onChange={(event) => updateProfile('nickname', event.target.value)}
              placeholder="Auton kutsumanimi"
              aria-label="Auton kutsumanimi"
            />
            <div className="home-highlight-grid form-summary-grid">
              <input
                className="caster-input"
                value={profile.make}
                onChange={(event) => updateProfile('make', event.target.value)}
                placeholder="Merkki"
                aria-label="Auton merkki"
              />
              <input
                className="caster-input"
                value={profile.model}
                onChange={(event) => updateProfile('model', event.target.value)}
                placeholder="Malli"
                aria-label="Auton malli"
              />
              <input
                className="caster-input"
                type="number"
                min="1886"
                max="2100"
                value={profile.year || ''}
                onChange={(event) => updateProfile('year', positiveNumber(event.target.value))}
                placeholder="Vuosimalli"
                aria-label="Auton vuosimalli"
              />
              <input
                className="caster-input"
                type="number"
                min="0"
                value={profile.mileageKm || ''}
                onChange={(event) => updateProfile('mileageKm', positiveNumber(event.target.value))}
                placeholder="Mittarilukema km"
                aria-label="Auton mittarilukema kilometreinä"
              />
              <input
                className="caster-input"
                value={profile.engine}
                onChange={(event) => updateProfile('engine', event.target.value)}
                placeholder="Moottori"
                aria-label="Auton moottori"
              />
              <input
                className="caster-input"
                value={profile.fuelType}
                onChange={(event) => updateProfile('fuelType', event.target.value)}
                placeholder="Polttoaine"
                aria-label="Auton polttoaine"
              />
              <input
                className="caster-input"
                value={profile.transmission}
                onChange={(event) => updateProfile('transmission', event.target.value)}
                placeholder="Vaihteisto"
                aria-label="Auton vaihteisto"
              />
              <input
                className="caster-input"
                value={profile.registration}
                onChange={(event) => updateProfile('registration', event.target.value.toUpperCase())}
                placeholder="Rekisteritunnus"
                aria-label="Auton rekisteritunnus"
              />
            </div>
          </div>
        </div>

        <div className="home-module-grid">
          <div className="home-module-card">
            <p className="home-module-label">Add fault</p>
            <h3 className="home-module-title">Vikakoodi / oire</h3>
            <div className="form-stack">
              <input
                className="caster-input"
                value={faultCode}
                onChange={(event) => setFaultCode(event.target.value)}
                placeholder="P2177"
                aria-label="Vikakoodi"
              />
              <textarea
                className="caster-input"
                value={symptom}
                onChange={(event) => setSymptom(event.target.value)}
                placeholder="Kirjoita oire tähän"
                aria-label="Vian oire"
                rows={4}
              />
              <button className="primary-button" type="button" onClick={addFault}>Add fault</button>
            </div>
          </div>

          <div className="home-module-card">
            <p className="home-module-label">Add service</p>
            <h3 className="home-module-title">Huolto / kustannus</h3>
            <div className="form-stack">
              <input
                className="caster-input"
                value={serviceTitle}
                onChange={(event) => setServiceTitle(event.target.value)}
                placeholder="Esim. diagnostiikka"
                aria-label="Huollon nimi"
              />
              <input
                className="caster-input"
                value={serviceCost}
                onChange={(event) => setServiceCost(event.target.value)}
                placeholder="Hinta €"
                aria-label="Huollon arvioitu hinta"
                inputMode="decimal"
              />
              <button className="primary-button" type="button" onClick={addService}>Add service</button>
            </div>
          </div>
        </div>

        <div className="home-highlight-grid form-summary-grid">
          <div className="home-highlight-card"><p className="home-card-title">Faults saved</p><p className="home-card-text">{faults.length}</p></div>
          <div className="home-highlight-card"><p className="home-card-title">Services saved</p><p className="home-card-text">{services.length} · {completedServices} done</p></div>
          <div className="home-highlight-card"><p className="home-card-title">Estimated cost</p><p className="home-card-text">{currency.format(totalCost)}</p></div>
          <button className="secondary-button danger-button" type="button" onClick={resetAll}>Clear local data</button>
        </div>

        <div className="home-module-grid">
          {faults.map((fault) => (
            <div key={fault.id} className="home-module-card min-h-0">
              <p className="home-module-label">{fault.system}</p>
              <h3 className="home-module-title">{fault.code}</h3>
              <p className="home-module-text">{fault.symptom}</p>
              <button className="secondary-button danger-button" type="button" onClick={() => setFaults((current) => current.filter((item) => item.id !== fault.id))}>Remove fault</button>
            </div>
          ))}
          {services.map((service) => (
            <div key={service.id} className="home-module-card min-h-0">
              <p className="home-module-label">{service.status}</p>
              <h3 className="home-module-title">{service.title}</h3>
              <p className="home-module-text">{currency.format(service.cost)}</p>
              <div className="home-actions">
                <button className="secondary-button" type="button" onClick={() => toggleService(service.id)}>
                  Mark {service.status === 'done' ? 'planned' : 'done'}
                </button>
                <button className="secondary-button danger-button" type="button" onClick={() => setServices((current) => current.filter((item) => item.id !== service.id))}>Remove service</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function inferSystem(code: string) {
  const prefix = code.charAt(0)
  if (prefix === 'P') return 'Powertrain'
  if (prefix === 'B') return 'Body'
  if (prefix === 'C') return 'Chassis'
  if (prefix === 'U') return 'Network'
  return 'General'
}

function positiveNumber(value: string) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

function readObject<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? { ...fallback, ...JSON.parse(value) } : fallback
  } catch {
    return fallback
  }
}

function readList<T>(key: string): T[] {
  try {
    const value = localStorage.getItem(key)
    const parsed = value ? JSON.parse(value) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
