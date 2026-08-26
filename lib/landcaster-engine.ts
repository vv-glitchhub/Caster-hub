export type LoanScenarioInput = {
  principal: number
  annualRatePct: number
  years: number
}

export type AspPlanInput = {
  municipality: string
  aspSavings: number
  monthlyAspSaving: number
  targetPrice: number
}

const HIGH_ASP_CAP_CITIES = new Set([
  'espoo',
  'helsinki',
  'kauniainen',
  'oulu',
  'tampere',
  'turku',
  'vantaa',
])

function clean(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0
}

export function calculateMonthlyPayment({ principal, annualRatePct, years }: LoanScenarioInput) {
  const p = clean(principal)
  const months = Math.max(1, Math.round(clean(years) * 12))
  const monthlyRate = clean(annualRatePct) / 100 / 12

  if (monthlyRate === 0) return p / months

  const factor = Math.pow(1 + monthlyRate, months)
  return p * ((monthlyRate * factor) / (factor - 1))
}

export function calculateLoanScenario(input: LoanScenarioInput) {
  const monthlyPayment = calculateMonthlyPayment(input)
  const months = Math.max(1, Math.round(clean(input.years) * 12))
  const totalPaid = monthlyPayment * months
  const principal = clean(input.principal)

  return {
    monthlyPayment,
    totalPaid,
    totalInterest: Math.max(0, totalPaid - principal),
  }
}

export function getAspInterestSupportCap(municipality: string) {
  const key = municipality.trim().toLocaleLowerCase('fi-FI')
  return HIGH_ASP_CAP_CITIES.has(key) ? 230_000 : 160_000
}

export function calculateAspPlan({ municipality, aspSavings, monthlyAspSaving, targetPrice }: AspPlanInput) {
  const savings = clean(aspSavings)
  const monthly = clean(monthlyAspSaving)
  const price = clean(targetPrice)
  const ownFundsTarget = price * 0.1
  const missingOwnFunds = Math.max(0, ownFundsTarget - savings)
  const monthsToTarget = missingOwnFunds === 0 ? 0 : monthly > 0 ? Math.ceil(missingOwnFunds / monthly) : null
  const calculatedAspLoan = savings * 9
  const interestSupportCap = getAspInterestSupportCap(municipality)
  const aspInterestSupportLoan = Math.min(calculatedAspLoan, interestSupportCap, price * 0.9)
  const maxHousingLoanAt90Pct = price * 0.9

  return {
    ownFundsTarget,
    missingOwnFunds,
    monthsToTarget,
    calculatedAspLoan,
    interestSupportCap,
    aspInterestSupportLoan,
    maxHousingLoanAt90Pct,
  }
}

export function calculateTrueHousingCost(input: {
  loanPayment: number
  energy: number
  water: number
  insurance: number
  propertyTax: number
  maintenanceReserve: number
  other: number
}) {
  return Object.values(input).reduce((sum, value) => sum + clean(value), 0)
}

export function calculateBuyVsRent(input: {
  purchasePrice: number
  downPayment: number
  monthlyOwnerCost: number
  monthlyRent: number
  annualHomeGrowthPct: number
  annualRentGrowthPct: number
  years: number
  transferTaxPct: number
  sellingCostPct: number
}) {
  const years = Math.max(1, Math.round(clean(input.years)))
  const months = years * 12
  const purchasePrice = clean(input.purchasePrice)
  let rent = clean(input.monthlyRent)
  let rentPaid = 0

  for (let month = 0; month < months; month += 1) {
    rentPaid += rent
    if ((month + 1) % 12 === 0) rent *= 1 + clean(input.annualRentGrowthPct) / 100
  }

  const ownerRunningCost = clean(input.monthlyOwnerCost) * months
  const transferTax = purchasePrice * clean(input.transferTaxPct) / 100
  const futureHomeValue = purchasePrice * Math.pow(1 + clean(input.annualHomeGrowthPct) / 100, years)
  const sellingCost = futureHomeValue * clean(input.sellingCostPct) / 100

  return {
    rentPaid,
    ownerCashOutlay: clean(input.downPayment) + ownerRunningCost + transferTax,
    transferTax,
    futureHomeValue,
    sellingCost,
  }
}
