export default function RelaxcasterPage() {
  return (
    <main className="min-h-screen bg-[#03040a] text-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="section-label">Human Intelligence</p>
        <h1 className="section-title">Clarity under pressure.</h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-white/65">
          Relaxcaster helps people slow down, think clearly and make better decisions when emotions are loud.
        </p>
        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          <div className="app-card"><h3 className="text-3xl">Calm</h3></div>
          <div className="app-card"><h3 className="text-3xl">Clarity</h3></div>
          <div className="app-card"><h3 className="text-3xl">Decision</h3></div>
          <div className="app-card"><h3 className="text-3xl">Talk</h3></div>
        </div>
      </div>
    </main>
  )
}
