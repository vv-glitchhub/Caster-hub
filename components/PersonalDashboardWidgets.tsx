'use client'

import { useEffect, useMemo, useState } from 'react'
import { getDashboardWidgets, type DashboardWidget } from '../lib/caster-core/widget-engine'
import { readMemory, type WidgetLayoutItem } from '../lib/caster-core/memory'
import WidgetCard from './widgets/WidgetCard'

export default function PersonalDashboardWidgets() {
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([])
  const [layout, setLayout] = useState<WidgetLayoutItem[]>([])

  useEffect(() => {
    function syncMemory() {
      const memory = readMemory()
      setSelectedWidgets(memory.selectedWidgets)
      setLayout(memory.widgetLayout)
    }

    syncMemory()
    window.addEventListener('caster-memory-updated', syncMemory)
    window.addEventListener('storage', syncMemory)

    return () => {
      window.removeEventListener('caster-memory-updated', syncMemory)
      window.removeEventListener('storage', syncMemory)
    }
  }, [])

  const widgets = useMemo(() => {
    const allWidgets = getDashboardWidgets().filter((widget) => widget.id !== 'ai-focus')
    const activeIds = selectedWidgets.length ? selectedWidgets.filter((id) => id !== 'ai-focus') : allWidgets.map((widget) => widget.id)

    const orderedIds = [...layout]
      .sort((a, b) => a.order - b.order)
      .map((item) => item.id)
      .filter((id) => activeIds.includes(id))

    const missingActiveIds = activeIds.filter((id) => !orderedIds.includes(id))
    const finalIds = [...orderedIds, ...missingActiveIds]

    return finalIds
      .map((id) => {
        const widget = allWidgets.find((entry) => entry.id === id)
        const layoutItem = layout.find((item) => item.id === id)
        if (!widget) return null
        return {
          ...widget,
          size: layoutItem?.size ?? widget.size,
        }
      })
      .filter(Boolean) as DashboardWidget[]
  }, [selectedWidgets, layout])

  const mediumWidgets = widgets.filter((widget) => widget.size === 'medium')
  const smallWidgets = widgets.filter((widget) => widget.size === 'small')

  return (
    <>
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        {mediumWidgets.map((widget) => (
          <WidgetCard key={widget.id} widget={widget} />
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        {smallWidgets.map((widget) => (
          <WidgetCard key={widget.id} widget={widget} />
        ))}
      </section>
    </>
  )
}
