import { appState } from './app-state'
import { getDynamicFocusV2 } from './focus-engine-v2'
import type { CasterMemory } from './memory'
import { getProfilePreset } from './profile-presets'

export type Recommendation = {
  title: string
  reason: string
  action: string
  area: 'core' | 'life' | 'wealth' | 'gaming' | 'health' | 'utility'
}

export function getRecommendations(memory: CasterMemory | null, hour = new Date().getHours()): Recommendation[] {
  const profile = getProfilePreset(memory?.selectedProfile ?? 'entrepreneur')
  const focus = getDynamicFocusV2(hour, profile.id)
  const activeProjects = appState.projects.filter((project) => project.status === 'active')
  const lowGoal = [...appState.goals].sort((a, b) => a.progress - b.progress)[0]
  const selectedWidgets = memory?.selectedWidgets ?? []

  const recommendations: Recommendation[] = [
    {
      title: focus.focus,
      reason: focus.reason,
      action: focus.next,
      area: focus.area.toLowerCase() as Recommendation['area'],
    },
  ]

  if (activeProjects.length) {
    recommendations.push({
      title: `Move ${activeProjects[0].title} forward`,
      reason: 'Active projects create the highest immediate momentum in Caster OS.',
      action: 'Open Life or Dashboard and complete one concrete next task.',
      area: 'life',
    })
  }

  if (lowGoal && lowGoal.progress < 45) {
    recommendations.push({
      title: `Lift ${lowGoal.title}`,
      reason: 'This goal has the lowest progress and may become a bottleneck.',
      action: 'Define one small action that raises progress today.',
      area: lowGoal.area,
    })
  }

  if (!selectedWidgets.includes('calendar')) {
    recommendations.push({
      title: 'Add Calendar widget',
      reason: 'Time context improves daily focus decisions.',
      action: 'Enable Calendar from Widget Manager.',
      area: 'utility',
    })
  }

  if (profile.focusBias === 'wealth') {
    recommendations.push({
      title: 'Review Wealth snapshot',
      reason: 'Investor profile prioritizes long-term capital direction.',
      action: 'Open Wealth and check risk balance.',
      area: 'wealth',
    })
  }

  if (profile.focusBias === 'health') {
    recommendations.push({
      title: 'Protect recovery',
      reason: 'Athlete profile needs consistency and recovery to sustain performance.',
      action: 'Open Health and complete a short reset.',
      area: 'health',
    })
  }

  return recommendations.slice(0, 5)
}
