import { getSupabaseConfig } from './supabase'

export type SupabaseReadiness = {
  ready: boolean
  mode: 'local' | 'supabase'
  detail: string
}

export function getSupabaseReadiness(): SupabaseReadiness {
  const config = getSupabaseConfig()

  if (!config.isConfigured) {
    return {
      ready: false,
      mode: 'local',
      detail: 'Caster OS is using local memory until Supabase configuration is added.',
    }
  }

  return {
    ready: true,
    mode: 'supabase',
    detail: 'Caster OS can switch memory reads and writes to Supabase.',
  }
}
