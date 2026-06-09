'use client'

import type { ProfileId } from './profile-presets'

const MEMORY_KEY = 'caster-os-memory-v1'

export type CasterMemory = {
  selectedProfile: ProfileId
  selectedWidgets: string[]
  preferences: {
    compactMode: boolean
    showGaming: boolean
    showHealth: boolean
  }
}

export const defaultMemory: CasterMemory = {
  selectedProfile: 'entrepreneur',
  selectedWidgets: ['ai-focus', 'projects', 'goals', 'wealth', 'health'],
  preferences: {
    compactMode: false,
    showGaming: true,
    showHealth: true,
  },
}

export function readMemory(): CasterMemory {
  if (typeof window === 'undefined') return defaultMemory

  try {
    const raw = window.localStorage.getItem(MEMORY_KEY)
    if (!raw) return defaultMemory
    return { ...defaultMemory, ...JSON.parse(raw) }
  } catch {
    return defaultMemory
  }
}

export function writeMemory(memory: CasterMemory) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(MEMORY_KEY, JSON.stringify(memory))
}

export function updateMemory(partial: Partial<CasterMemory>) {
  const current = readMemory()
  const next = { ...current, ...partial }
  writeMemory(next)
  return next
}

export function resetMemory() {
  writeMemory(defaultMemory)
  return defaultMemory
}
