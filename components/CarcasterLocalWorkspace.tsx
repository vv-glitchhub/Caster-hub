'use client'

import { useEffect, useMemo, useState } from 'react'

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
  status: string
}

const faultKey = 'caster.carcaster.faults'
const serviceKey = 'caster.carcaster.services'

export default function CarcasterLocalWorkspace() {
  const [faults, setFaults] = useState<Fault[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [faultCode, setFaultCode] = useState('P2177')
  const [symptom, setSymptom] = useState('')
  const [serviceTitle, setServiceTitle] = useState('')
  const [serviceCost, setServiceCost] = useState('')

  useEffect(() => {
    setFaults(readList<Fault>(faultKey))
    setServices(readList<Service>(serviceKey))
  }, [])

  useEffect(() => {
    if (faults.length) localStorage.setItem(faultKey, JSON.stringify(faults))
  }, [faults])

  useEffect(() => {
    if (services.length) localStorage.setItem(serviceKey, JSON.stringify(services))
  }, [services])

  const totalCost = useMemo(() => services.reduce((sum, item) => sum + Number(item.cost || 0), 0), [services])

  function addFault() {
    if (!symptom.trim()) return
    setFaults((current) => [
      {
        id: `fault-${Date.now()}`,
        code: faultCode.trim() || 'NO_CODE',
        symptom: symptom.trim(),
        system: faultCode.trim().toUpperCase().startsWith('P') ? 'Powertrain' : 'General'
      },
      ...current
    ])
    setSymptom('')
  }

  function addService() {
    if (!serviceTitle.trim()) return
    setServices((current) => [
      {
        id: `service-${Date.now()}`,
        title: serviceTitle.trim(),
        cost: Number(serviceCost || 0),
        status: 'planned'
      },
      ...current
    ])
    setServiceTitle('')
    setServiceCost('')
  }

  function clearAll() {
    localStorage.removeItem(faultKey)
    localStorage.removeItem(serviceKey)
    setFaults([])
    setServices([])
  }

  return (
    <section className="home-section">
      <div className="home-container">
        <p className="section-label">Your Local Carcaster</p>
        <h2 className="section-title">Tallenna omat viat ja huollot heti selaimeen.</h2>
        <p className="home-section-lead">Tämä käyttää selaimen localStoragea. Seuraava vaihe on Supabase-kirjautuminen ja pysyvä pilvitallennus.</p>

        <div className="home-module-grid">
          <div className="home-module-card">
            <p className="home-module-label">Add fault</p>
            <h3 className="home-module-title">Vikakoodi / oire</h3>
            <div className="form-stack">
              <input className="caster-input" value={faultCode} onChange={(event) => setFaultCode(event.target.value)} placeholder="P2177" />
              <textarea className="caster-input" value={symptom} onChange={(event) => setSymptom(event.target.value)} placeholder="Kirjoita oire tähän" rows={4} />
              <button className="primary-button" type="button" onClick={addFault}>Add fault</button>
            </div>
          </div>

          <div className="home-module-card">
            <p className="home-module-label">Add service</p>
            <h3 className="home-module-title">Huolto / kustannus</h3>
            <div className="form-stack">
              <input className="caster-input" value={serviceTitle} onChange={(event) => setServiceTitle(event.target.value)} placeholder="Esim. diagnostiikka" />
              <input className="caster-input" value={serviceCost} onChange={(event) => setServiceCost(event.target.value)} placeholder="Hinta €" inputMode="decimal" />
              <button className="primary-button" type="button" onClick={addService}>Add service</button>
            </div>
          </div>
        </div>

        <div className="home-highlight-grid form-summary-grid">
          <div className="home-highlight-card"><p className="home-card-title">Faults saved</p><p className="home-card-text">{faults.length}</p></div>
          <div className="home-highlight-card"><p className="home-card-title">Services saved</p><p className="home-card-text">{services.length}</p></div>
          <div className="home-highlight-card"><p className="home-card-title">Estimated cost</p><p className="home-card-text">€{totalCost}</p></div>
          <button className="secondary-button danger-button" type="button" onClick={clearAll}>Clear local data</button>
        </div>

        <div className="home-module-grid">
          {faults.map((fault) => (
            <div key={fault.id} className="home-module-card min-h-0">
              <p className="home-module-label">{fault.system}</p>
              <h3 className="home-module-title">{fault.code}</h3>
              <p className="home-module-text">{fault.symptom}</p>
            </div>
          ))}
          {services.map((service) => (
            <div key={service.id} className="home-module-card min-h-0">
              <p className="home-module-label">{service.status}</p>
              <h3 className="home-module-title">{service.title}</h3>
              <p className="home-module-text">€{service.cost}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function readList<T>(key: string): T[] {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : []
  } catch {
    return []
  }
}
