'use client'

import { useEffect, useMemo, useState } from 'react'
import { calculateFairValueV2, type FairValueCondition } from '../lib/landcaster-engine'
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

const riskLabels: Record<string, string> = {
  HIGH_COMPANY_DEBT: 'Korkea yhtiölainaosuus',
  ELEVATED_COMPANY_DEBT: 'Kohonnut yhtiölainaosuus',
  LARGE_KNOWN_RENOVATION: 'Suuri tiedossa oleva remonttiosuus',
  KNOWN_RENOVATION_COST: 'Tiedossa oleva remonttikulu',
  OLDER_BUILDING: 'Vanhempi rakennus — tekniset riskit korostuvat',
  HIGH_FINANCE_CHARGE: 'Rahoitusvastike ylittää hoitovastikkeen',
}

type AreaPayload = {
  area: { postalCode: string; name: string; municipality: string }
  latest: { quarter: string; pricePerSqm: number | null; sales: number | null }
  confidencePct: number
}

function clean(value: string, fallback = 0) {
  const parsed = Number(value.replace(',', '.'))
  return Number.isFinite(parsed) ? Math.max(0, parsed) : fallback
}

export default function LandcasterFairValueV2() {
  const [postalCode, setPostalCode] = useState('33100')
  const [propertyType, setPropertyType] = useState<LandcasterPropertyType>('two_room')
  const [area, setArea] = useState<AreaPayload | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [areaM2, setAreaM2] = useState('55')
  const [askingPrice, setAskingPrice] = useState('200000')
  const [condition, setCondition] = useState<FairValueCondition>('average')
  const [companyDebt, setCompanyDebt] = useState('30000')
  const [renovationShare, setRenovationShare] = useState('0')
  const [maintenanceFee, setMaintenanceFee] = useState('300')
  const [financeCharge, setFinanceCharge] = useState('150')
  const [buildingYear, setBuildingYear] = useState('2005')

  async function loadArea(code = postalCode, type = propertyType) {
    if (!/^\d{5}$/.test(code.trim())) {
      setError('Anna viisinumeroinen postinumero.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/landcaster/area?postalCode=${encodeURIComponent(code.trim())}&propertyType=${encodeURIComponent(type)}`)
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error ?? 'Aluehintaa ei saatu')
      setArea(payload)
    } catch (err) {
      setArea(null)
      setError(err instanceof Error ? err.message : 'Aluehintaa ei saatu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadArea('33100', 'two_room')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const valuation = useMemo(() => {
    const pricePerSqm = area?.latest.pricePerSqm
    if (!pricePerSqm) return null
    return calculateFairValueV2({
      areaM2: clean(areaM2),
      debtFreeAskingPrice: clean(askingPrice),
      areaPricePerSqm: pricePerSqm,
      condition,
      confidencePct: area.confidencePct,
      housingCompanyDebtShare: clean(companyDebt),
      upcomingRenovationShare: clean(renovationShare),
      maintenanceFeeMonthly: clean(maintenanceFee),
      financeChargeMonthly: clean(financeCharge),
      buildingYear: clean(buildingYear),
    })
  }, [area, areaM2, askingPrice, condition, companyDebt, renovationShare, maintenanceFee, financeCharge, buildingYear])

  return (
    <section className="home-section" id="fair-value-v2">
      <div className="home-container grid gap-8">
        <div>
          <p className="section-label">Fair Value V2 · kohderiskit</p>
          <h2 className="section-title">Aluehinta + kunto + yhtiölaina + remontit.</h2>
          <p className="home-section-lead">
            V2 erottaa velattoman arvon, oman pääoman hinnan ja tiedossa olevan remonttiriskin. Yhtiölainaa ei vähennetä kahdesti velattomasta aluevertailusta, vaan se näkyy rahoitusriskinä, kassahintana ja epävarmuusvälin levenemisenä.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 md:p-7">
            <p className="home-module-label">Kohteen tiedot</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-white/70">
                <span>Postinumero</span>
                <input value={postalCode} onChange={(event) => setPostalCode(event.target.value)} inputMode="numeric" maxLength={5} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none" />
              </label>
              <label className="grid gap-2 text-sm text-white/70">
                <span>Asuntotyyppi</span>
                <select value={propertyType} onChange={(event) => setPropertyType(event.target.value as LandcasterPropertyType)} className="rounded-2xl border border-white/10 bg-[#08090d] px-4 py-3 text-white outline-none">
                  {Object.entries(propertyLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm text-white/70">
                <span>Pinta-ala</span>
                <span className="flex rounded-2xl border border-white/10 bg-white/[0.04] px-4"><input value={areaM2} onChange={(event) => setAreaM2(event.target.value)} inputMode="decimal" className="min-w-0 flex-1 bg-transparent py-3 text-white outline-none" /><span className="self-center text-white/40">m²</span></span>
              </label>
              <label className="grid gap-2 text-sm text-white/70">
                <span>Velaton pyyntihinta</span>
                <span className="flex rounded-2xl border border-white/10 bg-white/[0.04] px-4"><input value={askingPrice} onChange={(event) => setAskingPrice(event.target.value)} inputMode="decimal" className="min-w-0 flex-1 bg-transparent py-3 text-white outline-none" /><span className="self-center text-white/40">€</span></span>
              </label>
              <label className="grid gap-2 text-sm text-white/70 sm:col-span-2">
                <span>Kunto</span>
                <select value={condition} onChange={(event) => setCondition(event.target.value as FairValueCondition)} className="rounded-2xl border border-white/10 bg-[#08090d] px-4 py-3 text-white outline-none">
                  {Object.entries(conditionLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm text-white/70">
                <span>Huoneistokohtainen yhtiölaina</span>
                <span className="flex rounded-2xl border border-white/10 bg-white/[0.04] px-4"><input value={companyDebt} onChange={(event) => setCompanyDebt(event.target.value)} inputMode="decimal" className="min-w-0 flex-1 bg-transparent py-3 text-white outline-none" /><span className="self-center text-white/40">€</span></span>
              </label>
              <label className="grid gap-2 text-sm text-white/70">
                <span>Tiedossa oleva remonttiosuus</span>
                <span className="flex rounded-2xl border border-white/10 bg-white/[0.04] px-4"><input value={renovationShare} onChange={(event) => setRenovationShare(event.target.value)} inputMode="decimal" className="min-w-0 flex-1 bg-transparent py-3 text-white outline-none" /><span className="self-center text-white/40">€</span></span>
              </label>
              <label className="grid gap-2 text-sm text-white/70">
                <span>Hoitovastike / kk</span>
                <span className="flex rounded-2xl border border-white/10 bg-white/[0.04] px-4"><input value={maintenanceFee} onChange={(event) => setMaintenanceFee(event.target.value)} inputMode="decimal" className="min-w-0 flex-1 bg-transparent py-3 text-white outline-none" /><span className="self-center text-white/40">€</span></span>
              </label>
              <label className="grid gap-2 text-sm text-white/70">
                <span>Rahoitusvastike / kk</span>
                <span className="flex rounded-2xl border border-white/10 bg-white/[0.04] px-4"><input value={financeCharge} onChange={(event) => setFinanceCharge(event.target.value)} inputMode="decimal" className="min-w-0 flex-1 bg-transparent py-3 text-white outline-none" /><span className="self-center text-white/40">€</span></span>
              </label>
              <label className="grid gap-2 text-sm text-white/70 sm:col-span-2">
                <span>Rakennusvuosi</span>
                <input value={buildingYear} onChange={(event) => setBuildingYear(event.target.value)} inputMode="numeric" className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none" />
              </label>
              <button type="button" onClick={() => void loadArea()} disabled={loading} className="primary-button justify-center sm:col-span-2 disabled:opacity-60">
                {loading ? 'Haetaan aluevertailu…' : 'Päivitä Fair Value V2'}
              </button>
            </div>
            {error ? <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-300/5 p-4 text-sm text-red-100/80">{error}</p> : null}
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.055] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-white/45">Risk-adjusted Fair Value V2</p>
            {valuation && area ? (
              <>
                <p className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">{euro.format(valuation.fairValueMid)}</p>
                <p className="mt-2 text-sm text-white/50">{area.area.postalCode} {area.area.name} · {number.format(area.latest.pricePerSqm ?? 0)} €/m² · {area.latest.quarter}</p>
                <p className="mt-5 text-lg text-white/70">Arvohaarukka {euro.format(valuation.fairValueLow)} – {euro.format(valuation.fairValueHigh)}</p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/45">Oman pääoman arvo yhtiölainan jälkeen</p><p className="mt-1 text-xl font-semibold text-white">{euro.format(valuation.equityFairValueMid)}</p></div>
                  <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/45">Pyyntihinnan kassahinta-arvio</p><p className="mt-1 text-xl font-semibold text-white">{euro.format(valuation.askingEquityPrice)}</p></div>
                  <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/45">Pyynti + tiedossa oleva remontti</p><p className="mt-1 text-xl font-semibold text-white">{euro.format(valuation.allInAskingExposure)}</p></div>
                  <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/45">Yhtiövastikkeet yhteensä / kk</p><p className="mt-1 text-xl font-semibold text-white">{euro.format(valuation.monthlyHousingCompanyCharges)}</p></div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex flex-wrap justify-between gap-3"><p className="text-sm text-white/45">Pyynti vs. riskikorjattu keskiarvo</p><p className="font-semibold text-white">{valuation.priceGapEur >= 0 ? '+' : ''}{euro.format(valuation.priceGapEur)} · {valuation.priceGapPct >= 0 ? '+' : ''}{valuation.priceGapPct.toFixed(1)} %</p></div>
                  <div className="mt-3 flex flex-wrap justify-between gap-3"><p className="text-sm text-white/45">Yhtiölaina / velaton pyynti</p><p className="font-semibold text-white">{valuation.debtRatioPct.toFixed(1)} %</p></div>
                  <div className="mt-3 flex flex-wrap justify-between gap-3"><p className="text-sm text-white/45">Efektiivinen datavarmuus</p><p className="font-semibold text-white">{Math.round(valuation.effectiveConfidencePct)} %</p></div>
                </div>

                {valuation.riskFlags.length ? (
                  <div className="mt-5 grid gap-2">
                    {valuation.riskFlags.map((flag) => <p key={flag} className="rounded-xl border border-amber-200/15 bg-amber-200/[0.04] px-3 py-2 text-sm text-amber-50/75">{riskLabels[flag] ?? flag}</p>)}
                  </div>
                ) : <p className="mt-5 rounded-xl border border-white/10 px-3 py-2 text-sm text-white/55">Syötetyillä tiedoilla ei noussut erillisiä V2-riskilippuja.</p>}

                <p className="mt-6 text-xs leading-5 text-white/40">{valuation.methodology} Tämä on tilastollinen päätöksenteon tuki, ei auktorisoitu kiinteistöarvio. Taloyhtiön PTS, tilinpäätös, tontti, kerros, näkymät ja kohdekohtainen tekninen kunto pitää tarkistaa erikseen.</p>
              </>
            ) : (
              <p className="mt-3 text-3xl font-semibold text-white">Hae alueen hintadata.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
