import type { LandcasterPropertyType } from './landcaster-statfin'

export const LANDCASTER_AREA_SCORE_V2_MODEL = 'area_score_v2_paavo_2026_02'
const LANDCASTER_V2_PUBLIC_API = 'https://rsukfxhgqzpofiszjtbf.supabase.co/functions/v1/landcaster-v2-public'

export type LandcasterFundamentals = {
  postal_code: string
  statistical_year: number
  population: number | null
  average_age: number | null
  young_adults_20_39: number | null
  working_age_20_64: number | null
  seniors_65_plus: number | null
  adults_18_plus: number | null
  average_income_eur: number | null
  median_income_eur: number | null
  purchasing_power_eur: number | null
  employed: number | null
  unemployed: number | null
  students: number | null
  pensioners: number | null
  workplaces_total: number | null
  services_workplaces: number | null
  employment_rate_pct: number | null
  unemployment_rate_pct: number | null
  young_adult_share_pct: number | null
  working_age_share_pct: number | null
  workplace_per_100_residents: number | null
  as_of: string
  provenance: Record<string, unknown>
}

export type LandcasterAreaScoreV2 = {
  postal_code: string
  property_type: LandcasterPropertyType
  market_period_end: string
  fundamentals_year: number
  market_score: number
  fundamentals_score: number
  income_score: number
  employment_score: number
  demographic_score: number
  workplace_score: number
  area_score_v2: number
  confidence_pct: number
  latest_price_per_sqm: number | null
  sample_size: number | null
  model_version: string
  evidence: Record<string, unknown>
}

export type LandcasterAreaV2Response = {
  area: { postalCode: string; name: string; municipality: string }
  score: LandcasterAreaScoreV2 | null
  fundamentals: LandcasterFundamentals
  source: { provider: string; dataset: string; tables: string[]; caveat: string }
}

export type LandcasterRankingV2Response = {
  propertyType: LandcasterPropertyType
  ranking: Array<{
    postalCode: string
    name: string
    municipality: string
    areaScoreV2: number
    marketScore: number
    fundamentalsScore: number
    incomeScore: number
    employmentScore: number
    demographicScore: number
    workplaceScore: number
    confidencePct: number
    pricePerSqm: number | null
    sales: number | null
    fundamentalsYear: number
    marketPeriodEnd: string
  }>
  modelVersion: string
  methodology: string
  caveat: string
}

async function fetchPublic<T>(params: URLSearchParams): Promise<T> {
  const response = await fetch(`${LANDCASTER_V2_PUBLIC_API}?${params.toString()}`, {
    next: { revalidate: 21_600 },
    headers: { Accept: 'application/json' },
  })
  const text = await response.text()
  if (!response.ok) {
    let message = `Landcaster V2 data endpoint returned ${response.status}`
    try {
      const parsed = JSON.parse(text) as { error?: string }
      if (parsed.error) message = parsed.error
    } catch {
      // Preserve the HTTP-level error when the upstream payload is not JSON.
    }
    throw new Error(message)
  }
  return JSON.parse(text) as T
}

export async function getAreaIntelligenceV2(postalCode: string, propertyType: LandcasterPropertyType) {
  return fetchPublic<LandcasterAreaV2Response>(new URLSearchParams({
    mode: 'area',
    postalCode,
    propertyType,
  }))
}

export async function getFinlandAreaRankingV2(propertyType: LandcasterPropertyType, limit = 12) {
  const safeLimit = Math.max(1, Math.min(30, Math.round(limit)))
  return fetchPublic<LandcasterRankingV2Response>(new URLSearchParams({
    mode: 'ranking',
    propertyType,
    limit: String(safeLimit),
  }))
}
