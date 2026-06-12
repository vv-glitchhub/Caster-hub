import { loadMemorySummary } from './memory-service'

export type AgentRecommendation = {
  title: string
  reason: string
  confidence: number
  nextAction: string
}

export async function generateAgentRecommendations(): Promise<AgentRecommendation[]> {
  const memory = await loadMemorySummary()

  const base: AgentRecommendation[] = [
    {
      title: 'Ship one visible improvement',
      reason: 'Caster OS is in launch polish mode, so visible quality improvements create the highest value right now.',
      confidence: 0.88,
      nextAction: 'Review one page and remove unnecessary content.',
    },
    {
      title: 'Connect real memory next',
      reason: `Current memory source is ${memory.source}. The next product leap is persistent memory.`,
      confidence: 0.86,
      nextAction: 'Connect Supabase tables to memory-service.ts.',
    },
    {
      title: 'Keep the interface quiet',
      reason: 'The premium direction depends on fewer competing elements and stronger hierarchy.',
      confidence: 0.82,
      nextAction: 'Limit every page to 3 to 5 main visible concepts.',
    },
  ]

  return base
}

export async function createAgentBrief(): Promise<string> {
  const memory = await loadMemorySummary()
  const recommendations = await generateAgentRecommendations()

  return [
    'Caster Agent Brief',
    '',
    'Memory:',
    memory.data,
    '',
    'Recommendations:',
    ...recommendations.map((item, index) => `${index + 1}. ${item.title} — ${item.nextAction}`),
  ].join('\n')
}
