'use client'

import { useEffect, useState } from 'react'

type FocusState = {
  greeting: string
  title: string
  focus: string
  confidence: string
  reason: string
  next: string
}

function getFocusState(hour: number): FocusState {
  if (hour >= 5 && hour < 12) {
    return {
      greeting: 'Good Morning',
      title: "Today's Focus",
      focus: 'Start with the highest-impact task.',
      confidence: 'High',
      reason: 'Morning is best for building, planning and making clear decisions.',
      next: 'Open your main project and finish one visible milestone.',
    }
  }

  if (hour >= 12 && hour < 17) {
    return {
      greeting: 'Good Afternoon',
      title: 'Current Priority',
      focus: 'Continue the task that moves the system forward.',
      confidence: 'High',
      reason: 'The middle of the day is best for execution and keeping momentum.',
      next: 'Check progress, remove distractions and complete the next block.',
    }
  }

  if (hour >= 17 && hour < 22) {
    return {
      greeting: 'Good Evening',
      title: "Today's Reflection",
      focus: 'Review what moved forward today.',
      confidence: 'Medium',
      reason: 'Evening is better for review, lighter planning and preparing tomorrow.',
      next: 'Write the next milestone and leave the system ready for tomorrow.',
    }
  }

  return {
    greeting: 'Working Late?',
    title: 'Night Mode',
    focus: 'Keep the session light and protect recovery.',
    confidence: 'Medium',
    reason: 'Late work is useful only if it stays controlled and does not harm tomorrow.',
    next: 'Finish one small task, then stop.',
  }
}

export default function TimeAwareFocus() {
  const [state, setState] = useState<FocusState>(() => getFocusState(12))

  useEffect(() => {
    setState(getFocusState(new Date().getHours()))
  }, [])

  return (
    <div className="dashboard-preview min-h-0">
      <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">AI Focus</p>
      <h2 className="mt-5 text-5xl font-semibold tracking-tight">{state.greeting}</h2>
      <p className="mt-4 text-sm uppercase tracking-[0.32em] text-white/42">{state.title}</p>
      <p className="mt-5 max-w-3xl text-2xl font-semibold leading-8 text-white/88">{state.focus}</p>
      <p className="mt-4 max-w-3xl text-base leading-7 text-white/58">{state.reason}</p>
      <div className="mt-8 grid gap-3 md:grid-cols-3">
        <div className="preview-row">Confidence: {state.confidence}</div>
        <div className="preview-row">Context: Local time</div>
        <div className="preview-row">Next: {state.next}</div>
      </div>
    </div>
  )
}
