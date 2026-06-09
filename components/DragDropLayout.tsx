'use client'

import { useEffect, useState } from 'react'
import { getDashboardWidgets } from '../lib/caster-core/widget-engine'
import { readMemory, updateMemory, type WidgetLayoutItem } from '../lib/caster-core/memory'

export default function DragDropLayout() {
  const [layout, setLayout] = useState<WidgetLayoutItem[]>([])
  const [draggedId, setDraggedId] = useState<string | null>(null)

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

  function reorder(targetId: string) {
    if (!draggedId || draggedId === targetId) return

    const sorted = [...layout].sort((a, b) => a.order - b.order)
    const draggedIndex = sorted.findIndex((item) => item.id === draggedId)
    const targetIndex = sorted.findIndex((item) => item.id === targetId)

    if (draggedIndex < 0 || targetIndex < 0) return

    const next = [...sorted]
    const [draggedItem] = next.splice(draggedIndex, 1)
    next.splice(targetIndex, 0, draggedItem)

    const normalized = next.map((item, index) => ({ ...item, order: index + 1 }))
    setLayout(normalized)
    updateMemory({ widgetLayout: normalized })
    window.dispatchEvent(new Event('caster-memory-updated'))
    setDraggedId(null)
  }

  const widgets = getDashboardWidgets()
  const sortedLayout = [...layout]
    .sort((a, b) => a.order - b.order)
    .filter((item) => item.id !== 'ai-focus')

  return (
    <div className="dashboard-preview min-h-0">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Drag & Drop Layout V1</p>
          <h2 className="mt-4 text-3xl font-semibold">Reorder dashboard</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/52">
            Drag a widget row and drop it onto another row. The order is saved to Layout Memory.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/55">
          prototype
        </span>
      </div>

      <div className="mt-8 space-y-3">
        {sortedLayout.map((item) => {
          const widget = widgets.find((entry) => entry.id === item.id)
          if (!widget) return null

          return (
            <div
              key={item.id}
              draggable
              onDragStart={() => setDraggedId(item.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => reorder(item.id)}
              className={`preview-row cursor-grab active:cursor-grabbing ${draggedId === item.id ? 'border-blue-200/50 bg-blue-400/10' : ''}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">☰ {widget.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/38">{item.size} · order {item.order}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/35">drag</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
