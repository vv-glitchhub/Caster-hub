'use client'

import { useEffect, useState } from 'react'
import { getDashboardWidgets } from '../lib/caster-core/widget-engine'
import { readMemory, updateMemory } from '../lib/caster-core/memory'

export default function WidgetManager() {
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([])

  useEffect(() => {
    function syncMemory() {
      setSelectedWidgets(readMemory().selectedWidgets)
    }

    syncMemory()
    window.addEventListener('caster-memory-updated', syncMemory)
    window.addEventListener('storage', syncMemory)

    return () => {
      window.removeEventListener('caster-memory-updated', syncMemory)
      window.removeEventListener('storage', syncMemory)
    }
  }, [])

  function toggleWidget(widgetId: string) {
    if (widgetId === 'ai-focus') return

    const nextWidgets = selectedWidgets.includes(widgetId)
      ? selectedWidgets.filter((id) => id !== widgetId)
      : [...selectedWidgets, widgetId]

    setSelectedWidgets(nextWidgets)
    updateMemory({ selectedWidgets: nextWidgets })
    window.dispatchEvent(new Event('caster-memory-updated'))
  }

  const widgets = getDashboardWidgets()

  return (
    <div className="dashboard-preview min-h-0">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Widget Engine V2</p>
          <h2 className="mt-4 text-3xl font-semibold">Add or remove widgets</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/52">
            This is the first customizable dashboard layer. Changes are saved locally for the prototype.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/55">
          {selectedWidgets.length} active
        </span>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
        {widgets.map((widget) => {
          const active = selectedWidgets.includes(widget.id)
          const locked = widget.id === 'ai-focus'

          return (
            <button
              key={widget.id}
              type="button"
              onClick={() => toggleWidget(widget.id)}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                active || locked
                  ? 'border-blue-200/50 bg-blue-400/15 text-white'
                  : 'border-white/10 bg-white/[0.04] text-white/60 hover:border-blue-200/30 hover:bg-white/[0.07]'
              }`}
            >
              <p className="text-sm font-semibold">{widget.title}</p>
              <p className="mt-2 text-xs leading-5 opacity-70">{locked ? 'locked' : active ? 'active' : 'hidden'}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
