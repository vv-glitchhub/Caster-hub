const STATFIN_POSTAL_URL = 'https://pxweb2.stat.fi/PxWeb/api/v1/en/StatFin/ashi/13mt.px'

export type LandcasterPropertyType = 'one_room' | 'two_room' | 'three_plus' | 'terraced'

export type AreaHistoryPoint = {
  quarter: string
  pricePerSqm: number | null
  sales: number | null
}

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
  value: number | null
}

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value))
}

async function fetchMetadata() {
  const response = await fetch(STATFIN_POSTAL_URL, { next: { revalidate: 21_600 } })
  if (!response.ok) throw new Error(`Statistics Finland metadata unavailable (${response.status})`)
  return response.json() as Promise<PxMetadata>
}

function findVariable(meta: PxMetadata, test: (variable: PxVariable) => boolean) {
  const variable = meta.variables.find(test)
  if (!variable) throw new Error('Statistics Finland table structure changed')
  return variable
}

function findValue(variable: PxVariable, test: (label: string) => boolean) {
  const index = variable.valueTexts.findIndex((label) => test(label.toLowerCase()))
  if (index < 0) throw new Error(`Statistics Finland category changed: ${variable.text}`)
  return variable.values[index]
}

function resolveTable(meta: PxMetadata) {
  const postal = findVariable(meta, (variable) => variable.code.toLowerCase().includes('postinumeroalue') || variable.text.toLowerCase().includes('postal code'))
  const quarter = findVariable(meta, (variable) => variable.code.toLowerCase().includes('timeperiod_q') || variable.text.toLowerCase().includes('quarter'))
  const building = findVariable(meta, (variable) => variable.code.toLowerCase().includes('talotyyppi') || variable.text.toLowerCase().includes('building type'))
  const contents = findVariable(meta, (variable) => variable.code.toLowerCase().includes('contentscode') || variable.text.toLowerCase().includes('information'))

  const propertyValues: Record<LandcasterPropertyType, string> = {
    one_room: findValue(building, (label) => label.includes('one-room')),
    two_room: findValue(building, (label) => label.includes('two-room')),
    three_plus: findValue(building, (label) => label.includes('three-room')),
    terraced: findValue(building, (label) => label.includes('terraced')),
  }

  return {
    postal,
    quarter,
    building,
    contents,
    propertyValues,
    priceMetric: findValue(contents, (label) => label.includes('price per square meter')),
    salesMetric: findValue(contents, (label) => label.includes('number of sales')),
  }
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
  const total = sizes.reduce((product, size) => product * size, 1)
  const records: FlatRecord[] = []

  for (let flatIndex = 0; flatIndex < total; flatIndex += 1) {
    let remainder = flatIndex
    const positions = new Array(ids.length).fill(0)
    for (let i = ids.length - 1; i >= 0; i -= 1) {
      positions[i] = remainder % sizes[i]
      remainder = Math.floor(remainder / sizes[i])
    }

    const dims: Record<string, string> = {}
    ids.forEach((id, index) => {
      dims[id] = codesByDimension[id][positions[index]]
    })

    const raw = Array.isArray(data.value) ? data.value[flatIndex] : data.value[String(flatIndex)]
    records.push({ dims, value: raw ?? null })
  }

  return records
}

function parsePostalLabel(postalCode: string, label: string) {
  const stripped = label.replace(new RegExp(`^${postalCode}\\s+`), '').trim()
  const match = stripped.match(/^(.*)\s+\(([^()]+)\)$/)
  return {
    name: (match?.[1] ?? stripped).trim(),
    municipality: (match?.[2] ?? '').trim(),
  }
}

