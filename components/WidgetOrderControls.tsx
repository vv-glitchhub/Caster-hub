'use client'

import { useEffect, useState } from 'react'
import { getDashboardWidgets } from '../lib/caster-core/widget-engine'
import { readMemory, updateMemory, type WidgetLayoutItem } from '../lib/caster-core/memory'

export default function WidgetOrderControls() {
  const [layout, setLayout] = useState<WidgetLayoutItem[]>([])

  useEffect(() => {
    function syncMemory() {
      setLayout(readMemory().widgetLayout)
    }

    syncMemory()
    window.addEventListener('caster-memory-updated', syncMemory)
    window.addEventListener('storage', syncMemory)

    return () => {
      window.removeEventListener('caster-memory-updated', syncMemory)
      window.removeEventListener('storage', syncMemory)
    }
  }, [])

  function move(widgetId: string, direction: 'up' | 'down') {
    const sorted = [...layout].sort((a, b) => a.order - b.order)
    const index = sorted.findIndex((item) => item.id === widgetId)
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    if (index < 0 || targetIndex < 0 || targetIndex >= sorted.length) return

    const next = [...sorted]
    const current = next[index]
    const target = next[targetIndex]

    next[index] = { ...target, order: current.order }
    next[targetIndex] = { ...current, order: target.order }

    const normalized = next.sort((a, b) => a.order - b.order).map((item, itemIndex) => ({
      ...item,
      order: itemIndex + 1,
    }))

    setLayout(normalized)
    updateMemory({ widgetLayout: normalized })
    window.dispatchEvent(new Event('caster-memory-updated'))
  }

  const widgets = getDashboardWidgets()
  const sortedLayout = [...layout].sort((a, b) => a.order - b.order).filter((item) => item.id !== 'ai-focus')

  return (
    <div className="dashboard-preview min-h-0">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Layout Memory V1</p>
          <h2 className="mt-4 text-3xl font-semibold">Widget order</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/52">
            Move widgets up or down. This prepares the system for drag and drop layout editing.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/55">
          saved locally
        </span>
      </div>

      <div className="mt-8 space-y-3">
        {sortedLayout.map((item) => {
          const widget = widgets.find((entry) => entry.id === item.id)
          if (!widget) return null

          return (
            <div key={item.id} className="preview-row flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-white">{widget.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/38">{item.size} · order {item.order}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => move(item.id, 'up')}
                  className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:border-blue-200/40 hover:text-white"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(item.id, 'down')}
                  className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:border-blue-200/40 hover:text-white"
                >
                  ↓
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
