import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

const STATFIN_POSTAL_URL = 'https://pxweb2.stat.fi/PxWeb/api/v1/en/StatFin/ashi/13mt.px'
const STATFIN_MUNICIPALITY_URL = 'https://pxweb2.stat.fi/PxWeb/api/v1/en/StatFin/ashi/13mx.px'
const SOURCE_ID = 'statfin_housing_prices'
const MODEL_VERSION = 'area_score_v1'
const TEMP_SYNC_SECRET = '5paRuvD4E58Wnc1ITGt5XmuQuJ6fXeKMTjU6BhJHMg4'

type PxVariable = {
  code: string
  text: string
  values: string[]
  valueTexts: string[]
}

type PxMetadata = {
  title?: string
  updated?: string
  variables: PxVariable[]
}

type JsonStatDimension = {
  category?: {
    index?: string[] | Record<string, number>
    label?: Record<string, string>
  }
}

type JsonStat2 = {
  id?: string[]
  size?: number[]
  dimension: Record<string, JsonStatDimension>
  value: Array<number | null> | Record<string, number | null>
}

type FlatRecord = {
  dims: Record<string, string>
  labels: Record<string, string>
  value: number | null
}

const highAspCities = new Set(['Espoo', 'Helsinki', 'Kauniainen', 'Oulu', 'Tampere', 'Turku', 'Vantaa'])

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value))
}

function findVariable(meta: PxMetadata, test: (variable: PxVariable) => boolean) {
  const variable = meta.variables.find(test)
  if (!variable) throw new Error('Required PxWeb variable was not found')
  return variable
}

function findValue(variable: PxVariable, test: (label: string) => boolean) {
  const index = variable.valueTexts.findIndex((label) => test(label.toLowerCase()))
  if (index < 0) throw new Error(`Required PxWeb value was not found for ${variable.code}`)
  return variable.values[index]
}

function categoryCodes(dimension: JsonStatDimension) {
  const index = dimension.category?.index
  if (Array.isArray(index)) return index
  if (index && typeof index === 'object') {
    return Object.entries(index)
      .sort((a, b) => Number(a[1]) - Number(b[1]))
      .map(([code]) => code)
  }
  return Object.keys(dimension.category?.label ?? {})
}

function decodeJsonStat(data: JsonStat2): FlatRecord[] {
  const ids = data.id ?? Object.keys(data.dimension)
  const sizes = data.size ?? ids.map((id) => categoryCodes(data.dimension[id]).length)
  const codesByDimension = Object.fromEntries(ids.map((id) => [id, categoryCodes(data.dimension[id])]))
  const labelsByDimension = Object.fromEntries(ids.map((id) => [id, data.dimension[id].category?.label ?? {}]))
  const total = sizes.reduce((product, size) => product * size, 1)
  const records: FlatRecord[] = []

  for (let flatIndex = 0; flatIndex < total; flatIndex += 1) {
    let remainder = flatIndex
    const positions = new Array(ids.length).fill(0)
    for (let i = ids.length - 1; i >= 0; i -= 1) {
      const size = sizes[i]
      positions[i] = remainder % size
      remainder = Math.floor(remainder / size)
    }

    const dims: Record<string, string> = {}
    const labels: Record<string, string> = {}
    ids.forEach((id, index) => {
      const code = codesByDimension[id][positions[index]]
      dims[id] = code
      labels[id] = labelsByDimension[id][code] ?? code
    })

    const rawValue = Array.isArray(data.value) ? data.value[flatIndex] : data.value[String(flatIndex)]
    records.push({ dims, labels, value: rawValue ?? null })
  }

  return records
}

function quarterDates(code: string) {
  const match = code.match(/^(\d{4})Q([1-4])$/)
  if (!match) throw new Error(`Unsupported quarter code ${code}`)
  const year = Number(match[1])
  const quarter = Number(match[2])
  const startMonth = (quarter - 1) * 3
  const start = new Date(Date.UTC(year, startMonth, 1))
  const end = new Date(Date.UTC(year, startMonth + 3, 0))
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  }
}

function parsePostalLabel(postalCode: string, label: string) {
  const stripped = label.replace(new RegExp(`^${postalCode}\\s+`), '').trim()
  const match = stripped.match(/^(.*)\s+\(([^()]+)\)$/)
  return {
    name: (match?.[1] ?? stripped).trim(),
    municipality: (match?.[2] ?? '').trim(),
  }
}

