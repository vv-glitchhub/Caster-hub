export const CASTER_CLOUD_TABLES = [
  'caster_vehicle_events',
  'caster_vehicle_profiles',
  'caster_trip_items',
  'caster_trips',
] as const

export type CasterCloudTable = typeof CASTER_CLOUD_TABLES[number]

export type VerifiedSupabaseContext = {
  url: string
  anonKey: string
  serviceRoleKey: string | null
  accessToken: string
  user: {
    id: string
    email?: string
  }
}

export class AccountApiError extends Error {
  status: number

  constructor(message: string, status = 400) {
    super(message)
    this.name = 'AccountApiError'
    this.status = status
  }
}

export async function verifySupabaseUser(request: Request): Promise<VerifiedSupabaseContext> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || null
  const authorization = request.headers.get('authorization') || ''
  const accessToken = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : ''

  if (!url || !anonKey) throw new AccountApiError('Caster cloud account services are not configured.', 503)
  if (!accessToken) throw new AccountApiError('A Supabase user access token is required.', 401)

  const response = await fetch(`${url}/auth/v1/user`, {
    method: 'GET',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) throw new AccountApiError('The Supabase session is invalid or expired.', 401)
  const user = await response.json() as { id?: string; email?: string }
  if (!user.id) throw new AccountApiError('Supabase did not return a verified user.', 401)

  return {
    url,
    anonKey,
    serviceRoleKey,
    accessToken,
    user: { id: user.id, email: user.email },
  }
}

export async function selectOwnedRows(context: VerifiedSupabaseContext, table: CasterCloudTable) {
  const response = await fetch(`${context.url}/rest/v1/${table}?select=*`, {
    method: 'GET',
    headers: userRestHeaders(context),
    cache: 'no-store',
  })

  if (!response.ok) {
    const detail = await safeError(response)
    throw new AccountApiError(`Unable to export ${table}: ${detail}`, response.status)
  }

  const rows = await response.json()
  if (!Array.isArray(rows)) throw new AccountApiError(`Unexpected export response for ${table}.`, 502)
  return rows
}

export async function deleteVerifiedAuthUser(context: VerifiedSupabaseContext) {
  if (!context.serviceRoleKey) throw new AccountApiError('Server-side account deletion is not configured.', 503)

  const response = await fetch(`${context.url}/auth/v1/admin/users/${encodeURIComponent(context.user.id)}`, {
    method: 'DELETE',
    headers: {
      apikey: context.serviceRoleKey,
      Authorization: `Bearer ${context.serviceRoleKey}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const detail = await safeError(response)
    throw new AccountApiError(`Supabase account deletion failed: ${detail}`, response.status)
  }
}

function userRestHeaders(context: VerifiedSupabaseContext) {
  return {
    apikey: context.anonKey,
    Authorization: `Bearer ${context.accessToken}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}

async function safeError(response: Response) {
  try {
    const payload = await response.json() as { message?: string; error?: string; msg?: string }
    return payload.message || payload.error || payload.msg || response.statusText
  } catch {
    return response.statusText || 'unknown error'
  }
}
