const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/agent', label: 'Agent' },
  { href: '/life', label: 'Life' },
  { href: '/wealth/stockcaster', label: 'Wealth' },
  { href: '/gaming/scorecaster', label: 'Gaming' },
  { href: '/health/relaxcaster', label: 'Health' },
]

export default function CasterNav() {
  return (
    <header className="fixed left-1/2 top-5 z-50 w-[min(1180px,calc(100%-2rem))] -translate-x-1/2 rounded-full border border-white/10 bg-black/35 px-4 py-3 text-white shadow-2xl shadow-black/30 backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3 rounded-full pr-2 text-sm font-semibold tracking-tight text-white">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-blue-200/20 bg-blue-400/10 text-xs text-blue-100">OS</span>
          <span>Caster</span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1 md:flex" aria-label="Caster navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-xs font-medium text-white/58 transition hover:bg-white/[0.08] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a className="rounded-full border border-blue-200/20 bg-blue-400/15 px-5 py-2 text-xs font-medium text-blue-50 transition hover:bg-blue-400/25" href="/dashboard">
          Open OS
        </a>
      </div>
    </header>
  )
}
