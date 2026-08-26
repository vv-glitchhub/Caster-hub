'use client'

import { useMemo, useState } from 'react'
import { calculateAspPlan, calculateLoanScenario, calculateTrueHousingCost } from '../lib/landcaster-engine'

const euro = new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

function numberValue(value: string, fallback = 0) {
  const parsed = Number(value.replace(',', '.'))
  return Number.isFinite(parsed) ? Math.max(0, parsed) : fallback
}

function Field({ label, value, onChange, suffix }: { label: string; value: string; onChange: (value: string) => void; suffix?: string }) {
  return (
    <label className="grid gap-2 text-sm text-white/70">
      <span>{label}</span>
      <span className="flex items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 focus-within:border-white/30">
        <input
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent py-3 text-base text-white outline-none"
        />
        {suffix ? <span className="ml-3 text-white/40">{suffix}</span> : null}
      </span>
    </label>
  )
}

export default function LandcasterWorkspace() {
  const [municipality, setMunicipality] = useState('Tampere')
  const [targetPrice, setTargetPrice] = useState('200000')
  const [aspSavings, setAspSavings] = useState('8000')
  const [monthlyAsp, setMonthlyAsp] = useState('500')
  const [annualRate, setAnnualRate] = useState('3.5')
  const [loanYears, setLoanYears] = useState('25')
  const [energy, setEnergy] = useState('180')
  const [water, setWater] = useState('45')
  const [insurance, setInsurance] = useState('50')
  const [propertyTax, setPropertyTax] = useState('40')
  const [maintenance, setMaintenance] = useState('200')

  const values = useMemo(() => {
    const price = numberValue(targetPrice)
    const asp = calculateAspPlan({
      municipality,
      aspSavings: numberValue(aspSavings),
      monthlyAspSaving: numberValue(monthlyAsp),
      targetPrice: price,
    })
    const loanPrincipal = Math.max(0, Math.min(price * 0.9, price - numberValue(aspSavings)))
    const loan = calculateLoanScenario({
      principal: loanPrincipal,
      annualRatePct: numberValue(annualRate),
      years: numberValue(loanYears, 25),
    })
    const trueMonthly = calculateTrueHousingCost({
      loanPayment: loan.monthlyPayment,
      energy: numberValue(energy),
      water: numberValue(water),
      insurance: numberValue(insurance),
      propertyTax: numberValue(propertyTax),
      maintenanceReserve: numberValue(maintenance),
      other: 0,
    })
    const stress = calculateLoanScenario({ principal: loanPrincipal, annualRatePct: 6, years: numberValue(loanYears, 25) })

    return { price, asp, loanPrincipal, loan, trueMonthly, stress }
  }, [municipality, targetPrice, aspSavings, monthlyAsp, annualRate, loanYears, energy, water, insurance, propertyTax, maintenance])

  const readiness = values.asp.missingOwnFunds === 0 ? 'Omarahoitustavoite täynnä' : values.asp.monthsToTarget === null ? 'Säästötahti puuttuu' : `${values.asp.monthsToTarget} kk 10 % tavoitteeseen`

  return (
    <section className="home-section">
      <div className="home-container grid gap-8">
        <div>
          <p className="section-label">My Plan</p>
          <h2 className="section-title">Näe ostovalmius ennen kuin sitoudut asuntoon.</h2>
          <p className="home-section-lead">Ensimmäinen Landcaster-versio yhdistää ASP:n, lainan, korkostressin ja omakotitalon todellisen kuukausikustannuksen samaan näkymään.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 md:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-white/70 sm:col-span-2">
                <span>Kunta</span>
                <input value={municipality} onChange={(event) => setMunicipality(event.target.value)} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-white outline-none focus:border-white/30" />
              </label>
              <Field label="Tavoitehinta" value={targetPrice} onChange={setTargetPrice} suffix="€" />
              <Field label="ASP-säästöt nyt" value={aspSavings} onChange={setAspSavings} suffix="€" />
              <Field label="ASP / kk" value={monthlyAsp} onChange={setMonthlyAsp} suffix="€" />
              <Field label="Laina-aika" value={loanYears} onChange={setLoanYears} suffix="v" />
              <Field label="Korkoarvio" value={annualRate} onChange={setAnnualRate} suffix="%" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/45">Ostovalmius</p>
              <p className="mt-2 text-2xl font-semibold text-white">{readiness}</p>
              <p className="mt-3 text-sm text-white/55">10 % omarahoitustavoite {euro.format(values.asp.ownFundsTarget)} · puuttuu {euro.format(values.asp.missingOwnFunds)}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/45">ASP-korkotukikatto</p>
              <p className="mt-2 text-2xl font-semibold text-white">{euro.format(values.asp.interestSupportCap)}</p>
              <p className="mt-3 text-sm text-white/55">Nykyisillä säästöillä laskennallinen ASP-laina enintään {euro.format(values.asp.aspInterestSupportLoan)}.</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/45">Arvioitu lainapääoma</p>
              <p className="mt-2 text-2xl font-semibold text-white">{euro.format(values.loanPrincipal)}</p>
              <p className="mt-3 text-sm text-white/55">Laskelma käyttää enintään 90 % rahoitusta ja tämänhetkisiä syöttämiäsi säästöjä.</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/45">Lainan kuukausierä</p>
              <p className="mt-2 text-2xl font-semibold text-white">{euro.format(values.loan.monthlyPayment)} / kk</p>
              <p className="mt-3 text-sm text-white/55">6 % korkostressissä noin {euro.format(values.stress.monthlyPayment)} / kk.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 md:p-7">
            <p className="home-module-label">True Housing Cost</p>
            <h3 className="home-module-title">Mitä asuminen maksaa oikeasti?</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Energia / kk" value={energy} onChange={setEnergy} suffix="€" />
              <Field label="Vesi / kk" value={water} onChange={setWater} suffix="€" />
              <Field label="Vakuutus / kk" value={insurance} onChange={setInsurance} suffix="€" />
              <Field label="Kiinteistövero / kk" value={propertyTax} onChange={setPropertyTax} suffix="€" />
              <div className="sm:col-span-2"><Field label="Kunnossapitovara / kk" value={maintenance} onChange={setMaintenance} suffix="€" /></div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.055] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-white/45">Landcaster kuukausikustannus</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">{euro.format(values.trueMonthly)} / kk</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">Sisältää lainan arvioidun kuukausierän sekä syöttämäsi energia-, vesi-, vakuutus-, kiinteistövero- ja kunnossapitovaraukset. Tämä luku on tarkoitettu päätöksenteon tueksi, ei pankin lainapäätökseksi.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/45">Laina</p><p className="mt-1 font-semibold text-white">{euro.format(values.loan.monthlyPayment)}</p></div>
              <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/45">Muut kulut</p><p className="mt-1 font-semibold text-white">{euro.format(values.trueMonthly - values.loan.monthlyPayment)}</p></div>
              <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/45">Korkostressi 6 %</p><p className="mt-1 font-semibold text-white">{euro.format(values.stress.monthlyPayment)}</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
