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

export default function TravelcasterLocalWorkspace() {
  const [items, setItems] = useState<PlanItem[]>([])
  const [title, setTitle] = useState('')
  const [type, setType] = useState('food')
  const [cost, setCost] = useState('')
  const [note, setNote] = useState('')
  const [budget, setBudget] = useState('850')

  useEffect(() => {
    setItems(readList<PlanItem>(storageKey))
  }, [])

  useEffect(() => {
    if (items.length) localStorage.setItem(storageKey, JSON.stringify(items))
  }, [items])

  const planned = useMemo(() => items.reduce((sum, item) => sum + Number(item.cost || 0), 0), [items])
  const remaining = Number(budget || 0) - planned

  function addItem() {
    if (!title.trim()) return
    setItems((current) => [
      {
        id: `trip-item-${Date.now()}`,
        title: title.trim(),
        type,
        cost: Number(cost || 0),
        note: note.trim()
      },
      ...current
    ])
    setTitle('')
    setCost('')
    setNote('')
  }

  function clearAll() {
    localStorage.removeItem(storageKey)
    setItems([])
  }

  return (
    <section className="home-section">
      <div className="home-container">
        <p className="section-label">Your Local Travelcaster</p>
        <h2 className="section-title">Tallenna oma matkabudjetti ja ideat heti selaimeen.</h2>
        <p className="home-section-lead">Tämä käyttää selaimen localStoragea. Seuraava vaihe on käyttäjätili ja pysyvä pilvitallennus.</p>

        <div className="home-module-grid">
          <div className="home-module-card">
            <p className="home-module-label">Trip budget</p>
            <h3 className="home-module-title">Budjetti</h3>
            <div className="form-stack">
              <input className="caster-input" value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="850" inputMode="decimal" />
              <p className="home-module-text">Planned €{planned}. Remaining €{remaining}.</p>
            </div>
          </div>

          <div className="home-module-card">
            <p className="home-module-label">Add item</p>
            <h3 className="home-module-title">Aktiviteetti / kulu</h3>
            <div className="form-stack">
              <input className="caster-input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Esim. tasting menu" />
              <select className="caster-input" value={type} onChange={(event) => setType(event.target.value)}>
                <option value="food">food</option>
                <option value="activity">activity</option>
                <option value="hotel">hotel</option>
                <option value="route">route</option>
                <option value="shopping">shopping</option>
              </select>
              <input className="caster-input" value={cost} onChange={(event) => setCost(event.target.value)} placeholder="Hinta €" inputMode="decimal" />
              <textarea className="caster-input" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Muistiinpano" rows={3} />
              <button className="primary-button" type="button" onClick={addItem}>Add trip item</button>
            </div>
          </div>
        </div>

        <div className="home-highlight-grid form-summary-grid">
          <div className="home-highlight-card"><p className="home-card-title">Items saved</p><p className="home-card-text">{items.length}</p></div>
          <div className="home-highlight-card"><p className="home-card-title">Planned</p><p className="home-card-text">€{planned}</p></div>
          <div className="home-highlight-card"><p className="home-card-title">Remaining</p><p className="home-card-text">€{remaining}</p></div>
          <button className="secondary-button danger-button" type="button" onClick={clearAll}>Clear local data</button>
        </div>

        <div className="home-module-grid">
          {items.map((item) => (
            <div key={item.id} className="home-module-card min-h-0">
              <p className="home-module-label">{item.type} · €{item.cost}</p>
              <h3 className="home-module-title">{item.title}</h3>
              <p className="home-module-text">{item.note || 'No note yet.'}</p>
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
