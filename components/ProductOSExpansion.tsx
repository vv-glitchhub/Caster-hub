import AgentPreview from './AgentPreview'
import CommandCenter from './CommandCenter'
import IntelligenceGraphs from './IntelligenceGraphs'

export default function ProductOSExpansion({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <>
      <section className="home-section">
        <div className="home-container home-core-grid">
          <div>
            <p className="section-label">{label} Agent Layer</p>
            <h2 className="section-title">{title}</h2>
            <p className="home-section-lead">{text}</p>
          </div>
          <AgentPreview />
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Signal View</p>
          <h2 className="section-title">The module connects into the same intelligence graph system.</h2>
          <p className="home-section-lead">
            Caster OS keeps every product connected to shared signal, risk, behavior and decision quality layers.
          </p>
          <IntelligenceGraphs />
        </div>
      </section>

      <section className="home-section">
        <div className="home-core-grid home-container">
          <div>
            <p className="section-label">Shared Core</p>
            <h2 className="section-title">One decision engine behind every product.</h2>
            <p className="home-section-lead">
              The product is not isolated. It connects back to the same probability, risk, behavior and decision engines.
            </p>
          </div>
          <CommandCenter />
        </div>
      </section>
    </>
  )
}
