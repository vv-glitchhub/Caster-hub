import { getSupabaseConfig } from './supabase'
import { searchPostalAreas, type LandcasterPropertyType } from './landcaster-statfin'

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

async function publicRest<T>(path: string): Promise<T> {
  const { url, anonKey } = getSupabaseConfig()
  if (!url || !anonKey) throw new Error('Landcaster V2 data store is not configured')

  const response = await fetch(`${url}/rest/v1/${path}`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      Accept: 'application/json',
    },
    next: { revalidate: 21_600 },
  })

  if (!response.ok) throw new Error(`Landcaster V2 data store returned ${response.status}`)
  return response.json() as Promise<T>
}

export async function getAreaIntelligenceV2(postalCode: string, propertyType: LandcasterPropertyType) {
  const scorePath = `landcaster_area_score_v2_snapshots?select=postal_code,property_type,market_period_end,fundamentals_year,market_score,fundamentals_score,income_score,employment_score,demographic_score,workplace_score,area_score_v2,confidence_pct,latest_price_per_sqm,sample_size,model_version,evidence&postal_code=eq.${encodeURIComponent(postalCode)}&property_type=eq.${encodeURIComponent(propertyType)}&order=market_period_end.desc&limit=1`
  const fundamentalsPath = `landcaster_paavo_fundamentals_v1?select=postal_code,statistical_year,population,average_age,young_adults_20_39,working_age_20_64,seniors_65_plus,adults_18_plus,average_income_eur,median_income_eur,purchasing_power_eur,employed,unemployed,students,pensioners,workplaces_total,services_workplaces,employment_rate_pct,unemployment_rate_pct,young_adult_share_pct,working_age_share_pct,workplace_per_100_residents,as_of,provenance&postal_code=eq.${encodeURIComponent(postalCode)}&order=statistical_year.desc&limit=1`

  const [scores, fundamentals, postal] = await Promise.all([
    publicRest<LandcasterAreaScoreV2[]>(scorePath),
    publicRest<LandcasterFundamentals[]>(fundamentalsPath),
    searchPostalAreas(postalCode, 1),
  ])

  if (!fundamentals[0]) throw new Error('Paavo-fundamentals were not available for this postal area')

  return {
    area: postal.matches[0] ?? { postalCode, label: postalCode, name: postalCode, municipality: '' },
    score: scores[0] ?? null,
    fundamentals: fundamentals[0],
    source: {
      provider: 'Statistics Finland',
      dataset: 'Paavo — Open data by postal code area',
      tables: ['12ey', '12f1', '12f5', '12f6'],
      caveat: 'Area Score V2 uses the latest Paavo cross-section. Postal-area classifications can change between years, so Landcaster does not infer historical Paavo trends by postal code.',
    },
  }
}

export async function getFinlandAreaRankingV2(propertyType: LandcasterPropertyType, limit = 12) {
  const safeLimit = Math.max(1, Math.min(30, Math.round(limit)))
  const path = `landcaster_area_score_v2_snapshots?select=postal_code,property_type,market_period_end,fundamentals_year,market_score,fundamentals_score,income_score,employment_score,demographic_score,workplace_score,area_score_v2,confidence_pct,latest_price_per_sqm,sample_size,model_version,evidence&property_type=eq.${encodeURIComponent(propertyType)}&confidence_pct=gte.50&order=area_score_v2.desc&limit=${safeLimit}`
  const scores = await publicRest<LandcasterAreaScoreV2[]>(path)

  const ranking = await Promise.all(scores.map(async (score) => {
    const postal = await searchPostalAreas(score.postal_code, 1)
    const match = postal.matches[0]
    return {
      postalCode: score.postal_code,
      name: match?.name ?? score.postal_code,
      municipality: match?.municipality ?? '',
      areaScoreV2: score.area_score_v2,
      marketScore: score.market_score,
      fundamentalsScore: score.fundamentals_score,
      incomeScore: score.income_score,
      employmentScore: score.employment_score,
      demographicScore: score.demographic_score,
      workplaceScore: score.workplace_score,
      confidencePct: score.confidence_pct,
      pricePerSqm: score.latest_price_per_sqm,
      sales: score.sample_size,
      fundamentalsYear: score.fundamentals_year,
      marketPeriodEnd: score.market_period_end,
    }
  }))

  return {
    propertyType,
    ranking,
    modelVersion: scores[0]?.model_version ?? 'area_score_v2_paavo_2026_01',
    methodology: '50 % market signal + 50 % Paavo fundamentals. Fundamentals: employment 35 %, median income 30 %, demographic demand 20 %, workplace intensity 15 %. Inputs are ranked as nationwide cross-sectional percentiles.',
    caveat: 'Area Score V2 is an explainable comparison score, not a house-price forecast or investment recommendation.',
  }
}
