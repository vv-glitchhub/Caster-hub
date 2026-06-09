export type ProfileId = 'entrepreneur' | 'investor' | 'student' | 'athlete' | 'custom'

export type ProfilePreset = {
  id: ProfileId
  name: string
  description: string
  focusBias: 'projects' | 'wealth' | 'learning' | 'health' | 'custom'
  widgets: string[]
}

export const profilePresets: ProfilePreset[] = [
  {
    id: 'entrepreneur',
    name: 'Entrepreneur',
    description: 'For builders, founders and people running multiple projects.',
    focusBias: 'projects',
    widgets: ['ai-focus', 'projects', 'goals', 'wealth', 'health'],
  },
  {
    id: 'investor',
    name: 'Investor',
    description: 'For users who want wealth, markets and long-term financial clarity first.',
    focusBias: 'wealth',
    widgets: ['ai-focus', 'wealth', 'goals', 'projects', 'health'],
  },
  {
    id: 'student',
    name: 'Student',
    description: 'For study, deadlines, learning plans and personal progress.',
    focusBias: 'learning',
    widgets: ['ai-focus', 'goals', 'projects', 'health', 'wealth'],
  },
  {
    id: 'athlete',
    name: 'Athlete',
    description: 'For performance, recovery, routines and progress tracking.',
    focusBias: 'health',
    widgets: ['ai-focus', 'health', 'goals', 'projects', 'wealth'],
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'A flexible setup where the user chooses the full dashboard structure.',
    focusBias: 'custom',
    widgets: ['ai-focus', 'goals', 'projects', 'wealth', 'gaming', 'health'],
  },
]

export function getProfilePreset(id: ProfileId = 'entrepreneur') {
  return profilePresets.find((profile) => profile.id === id) ?? profilePresets[0]
}
