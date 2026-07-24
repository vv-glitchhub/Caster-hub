'use client'

import { useEffect, useMemo, useState } from 'react'

type PlanItem = {
  id: string
  title: string
  type: string
  cost: number
  note: string
}

const storageKey = 'caster.travelcaster.items'
const budgetKey = 'caster.travelcaster.budget'

export default function TravelcasterLocalWorkspace() {
  const [hydrated, setHydrated] = useState(false)
  const [items, setItems] = useState<PlanItem[]>([])
  const [title, setTitle] = useState('')
  const [type, setType] = useState('food')
  const [cost, setCost] = useState('')
  const [note, setNote] = useState('')
  const [budget, setBudget] = useState('850')

  useEffect(() => {
    setItems(readList<PlanItem>(storageKey))
    setBudget(localStorage.getItem(budgetKey) || '850')
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [hydrated, items])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(budgetKey, budget)
  }, [budget, hydrated])

  const planned = useMemo(() => items.reduce((sum, item) => sum + Number(item.cost || 0), 0), [items])
  const parsedBudget = positiveMoney(budget)
  const remaining = parsedBudget - planned

  function addItem() {
    if (!title.trim()) return
    setItems((current) => [
      {
        id: `trip-item-${Date.now()}`,
        title: title.trim(),
        type,
        cost: positiveMoney(cost),
        note: note.trim()
      },
      ...current
    ])
    setTitle('')
    setCost('')
    setNote('')
  }

  function clearAll() {
    const confirmed = window.confirm('Poistetaanko Travelcasterin paikallisesti tallennetut matkatiedot?')
    if (!confirmed) return
    setItems([])
    setBudget('850')
  }

  return (
    <section className="home-section">
      <div className="home-container">
        <p className="section-label">Your Local Travelcaster</p>
        <h2 className="section-title">Tallenna oma matkabudjetti ja ideat heti selaimeen.</h2>
        <p className="home-section-lead">Budjetti ja matkan kohteet tallentuvat automaattisesti. Voit varmuuskopioida kaiken Account Data -sivulta.</p>

        <div className="home-module-grid">
          <div className="home-module-card">
            <p className="home-module-label">Trip budget</p>
            <h3 className="home-module-title">Budjetti</h3>
            <div className="form-stack">
              <input className="caster-input" value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="850" inputMode="decimal" aria-label="Matkabudjetti euroina" />
              <p className="home-module-text">Planned €{planned.toFixed(2)}. Remaining €{remaining.toFixed(2)}.</p>
            </div>
          </div>

          <div className="home-module-card">
            <p className="home-module-label">Add item</p>
            <h3 className="home-module-title">Aktiviteetti / kulu</h3>
            <div className="form-stack">
              <input className="caster-input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Esim. tasting menu" aria-label="Matkakohteen nimi" />
              <select className="caster-input" value={type} onChange={(event) => setType(event.target.value)} aria-label="Matkakohteen tyyppi">
                <option value="food">food</option>
                <option value="activity">activity</option>
                <option value="hotel">hotel</option>
                <option value="route">route</option>
                <option value="shopping">shopping</option>
                <option value="flight">flight</option>
                <option value="transport">transport</option>
              </select>
              <input className="caster-input" value={cost} onChange={(event) => setCost(event.target.value)} placeholder="Hinta €" inputMode="decimal" aria-label="Matkakohteen hinta" />
              <textarea className="caster-input" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Muistiinpano" aria-label="Matkakohteen muistiinpano" rows={3} />
              <button className="primary-button" type="button" onClick={addItem}>Add trip item</button>
            </div>
          </div>
        </div>

        <div className="home-highlight-grid form-summary-grid">
          <div className="home-highlight-card"><p className="home-card-title">Items saved</p><p className="home-card-text">{items.length}</p></div>
          <div className="home-highlight-card"><p className="home-card-title">Planned</p><p className="home-card-text">€{planned.toFixed(2)}</p></div>
          <div className="home-highlight-card"><p className="home-card-title">Remaining</p><p className="home-card-text">€{remaining.toFixed(2)}</p></div>
          <button className="secondary-button danger-button" type="button" onClick={clearAll}>Clear local data</button>
        </div>

        <div className="home-module-grid">
          {items.map((item) => (
            <div key={item.id} className="home-module-card min-h-0">
              <p className="home-module-label">{item.type} · €{Number(item.cost || 0).toFixed(2)}</p>
              <h3 className="home-module-title">{item.title}</h3>
              <p className="home-module-text">{item.note || 'No note yet.'}</p>
              <button className="secondary-button danger-button" type="button" onClick={() => setItems((current) => current.filter((candidate) => candidate.id !== item.id))}>Remove item</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function positiveMoney(value: string) {
  const parsed = Number(value.replace(',', '.'))
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
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
