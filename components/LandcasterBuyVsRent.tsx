'use client'

import { useMemo, useState } from 'react'
import { calculateBuyVsRentDetailed } from '../lib/landcaster-engine'

const euro = new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

function n(value: string, fallback = 0) {
  const parsed = Number(value.replace(',', '.'))
  return Number.isFinite(parsed) ? Math.max(0, parsed) : fallback
}

function Field({ label, value, onChange, suffix }: { label: string; value: string; onChange: (value: string) => void; suffix: string }) {
  return (
    <label className="grid gap-2 text-sm text-white/70">
      <span>{label}</span>
      <span className="flex items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 focus-within:border-white/30">
        <input value={value} onChange={(event) => onChange(event.target.value)} inputMode="decimal" className="min-w-0 flex-1 bg-transparent py-3 text-base text-white outline-none" />
        <span className="ml-3 text-white/40">{suffix}</span>
      </span>
    </label>
  )
}

export default function LandcasterBuyVsRent() {
  const [purchasePrice, setPurchasePrice] = useState('200000')
  const [downPayment, setDownPayment] = useState('20000')
  const [annualRate, setAnnualRate] = useState('3.5')
  const [loanYears, setLoanYears] = useState('25')
  const [horizonYears, setHorizonYears] = useState('7')
  const [monthlyOwnerCost, setMonthlyOwnerCost] = useState('350')
  const [monthlyRent, setMonthlyRent] = useState('950')
  const [homeGrowth, setHomeGrowth] = useState('1.5')
  const [rentGrowth, setRentGrowth] = useState('2')
  const [transferTax, setTransferTax] = useState('1.5')
  const [sellingCost, setSellingCost] = useState('3')

  const result = useMemo(() => calculateBuyVsRentDetailed({
    purchasePrice: n(purchasePrice),
    downPayment: n(downPayment),
    annualRatePct: n(annualRate),
    loanYears: n(loanYears, 25),
    horizonYears: n(horizonYears, 7),
    monthlyOwnerNonLoanCost: n(monthlyOwnerCost),
    monthlyRent: n(monthlyRent),
    annualHomeGrowthPct: n(homeGrowth),
    annualRentGrowthPct: n(rentGrowth),
    transferTaxPct: n(transferTax),
    sellingCostPct: n(sellingCost),
  }), [purchasePrice, downPayment, annualRate, loanYears, horizonYears, monthlyOwnerCost, monthlyRent, homeGrowth, rentGrowth, transferTax, sellingCost])

  const winner = result.winner === 'BUY' ? 'OSTO' : result.winner === 'RENT' ? 'VUOKRAUS' : 'TASAN'

  return (
    <section className="home-section" id="buy-vs-rent">
      <div className="home-container grid gap-8">
        <div>
          <p className="section-label">Buy vs Rent V1</p>
          <h2 className="section-title">Osta vai vuokraa samalla aikahorisontilla?</h2>
          <p className="home-section-lead">Skenaario laskee omistamisen nettokustannuksen myös myyntihetkeen asti: laina, juoksevat kulut, varainsiirtovero, jäljellä oleva velka, arvioitu myyntiarvo ja myyntikulut verrataan kasvavaan vuokraan.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 md:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Ostohinta" value={purchasePrice} onChange={setPurchasePrice} suffix="€" />
              <Field label="Omarahoitus" value={downPayment} onChange={setDownPayment} suffix="€" />
              <Field label="Lainan korko" value={annualRate} onChange={setAnnualRate} suffix="%" />
              <Field label="Laina-aika" value={loanYears} onChange={setLoanYears} suffix="v" />
              <Field label="Vertailuaika" value={horizonYears} onChange={setHorizonYears} suffix="v" />
              <Field label="Omistajan muut kulut / kk" value={monthlyOwnerCost} onChange={setMonthlyOwnerCost} suffix="€" />
              <Field label="Vastaava vuokra / kk" value={monthlyRent} onChange={setMonthlyRent} suffix="€" />
              <Field label="Asunnon arvon kasvu / v" value={homeGrowth} onChange={setHomeGrowth} suffix="%" />
              <Field label="Vuokran nousu / v" value={rentGrowth} onChange={setRentGrowth} suffix="%" />
              <Field label="Varainsiirtovero" value={transferTax} onChange={setTransferTax} suffix="%" />
              <div className="sm:col-span-2"><Field label="Myyntikulut" value={sellingCost} onChange={setSellingCost} suffix="%" /></div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.055] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-white/45">Decision scenario</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-white">{winner}</p>
            <p className="mt-3 text-base leading-7 text-white/60">Nykyisillä oletuksilla {n(horizonYears, 7)} vuoden vertailussa {winner === 'OSTO' ? 'omistamisen nettokustannus jää vuokrausta pienemmäksi.' : winner === 'VUOKRAUS' ? 'vuokrauksen kokonaiskustannus jää omistamista pienemmäksi.' : 'skenaariot ovat käytännössä yhtä suuret.'}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/45">Oston nettokustannus</p><p className="mt-1 font-semibold text-white">{euro.format(result.ownerNetCost)}</p></div>
              <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/45">Vuokrat yhteensä</p><p className="mt-1 font-semibold text-white">{euro.format(result.rentPaid)}</p></div>
              <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/45">Arvioitu myyntiarvo</p><p className="mt-1 font-semibold text-white">{euro.format(result.futureHomeValue)}</p></div>
              <div className="rounded-2xl border border-white/10 p-4"><p className="text-xs text-white/45">Jäljellä oleva laina</p><p className="mt-1 font-semibold text-white">{euro.format(result.remainingLoan)}</p></div>
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm text-white/45">Ero: osto − vuokraus</p>
              <p className="mt-1 text-2xl font-semibold text-white">{euro.format(result.differenceOwnerMinusRent)}</p>
              <p className="mt-2 text-xs text-white/40">Negatiivinen luku suosii ostoa, positiivinen vuokrausta.</p>
            </div>
            <p className="mt-5 text-xs leading-5 text-white/40">Mallista puuttuvat vielä säästöjen vaihtoehtoistuotto, henkilökohtaiset verovaikutukset ja kohdekohtaiset poikkeusriskit. Varainsiirtovero on oletuksena 1,5 % asunto-osakkeelle; muuta arvoa kohteen mukaan.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
