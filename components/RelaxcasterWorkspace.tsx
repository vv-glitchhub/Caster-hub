'use client'

import { useEffect, useMemo, useState } from 'react'

type RelaxMode = 'calm' | 'clarity' | 'decision' | 'talk'

type CheckIn = {
  id: string
  createdAt: string
  mode: RelaxMode
  intensity: number
  note: string
  nextStep: string
}

const storageKey = 'caster.relaxcaster.checkins'

const modeCopy: Record<RelaxMode, { title: string; prompt: string; step: string }> = {
  calm: {
    title: 'Calm',
    prompt: 'Mikä tuntuu juuri nyt voimakkaimmalta?',
    step: 'Hengitä hitaasti sisään 4 sekuntia ja ulos 6 sekuntia viisi kierrosta.',
  },
  clarity: {
    title: 'Clarity',
    prompt: 'Mitkä ovat faktat, mitkä tulkintoja ja mikä on pienin seuraava askel?',
    step: 'Kirjoita yksi fakta, yksi tunne ja yksi asia, jonka voit tehdä tänään.',
  },
  decision: {
    title: 'Decision',
    prompt: 'Mitä päätöstä olet tekemässä ja mikä siinä on palautettavissa?',
    step: 'Siirrä peruuttamatonta päätöstä, kunnes olet levännyt ja arvioinut vaihtoehdot uudelleen.',
  },
  talk: {
    title: 'Talk',
    prompt: 'Mitä haluaisit sanoa turvallisesti ja ilman arvostelua?',
    step: 'Muotoile asia: Minusta tuntuu…, koska…, ja tarvitsen seuraavaksi…',
  },
}

export default function RelaxcasterWorkspace() {
  const [mode, setMode] = useState<RelaxMode>('calm')
  const [intensity, setIntensity] = useState(5)
  const [note, setNote] = useState('')
  const [checkIns, setCheckIns] = useState<CheckIn[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      const parsed = raw ? JSON.parse(raw) : []
      setCheckIns(Array.isArray(parsed) ? parsed : [])
    } catch {
      setCheckIns([])
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(storageKey, JSON.stringify(checkIns.slice(0, 100)))
  }, [checkIns, hydrated])

  const current = modeCopy[mode]
  const average = useMemo(() => {
    if (!checkIns.length) return null
    return Math.round((checkIns.reduce((sum, item) => sum + item.intensity, 0) / checkIns.length) * 10) / 10
  }, [checkIns])

  function saveCheckIn() {
    const next: CheckIn = {
      id: `relax-${Date.now()}`,
      createdAt: new Date().toISOString(),
      mode,
      intensity,
      note: note.trim().slice(0, 1000),
      nextStep: current.step,
    }
    setCheckIns((items) => [next, ...items].slice(0, 100))
    setNote('')
  }

  function clearHistory() {
    if (!window.confirm('Poistetaanko Relaxcasterin paikallinen historia tältä laitteelta?')) return
    setCheckIns([])
  }

  return (
    <section className="home-section" id="relaxcaster-workspace">
      <div className="home-container">
        <p className="section-label">Your Relaxcaster</p>
        <h2 className="section-title">Pysähdy, jäsennä ja valitse yksi turvallinen seuraava askel.</h2>
        <p className="home-section-lead">
          Relaxcaster on hyvinvoinnin ja päätöksenteon tukityökalu. Se ei tee diagnooseja eikä korvaa terveydenhuoltoa tai kriisiapua.
        </p>

        <div className="home-module-grid">
          <article className="home-module-card min-h-0">
            <p className="home-module-label">Mode</p>
            <div className="home-actions">
              {(Object.keys(modeCopy) as RelaxMode[]).map((item) => (
                <button
                  className={item === mode ? 'primary-button' : 'secondary-button'}
                  key={item}
                  type="button"
                  onClick={() => setMode(item)}
                >
                  {modeCopy[item].title}
                </button>
              ))}
            </div>
            <h3 className="home-module-title">{current.prompt}</h3>
            <textarea
              className="caster-input"
              rows={5}
              maxLength={1000}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Kirjoita tähän. Voit jättää kentän tyhjäksi."
            />
          </article>

          <article className="home-module-card min-h-0">
            <p className="home-module-label">Intensity · {intensity}/10</p>
            <input
              aria-label="Tunteen tai kuormituksen voimakkuus"
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(event) => setIntensity(Number(event.target.value))}
            />
            <h3 className="home-module-title">Seuraava askel</h3>
            <p className="home-module-text">{current.step}</p>
            <button className="primary-button" type="button" onClick={saveCheckIn}>Save check-in</button>
          </article>
        </div>

        <div className="home-highlight-grid form-summary-grid">
          <div className="home-highlight-card"><p className="home-card-title">Check-ins</p><p className="home-card-text">{checkIns.length}</p></div>
          <div className="home-highlight-card"><p className="home-card-title">Average intensity</p><p className="home-card-text">{average ?? '—'}</p></div>
          <div className="home-highlight-card"><p className="home-card-title">Storage</p><p className="home-card-text">Only this device</p></div>
          <button className="secondary-button danger-button" type="button" onClick={clearHistory}>Clear history</button>
        </div>

        <div className="home-module-grid">
          {checkIns.slice(0, 12).map((item) => (
            <article className="home-module-card min-h-0" key={item.id}>
              <p className="home-module-label">{modeCopy[item.mode]?.title || item.mode} · {item.intensity}/10</p>
              <h3 className="home-module-title">{new Date(item.createdAt).toLocaleString('fi-FI')}</h3>
              <p className="home-module-text">{item.note || 'No written note.'}</p>
              <p className="home-module-text"><strong>Next:</strong> {item.nextStep}</p>
              <button className="secondary-button danger-button" type="button" onClick={() => setCheckIns((items) => items.filter((entry) => entry.id !== item.id))}>Remove</button>
            </article>
          ))}
        </div>

        <article className="home-module-card min-h-0">
          <p className="home-module-label">Safety boundary</p>
          <h3 className="home-module-title">Hätätilanteessa käytä oikeaa apua.</h3>
          <p className="home-module-text">
            Jos olet välittömässä vaarassa tai pelkäät vahingoittavasi itseäsi tai muita, soita Suomessa 112. Kiireellisessä mutta ei välittömässä tilanteessa ota yhteys terveydenhuoltoon tai luotettavaan läheiseen.
          </p>
        </article>
      </div>
    </section>
  )
}