function scoreSeries(points: Array<{ price: number | null; sales: number | null }>) {
  const prices = points.map((point) => point.price).filter((value): value is number => typeof value === 'number' && Number.isFinite(value))
  const latestIndex = [...points].reverse().findIndex((point) => typeof point.price === 'number' && Number.isFinite(point.price))
  if (latestIndex < 0) return null
  const actualLatestIndex = points.length - 1 - latestIndex
  const latest = points[actualLatestIndex]
  const yearAgo = actualLatestIndex >= 4 ? points[actualLatestIndex - 4] : null
  const observedShiftPct = yearAgo?.price && latest.price
    ? ((latest.price - yearAgo.price) / yearAgo.price) * 100
    : null

  const mean = prices.length ? prices.reduce((sum, value) => sum + value, 0) / prices.length : 0
  const variance = prices.length > 1
    ? prices.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / prices.length
    : 0
  const cvPct = mean > 0 ? (Math.sqrt(variance) / mean) * 100 : 25
  const sales = latest.sales ?? 0

  const momentumScore = observedShiftPct === null ? 50 : clamp(55 + observedShiftPct * 2.2, 20, 90)
  const liquidityScore = clamp(20 + Math.sqrt(Math.max(0, sales)) * 10, 20, 95)
  const stabilityScore = clamp(95 - cvPct * 4, 20, 95)
  const depthScore = clamp(25 + (prices.length / Math.max(1, points.length)) * 75, 25, 100)
  const areaScore = clamp(
    momentumScore * 0.30 +
    liquidityScore * 0.30 +
    stabilityScore * 0.25 +
    depthScore * 0.15,
  )
  const confidencePct = clamp(25 + depthScore * 0.35 + liquidityScore * 0.35, 30, 95)

  return {
    areaScore,
    confidencePct,
    latestPrice: latest.price,
    latestSales: latest.sales,
    observedShiftPct,
    momentumScore,
    liquidityScore,
    stabilityScore,
    depthScore,
    latestIndex: actualLatestIndex,
  }
}

async function fetchJson(url: string, init?: RequestInit) {
  const response = await fetch(url, init)
  if (!response.ok) throw new Error(`${url} returned ${response.status}: ${await response.text()}`)
  return response.json()
}

async function restRequest(path: string, init: RequestInit = {}) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceRoleKey) throw new Error('Supabase function environment is incomplete')

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  })

  if (!response.ok) throw new Error(`Supabase REST ${path} returned ${response.status}: ${await response.text()}`)
  if (response.status === 204) return null
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

async function upsertBatches(table: string, rows: Record<string, unknown>[], onConflict: string, batchSize = 500) {
  let written = 0
  for (let index = 0; index < rows.length; index += batchSize) {
    const batch = rows.slice(index, index + batchSize)
    await restRequest(`${table}?on_conflict=${encodeURIComponent(onConflict)}`, {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify(batch),
    })
    written += batch.length
  }
  return written
}

