type LaunchCTAProps = {
  eyebrow?: string
  title?: string
  description?: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  tone?: 'blue' | 'gold' | 'green' | 'pink' | 'light'
}

const toneClass: Record<NonNullable<LaunchCTAProps['tone']>, string> = {
  blue: 'border-blue-200/20 bg-blue-400/10 text-blue-100/80',
  gold: 'border-yellow-200/20 bg-yellow-300/10 text-yellow-100/80',
  green: 'border-emerald-200/20 bg-emerald-300/10 text-emerald-100/80',
  pink: 'border-pink-300/30 bg-pink-100/50 text-pink-900/65',
  light: 'border-black/10 bg-white/60 text-black/55',
}

export default function LaunchCTA({
  eyebrow = 'Caster OS',
  title = 'Enter the operating system.',
  description = 'Move from one module into the full Caster OS command center.',
  primaryHref = '/dashboard',
  primaryLabel = 'Open Dashboard',
  secondaryHref = '/',
  secondaryLabel = 'Back to Home',
  tone = 'blue',
}: LaunchCTAProps) {
  const dark = tone !== 'pink' && tone !== 'light'

  return (
    <section className="mt-12">
      <div className={`rounded-[2.4rem] border p-8 md:p-10 ${toneClass[tone]}`}>
        <p className="text-xs uppercase tracking-[0.35em] opacity-70">{eyebrow}</p>
        <div className="mt-5 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <h2 className={`max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl ${dark ? 'text-white' : 'text-black'}`}>{title}</h2>
            <p className={`mt-5 max-w-2xl text-base leading-7 ${dark ? 'text-white/58' : 'text-black/55'}`}>{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className={dark ? 'primary-button' : 'rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/80'} href={primaryHref}>
              {primaryLabel}
            </a>
            <a className={dark ? 'secondary-button' : 'rounded-full border border-black/10 bg-white/60 px-6 py-3 text-sm font-medium text-black/70 transition hover:bg-white'} href={secondaryHref}>
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
