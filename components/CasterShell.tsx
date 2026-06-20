const status = [
  ['CORE', 'Online'],
  ['MEMORY', 'V1'],
  ['AGENT', 'Ready'],
]

const quickLinks = [
  ['AI', '/agent'],
  ['DASH', '/dashboard'],
  ['CORE', '/#core'],
]

export default function CasterShell() {
  return (
    <>
      <aside className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="pointer-events-auto flex flex-col gap-2 rounded-full border border-white/10 bg-black/35 p-2 shadow-[0_24px_90px_rgba(0,0,0,.35)] backdrop-blur-2xl">
          {quickLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.045] text-[0.62rem] font-semibold tracking-[0.16em] text-white/65 transition hover:border-blue-200/40 hover:bg-blue-400/15 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
      </aside>

      <div className="pointer-events-none fixed bottom-4 left-1/2 z-40 hidden w-[min(760px,calc(100%-2rem))] -translate-x-1/2 md:block">
        <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-full border border-white/10 bg-black/38 px-4 py-3 shadow-[0_24px_90px_rgba(0,0,0,.35)] backdrop-blur-2xl">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-200 shadow-[0_0_18px_rgba(147,197,253,.95)]" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/70">Caster OS Active</span>
          </div>
          <div className="flex items-center gap-2">
            {status.map(([label, value]) => (
              <div key={label} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-white/50">
                {label}: <span className="text-white/85">{value}</span>
              </div>
            ))}
          </div>
          <a href="/agent" className="rounded-full bg-white px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-black transition hover:-translate-y-0.5">
            Ask AI
          </a>
        </div>
      </div>
    </>
  )
}