async function queryTable(meta: PxMetadata, postalCodes: string[], propertyType: LandcasterPropertyType, quarters: string[]) {
  const table = resolveTable(meta)
  const response = await fetch(STATFIN_POSTAL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: [
        { code: table.quarter.code, selection: { filter: 'item', values: quarters } },
        { code: table.postal.code, selection: { filter: 'item', values: postalCodes } },
        { code: table.building.code, selection: { filter: 'item', values: [table.propertyValues[propertyType]] } },
        { code: table.contents.code, selection: { filter: 'item', values: [table.priceMetric, table.salesMetric] } },
      ],
      response: { format: 'json-stat2' },
    }),
    next: { revalidate: 21_600 },
  })
  if (!response.ok) throw new Error(`Statistics Finland data unavailable (${response.status})`)
  return {
    table,
    decoded: decodeJsonStat(await response.json() as JsonStat2),
  }
}

export function scoreAreaHistory(history: AreaHistoryPoint[]) {
  const prices = history.map((point) => point.pricePerSqm).filter((value): value is number => typeof value === 'number' && Number.isFinite(value))
  const latestIndex = [...history].reverse().findIndex((point) => typeof point.pricePerSqm === 'number' && Number.isFinite(point.pricePerSqm))
  if (latestIndex < 0) return null
  const actualLatestIndex = history.length - 1 - latestIndex
  const latest = history[actualLatestIndex]
  const yearAgo = actualLatestIndex >= 4 ? history[actualLatestIndex - 4] : null
  const observedPriceLevelShiftPct = yearAgo?.pricePerSqm && latest.pricePerSqm
    ? ((latest.pricePerSqm - yearAgo.pricePerSqm) / yearAgo.pricePerSqm) * 100
    : null
  const mean = prices.length ? prices.reduce((sum, value) => sum + value, 0) / prices.length : 0
  const variance = prices.length > 1 ? prices.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / prices.length : 0
  const cvPct = mean > 0 ? (Math.sqrt(variance) / mean) * 100 : 25
  const latestSales = latest.sales ?? 0

  const momentum = observedPriceLevelShiftPct === null ? 50 : clamp(55 + observedPriceLevelShiftPct * 2.2, 20, 90)
  const liquidity = clamp(20 + Math.sqrt(Math.max(0, latestSales)) * 10, 20, 95)
  const stability = clamp(95 - cvPct * 4, 20, 95)
  const depth = clamp(25 + (prices.length / Math.max(1, history.length)) * 75, 25, 100)
  const areaScore = clamp(momentum * 0.30 + liquidity * 0.30 + stability * 0.25 + depth * 0.15)
  const confidencePct = clamp(25 + depth * 0.35 + liquidity * 0.35, 30, 95)

  return {
    latest,
    latestIndex: actualLatestIndex,
    areaScore,
    confidencePct,
    observedPriceLevelShiftPct,
    components: { momentum, liquidity, stability, depth },
  }
}

export async function searchPostalAreas(query: string, limit = 12) {
  const meta = await fetchMetadata()
  const { postal } = resolveTable(meta)
  const normalized = query.trim().toLocaleLowerCase('fi-FI')
  const matches = postal.values
    .map((postalCode, index) => ({ postalCode, label: postal.valueTexts[index] }))
    .filter((item) => !normalized || item.postalCode.startsWith(normalized) || item.label.toLocaleLowerCase('fi-FI').includes(normalized))
    .slice(0, Math.max(1, Math.min(limit, 30)))
    .map((item) => ({ ...item, ...parsePostalLabel(item.postalCode, item.label) }))

  return { updated: meta.updated ?? null, matches }
}

