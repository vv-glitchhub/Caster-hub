'use client'

import { useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function AutonomyRefresh({ intervalMs = 30000 }: { intervalMs?: number }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const timer = window.setInterval(() => {
      startTransition(() => router.refresh())
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [intervalMs, router, startTransition])

  function refreshNow() {
    startTransition(() => router.refresh())
  }

  return (
    <article className="home-module-card min-h-0" aria-live="polite">
      <p className="home-module-label">Autonomous Watch</p>
      <h3 className="home-module-title">30-second control loop.</h3>
      <p className="home-module-text">
        Caster re-checks connected production apps, recalculates readiness and reprioritizes the action queue automatically.
      </p>
      <button className="secondary-button" type="button" onClick={refreshNow} disabled={isPending}>
        {isPending ? 'Refreshing…' : 'Refresh now'}
      </button>
    </article>
  )
}
