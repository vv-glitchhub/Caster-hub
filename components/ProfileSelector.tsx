'use client'

import { useEffect, useState } from 'react'
import { profilePresets, type ProfileId } from '../lib/caster-core/profile-presets'
import { readMemory, updateMemory } from '../lib/caster-core/memory'

export default function ProfileSelector() {
  const [selectedProfile, setSelectedProfile] = useState<ProfileId>('entrepreneur')

  useEffect(() => {
    setSelectedProfile(readMemory().selectedProfile)
  }, [])

  function selectProfile(profileId: ProfileId) {
    setSelectedProfile(profileId)
    const profile = profilePresets.find((item) => item.id === profileId)
    updateMemory({
      selectedProfile: profileId,
      selectedWidgets: profile?.widgets ?? readMemory().selectedWidgets,
    })
    window.dispatchEvent(new Event('caster-memory-updated'))
  }

  return (
    <div className="dashboard-preview min-h-0">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Personal Dashboard</p>
          <h2 className="mt-4 text-3xl font-semibold">Choose your profile</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/52">
            This changes which widgets Caster OS prioritizes. Later this will be saved to your account.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/55">
          {selectedProfile}
        </span>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-5">
        {profilePresets.map((profile) => (
          <button
            key={profile.id}
            type="button"
            onClick={() => selectProfile(profile.id)}
            className={`rounded-2xl border px-4 py-4 text-left transition ${
              selectedProfile === profile.id
                ? 'border-blue-200/50 bg-blue-400/15 text-white'
                : 'border-white/10 bg-white/[0.04] text-white/60 hover:border-blue-200/30 hover:bg-white/[0.07]'
            }`}
          >
            <p className="text-sm font-semibold">{profile.name}</p>
            <p className="mt-2 text-xs leading-5 opacity-70">{profile.focusBias}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
