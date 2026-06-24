const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/agent', label: 'Agent' },
  { href: '/system', label: 'System' },
  { href: '/modules', label: 'Modules' },
  { href: '/demo', label: 'Demo' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/pitch', label: 'Pitch' },
  { href: '/wealth/stockcaster', label: 'Wealth' },
  { href: '/gaming/scorecaster', label: 'Gaming' },
  { href: '/health/relaxcaster', label: 'Health' },
]

export default function CasterNav() {
  return (
    <header className="caster-nav-v2">
      <a href="/" className="caster-nav-brand">
        <span className="caster-nav-mark">OS</span>
        <span>Caster</span>
      </a>

      <nav className="caster-nav-links" aria-label="Caster navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </nav>

      <a className="caster-nav-action" href="/dashboard">Open OS</a>
    </header>
  )
}
