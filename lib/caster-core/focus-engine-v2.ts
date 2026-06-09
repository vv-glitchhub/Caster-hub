import { appState } from './app-state'
import { getDynamicFocus } from './focus-engine'
import { getProfilePreset, type ProfileId } from './profile-presets'

export function getDynamicFocusV2(hour: number, profileId: ProfileId = 'entrepreneur') {
  const profile = getProfilePreset(profileId)

  if (profile.focusBias === 'health' && hour >= 17) {
    return {
      greeting: hour >= 22 || hour < 5 ? 'Working Late?' : 'Good Evening',
      title: hour >= 22 || hour < 5 ? 'Night Mode' : 'Recovery Focus',
      focus: 'Recovery and consistency',
      area: 'Health',
      confidence: 'High',
      reason: 'This profile prioritizes performance, recovery and sustainable daily rhythm.',
      next: 'Open Health and complete a short reset.',
    }
  }

  if (profile.focusBias === 'wealth' && hour >= 12 && hour < 17) {
    return {
      greeting: 'Good Afternoon',
      title: 'Wealth Priority',
      focus: 'Review financial direction',
      area: 'Wealth',
      confidence: 'Medium',
      reason: 'This profile prioritizes money, markets and long-term planning.',
      next: 'Open Wealth and review the snapshot.',
    }
  }

  if (profile.focusBias === 'learning') {
    return {
      greeting: hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening',
      title: hour < 17 ? 'Learning Focus' : "Today's Review",
      focus: 'Move one learning or project milestone forward',
      area: 'Life',
      confidence: 'Medium',
      reason: 'This profile prioritizes study progress, deadlines and personal development.',
      next: 'Open Life and choose the next study or project task.',
    }
  }

  return getDynamicFocus({
    hour,
    goals: appState.goals,
    projects: appState.projects,
    healthState: appState.health.state === 'good' ? 'good' : 'steady',
  })
}
