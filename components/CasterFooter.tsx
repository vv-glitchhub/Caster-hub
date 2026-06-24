const links = [
  { href: '/demo', label: 'Demo' },
  { href: '/pitch', label: 'Pitch' },
  { href: '/business', label: 'Business' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/launch', label: 'Launch' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/disclaimer', label: 'Disclaimer' },
]

export default function CasterFooter() {
  return (
    <footer className="caster-footer">
      <div>
        <p className="caster-footer-brand">Caster OS</p>
        <p className="caster-footer-copy">Premium AI operating system prototype for decisions, markets and personal intelligence.</p>
      </div>
      <div className="caster-footer-links">
        {links.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </div>
    </footer>
  )
}
