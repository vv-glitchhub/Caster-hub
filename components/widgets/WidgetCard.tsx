import type { DashboardWidget } from '../../lib/caster-core/widget-engine'

const areaTone: Record<DashboardWidget['area'], string> = {
  core: 'text-blue-200/70',
  life: 'text-white/70',
  wealth: 'text-yellow-200/70',
  gaming: 'text-emerald-200/70',
  health: 'text-pink-200/70',
  utility: 'text-cyan-200/70',
}

export default function WidgetCard({ widget }: { widget: DashboardWidget }) {
  const content = (
    <div className="dashboard-preview min-h-0 transition hover:-translate-y-2 hover:border-blue-200/40">
      <p className={`text-xs uppercase tracking-[0.35em] ${areaTone[widget.area]}`}>{widget.area}</p>
      <h2 className="mt-5 text-3xl font-semibold">{widget.title}</h2>
      <p className="mt-4 text-sm leading-6 text-white/58">{widget.description}</p>
      <div className="mt-8 space-y-3">
        {widget.items.map((item) => (
          <div key={item} className="preview-row">{item}</div>
        ))}
      </div>
    </div>
  )

  if (!widget.href) return content

  return <a href={widget.href}>{content}</a>
}
