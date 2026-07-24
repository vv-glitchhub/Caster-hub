export type CasterLanguage = 'en' | 'fi' | 'es'
export type CasterTheme = 'system' | 'light' | 'dark'

export type CasterProfile = {
  version: 1
  displayName: string
  email: string
  language: CasterLanguage
  theme: CasterTheme
  homeApp: 'caster-hub' | 'scorecaster' | 'stockcaster' | 'carcaster' | 'travelcaster'
  notificationsEnabled: boolean
  updatedAt: string
}

export const CASTER_PROFILE_STORAGE_KEY = 'caster-shared-profile-v1'

export const defaultCasterProfile: CasterProfile = {
  version: 1,
  displayName: '',
  email: '',
  language: 'en',
  theme: 'system',
  homeApp: 'caster-hub',
  notificationsEnabled: true,
  updatedAt: new Date(0).toISOString(),
}

export function normalizeCasterProfile(input: Partial<CasterProfile> | null | undefined): CasterProfile {
  const language = input?.language === 'fi' || input?.language === 'es' ? input.language : 'en'
  const theme = input?.theme === 'light' || input?.theme === 'dark' ? input.theme : 'system'
  const allowedHomeApps = new Set<CasterProfile['homeApp']>([
    'caster-hub',
    'scorecaster',
    'stockcaster',
    'carcaster',
    'travelcaster',
  ])

  return {
    version: 1,
    displayName: String(input?.displayName || '').trim().slice(0, 80),
    email: String(input?.email || '').trim().toLowerCase().slice(0, 254),
    language,
    theme,
    homeApp: allowedHomeApps.has(input?.homeApp as CasterProfile['homeApp'])
      ? (input?.homeApp as CasterProfile['homeApp'])
      : 'caster-hub',
    notificationsEnabled: input?.notificationsEnabled !== false,
    updatedAt: typeof input?.updatedAt === 'string' && Number.isFinite(Date.parse(input.updatedAt))
      ? input.updatedAt
      : new Date().toISOString(),
  }
}

export function profileCompletion(profile: CasterProfile) {
  const completed = [profile.displayName, profile.email].filter(Boolean).length
  return Math.round((completed / 2) * 100)
}
