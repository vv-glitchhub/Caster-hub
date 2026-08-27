'use client'

import { useEffect, useState } from 'react'
import type { LandcasterPropertyType } from '../lib/landcaster-statfin'

const number = new Intl.NumberFormat('fi-FI', { maximumFractionDigits: 0 })
const euro = new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

const propertyLabels: Record<LandcasterPropertyType, string> = {
  one_room: 'Kerrostalo · yksiö',
  two_room: 'Kerrostalo · kaksio',
  three_plus: 'Kerrostalo · 3h+',
  terraced: 'Rivitalo',
}

type FundamentalsPayload = {
  area: { postalCode: string; name: string; municipality: string }
  score: null | {
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
  fundamentals: {
    statistical_year: number
    population: number | null
    average_age: number | null
    median_income_eur: number | null
    employment_rate_pct: number | null
    unemployment_rate_pct: number | null
    young_adult_share_pct: number | null
    working_age_share_pct: number | null
    workplaces_total: number | null
    workplace_per_100_residents: number | null
  }
  source: { provider: string; dataset: string; caveat: string }
}

type RankingPayload = {
  methodology: string
  caveat: string
  modelVersion: string
  ranking: Array<{
    postalCode: string
    name: string
    municipality: string
    areaScoreV2: number
    marketScore: number
    fundamentalsScore: number
    confidencePct: number
    pricePerSqm: number | null
    sales: number | null
    fundamentalsYear: number
  }>
}

function pct(value: number | null | undefined, digits = 1) {
  return typeof value === 'number' && Number.isFinite(value) ? `${value.toFixed(digits)} %` : '—'
}

function scoreTone(value: number) {
  if (value >= 75) return 'Vahva'
  if (value >= 60) return 'Hyvä'
  if (value >= 45) return 'Neutraali'
  return 'Heikko'
}

export default function LandcasterFundamentalsV2() {
  const [postalCode, setPostalCode] = useState('33100')
  const [propertyType, setPropertyType] = useState<LandcasterPropertyType>('two_room')
  const [data, setData] = useState<FundamentalsPayload | null>(null)
  const [ranking, setRanking] = useState<RankingPayload | null>(null)
  const [loading, setLoading] = useState(false)
  const [rankingLoading, setRankingLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadArea(code = postalCode, type = propertyType) {
    if (!/^\d{5}$/.test(code.trim())) {
      setError('Anna viisinumeroinen postinumero.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/landcaster/fundamentals?postalCode=${encodeURIComponent(code.trim())}&propertyType=${encodeURIComponent(type)}`)
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error ?? 'Area Score V2 -analyysi epäonnistui')
      setData(payload)
    } catch (err) {
      setData(null)
      setError(err instanceof Error ? err.message : 'Area Score V2 -analyysi epäonnistui')
    } finally {
      setLoading(false)
    }
  }

  async function loadRanking() {
    setRankingLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/landcaster/ranking-v2?propertyType=${encodeURIComponent(propertyType)}&limit=12`)
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error ?? 'Area Score V2 -ranking epäonnistui')
      setRanking(payload)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Area Score V2 -ranking epäonnistui')
    } finally {
      setRankingLoading(false)
    }
  }

  useEffect(() => {
    void loadArea('33100', 'two_room')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const score = data?.score
  const fundamentals = data?.fundamentals

  return (
    <section className="home-section" id="area-score-v2">
      <div className="home-container grid gap-8">
        <div>
          <p className="section-label">Area Score V2 · Paavo fundamentals</p>
          <h2 className="section-title">Markkinahinta ei yksin kerro alueen elinvoimaa.</h2>
          <p className="home-section-lead">
            V2 yhdistää Area Score V1:n toteutuneeseen markkinadataan Tilastokeskuksen Paavo-aineiston tulot, työmarkkinan ja väestörakenteen. Pisteytys on läpinäkyvä vertailumalli, ei hintaennuste.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[.78fr_1.22fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 md:p-7">
            <p className="home-module-label">Fundamentals-analyysi</p>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2 text-sm text-white/70">
                <span>Postinumero</span>
                <input value={postalCode} onChange={(event) => setPostalCode(event.target.value)} inputMode="numeric" maxLength={5} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-white outline-none focus:border-white/30" />
              </label>
              <label className="grid gap-2 text-sm text-white/70">
                <span>Asuntotyyppi</span>
                <select value={propertyType} onChange={(event) => setPropertyType(event.target.value as LandcasterPropertyType)} className="rounded-2xl border border-white/10 bg-[#08090d] px-4 py-3 text-base text-white outline-none">
                  {Object.entries(propertyLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <button type="button" onClick={() => void loadArea()} disabled={loading} className="primary-button justify-center disabled:opacity-60">
                {loading ? 'Lasketaan V2…' : 'Laske Area Score V2'}
              </button>
              {error ? <p className="rounded-2xl border border-red-300/20 bg-red-300/5 p-4 text-sm text-red-100/80">{error}</p> : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.055] p-5 sm:col-span-2">
              <p className="text-sm text-white/45">Area Score V2</p>
              <p className="mt-2 text-5xl font-semibold text-white">{score ? Math.round(score.area_score_v2) : '—'}<span className="text-lg text-white/35"> / 100</span></p>
              <p className="mt-3 text-sm text-white/55">{score ? `${scoreTone(score.area_score_v2)} · varmuus ${Math.round(score.confidence_pct)} %` : 'Markkina + alueen fundamentals'}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/45">Markkina</p>
              <p className="mt-2 text-3xl font-semibold text-white">{score ? Math.round(score.market_score) : '—'}</p>
              <p className="mt-2 text-xs text-white/45">50 % kokonaispisteestä</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/45">Fundamentals</p>
              <p className="mt-2 text-3xl font-semibold text-white">{score ? Math.round(score.fundamentals_score) : '—'}</p>
              <p className="mt-2 text-xs text-white/45">50 % kokonaispisteestä</p>
            </div>
          </div>
        </div>

        {data && fundamentals && score ? (
          <>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 md:p-7">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="home-module-label">{data.area.postalCode} · {data.area.name}</p>
                  <h3 className="home-module-title">Paavo {fundamentals.statistical_year}: alueen perustekijät.</h3>
                </div>
                <p className="text-sm text-white/45">{data.area.municipality} · {score.latest_price_per_sqm ? `${number.format(score.latest_price_per_sqm)} €/m²` : 'hintadata puuttuu'}</p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ['Väestö', fundamentals.population === null ? '—' : number.format(fundamentals.population)],
                  ['Mediaanitulo / vuosi', fundamentals.median_income_eur === null ? '—' : euro.format(fundamentals.median_income_eur)],
                  ['Työllisiä työvoimasta', pct(fundamentals.employment_rate_pct)],
                  ['20–39-vuotiaiden osuus', pct(fundamentals.young_adult_share_pct)],
                  ['Työttömyys työvoimasta', pct(fundamentals.unemployment_rate_pct)],
                  ['Työikäisten osuus', pct(fundamentals.working_age_share_pct)],
                  ['Keski-ikä', fundamentals.average_age === null ? '—' : `${Number(fundamentals.average_age).toFixed(1)} v`],
                  ['Markkinan kauppamäärä', score.sample_size === null ? '—' : number.format(score.sample_size)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <p className="text-xs text-white/45">{label}</p>
                    <p className="mt-1 text-lg font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                ['Työmarkkina', score.employment_score, '40 % fundamentals-pisteestä'],
                ['Mediaanitulo', score.income_score, '35 % fundamentals-pisteestä'],
                ['Demografinen kysyntä', score.demographic_score, '25 % fundamentals-pisteestä'],
                ['Työpaikkadata', score.workplace_score, 'Neutraali 50/100 · nykyinen 12f5-sarja ei erottele alueita'],
              ].map(([label, value, detail]) => (
                <div key={String(label)} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-white/55">{label}</p>
                    <p className="font-semibold text-white">{Math.round(Number(value))}/100</p>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white/70" style={{ width: `${Math.round(Number(value))}%` }} /></div>
                  <p className="mt-3 text-xs leading-5 text-white/40">{detail}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 text-sm leading-6 text-white/45">
              <strong className="text-white/70">Datan rajaus:</strong> {data.source.caveat}
            </div>
          </>
        ) : null}

        <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 md:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="home-module-label">Finland Ranking V2</p>
              <h3 className="home-module-title">Koko Suomi samalla markkina + fundamentals -mallilla.</h3>
            </div>
            <button type="button" onClick={() => void loadRanking()} disabled={rankingLoading} className="secondary-button disabled:opacity-60">
              {rankingLoading ? 'Lasketaan…' : 'Näytä Suomen Top 12 V2'}
            </button>
          </div>

          {ranking ? (
            <div className="mt-6 grid gap-3">
              {ranking.ranking.map((item, index) => (
                <div key={`${item.postalCode}-${index}`} className="grid gap-3 rounded-2xl border border-white/10 bg-black/15 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <p className="text-xl font-semibold text-white/45">#{index + 1}</p>
                  <div>
                    <p className="font-semibold text-white">{item.postalCode} · {item.name}</p>
                    <p className="mt-1 text-xs text-white/45">{item.municipality} · markkina {Math.round(item.marketScore)} · fundamentals {Math.round(item.fundamentalsScore)} · varmuus {Math.round(item.confidencePct)} %</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-2xl font-semibold text-white">{Math.round(item.areaScoreV2)}</p>
                    <p className="text-xs text-white/45">{item.pricePerSqm ? `${number.format(item.pricePerSqm)} €/m²` : '—'}</p>
                  </div>
                </div>
              ))}
              <p className="mt-2 text-xs leading-5 text-white/40">{ranking.methodology} {ranking.caveat}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
