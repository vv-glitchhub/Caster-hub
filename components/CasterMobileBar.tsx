const links = [
  { href: '/', label: 'Home' },
  { href: '/demo', label: 'Demo' },
  { href: '/agent', label: 'AI' },
  { href: '/pitch', label: 'Pitch' },
]

export default function CasterMobileBar() {
  return (
    <nav className="fixed bottom-3 left-3 right-3 z-50 rounded-full border border-white/10 bg-black/55 px-2 py-2 shadow-[0_24px_90px_rgba(0,0,0,.45)] backdrop-blur-2xl md:hidden" aria-label="Mobile launch navigation">
      <div className="grid grid-cols-4 gap-1">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full px-3 py-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
