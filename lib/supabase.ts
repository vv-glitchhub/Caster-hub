type SupabaseConfig = {
  url?: string
  anonKey?: string
  isConfigured: boolean
}

export function getSupabaseConfig(): SupabaseConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey),
  }
}

export function getSupabaseStatus() {
  const config = getSupabaseConfig()

  if (!config.isConfigured) {
    return {
      connected: false,
      label: 'Local memory mode',
      detail: 'Supabase environment variables are not configured yet.',
    }
  }

  return {
    connected: true,
    label: 'Supabase ready',
    detail: 'Supabase environment variables are configured.',
  }
}
