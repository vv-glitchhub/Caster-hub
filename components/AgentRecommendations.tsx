'use client'

import { useEffect, useState } from 'react'
import { readMemory } from '../lib/caster-core/memory'
import { getRecommendations, type Recommendation } from '../lib/caster-core/recommendation-engine'

const areaTone: Record<Recommendation['area'], string> = {
  core: 'text-blue-200/70',
  life: 'text-white/70',
  wealth: 'text-yellow-200/70',
  gaming: 'text-emerald-200/70',
  health: 'text-pink-200/70',
  utility: 'text-cyan-200/70',
}

export default function AgentRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  useEffect(() => {
    function syncRecommendations() {
      setRecommendations(getRecommendations(readMemory()))
    }

    syncRecommendations()
    window.addEventListener('caster-memory-updated', syncRecommendations)
    window.addEventListener('storage', syncRecommendations)

    return () => {
      window.removeEventListener('caster-memory-updated', syncRecommendations)
      window.removeEventListener('storage', syncRecommendations)
    }
  }, [])

  return (
    <div className="dashboard-preview min-h-0">
      <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Dynamic Recommendations</p>
      <h2 className="mt-5 text-3xl font-semibold">What Caster recommends</h2>
      <p className="mt-3 text-sm leading-6 text-white/52">
        Generated from profile, memory, goals, projects and the Focus Engine.
      </p>

      <div className="mt-8 space-y-3">
        {recommendations.map((item) => (
          <div key={`${item.area}-${item.title}`} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
            <p className={`text-xs uppercase tracking-[0.28em] ${areaTone[item.area]}`}>{item.area}</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/52">{item.reason}</p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
              {item.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
