'use client'

import { useEffect, useState } from 'react'
import { readMemory, updateMemory } from '../lib/caster-core/memory'
import { profilePresets, type ProfileId } from '../lib/caster-core/profile-presets'

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
    <div className="premium-control-panel">
      <div className="premium-control-head">
        <div>
          <p className="home-module-label">Personal Dashboard</p>
          <h2>Choose your profile</h2>
          <p>
            This changes which widgets Caster OS prioritizes. Later this will be saved to your account.
          </p>
        </div>
        <span>{selectedProfile}</span>
      </div>

      <div className="premium-option-grid profile-option-grid">
        {profilePresets.map((profile) => {
          const active = selectedProfile === profile.id

          return (
            <button
              key={profile.id}
              type="button"
              onClick={() => selectProfile(profile.id)}
              className={active ? 'premium-option active' : 'premium-option'}
            >
              <strong>{profile.name}</strong>
              <span>{profile.focusBias}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
