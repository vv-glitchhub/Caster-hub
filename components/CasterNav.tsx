const links = [
  { href: '/', label: 'Hub' },
  { href: '/scorecaster', label: 'Scorecaster' },
  { href: '/stockcaster', label: 'Stockcaster' },
  { href: '/relaxcaster', label: 'Relaxcaster' },
  { href: '/caster-core', label: 'Core' }
]

export default function CasterNav() {
  return (
    <header className="caster-nav">
      <a href="/" className="caster-brand">Caster</a>
      <nav className="caster-links" aria-label="Caster navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </nav>
      <a className="caster-nav-cta" href="/caster-core">Core</a>
    </header>
  )
}
