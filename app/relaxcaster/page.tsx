const modes = [
  ['Calm', 'Interrupt panic, stress and emotional overload before they take control.'],
  ['Clarity', 'Separate facts, assumptions and fears to reduce mental noise.'],
  ['Decision', 'Compare options, risks, regrets and next steps with structure.'],
  ['Talk', 'Prepare difficult conversations with calm and confidence.'],
]

const flow = ['Pressure detected', 'State analysis', 'Clarity engine', 'Decision support', 'Action plan']

export default function RelaxcasterPage() {
  return (
    <main className="min-h-screen bg-[#03040a] text-white">
      <section className="relative flex min-h-screen items-center px-6 py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(168,85,247,0.22),transparent_32%),radial-gradient(circle_at_20%_70%,rgba(59,130,246,0.18),transparent_34%),linear-gradient(180deg,#03040a,#090916_58%,#020207)]" />
        <div className="grid-overlay" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="section-label">Human Intelligence</p>
          <h1 className="section-title">Clarity under pressure.</h1>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-white/65">
            Relaxcaster helps people slow down, think clearly and make better decisions when emotions are loud.
          </p>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="section-label">Core Modes</p>
          <h2 className="section-title">A decision system for difficult moments.</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {modes.map(([title, text]) => (
              <div className="app-card min-h-0" key={title}>
                <p className="text-2xl font-semibold">{title}</p>
                <p className="mt-4 text-white/60 leading-7">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="section-label">Operating Flow</p>
          <h2 className="section-title">From overwhelm to action.</h2>
          <div className="mt-14 grid gap-4 md:grid-cols-5">
            {flow.map((item, index) => (
              <div key={item} className="dashboard-preview min-h-0">
                <p className="text-sm text-white/45">0{index + 1}</p>
                <h3 className="mt-5 text-2xl font-semibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
