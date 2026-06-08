export default function StockcasterPage() {
  return (
    <main className="min-h-screen bg-[#03040a] text-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="section-label">Market Intelligence</p>
        <h1 className="section-title">Intelligence for modern markets.</h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-white/65">
          Stockcaster combines portfolio analysis, market intelligence, macro awareness, sentiment tracking and AI-driven research.
        </p>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <div className="app-card"><h3 className="text-3xl">Portfolio</h3><p className="mt-4 text-white/60">Allocation, performance, dividends and exposure analysis.</p></div>
          <div className="app-card"><h3 className="text-3xl">Market AI</h3><p className="mt-4 text-white/60">Valuation, risk, sentiment and trend scoring.</p></div>
          <div className="app-card"><h3 className="text-3xl">Autonomous Research</h3><p className="mt-4 text-white/60">Scans news, sectors and catalysts before they matter.</p></div>
        </div>
      </div>
    </main>
  )
}
