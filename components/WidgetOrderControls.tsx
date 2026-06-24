'use client'

import { useEffect, useState } from 'react'
import { readMemory, updateMemory, type WidgetLayoutItem } from '../lib/caster-core/memory'
import { getDashboardWidgets } from '../lib/caster-core/widget-engine'

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
    <div className="premium-control-panel">
      <div className="premium-control-head">
        <div>
          <p className="home-module-label">Layout Memory V1</p>
          <h2>Widget order</h2>
          <p>Move widgets up or down. This prepares the system for drag and drop layout editing.</p>
        </div>
        <span>saved locally</span>
      </div>

      <div className="premium-order-list">
        {sortedLayout.map((item) => {
          const widget = widgets.find((entry) => entry.id === item.id)
          if (!widget) return null

          return (
            <div key={item.id} className="premium-order-row">
              <div>
                <strong>{widget.title}</strong>
                <span>{item.size} · order {item.order}</span>
              </div>
              <div className="premium-order-actions">
                <button type="button" onClick={() => move(item.id, 'up')} aria-label={`Move ${widget.title} up`}>↑</button>
                <button type="button" onClick={() => move(item.id, 'down')} aria-label={`Move ${widget.title} down`}>↓</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
