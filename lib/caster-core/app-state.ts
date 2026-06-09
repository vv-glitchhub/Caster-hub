export const appState = {
  goals: [
    { title: 'Caster OS Proto', progress: 78, area: 'core' as const },
    { title: 'Golf Progress', progress: 32, area: 'life' as const },
    { title: 'Wealth Goal', progress: 41, area: 'wealth' as const },
  ],
  projects: [
    { title: 'Caster OS', status: 'active' as const, impact: 'high' as const },
    { title: 'Scorecaster', status: 'active' as const, impact: 'high' as const },
    { title: 'Stockcaster', status: 'planned' as const, impact: 'medium' as const },
    { title: 'Relaxcaster', status: 'planned' as const, impact: 'medium' as const },
  ],
  health: {
    state: 'good' as const,
  },
}

export type AppState = typeof appState
