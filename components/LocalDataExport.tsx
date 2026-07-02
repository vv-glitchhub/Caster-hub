'use client'

import { useMemo, useState } from 'react'

const appKeys = [
  {
    app: 'Carcaster',
    keys: ['caster.carcaster.faults', 'caster.carcaster.services']
  },
  {
    app: 'Travelcaster',
    keys: ['caster.travelcaster.items']
  },
  {
    app: 'Scorecaster',
    keys: ['scorecaster.quickUse.bets']
  },
  {
    app: 'Stockcaster',
    keys: ['stockcaster.quickUse.holdings', 'stockcaster.quickUse.watchlist']
  }
]

const keys = appKeys.flatMap((group) => group.keys)

export default function LocalDataExport() {
  const [importText, setImportText] = useState('')
  const [message, setMessage] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const exportText = useMemo(() => {
    if (typeof window === 'undefined') return '{}'

    const data: Record<string, unknown> = {}
    keys.forEach((key) => {
      const raw = localStorage.getItem(key)
      data[key] = raw ? safeParse(raw) : []
    })

    return JSON.stringify({
      app: 'Caster OS local backup',
      version: 2,
      createdAt: new Date().toISOString(),
      note: 'This backup contains localStorage data for Caster quick-use apps when they were run on the same browser origin.',
      data
    }, null, 2)
  }, [refreshKey])

  const counts = useMemo(() => {
    if (typeof window === 'undefined') return keys.map((key) => [key, 0])

    return keys.map((key) => {
      const raw = localStorage.getItem(key)
      const parsed = raw ? safeParse(raw) : []
      return [key, Array.isArray(parsed) ? parsed.length : raw ? 1 : 0]
    })
  }, [refreshKey])

  async function copyBackup() {
    await navigator.clipboard.writeText(exportText)
    setMessage('Backup copied. Save it somewhere safe.')
  }

  function importBackup() {
    try {
      const parsed = JSON.parse(importText)
      const data = parsed.data || parsed

      keys.forEach((key) => {
        if (key in data) {
          localStorage.setItem(key, JSON.stringify(data[key]))
        }
      })

      setMessage('Backup restored. Refresh the app page you want to use.')
      setRefreshKey((value) => value + 1)
    } catch {
      setMessage('Import failed. Paste valid JSON.')
    }
  }

  function clearCasterLocalData() {
    keys.forEach((key) => localStorage.removeItem(key))
    setMessage('Caster local quick-use data cleared from this browser origin.')
    setRefreshKey((value) => value + 1)
  }

  return (
    <section className="home-section">
      <div className="home-container">
        <p className="section-label">Local Backup</p>
        <h2 className="section-title">Backup all quick-use app data.</h2>
        <p className="home-section-lead">
          Copy and restore local data for Carcaster, Travelcaster, Scorecaster and Stockcaster. This works for data saved under the same browser origin, usually http://localhost:3000.
        </p>

        <div className="home-module-grid">
          <div className="home-module-card">
            <p className="home-module-label">Export</p>
            <h3 className="home-module-title">Copy backup</h3>
            <p className="home-module-text">Copies all known Caster quick-use localStorage keys as JSON.</p>
            <button className="primary-button" type="button" onClick={copyBackup}>Copy backup JSON</button>
          </div>

          <div className="home-module-card">
            <p className="home-module-label">Import</p>
            <h3 className="home-module-title">Restore backup</h3>
            <div className="form-stack">
              <textarea className="caster-input" rows={6} value={importText} onChange={(event) => setImportText(event.target.value)} placeholder="Paste backup JSON here" />
              <button className="primary-button" type="button" onClick={importBackup}>Restore backup</button>
            </div>
          </div>

          <div className="home-module-card">
            <p className="home-module-label">Status</p>
            <h3 className="home-module-title">Backup state</h3>
            <p className="home-module-text">{message || 'Ready.'}</p>
            <div className="form-stack">
              <button className="secondary-button" type="button" onClick={() => setRefreshKey((value) => value + 1)}>Refresh preview</button>
              <button className="secondary-button danger-button" type="button" onClick={clearCasterLocalData}>Clear Caster local data</button>
            </div>
          </div>
        </div>

        <div className="home-highlight-grid form-summary-grid">
          {counts.map(([key, count]) => (
            <div key={String(key)} className="home-highlight-card">
              <p className="home-card-title">{String(count)} items</p>
              <p className="home-card-text">{String(key)}</p>
            </div>
          ))}
        </div>

        <section className="home-section compact-section">
          <div className="home-container inner-container">
            <p className="section-label">Included Apps</p>
            <h2 className="section-title">Backup coverage.</h2>
            <div className="home-module-grid">
              {appKeys.map((group) => (
                <div key={group.app} className="home-module-card min-h-0">
                  <p className="home-module-label">{group.app}</p>
                  <h3 className="home-module-title">{group.keys.length} keys</h3>
                  <p className="home-module-text">{group.keys.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <textarea className="caster-input backup-preview" readOnly rows={14} value={exportText} />
      </div>
    </section>
  )
}

function safeParse(value: string) {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}
