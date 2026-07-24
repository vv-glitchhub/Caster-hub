const links = [
  { href: '/', label: 'Home' },
  { href: '/apps', label: 'Apps' },
  { href: '/brief', label: 'Brief' },
  { href: '/account', label: 'Account' },
  { href: '/profile', label: 'Profile' },
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
