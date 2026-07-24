import { CASTER_PROFILE_STORAGE_KEY } from './caster-profile'

export const CASTER_LOCAL_DATA_VERSION = 1 as const

export const CASTER_LOCAL_STORAGE_KEYS = {
  profile: CASTER_PROFILE_STORAGE_KEY,
  carcasterFaults: 'caster.carcaster.faults',
  carcasterServices: 'caster.carcaster.services',
  travelcasterItems: 'caster.travelcaster.items',
  travelcasterBudget: 'caster.travelcaster.budget',
} as const

export type CasterLocalDataKey = keyof typeof CASTER_LOCAL_STORAGE_KEYS

export type CasterLocalExport = {
  product: 'caster-os'
  version: typeof CASTER_LOCAL_DATA_VERSION
  exportedAt: string
  data: Partial<Record<CasterLocalDataKey, unknown>>
}

export type ImportPreview = {
  valid: boolean
  keys: CasterLocalDataKey[]
  warnings: string[]
  bundle: CasterLocalExport | null
}

const allowedKeys = new Set<CasterLocalDataKey>(Object.keys(CASTER_LOCAL_STORAGE_KEYS) as CasterLocalDataKey[])

export function exportCasterLocalData(storage: Storage): CasterLocalExport {
  const data: Partial<Record<CasterLocalDataKey, unknown>> = {}

  for (const [name, storageKey] of Object.entries(CASTER_LOCAL_STORAGE_KEYS) as [CasterLocalDataKey, string][]) {
    const raw = storage.getItem(storageKey)
    if (raw === null) continue

    try {
      data[name] = JSON.parse(raw)
    } catch {
      data[name] = raw
    }
  }

  return {
    product: 'caster-os',
    version: CASTER_LOCAL_DATA_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  }
}

export function previewCasterImport(input: unknown): ImportPreview {
  const warnings: string[] = []

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { valid: false, keys: [], warnings: ['The selected file is not a Caster export object.'], bundle: null }
  }

  const candidate = input as Partial<CasterLocalExport>
  if (candidate.product !== 'caster-os') warnings.push('Product identifier is not caster-os.')
  if (candidate.version !== CASTER_LOCAL_DATA_VERSION) warnings.push(`Unsupported export version: ${String(candidate.version)}.`)
  if (!candidate.data || typeof candidate.data !== 'object' || Array.isArray(candidate.data)) warnings.push('Export data section is missing or invalid.')

  const keys = candidate.data && typeof candidate.data === 'object' && !Array.isArray(candidate.data)
    ? (Object.keys(candidate.data).filter((key): key is CasterLocalDataKey => allowedKeys.has(key as CasterLocalDataKey)))
    : []

  if (keys.length === 0) warnings.push('No recognized Caster data was found in the export.')

  const valid = candidate.product === 'caster-os'
    && candidate.version === CASTER_LOCAL_DATA_VERSION
    && Boolean(candidate.data && typeof candidate.data === 'object' && !Array.isArray(candidate.data))
    && keys.length > 0

  return {
    valid,
    keys,
    warnings,
    bundle: valid ? candidate as CasterLocalExport : null,
  }
}

export function importCasterLocalData(storage: Storage, bundle: CasterLocalExport) {
  const imported: CasterLocalDataKey[] = []

  for (const [name, value] of Object.entries(bundle.data) as [CasterLocalDataKey, unknown][]) {
    if (!allowedKeys.has(name) || value === undefined) continue
    storage.setItem(CASTER_LOCAL_STORAGE_KEYS[name], typeof value === 'string' ? value : JSON.stringify(value))
    imported.push(name)
  }

  return imported
}

export function clearCasterLocalData(storage: Storage) {
  for (const storageKey of Object.values(CASTER_LOCAL_STORAGE_KEYS)) storage.removeItem(storageKey)
}
