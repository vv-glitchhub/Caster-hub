'use client'

import type { ProfileId } from './profile-presets'

const MEMORY_KEY = 'caster-os-memory-v1'

export type WidgetLayoutItem = {
  id: string
  order: number
  size: 'wide' | 'medium' | 'small'
}

export type CasterMemory = {
  selectedProfile: ProfileId
  selectedWidgets: string[]
  widgetLayout: WidgetLayoutItem[]
  preferences: {
    compactMode: boolean
    showGaming: boolean
    showHealth: boolean
  }
}

export const defaultWidgetLayout: WidgetLayoutItem[] = [
  { id: 'ai-focus', order: 1, size: 'wide' },
  { id: 'projects', order: 2, size: 'medium' },
  { id: 'goals', order: 3, size: 'medium' },
  { id: 'calendar', order: 4, size: 'medium' },
  { id: 'tasks', order: 5, size: 'medium' },
  { id: 'wealth', order: 6, size: 'small' },
  { id: 'gaming', order: 7, size: 'small' },
  { id: 'health', order: 8, size: 'small' },
  { id: 'notes', order: 9, size: 'small' },
  { id: 'weather', order: 10, size: 'small' },
]

export const defaultMemory: CasterMemory = {
  selectedProfile: 'entrepreneur',
  selectedWidgets: ['ai-focus', 'projects', 'goals', 'calendar', 'tasks', 'wealth', 'health'],
  widgetLayout: defaultWidgetLayout,
  preferences: {
    compactMode: false,
    showGaming: true,
    showHealth: true,
  },
}

function mergeLayout(savedLayout: WidgetLayoutItem[] | undefined) {
  if (!savedLayout?.length) return defaultWidgetLayout

  const savedIds = savedLayout.map((item) => item.id)
  const missingItems = defaultWidgetLayout.filter((item) => !savedIds.includes(item.id))

  return [...savedLayout, ...missingItems].map((item, index) => ({
    ...item,
    order: index + 1,
  }))
}

export function readMemory(): CasterMemory {
  if (typeof window === 'undefined') return defaultMemory

  try {
    const raw = window.localStorage.getItem(MEMORY_KEY)
    if (!raw) return defaultMemory
    const parsed = JSON.parse(raw)
    return {
      ...defaultMemory,
      ...parsed,
      preferences: {
        ...defaultMemory.preferences,
        ...(parsed.preferences ?? {}),
      },
      widgetLayout: mergeLayout(parsed.widgetLayout),
    }
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
  const next = {
    ...current,
    ...partial,
    preferences: {
      ...current.preferences,
      ...(partial.preferences ?? {}),
    },
  }
  writeMemory(next)
  return next
}

export function resetMemory() {
  writeMemory(defaultMemory)
  return defaultMemory
}
