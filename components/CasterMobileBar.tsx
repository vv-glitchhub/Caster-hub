const links = [
  { href: '/', label: 'Home' },
  { href: '/demo', label: 'Demo' },
  { href: '/agent', label: 'AI' },
  { href: '/pitch', label: 'Pitch' },
]

export default function CasterMobileBar() {
  return (
    <nav className="caster-mobile-bar" aria-label="Mobile launch navigation">
      <div className="caster-mobile-bar-inner">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
