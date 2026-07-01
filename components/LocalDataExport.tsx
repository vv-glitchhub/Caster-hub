'use client'

import { useMemo, useState } from 'react'

const keys = ['caster.carcaster.faults', 'caster.carcaster.services', 'caster.travelcaster.items']

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

    return JSON.stringify({ app: 'Caster OS local backup', version: 1, data }, null, 2)
  }, [refreshKey])

  function copyBackup() {
    navigator.clipboard.writeText(exportText)
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

      setMessage('Backup restored. Refresh the app page.')
      setRefreshKey((value) => value + 1)
    } catch {
      setMessage('Import failed. Paste valid JSON.')
    }
  }

  return (
    <section className="home-section">
      <div className="home-container">
        <p className="section-label">Local Backup</p>
        <h2 className="section-title">Backup your browser data.</h2>
        <p className="home-section-lead">Copy and restore your Carcaster and Travelcaster local data before cloud sync is connected.</p>

        <div className="home-module-grid">
          <div className="home-module-card">
            <p className="home-module-label">Export</p>
            <h3 className="home-module-title">Copy backup</h3>
            <p className="home-module-text">Copies all current local Caster data as JSON.</p>
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
            <button className="secondary-button" type="button" onClick={() => setRefreshKey((value) => value + 1)}>Refresh preview</button>
          </div>
        </div>

        <textarea className="caster-input backup-preview" readOnly rows={10} value={exportText} />
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
