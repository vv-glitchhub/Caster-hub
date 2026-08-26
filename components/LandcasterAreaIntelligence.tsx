'use client'

import { useEffect, useMemo, useState } from 'react'
import { calculateFairValueEstimate, type FairValueCondition } from '../lib/landcaster-engine'
import type { LandcasterPropertyType } from '../lib/landcaster-statfin'

const euro = new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const number = new Intl.NumberFormat('fi-FI', { maximumFractionDigits: 0 })

const propertyLabels: Record<LandcasterPropertyType, string> = {
  one_room: 'Kerrostalo · yksiö',
  two_room: 'Kerrostalo · kaksio',
  three_plus: 'Kerrostalo · 3h+',
  terraced: 'Rivitalo',
}

const conditionLabels: Record<FairValueCondition, string> = {
  needs_work: 'Remonttia tarvitseva',
  average: 'Tavanomainen',
  good: 'Hyvä',
  renovated: 'Remontoitu',
}

type PostalMatch = {
  postalCode: string
  label: string
  name: string
  municipality: string
}

type AreaAnalysis = {
  source: { provider: string; table: string; updated: string | null; url: string; caveat: string }
  area: { postalCode: string; label: string; name: string; municipality: string }
  propertyType: LandcasterPropertyType
  history: Array<{ quarter: string; pricePerSqm: number | null; sales: number | null }>
  latest: { quarter: string; pricePerSqm: number | null; sales: number | null }
  areaScore: number
  confidencePct: number
  observedPriceLevelShiftPct: number | null
  components: { momentum: number; liquidity: number; stability: number; depth: number }
}

type RankingResponse = {
  sourceUpdated: string | null
  propertyType: LandcasterPropertyType
  quarters: string[]
  ranking: Array<{
    postalCode: string
    name: string
    municipality: string
    areaScore: number
    confidencePct: number
    pricePerSqm: number
    sales: number | null
    observedPriceLevelShiftPct: number | null
  }>
  caveat: string
}

function cleanNumber(value: string, fallback = 0) {
  const parsed = Number(value.replace(',', '.'))
  return Number.isFinite(parsed) ? Math.max(0, parsed) : fallback
}

function scoreTone(score: number) {
  if (score >= 75) return 'Vahva'
  if (score >= 60) return 'Hyvä'
  if (score >= 45) return 'Neutraali'
  return 'Heikko / vähän dataa'
}

