'use client'

import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import {
  CasterLocalDataKey,
  clearCasterLocalData,
  exportCasterLocalData,
  importCasterLocalData,
  previewCasterImport,
} from '../lib/local-account-data'

const labels: Record<CasterLocalDataKey, string> = {
  profile: 'Shared profile',
  carcasterFaults: 'Carcaster faults',
  carcasterServices: 'Carcaster services',
  travelcasterItems: 'Travelcaster trip items',
  travelcasterBudget: 'Travelcaster budget',
}

export default function AccountPortabilityClient() {
  const [storedKeys, setStoredKeys] = useState<CasterLocalDataKey[]>([])
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  function refresh() {
    setStoredKeys(Object.keys(exportCasterLocalData(window.localStorage).data) as CasterLocalDataKey[])
  }

  useEffect(() => refresh(), [])

  const summary = useMemo(() => storedKeys.map((key) => labels[key]), [storedKeys])

  function downloadExport() {
    const bundle = exportCasterLocalData(window.localStorage)
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = `caster-account-export-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(href)
    setStatus(`Exported ${Object.keys(bundle.data).length} local data sections.`)
  }

  async function importFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setBusy(true)
    setStatus('')
    try {
      if (file.size > 2_000_000) throw new Error('The export is too large. Maximum supported size is 2 MB.')
      const parsed = JSON.parse(await file.text())
      const preview = previewCasterImport(parsed)
      if (!preview.valid || !preview.bundle) throw new Error(preview.warnings.join(' '))

      const accepted = window.confirm(
        `Import ${preview.keys.map((key) => labels[key]).join(', ')}? Existing local sections with the same name will be replaced.`,
      )
      if (!accepted) {
        setStatus('Import cancelled. No data was changed.')
        return
      }

      const imported = importCasterLocalData(window.localStorage, preview.bundle)
      refresh()
      setStatus(`Imported ${imported.length} local data sections. Reload the related app page to see the data.`)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Import failed.')
    } finally {
      setBusy(false)
    }
  }

  function deleteLocalAccountData() {
    const accepted = window.confirm(
      'Delete the shared profile plus all local Carcaster and Travelcaster data from this browser? Export first if you need a backup.',
    )
    if (!accepted) return

    clearCasterLocalData(window.localStorage)
    refresh()
    setStatus('All recognized local Caster account data was deleted from this browser.')
  }

  return (
    <div className="home-module-grid">
      <article className="home-module-card min-h-0">
        <p className="home-module-label">Portable Backup</p>
        <h2 className="home-module-title">Export your local Caster data.</h2>
        <p className="home-module-text">
          Download one versioned JSON file containing the shared profile and recognized Carcaster and Travelcaster browser data. Passwords, tokens and external application sessions are never included.
        </p>
        <div className="home-actions">
          <button className="primary-button" type="button" onClick={downloadExport}>Download export</button>
        </div>
      </article>

      <article className="home-module-card min-h-0">
        <p className="home-module-label">Verified Restore</p>
        <h2 className="home-module-title">Import a Caster export.</h2>
        <p className="home-module-text">
          The importer accepts only the current Caster export contract, ignores unknown sections and asks before replacing local data.
        </p>
        <label className="secondary-button" htmlFor="caster-account-import">
          {busy ? 'Checking file…' : 'Choose export file'}
        </label>
        <input
          id="caster-account-import"
          type="file"
          accept="application/json,.json"
          hidden
          disabled={busy}
          onChange={importFile}
        />
      </article>

      <article className="home-module-card min-h-0">
        <p className="home-module-label">Local Account Inventory</p>
        <h2 className="home-module-title">{storedKeys.length} stored sections.</h2>
        <p className="home-module-text">{summary.length ? summary.join(' · ') : 'No recognized local Caster data is stored in this browser.'}</p>
        <button className="secondary-button danger-button" type="button" onClick={deleteLocalAccountData} disabled={!storedKeys.length}>
          Delete local account data
        </button>
      </article>

      <article className="home-module-card min-h-0">
        <p className="home-module-label">Cloud Boundary</p>
        <h2 className="home-module-title">Production deletion remains gated.</h2>
        <p className="home-module-text">
          This page manages browser-local Caster Hub data only. Authenticated cloud export and deletion must be verified against Supabase RLS before cloud synchronization is enabled.
        </p>
        <a className="secondary-button" href="/production-readiness">Open production readiness</a>
      </article>

      {status ? <p className="home-section-lead" role="status">{status}</p> : null}
    </div>
  )
}