Deno.serve(async (req: Request) => {
  const url = new URL(req.url)
  const suppliedSecret = req.headers.get('x-landcaster-sync-secret') ?? url.searchParams.get('secret')
  if (suppliedSecret !== TEMP_SYNC_SECRET) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
  }

  const requestedQuarters = Number(url.searchParams.get('quarters') ?? '5')
  const quarterCount = clamp(Number.isFinite(requestedQuarters) ? requestedQuarters : 5, 5, 9)
  const startedAt = new Date().toISOString()
  let runId: string | null = null

  try {
    const createdRun = await restRequest('landcaster_ingestion_runs_v1?select=id', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({
        source_id: SOURCE_ID,
        status: 'running',
        started_at: startedAt,
        metadata: { trigger: 'edge_function', quarter_count: quarterCount },
      }),
    }) as Array<{ id: string }>
    runId = createdRun?.[0]?.id ?? null

    const [postalMeta, municipalityMeta] = await Promise.all([
      fetchJson(STATFIN_POSTAL_URL) as Promise<PxMetadata>,
      fetchJson(STATFIN_MUNICIPALITY_URL) as Promise<PxMetadata>,
    ])

    const postalVariable = findVariable(postalMeta, (variable) => variable.code.toLowerCase().includes('postinumeroalue') || variable.text.toLowerCase().includes('postal code'))
    const quarterVariable = findVariable(postalMeta, (variable) => variable.code.toLowerCase().includes('timeperiod_q') || variable.text.toLowerCase().includes('quarter'))
    const buildingVariable = findVariable(postalMeta, (variable) => variable.code.toLowerCase().includes('talotyyppi') || variable.text.toLowerCase().includes('building type'))
    const contentsVariable = findVariable(postalMeta, (variable) => variable.code.toLowerCase().includes('contentscode') || variable.text.toLowerCase().includes('information'))
    const municipalityVariable = findVariable(municipalityMeta, (variable) => variable.code.toLowerCase().includes('kunta') || variable.text.toLowerCase().includes('municipality'))

    const municipalityRows = municipalityVariable.values.map((municipalityCode, index) => {
      const name = municipalityVariable.valueTexts[index]
      return {
        municipality_code: municipalityCode,
        name_fi: name,
        asp_interest_support_cap_eur: highAspCities.has(name) ? 230000 : 160000,
        updated_at: new Date().toISOString(),
      }
    })
    const municipalityCodeByName = new Map(municipalityRows.map((row) => [row.name_fi.toLowerCase(), row.municipality_code]))
    await upsertBatches('landcaster_municipalities_v1', municipalityRows, 'municipality_code')

    const postalRows = postalVariable.values.map((postalCode, index) => {
      const parsed = parsePostalLabel(postalCode, postalVariable.valueTexts[index])
      return {
        postal_code: postalCode,
        name_fi: parsed.name,
        municipality_code: municipalityCodeByName.get(parsed.municipality.toLowerCase()) ?? null,
        updated_at: new Date().toISOString(),
      }
    })
    await upsertBatches('landcaster_postal_areas_v1', postalRows, 'postal_code')

    const propertyValues = {
      one_room: findValue(buildingVariable, (label) => label.includes('one-room')),
      two_room: findValue(buildingVariable, (label) => label.includes('two-room')),
      three_plus: findValue(buildingVariable, (label) => label.includes('three-room')),
      terraced: findValue(buildingVariable, (label) => label.includes('terraced')),
    }
    const propertyByValue = new Map(Object.entries(propertyValues).map(([key, value]) => [value, key]))
    const priceMetric = findValue(contentsVariable, (label) => label.includes('price per square meter'))
    const salesMetric = findValue(contentsVariable, (label) => label.includes('number of sales'))
    const selectedQuarters = quarterVariable.values.slice(-quarterCount)

    const query = {
      query: [
        { code: quarterVariable.code, selection: { filter: 'item', values: selectedQuarters } },
        { code: postalVariable.code, selection: { filter: 'item', values: postalVariable.values } },
        { code: buildingVariable.code, selection: { filter: 'item', values: Object.values(propertyValues) } },
        { code: contentsVariable.code, selection: { filter: 'item', values: [priceMetric, salesMetric] } },
      ],
      response: { format: 'json-stat2' },
    }

    const dataset = await fetchJson(STATFIN_POSTAL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
    }) as JsonStat2

    const decoded = decodeJsonStat(dataset)
    const cells = new Map<string, { price: number | null; sales: number | null }>()

    for (const record of decoded) {
      const quarter = record.dims[quarterVariable.code]
      const postalCode = record.dims[postalVariable.code]
      const buildingValue = record.dims[buildingVariable.code]
      const contentValue = record.dims[contentsVariable.code]
      const propertyType = propertyByValue.get(buildingValue)
      if (!quarter || !postalCode || !propertyType) continue
      const key = `${postalCode}|${propertyType}|${quarter}`
      const current = cells.get(key) ?? { price: null, sales: null }
      if (contentValue === priceMetric) current.price = record.value
      if (contentValue === salesMetric) current.sales = record.value
      cells.set(key, current)
    }

    const marketRows: Record<string, unknown>[] = []
    const scoreGroups = new Map<string, Array<{ quarter: string; price: number | null; sales: number | null }>>()
    const asOf = new Date().toISOString().slice(0, 10)

    for (const postalCode of postalVariable.values) {
      for (const propertyType of Object.keys(propertyValues)) {
        const series = selectedQuarters.map((quarter) => {
          const cell = cells.get(`${postalCode}|${propertyType}|${quarter}`) ?? { price: null, sales: null }
          return { quarter, ...cell }
        })
        scoreGroups.set(`${postalCode}|${propertyType}`, series)

        for (const point of series) {
          if (typeof point.price !== 'number' || !Number.isFinite(point.price)) continue
          const period = quarterDates(point.quarter)
          marketRows.push({
            geography_level: 'postal_area',
            geography_code: postalCode,
            property_type: propertyType,
            metric: 'price_per_sqm',
            period_start: period.start,
            period_end: period.end,
            value: point.price,
            unit: 'EUR/m2',
            sample_size: typeof point.sales === 'number' && Number.isFinite(point.sales) ? Math.round(point.sales) : null,
            source_id: SOURCE_ID,
            as_of: asOf,
            provenance: {
              provider: 'Statistics Finland',
              table: '13mt',
              quarter: point.quarter,
              note: 'Arithmetic average EUR/m2. Statistics Finland states that this measure describes regional price levels and should not be used as an official price-change index.',
            },
          })
        }
      }
    }

    const marketRowsUpserted = await upsertBatches(
      'landcaster_market_snapshots_v1',
      marketRows,
      'geography_level,geography_code,property_type,metric,period_start,period_end,source_id',
    )

    const areaScoreRows: Record<string, unknown>[] = []
    for (const [key, series] of scoreGroups.entries()) {
      const [postalCode, propertyType] = key.split('|')
      const score = scoreSeries(series)
      if (!score || typeof score.latestPrice !== 'number') continue
      const latestQuarter = series[score.latestIndex]?.quarter
      if (!latestQuarter) continue
      const period = quarterDates(latestQuarter)
      areaScoreRows.push({
        postal_code: postalCode,
        property_type: propertyType,
        period_end: period.end,
        area_score: Number(score.areaScore.toFixed(2)),
        confidence_pct: Number(score.confidencePct.toFixed(2)),
        latest_price_per_sqm: score.latestPrice,
        sample_size: typeof score.latestSales === 'number' ? Math.round(score.latestSales) : null,
        observed_price_level_shift_pct: score.observedShiftPct === null ? null : Number(score.observedShiftPct.toFixed(2)),
        momentum_score: Number(score.momentumScore.toFixed(2)),
        liquidity_score: Number(score.liquidityScore.toFixed(2)),
        stability_score: Number(score.stabilityScore.toFixed(2)),
        depth_score: Number(score.depthScore.toFixed(2)),
        model_version: MODEL_VERSION,
        source_id: SOURCE_ID,
        evidence: {
          selected_quarters: selectedQuarters,
          methodology: '30% observed average-price-level direction, 30% transaction/data depth, 25% stability, 15% series depth',
          caveat: 'Observed EUR/m2 shifts are not an official price index and can be affected by the mix of homes sold.',
        },
      })
    }

    const areaScoresUpserted = await upsertBatches(
      'landcaster_area_score_snapshots_v1',
      areaScoreRows,
      'postal_code,property_type,period_end,model_version,source_id',
    )

    await restRequest(`landcaster_data_sources_v1?id=eq.${SOURCE_ID}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ status: 'active', last_success_at: new Date().toISOString(), updated_at: new Date().toISOString() }),
    })

    if (runId) {
      await restRequest(`landcaster_ingestion_runs_v1?id=eq.${runId}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({
          status: 'success',
          finished_at: new Date().toISOString(),
          dataset_version: postalMeta.updated ?? null,
          municipalities_upserted: municipalityRows.length,
          postal_areas_upserted: postalRows.length,
          market_rows_upserted: marketRowsUpserted,
          area_scores_upserted: areaScoresUpserted,
          metadata: { quarter_count: quarterCount, selected_quarters: selectedQuarters, source_table: '13mt' },
        }),
      })
    }

    return new Response(JSON.stringify({
      ok: true,
      source: SOURCE_ID,
      quarters: selectedQuarters,
      municipalities: municipalityRows.length,
      postalAreas: postalRows.length,
      marketRows: marketRowsUpserted,
      areaScores: areaScoresUpserted,
    }), { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (runId) {
      try {
        await restRequest(`landcaster_ingestion_runs_v1?id=eq.${runId}`, {
          method: 'PATCH',
          headers: { Prefer: 'return=minimal' },
          body: JSON.stringify({ status: 'failed', finished_at: new Date().toISOString(), error_message: message }),
        })
      } catch {
        // Keep original error.
      }
    }
    return new Response(JSON.stringify({ ok: false, error: message }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
})
