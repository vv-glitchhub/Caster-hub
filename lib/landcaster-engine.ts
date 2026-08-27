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

export type FairValueCondition = 'needs_work' | 'average' | 'good' | 'renovated'

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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
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

export function calculateRemainingLoanBalance(input: LoanScenarioInput & { paymentsMade: number }) {
  const principal = clean(input.principal)
  const totalMonths = Math.max(1, Math.round(clean(input.years) * 12))
  const paidMonths = Math.min(totalMonths, Math.max(0, Math.round(clean(input.paymentsMade))))
  if (paidMonths >= totalMonths) return 0

  const monthlyRate = clean(input.annualRatePct) / 100 / 12
  if (monthlyRate === 0) return principal * (1 - paidMonths / totalMonths)

  const payment = calculateMonthlyPayment(input)
  const growth = Math.pow(1 + monthlyRate, paidMonths)
  return Math.max(0, principal * growth - payment * ((growth - 1) / monthlyRate))
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

export function calculateFairValueEstimate(input: {
  areaM2: number
  askingPrice: number
  areaPricePerSqm: number
  condition: FairValueCondition
  confidencePct: number
}) {
  const conditionFactor: Record<FairValueCondition, number> = {
    needs_work: 0.88,
    average: 1,
    good: 1.05,
    renovated: 1.10,
  }

  const basePrice = clean(input.areaM2) * clean(input.areaPricePerSqm)
  const fairValueMid = basePrice * conditionFactor[input.condition]
  const confidence = clamp(clean(input.confidencePct), 0, 100)
  const bandPct = clamp(0.08 + (100 - confidence) / 300, 0.08, 0.22)
  const fairValueLow = fairValueMid * (1 - bandPct)
  const fairValueHigh = fairValueMid * (1 + bandPct)
  const askingPrice = clean(input.askingPrice)
  const priceGapEur = askingPrice > 0 ? askingPrice - fairValueMid : 0
  const priceGapPct = askingPrice > 0 && fairValueMid > 0 ? (priceGapEur / fairValueMid) * 100 : 0
  const label = askingPrice <= 0
    ? 'NO_ASKING_PRICE'
    : askingPrice < fairValueLow
      ? 'BELOW_AREA_BAND'
      : askingPrice > fairValueHigh
        ? 'ABOVE_AREA_BAND'
        : 'INSIDE_AREA_BAND'

  return {
    fairValueLow,
    fairValueMid,
    fairValueHigh,
    priceGapEur,
    priceGapPct,
    bandPct: bandPct * 100,
    label,
  }
}

export function calculateFairValueV2(input: {
  areaM2: number
  debtFreeAskingPrice: number
  areaPricePerSqm: number
  condition: FairValueCondition
  confidencePct: number
  housingCompanyDebtShare: number
  upcomingRenovationShare: number
  maintenanceFeeMonthly: number
  financeChargeMonthly: number
  buildingYear: number
}) {
  const conditionFactor: Record<FairValueCondition, number> = {
    needs_work: 0.88,
    average: 1,
    good: 1.05,
    renovated: 1.10,
  }

  const areaM2 = clean(input.areaM2)
  const basePrice = areaM2 * clean(input.areaPricePerSqm)
  const conditionAdjustedValue = basePrice * conditionFactor[input.condition]
  const renovationShare = clean(input.upcomingRenovationShare)
  const debtFreeAskingPrice = clean(input.debtFreeAskingPrice)
  const companyDebt = clean(input.housingCompanyDebtShare)
  const fairValueMid = Math.max(0, conditionAdjustedValue - renovationShare)
  const debtReference = Math.max(1, debtFreeAskingPrice || conditionAdjustedValue || basePrice)
  const debtRatio = companyDebt / debtReference
  const renovationRatio = renovationShare / Math.max(1, conditionAdjustedValue)
  const currentYear = new Date().getFullYear()
  const buildingYear = Math.round(clean(input.buildingYear))
  const buildingAge = buildingYear > 0 && buildingYear <= currentYear ? currentYear - buildingYear : 0

  const baseConfidence = clamp(clean(input.confidencePct), 0, 100)
  const debtPenalty = Math.min(12, debtRatio * 30)
  const renovationPenalty = Math.min(14, renovationRatio * 45)
  const agePenalty = buildingAge > 40 ? Math.min(10, (buildingAge - 40) * 0.25) : 0
  const effectiveConfidencePct = clamp(baseConfidence - debtPenalty - renovationPenalty - agePenalty, 20, 100)
  const bandPct = clamp(
    0.08
      + (100 - effectiveConfidencePct) / 280
      + Math.min(0.07, debtRatio * 0.10)
      + Math.min(0.08, renovationRatio * 0.35),
    0.08,
    0.30,
  )

  const fairValueLow = fairValueMid * (1 - bandPct)
  const fairValueHigh = fairValueMid * (1 + bandPct)
  const equityFairValueMid = Math.max(0, fairValueMid - companyDebt)
  const askingEquityPrice = Math.max(0, debtFreeAskingPrice - companyDebt)
  const allInAskingExposure = debtFreeAskingPrice + renovationShare
  const priceGapEur = debtFreeAskingPrice > 0 ? debtFreeAskingPrice - fairValueMid : 0
  const priceGapPct = debtFreeAskingPrice > 0 && fairValueMid > 0 ? (priceGapEur / fairValueMid) * 100 : 0
  const monthlyHousingCompanyCharges = clean(input.maintenanceFeeMonthly) + clean(input.financeChargeMonthly)

  const riskFlags: string[] = []
  if (debtRatio >= 0.30) riskFlags.push('HIGH_COMPANY_DEBT')
  else if (debtRatio >= 0.15) riskFlags.push('ELEVATED_COMPANY_DEBT')
  if (renovationRatio >= 0.15) riskFlags.push('LARGE_KNOWN_RENOVATION')
  else if (renovationShare > 0) riskFlags.push('KNOWN_RENOVATION_COST')
  if (buildingAge >= 50) riskFlags.push('OLDER_BUILDING')
  if (clean(input.financeChargeMonthly) > clean(input.maintenanceFeeMonthly) && clean(input.financeChargeMonthly) > 0) riskFlags.push('HIGH_FINANCE_CHARGE')

  const label = debtFreeAskingPrice <= 0
    ? 'NO_ASKING_PRICE'
    : debtFreeAskingPrice < fairValueLow
      ? 'BELOW_RISK_ADJUSTED_BAND'
      : debtFreeAskingPrice > fairValueHigh
        ? 'ABOVE_RISK_ADJUSTED_BAND'
        : 'INSIDE_RISK_ADJUSTED_BAND'

  return {
    basePrice,
    conditionAdjustedValue,
    fairValueLow,
    fairValueMid,
    fairValueHigh,
    equityFairValueMid,
    askingEquityPrice,
    allInAskingExposure,
    priceGapEur,
    priceGapPct,
    debtRatioPct: debtRatio * 100,
    renovationRatioPct: renovationRatio * 100,
    buildingAge,
    monthlyHousingCompanyCharges,
    effectiveConfidencePct,
    bandPct: bandPct * 100,
    riskFlags,
    label,
    methodology: 'Debt-free area benchmark × condition adjustment − known upcoming renovation share. Housing-company debt is shown as equity/cash-price exposure and uncertainty, not subtracted twice from a debt-free regional benchmark.',
  }
}

export function calculateBuyVsRentDetailed(input: {
  purchasePrice: number
  downPayment: number
  annualRatePct: number
  loanYears: number
  horizonYears: number
  monthlyOwnerNonLoanCost: number
  monthlyRent: number
  annualHomeGrowthPct: number
  annualRentGrowthPct: number
  transferTaxPct: number
  sellingCostPct: number
}) {
  const purchasePrice = clean(input.purchasePrice)
  const downPayment = Math.min(purchasePrice, clean(input.downPayment))
  const loanPrincipal = Math.max(0, purchasePrice - downPayment)
  const horizonYears = Math.max(1, Math.round(clean(input.horizonYears)))
  const months = horizonYears * 12
  const loanYears = Math.max(1, clean(input.loanYears))
  const mortgage = calculateLoanScenario({
    principal: loanPrincipal,
    annualRatePct: clean(input.annualRatePct),
    years: loanYears,
  })
  const paidLoanMonths = Math.min(months, Math.round(loanYears * 12))
  const mortgagePaid = mortgage.monthlyPayment * paidLoanMonths
  const remainingLoan = calculateRemainingLoanBalance({
    principal: loanPrincipal,
    annualRatePct: clean(input.annualRatePct),
    years: loanYears,
    paymentsMade: paidLoanMonths,
  })
  const ownerRunningCost = clean(input.monthlyOwnerNonLoanCost) * months
  const transferTax = purchasePrice * clean(input.transferTaxPct) / 100
  const futureHomeValue = purchasePrice * Math.pow(1 + clean(input.annualHomeGrowthPct) / 100, horizonYears)
  const sellingCost = futureHomeValue * clean(input.sellingCostPct) / 100
  const netSaleProceeds = Math.max(0, futureHomeValue - sellingCost - remainingLoan)
  const ownerNetCost = downPayment + mortgagePaid + ownerRunningCost + transferTax - netSaleProceeds

  let rent = clean(input.monthlyRent)
  let rentPaid = 0
  for (let month = 0; month < months; month += 1) {
    rentPaid += rent
    if ((month + 1) % 12 === 0) rent *= 1 + clean(input.annualRentGrowthPct) / 100
  }

  const differenceOwnerMinusRent = ownerNetCost - rentPaid

  return {
    months,
    loanPrincipal,
    mortgageMonthlyPayment: mortgage.monthlyPayment,
    mortgagePaid,
    remainingLoan,
    ownerRunningCost,
    transferTax,
    futureHomeValue,
    sellingCost,
    netSaleProceeds,
    ownerNetCost,
    rentPaid,
    differenceOwnerMinusRent,
    winner: differenceOwnerMinusRent < 0 ? 'BUY' : differenceOwnerMinusRent > 0 ? 'RENT' : 'EVEN',
  }
}

// Kept for compatibility with the original MVP surface.
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