export default function LandcasterAreaIntelligence() {
  const [search, setSearch] = useState('33100')
  const [postalCode, setPostalCode] = useState('33100')
  const [suggestions, setSuggestions] = useState<PostalMatch[]>([])
  const [propertyType, setPropertyType] = useState<LandcasterPropertyType>('two_room')
  const [analysis, setAnalysis] = useState<AreaAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ranking, setRanking] = useState<RankingResponse | null>(null)
  const [rankingLoading, setRankingLoading] = useState(false)

  const [areaM2, setAreaM2] = useState('55')
  const [askingPrice, setAskingPrice] = useState('200000')
  const [condition, setCondition] = useState<FairValueCondition>('average')

  useEffect(() => {
    const query = search.trim()
    if (query.length < 2) {
      setSuggestions([])
      return
    }
    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/landcaster/postal-areas?q=${encodeURIComponent(query)}`, { signal: controller.signal })
        const payload = await response.json()
        if (response.ok) setSuggestions(payload.matches ?? [])
      } catch {
        // Search suggestions are optional. Main analysis still works by postal code.
      }
    }, 280)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [search])

  async function analyzeArea(code = postalCode, type = propertyType) {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/landcaster/area?postalCode=${encodeURIComponent(code)}&propertyType=${encodeURIComponent(type)}`)
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error ?? 'Alueanalyysi epäonnistui')
      setAnalysis(payload)
      setPostalCode(code)
      setSearch(code)
      setSuggestions([])
      setRanking(null)
    } catch (err) {
      setAnalysis(null)
      setError(err instanceof Error ? err.message : 'Alueanalyysi epäonnistui')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void analyzeArea('33100', 'two_room')
    // Initial nationwide data demo. Subsequent changes are user-triggered.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadRanking() {
    setRankingLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/landcaster/ranking?propertyType=${encodeURIComponent(propertyType)}&limit=12`)
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error ?? 'Suomen aluevertailu epäonnistui')
      setRanking(payload)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Suomen aluevertailu epäonnistui')
    } finally {
      setRankingLoading(false)
    }
  }

  const fairValue = useMemo(() => {
    const pricePerSqm = analysis?.latest.pricePerSqm
    if (!pricePerSqm) return null
    return calculateFairValueEstimate({
      areaM2: cleanNumber(areaM2),
      askingPrice: cleanNumber(askingPrice),
      areaPricePerSqm: pricePerSqm,
      condition,
      confidencePct: analysis.confidencePct,
    })
  }, [analysis, areaM2, askingPrice, condition])

  return (
    <section className="home-section" id="area-intelligence">
      <div className="home-container grid gap-8">
        <div>
          <p className="section-label">Area Intelligence V1 · koko Suomi</p>
          <h2 className="section-title">Postinumeroalue → Area Score → Fair Value.</h2>
          <p className="home-section-lead">
            Landcaster hakee nyt Tilastokeskuksen 13mt-taulukosta virallisen postinumeroaluekohtaisen neliöhinta- ja kauppamäärädatan. Haku kattaa kaikki aineiston noin 1 700 postinumeroaluetta, ei vain muutamaa esimerkkikaupunkia.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[.85fr_1.15fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 md:p-7">
            <p className="home-module-label">Aluehaku</p>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2 text-sm text-white/70">
                <span>Postinumero tai alueen nimi</span>
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value)
                    if (/^\d{5}$/.test(event.target.value.trim())) setPostalCode(event.target.value.trim())
                  }}
                  placeholder="Esim. 33100 tai Tampere"
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-white outline-none focus:border-white/30"
                />
              </label>

              {suggestions.length > 0 ? (
                <div className="grid max-h-64 gap-2 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-2">
                  {suggestions.map((item) => (
                    <button
                      key={item.postalCode}
                      type="button"
                      onClick={() => {
                        setPostalCode(item.postalCode)
                        setSearch(item.postalCode)
                        setSuggestions([])
                      }}
                      className="rounded-xl px-3 py-2 text-left text-sm text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      <span className="font-semibold text-white">{item.postalCode}</span> · {item.name}{item.municipality ? ` (${item.municipality})` : ''}
                    </button>
                  ))}
                </div>
              ) : null}

              <label className="grid gap-2 text-sm text-white/70">
                <span>Asuntotyyppi</span>
                <select
                  value={propertyType}
                  onChange={(event) => setPropertyType(event.target.value as LandcasterPropertyType)}
                  className="rounded-2xl border border-white/10 bg-[#08090d] px-4 py-3 text-base text-white outline-none focus:border-white/30"
                >
                  {Object.entries(propertyLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>

              <button
                type="button"
                onClick={() => void analyzeArea()}
                disabled={loading}
                className="primary-button justify-center disabled:cursor-wait disabled:opacity-60"
              >
                {loading ? 'Haetaan Tilastokeskuksesta…' : 'Analysoi alue'}
              </button>

              {error ? <p className="rounded-2xl border border-red-300/20 bg-red-300/5 p-4 text-sm text-red-100/80">{error}</p> : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/45">Alue</p>
              <p className="mt-2 text-xl font-semibold text-white">{analysis ? `${analysis.area.postalCode} ${analysis.area.name}` : '—'}</p>
              <p className="mt-2 text-sm text-white/55">{analysis?.area.municipality || 'Valitse postinumeroalue'}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/45">Viimeisin aluekeskiarvo</p>
              <p className="mt-2 text-2xl font-semibold text-white">{analysis?.latest.pricePerSqm ? `${number.format(analysis.latest.pricePerSqm)} €/m²` : '—'}</p>
              <p className="mt-2 text-sm text-white/55">{analysis?.latest.quarter ?? '—'} · {propertyLabels[propertyType]}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/45">Area Score V1</p>
              <p className="mt-2 text-4xl font-semibold text-white">{analysis ? Math.round(analysis.areaScore) : '—'}<span className="text-lg text-white/35"> / 100</span></p>
              <p className="mt-2 text-sm text-white/55">{analysis ? `${scoreTone(analysis.areaScore)} · datavarmuus ${Math.round(analysis.confidencePct)} %` : 'Selitettävä markkinadatan pisteytys'}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/45">Kauppoja viimeisimmässä havainnossa</p>
              <p className="mt-2 text-2xl font-semibold text-white">{analysis?.latest.sales ?? '—'}</p>
              <p className="mt-2 text-sm text-white/55">Kauppamäärä toimii ennen kaikkea datan laadun ja markkinasyvyyden signaalina.</p>
            </div>
          </div>
        </div>

        {analysis ? (
          <div className="grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 md:p-7">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="home-module-label">Area Score evidence</p>
                  <h3 className="home-module-title">Mistä pisteet tulevat?</h3>
                </div>
                <p className="text-sm text-white/45">Aineisto {analysis.source.updated ? `päivitetty ${analysis.source.updated}` : 'Tilastokeskus 13mt'}</p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ['Suunta', analysis.components.momentum, '30 % · aluekeskiarvon havaittu suunta, ei virallinen hintaindeksi'],
                  ['Likviditeetti', analysis.components.liquidity, '30 % · kauppojen määrä / datasyvyys'],
                  ['Vakaus', analysis.components.stability, '25 % · neljänneskeskiarvojen hajonta'],
                  ['Aikasarjan syvyys', analysis.components.depth, '15 % · kuinka moni havainto on käyttökelpoinen'],
                ].map(([label, value, text]) => (
                  <div key={String(label)} className="rounded-2xl border border-white/10 p-4">
                    <div className="flex items-center justify-between gap-3"><p className="text-sm text-white/55">{label}</p><p className="font-semibold text-white">{Math.round(Number(value))}/100</p></div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white/70" style={{ width: `${Math.round(Number(value))}%` }} /></div>
                    <p className="mt-3 text-xs leading-5 text-white/40">{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm text-white/55">Havaittu aluekeskiarvon siirtymä vuodessa</p>
                <p className="mt-1 text-xl font-semibold text-white">{analysis.observedPriceLevelShiftPct === null ? 'Ei riittävää vertailudataa' : `${analysis.observedPriceLevelShiftPct > 0 ? '+' : ''}${analysis.observedPriceLevelShiftPct.toFixed(1)} %`}</p>
                <p className="mt-2 text-xs leading-5 text-white/40">{analysis.source.caveat}</p>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 md:p-7">
              <p className="home-module-label">Viimeiset neljännekset</p>
              <h3 className="home-module-title">Hintataso + datan syvyys</h3>
              <div className="mt-5 grid gap-2">
                {analysis.history.slice(-8).reverse().map((point) => (
                  <div key={point.quarter} className="grid grid-cols-[72px_1fr_80px] items-center gap-3 rounded-xl border border-white/8 px-3 py-2 text-sm">
                    <span className="text-white/45">{point.quarter}</span>
                    <span className="font-medium text-white">{point.pricePerSqm ? `${number.format(point.pricePerSqm)} €/m²` : 'salattu / ei havaintoa'}</span>
                    <span className="text-right text-white/45">{point.sales === null ? '—' : `${point.sales} kpl`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 md:p-7">
            <p className="home-module-label">Fair Value V1</p>
            <h3 className="home-module-title">Vertaa pyyntihintaa alueen toteutuneeseen hintatasoon.</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-white/70">
                <span>Pinta-ala</span>
                <span className="flex items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4"><input value={areaM2} onChange={(event) => setAreaM2(event.target.value)} inputMode="decimal" className="min-w-0 flex-1 bg-transparent py-3 text-white outline-none" /><span className="text-white/40">m²</span></span>
              </label>
              <label className="grid gap-2 text-sm text-white/70">
                <span>Pyyntihinta / velaton hinta</span>
                <span className="flex items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4"><input value={askingPrice} onChange={(event) => setAskingPrice(event.target.value)} inputMode="decimal" className="min-w-0 flex-1 bg-transparent py-3 text-white outline-none" /><span className="text-white/40">€</span></span>
              </label>
              <label className="grid gap-2 text-sm text-white/70 sm:col-span-2">
                <span>Kunto-oikaisu</span>
                <select value={condition} onChange={(event) => setCondition(event.target.value as FairValueCondition)} className="rounded-2xl border border-white/10 bg-[#08090d] px-4 py-3 text-white outline-none">
                  {Object.entries(conditionLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.055] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-white/45">Landcaster Fair Value</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-white">{fairValue ? euro.format(fairValue.fairValueMid) : 'Valitse alue'}</p>
            <p className="mt-3 text-base text-white/55">{fairValue ? `${euro.format(fairValue.fairValueLow)} – ${euro.format(fairValue.fairValueHigh)}` : 'Arvio aktivoituu, kun alueelta löytyy käyttökelpoinen neliöhinta.'}</p>
            {fairValue ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/45">Pyyntö vs keskikohta</p><p className="mt-1 font-semibold text-white">{fairValue.priceGapPct > 0 ? '+' : ''}{fairValue.priceGapPct.toFixed(1)} %</p></div>
                <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/45">Arvovälin leveys</p><p className="mt-1 font-semibold text-white">± {fairValue.bandPct.toFixed(1)} %</p></div>
                <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/45">Tulkinta</p><p className="mt-1 font-semibold text-white">{fairValue.label === 'BELOW_AREA_BAND' ? 'Alle aluehaarukan' : fairValue.label === 'ABOVE_AREA_BAND' ? 'Yli aluehaarukan' : 'Aluehaarukassa'}</p></div>
              </div>
            ) : null}
            <p className="mt-5 text-xs leading-5 text-white/40">Fair Value V1 on tilastollinen vertailu aluekeskiarvoon ja yksinkertaiseen kunto-oikaisuun. Se ei tunne vielä taloyhtiön velkaa, tulevia remontteja, kerrosta, näkymää tai kohteen yksilöllisiä ominaisuuksia eikä korvaa ammattimaista arviota.</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 md:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="home-module-label">Finland Ranking</p>
              <h3 className="home-module-title">Vertaa postinumeroalueita koko Suomessa.</h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/50">Ranking lasketaan samasta läpinäkyvästä Area Score V1 -mallista. Se ei ole sijoitussuositus eikä tulevaisuuden hintojen ennuste.</p>
            </div>
            <button type="button" onClick={() => void loadRanking()} disabled={rankingLoading} className="secondary-button disabled:cursor-wait disabled:opacity-60">{rankingLoading ? 'Lasketaan koko Suomea…' : 'Laske Suomen Top 12'}</button>
          </div>

          {ranking ? (
            <div className="mt-6 grid gap-2">
              {ranking.ranking.map((item, index) => (
                <button
                  type="button"
                  key={`${item.postalCode}-${index}`}
                  onClick={() => {
                    setPostalCode(item.postalCode)
                    setSearch(item.postalCode)
                    void analyzeArea(item.postalCode, propertyType)
                  }}
                  className="grid gap-3 rounded-2xl border border-white/10 p-4 text-left transition hover:bg-white/[0.035] md:grid-cols-[48px_1fr_110px_120px_100px] md:items-center"
                >
                  <span className="text-xl font-semibold text-white/35">#{index + 1}</span>
                  <span><span className="font-semibold text-white">{item.postalCode} {item.name}</span><span className="mt-1 block text-xs text-white/45">{item.municipality}</span></span>
                  <span className="text-sm text-white/60">{number.format(item.pricePerSqm)} €/m²</span>
                  <span className="text-sm text-white/60">varmuus {Math.round(item.confidencePct)} %</span>
                  <span className="text-right text-xl font-semibold text-white">{Math.round(item.areaScore)}</span>
                </button>
              ))}
              <p className="mt-3 text-xs leading-5 text-white/40">{ranking.caveat}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
