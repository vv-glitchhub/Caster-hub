'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import {
  CASTER_PROFILE_STORAGE_KEY,
  CasterProfile,
  defaultCasterProfile,
  normalizeCasterProfile,
  profileCompletion,
} from '../lib/caster-profile'

const appLinks: Record<CasterProfile['homeApp'], string> = {
  'caster-hub': '/',
  scorecaster: 'https://scorecaster.vercel.app/',
  stockcaster: 'https://stockcaster-seven.vercel.app/',
  carcaster: '/apps/carcaster',
  travelcaster: '/apps/travelcaster',
}

function readStoredProfile() {
  try {
    const raw = window.localStorage.getItem(CASTER_PROFILE_STORAGE_KEY)
    return raw ? normalizeCasterProfile(JSON.parse(raw)) : defaultCasterProfile
  } catch {
    return defaultCasterProfile
  }
}

export default function SharedProfileClient() {
  const [profile, setProfile] = useState<CasterProfile>(defaultCasterProfile)
  const [loaded, setLoaded] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setProfile(readStoredProfile())
    setLoaded(true)
  }, [])

  const completion = useMemo(() => profileCompletion(profile), [profile])

  function update<K extends keyof CasterProfile>(key: K, value: CasterProfile[K]) {
    setSaved(false)
    setProfile((current) => normalizeCasterProfile({ ...current, [key]: value }))
  }

  function save(event: FormEvent) {
    event.preventDefault()
    const next = normalizeCasterProfile({ ...profile, updatedAt: new Date().toISOString() })
    window.localStorage.setItem(CASTER_PROFILE_STORAGE_KEY, JSON.stringify(next))
    setProfile(next)
    setSaved(true)
  }

  function clearProfile() {
    window.localStorage.removeItem(CASTER_PROFILE_STORAGE_KEY)
    setProfile(defaultCasterProfile)
    setSaved(false)
  }

  if (!loaded) {
    return <p className="home-section-lead">Loading local Caster profile…</p>
  }

  return (
    <div className="home-module-grid">
      <form className="home-module-card min-h-0" onSubmit={save}>
        <p className="home-module-label">Shared Profile · {completion}% complete</p>
        <h2 className="home-module-title">One identity preference layer.</h2>
        <p className="home-module-text">
          This first version stays on this device. It prepares a stable profile contract for future authenticated cloud sync without moving credentials between applications.
        </p>

        <label className="home-module-text" htmlFor="display-name">Display name</label>
        <input
          id="display-name"
          className="sc-input"
          value={profile.displayName}
          maxLength={80}
          autoComplete="name"
          onChange={(event) => update('displayName', event.target.value)}
        />

        <label className="home-module-text" htmlFor="profile-email">Email</label>
        <input
          id="profile-email"
          className="sc-input"
          type="email"
          value={profile.email}
          maxLength={254}
          autoComplete="email"
          onChange={(event) => update('email', event.target.value)}
        />

        <label className="home-module-text" htmlFor="profile-language">Language</label>
        <select
          id="profile-language"
          className="sc-input"
          value={profile.language}
          onChange={(event) => update('language', event.target.value as CasterProfile['language'])}
        >
          <option value="en">English</option>
          <option value="fi">Suomi</option>
          <option value="es">Español</option>
        </select>

        <label className="home-module-text" htmlFor="profile-theme">Appearance</label>
        <select
          id="profile-theme"
          className="sc-input"
          value={profile.theme}
          onChange={(event) => update('theme', event.target.value as CasterProfile['theme'])}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <label className="home-module-text" htmlFor="home-app">Default app</label>
        <select
          id="home-app"
          className="sc-input"
          value={profile.homeApp}
          onChange={(event) => update('homeApp', event.target.value as CasterProfile['homeApp'])}
        >
          <option value="caster-hub">Caster Hub</option>
          <option value="scorecaster">Scorecaster</option>
          <option value="stockcaster">Stockcaster</option>
          <option value="carcaster">Carcaster</option>
          <option value="travelcaster">Travelcaster</option>
        </select>

        <label className="home-module-text">
          <input
            type="checkbox"
            checked={profile.notificationsEnabled}
            onChange={(event) => update('notificationsEnabled', event.target.checked)}
          />{' '}
          Include this profile in the shared notification experience
        </label>

        <div className="home-actions">
          <button className="primary-button" type="submit">Save profile</button>
          <button className="secondary-button" type="button" onClick={clearProfile}>Clear local profile</button>
        </div>
        {saved ? <p className="home-module-text" role="status">Saved on this device.</p> : null}
      </form>

      <article className="home-module-card min-h-0">
        <p className="home-module-label">Account Gateway</p>
        <h2 className="home-module-title">Open the right application account.</h2>
        <p className="home-module-text">
          Caster Hub does not copy passwords, sessions or private tokens. Each production application remains responsible for its own secure authentication until a reviewed shared identity provider is introduced.
        </p>
        <div className="home-actions">
          <a className="primary-button" href="https://scorecaster.vercel.app/login">Scorecaster login</a>
          <a className="secondary-button" href="https://stockcaster-seven.vercel.app/">Open Stockcaster</a>
          <a className="secondary-button" href={appLinks[profile.homeApp]}>Open default app</a>
        </div>
      </article>

      <article className="home-module-card min-h-0">
        <p className="home-module-label">Migration Readiness</p>
        <h2 className="home-module-title">Cloud sync stays gated.</h2>
        <p className="home-module-text">
          The next phase requires one reviewed Supabase project or an external identity provider, verified redirect domains, Row Level Security, account deletion, export support and a two-user isolation test.
        </p>
        <p className="home-module-text">Profile contract version: {profile.version}</p>
        <p className="home-module-text">Last saved: {profile.updatedAt === defaultCasterProfile.updatedAt ? 'not saved' : new Date(profile.updatedAt).toLocaleString()}</p>
        <a className="secondary-button" href="/api/profile-readiness">Profile readiness JSON</a>
      </article>
    </div>
  )
}
