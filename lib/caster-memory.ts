export type CasterMemoryCategory = 'profile' | 'goal' | 'project' | 'preference' | 'widget' | 'agent'

export type CasterMemoryItem = {
  id: string
  category: CasterMemoryCategory
  title: string
  value: string
  confidence: number
  updatedAt: string
}

export const defaultCasterMemory: CasterMemoryItem[] = [
  {
    id: 'profile-founder',
    category: 'profile',
    title: 'Primary profile',
    value: 'Founder building Caster OS as a premium personal AI ecosystem.',
    confidence: 0.92,
    updatedAt: '2026-06-09',
  },
  {
    id: 'project-caster-os',
    category: 'project',
    title: 'Caster OS',
    value: 'Unify Life, Wealth, Gaming, Health and Agent modules into one operating system.',
    confidence: 0.95,
    updatedAt: '2026-06-09',
  },
  {
    id: 'preference-premium-ui',
    category: 'preference',
    title: 'Design direction',
    value: 'Luxury technology, cinematic UI, Apple/Ferrari-level visual quality.',
    confidence: 0.9,
    updatedAt: '2026-06-09',
  },
  {
    id: 'agent-next-step',
    category: 'agent',
    title: 'Next development phase',
    value: 'Move from premium UI into Supabase memory and a real AI agent.',
    confidence: 0.88,
    updatedAt: '2026-06-09',
  },
]

export function getCasterMemory(): CasterMemoryItem[] {
  return defaultCasterMemory
}

export function getMemoryByCategory(category: CasterMemoryCategory): CasterMemoryItem[] {
  return defaultCasterMemory.filter((item) => item.category === category)
}

export function createMemorySummary(items: CasterMemoryItem[] = defaultCasterMemory): string {
  return items.map((item) => `${item.title}: ${item.value}`).join('\n')
}
