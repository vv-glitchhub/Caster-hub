import { NextResponse } from 'next/server'
import { loadMemories, saveMemory } from '../../../lib/memory-service'

export async function GET() {
  const memories = await loadMemories()

  return NextResponse.json(memories)
}

export async function POST(request: Request) {
  const body = await request.json()

  const saved = await saveMemory({
    category: body.category ?? 'agent',
    title: body.title ?? 'Untitled memory',
    value: body.value ?? '',
    confidence: Number(body.confidence ?? 0.75),
  })

  return NextResponse.json(saved)
}
