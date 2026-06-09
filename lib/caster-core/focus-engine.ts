export type FocusInput = {
  hour: number
  goals?: Array<{ title: string; progress: number; area: 'life' | 'wealth' | 'gaming' | 'health' | 'core' }>
  projects?: Array<{ title: string; status: 'active' | 'planned' | 'paused'; impact: 'high' | 'medium' | 'low' }>
  healthState?: 'low' | 'steady' | 'good'
}

export type FocusResult = {
  greeting: string
  title: string
  focus: string
  area: string
  confidence: string
  reason: string
  next: string
}

function getGreeting(hour: number) {
  if (hour >= 5 && hour < 12) return 'Good Morning'
  if (hour >= 12 && hour < 17) return 'Good Afternoon'
  if (hour >= 17 && hour < 22) return 'Good Evening'
  return 'Working Late?'
}

function getTimeTitle(hour: number) {
  if (hour >= 5 && hour < 12) return "Today's Focus"
  if (hour >= 12 && hour < 17) return 'Current Priority'
  if (hour >= 17 && hour < 22) return "Today's Reflection"
  return 'Night Mode'
}

export function getDynamicFocus(input: FocusInput): FocusResult {
  const greeting = getGreeting(input.hour)
  const title = getTimeTitle(input.hour)

  if (input.hour >= 22 || input.hour < 5) {
    return {
      greeting,
      title,
      focus: 'Keep the session light and protect recovery.',
      area: 'Health',
      confidence: 'Medium',
      reason: 'Late work should stay controlled so tomorrow still has energy.',
      next: 'Finish one small task, then stop.',
    }
  }

  const activeHighImpactProject = input.projects?.find(
    (project) => project.status === 'active' && project.impact === 'high'
  )

  if (activeHighImpactProject) {
    return {
      greeting,
      title,
      focus: activeHighImpactProject.title,
      area: 'Projects',
      confidence: 'High',
      reason: 'This is the highest-impact active project and moves the whole system forward.',
      next: 'Complete one visible milestone before switching context.',
    }
  }

  const lowestGoal = input.goals
    ?.slice()
    .sort((a, b) => a.progress - b.progress)[0]

  if (lowestGoal && lowestGoal.progress < 45) {
    return {
      greeting,
      title,
      focus: lowestGoal.title,
      area: lowestGoal.area,
      confidence: 'Medium',
      reason: 'This goal is behind the others and would benefit from a focused push.',
      next: 'Define the next small action and move progress by 5%.',
    }
  }

  if (input.healthState === 'low') {
    return {
      greeting,
      title,
      focus: 'Recovery and reset',
      area: 'Health',
      confidence: 'High',
      reason: 'Low energy reduces decision quality, so recovery becomes the highest-leverage move.',
      next: 'Take a short reset before continuing work.',
    }
  }

  return {
    greeting,
    title,
    focus: 'Review the dashboard and choose one next action.',
    area: 'Caster OS',
    confidence: 'Medium',
    reason: 'No urgent signal is stronger than the others, so the best move is deliberate prioritization.',
    next: 'Open the module with the most important unfinished item.',
  }
}