export async function getPostalAreaAnalysis(postalCode: string, propertyType: LandcasterPropertyType) {
  const meta = await fetchMetadata()
  const table = resolveTable(meta)
  const postalIndex = table.postal.values.indexOf(postalCode)
  if (postalIndex < 0) throw new Error('Postal code was not found in Statistics Finland data')
  const quarters = table.quarter.values.slice(-9)
  const { decoded } = await queryTable(meta, [postalCode], propertyType, quarters)
  const byQuarter = new Map(quarters.map((quarter) => [quarter, { quarter, pricePerSqm: null, sales: null } as AreaHistoryPoint]))

  for (const record of decoded) {
    const quarter = record.dims[table.quarter.code]
    const content = record.dims[table.contents.code]
    const point = byQuarter.get(quarter)
    if (!point) continue
    if (content === table.priceMetric) point.pricePerSqm = record.value
    if (content === table.salesMetric) point.sales = record.value
  }

  const history = quarters.map((quarter) => byQuarter.get(quarter)!)
  const score = scoreAreaHistory(history)
  if (!score) throw new Error('No usable price observations were available for this area and property type')
  const parsed = parsePostalLabel(postalCode, table.postal.valueTexts[postalIndex])

  return {
    source: {
      provider: 'Statistics Finland',
      table: '13mt',
      updated: meta.updated ?? null,
      url: 'https://pxweb2.stat.fi/PxWeb/pxweb/en/StatFin/StatFin__ashi/13mt.px/',
      caveat: 'EUR/m² values are arithmetic area averages. Statistics Finland states they describe regional price levels and should not be used as an official price-change index. The observed shift below is therefore only a directional signal and can be affected by the mix of homes sold.',
    },
    area: {
      postalCode,
      label: table.postal.valueTexts[postalIndex],
      name: parsed.name,
      municipality: parsed.municipality,
    },
    propertyType,
    history,
    latest: score.latest,
    areaScore: Number(score.areaScore.toFixed(1)),
    confidencePct: Number(score.confidencePct.toFixed(1)),
    observedPriceLevelShiftPct: score.observedPriceLevelShiftPct === null ? null : Number(score.observedPriceLevelShiftPct.toFixed(1)),
    components: Object.fromEntries(Object.entries(score.components).map(([key, value]) => [key, Number(value.toFixed(1))])),
  }
}

export async function getFinlandAreaRanking(propertyType: LandcasterPropertyType, limit = 15) {
  const meta = await fetchMetadata()
  const table = resolveTable(meta)
  const quarters = table.quarter.values.slice(-5)
  const { decoded } = await queryTable(meta, table.postal.values, propertyType, quarters)
  const cells = new Map<string, AreaHistoryPoint>()

  for (const postalCode of table.postal.values) {
    for (const quarter of quarters) cells.set(`${postalCode}|${quarter}`, { quarter, pricePerSqm: null, sales: null })
  }
  for (const record of decoded) {
    const postalCode = record.dims[table.postal.code]
    const quarter = record.dims[table.quarter.code]
    const content = record.dims[table.contents.code]
    const point = cells.get(`${postalCode}|${quarter}`)
    if (!point) continue
    if (content === table.priceMetric) point.pricePerSqm = record.value
    if (content === table.salesMetric) point.sales = record.value
  }

  const ranked = table.postal.values.flatMap((postalCode, index) => {
    const history = quarters.map((quarter) => cells.get(`${postalCode}|${quarter}`)!)
    const score = scoreAreaHistory(history)
    if (!score || typeof score.latest.pricePerSqm !== 'number') return []
    const parsed = parsePostalLabel(postalCode, table.postal.valueTexts[index])
    return [{
      postalCode,
      name: parsed.name,
      municipality: parsed.municipality,
      areaScore: Number(score.areaScore.toFixed(1)),
      confidencePct: Number(score.confidencePct.toFixed(1)),
      pricePerSqm: score.latest.pricePerSqm,
      sales: score.latest.sales,
      observedPriceLevelShiftPct: score.observedPriceLevelShiftPct === null ? null : Number(score.observedPriceLevelShiftPct.toFixed(1)),
    }]
  })
    .filter((item) => item.confidencePct >= 45)
    .sort((a, b) => b.areaScore - a.areaScore)
    .slice(0, Math.max(1, Math.min(limit, 30)))

  return {
    sourceUpdated: meta.updated ?? null,
    propertyType,
    quarters,
    ranking: ranked,
    caveat: 'Area Score V1 is a transparent market-data score, not a forecast. It combines observed average-price-level direction, transaction/data depth, stability and series completeness.',
  }
}
