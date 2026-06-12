import { CasterMemoryCategory, CasterMemoryItem, defaultCasterMemory } from './caster-memory'
import { getSupabaseStatus } from './supabase'

export type MemoryServiceResult<T> = {
  data: T
  source: 'local' | 'supabase'
  connected: boolean
}

type SupabaseMemoryRow = {
  id: string
  category: string
  title: string
  value: string
  confidence: number
  updated_at: string
}

function isMemoryCategory(category: string): category is CasterMemoryCategory {
  return ['profile', 'goal', 'project', 'preference', 'widget', 'agent'].includes(category)
}

export function mapSupabaseMemoryRow(row: SupabaseMemoryRow): CasterMemoryItem {
  return {
    id: row.id,
    category: isMemoryCategory(row.category) ? row.category : 'agent',
    title: row.title,
    value: row.value,
    confidence: Number(row.confidence ?? 0.75),
    updatedAt: row.updated_at,
  }
}

export async function loadMemories(): Promise<MemoryServiceResult<CasterMemoryItem[]>> {
  const status = getSupabaseStatus()

  if (!status.connected) {
    return {
      data: defaultCasterMemory,
      source: 'local',
      connected: false,
    }
  }

  // Supabase environment variables are configured, but the live client is intentionally
  // kept behind this service so the UI stays stable while the database connection is added.
  return {
    data: defaultCasterMemory,
    source: 'supabase',
    connected: true,
  }
}

export async function saveMemory(memory: Omit<CasterMemoryItem, 'id' | 'updatedAt'>): Promise<MemoryServiceResult<CasterMemoryItem>> {
  const status = getSupabaseStatus()
  const savedMemory: CasterMemoryItem = {
    ...memory,
    id: `memory-${Date.now()}`,
    updatedAt: new Date().toISOString(),
  }

  return {
    data: savedMemory,
    source: status.connected ? 'supabase' : 'local',
    connected: status.connected,
  }
}

export async function loadMemorySummary(): Promise<MemoryServiceResult<string>> {
  const memories = await loadMemories()

  return {
    data: memories.data.map((item) => `${item.title}: ${item.value}`).join('\n'),
    source: memories.source,
    connected: memories.connected,
  }
}
