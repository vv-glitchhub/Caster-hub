'use client'

import { useEffect, useState } from 'react'
import { getAgentContext } from '../lib/caster-core/agent-context'

type AgentContext = ReturnType<typeof getAgentContext>

export default function AgentContextPanel() {
  const [context, setContext] = useState<AgentContext | null>(null)

  useEffect(() => {
    function syncContext() {
      setContext(getAgentContext())
    }

    syncContext()
    window.addEventListener('caster-memory-updated', syncContext)
    window.addEventListener('storage', syncContext)

    return () => {
      window.removeEventListener('caster-memory-updated', syncContext)
      window.removeEventListener('storage', syncContext)
    }
  }, [])

  if (!context) return null

  return (
    <div className="dashboard-preview min-h-0">
      <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Agent Context</p>
      <h2 className="mt-5 text-3xl font-semibold">What Caster sees</h2>
      <p className="mt-3 text-sm leading-6 text-white/52">
        This is the first real context layer for the future AI Agent.
      </p>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        <div className="preview-row">
          <p className="text-xs uppercase tracking-[0.24em] text-white/38">Profile</p>
          <p className="mt-2 font-semibold text-white">{context.profile.name}</p>
          <p className="mt-1 text-sm text-white/45">Bias: {context.profile.focusBias}</p>
        </div>
        <div className="preview-row">
          <p className="text-xs uppercase tracking-[0.24em] text-white/38">Widgets</p>
          <p className="mt-2 font-semibold text-white">{context.summary.selectedWidgets} selected</p>
          <p className="mt-1 text-sm text-white/45">Memory layer active</p>
        </div>
        <div className="preview-row">
          <p className="text-xs uppercase tracking-[0.24em] text-white/38">Projects</p>
          <p className="mt-2 font-semibold text-white">{context.summary.activeProjects} active</p>
          <p className="mt-1 text-sm text-white/45">{context.projects.map((project) => project.title).join(', ')}</p>
        </div>
        <div className="preview-row">
          <p className="text-xs uppercase tracking-[0.24em] text-white/38">Goals</p>
          <p className="mt-2 font-semibold text-white">{context.summary.goalCount} tracked</p>
          <p className="mt-1 text-sm text-white/45">Health: {context.health.state}</p>
        </div>
      </div>
    </div>
  )
}
