const links = [
  { href: '/', label: 'Home' },
  { href: '/apps', label: 'Apps' },
  { href: '/autonomy', label: 'Auto' },
  { href: '/agent', label: 'AI' },
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
