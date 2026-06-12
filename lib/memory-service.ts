import { CasterMemoryItem, defaultCasterMemory } from './caster-memory'
import { getSupabaseStatus } from './supabase'

export type MemoryServiceResult<T> = {
  data: T
  source: 'local' | 'supabase'
  connected: boolean
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
