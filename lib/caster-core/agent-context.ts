import { appState } from './app-state'
import { readMemory } from './memory'
import { getProfilePreset } from './profile-presets'

export function getAgentContext() {
  const memory = typeof window !== 'undefined' ? readMemory() : null

  const profile = getProfilePreset(memory?.selectedProfile ?? 'entrepreneur')

  return {
    timestamp: new Date().toISOString(),
    profile: {
      id: profile.id,
      name: profile.name,
      focusBias: profile.focusBias,
    },
    memory,
    goals: appState.goals,
    projects: appState.projects,
    health: appState.health,
    summary: {
      activeProjects: appState.projects.filter((project) => project.status === 'active').length,
      goalCount: appState.goals.length,
      selectedWidgets: memory?.selectedWidgets.length ?? 0,
    },
  }
}
