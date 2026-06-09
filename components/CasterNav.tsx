const links = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/life', label: 'Life' },
  { href: '/wealth/stockcaster', label: 'Wealth' },
  { href: '/gaming/scorecaster', label: 'Gaming' },
  { href: '/health/relaxcaster', label: 'Health' },
  { href: '/agent', label: 'Agent' },
]

export default function CasterNav() {
  return (
    <header className="caster-nav">
      <a href="/" className="caster-brand">Caster OS</a>
      <nav className="caster-links" aria-label="Caster navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </nav>
      <a className="caster-nav-cta" href="/dashboard">Open OS</a>
    </header>
  )
}
