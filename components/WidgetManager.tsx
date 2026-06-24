'use client'

import { useEffect, useState } from 'react'
import { readMemory, updateMemory } from '../lib/caster-core/memory'
import { getDashboardWidgets } from '../lib/caster-core/widget-engine'

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
    <div className="premium-control-panel">
      <div className="premium-control-head">
        <div>
          <p className="home-module-label">Widget Engine V2</p>
          <h2>Add or remove widgets</h2>
          <p>
            This is the first customizable dashboard layer. Changes are saved locally for the prototype.
          </p>
        </div>
        <span>{selectedWidgets.length} active</span>
      </div>

      <div className="premium-option-grid widget-option-grid">
        {widgets.map((widget) => {
          const active = selectedWidgets.includes(widget.id)
          const locked = widget.id === 'ai-focus'

          return (
            <button
              key={widget.id}
              type="button"
              onClick={() => toggleWidget(widget.id)}
              className={active || locked ? 'premium-option active' : 'premium-option'}
            >
              <strong>{widget.title}</strong>
              <span>{locked ? 'locked' : active ? 'active' : 'hidden'}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
