const links = [
  { href: '/scorecaster', label: 'Scorecaster' },
  { href: '/stockcaster', label: 'Stockcaster' },
  { href: '/relaxcaster', label: 'Relaxcaster' },
]

export default function CasterFooter() {
  return (
    <footer className="caster-footer">
      <div>
        <p className="caster-footer-brand">Caster</p>
        <p className="caster-footer-copy">Luxury AI ecosystem for decisions, markets and intelligence.</p>
      </div>
      <div className="caster-footer-links">
        {links.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </div>
    </footer>
  )
}
