'use client'

import { useEffect, useMemo, useState } from 'react'
import { getDashboardWidgets } from '../lib/caster-core/widget-engine'
import { readMemory } from '../lib/caster-core/memory'
import WidgetCard from './widgets/WidgetCard'

export default function PersonalDashboardWidgets() {
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

  const widgets = useMemo(() => {
    const allWidgets = getDashboardWidgets().filter((widget) => widget.id !== 'ai-focus')
    if (!selectedWidgets.length) return allWidgets

    return selectedWidgets
      .filter((id) => id !== 'ai-focus')
      .map((id) => allWidgets.find((widget) => widget.id === id))
      .filter(Boolean) as typeof allWidgets
  }, [selectedWidgets])

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
