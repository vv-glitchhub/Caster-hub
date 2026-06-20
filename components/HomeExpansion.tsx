import AgentPreview from './AgentPreview'
import IntelligenceGraphs from './IntelligenceGraphs'

export default function HomeExpansion() {
  return (
    <>
      <section className="home-section">
        <div className="home-container home-agent-grid">
          <div>
            <p className="section-label">Caster AI Agent</p>
            <h2 className="section-title">A daily decision brief across the entire ecosystem.</h2>
            <p className="home-section-lead">
              The agent layer connects wealth, gaming, health, life planning and dashboard context into one practical priority list.
            </p>
          </div>
          <AgentPreview />
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Live Intelligence Graphs</p>
          <h2 className="section-title">Every Caster module turns data into a decision signal.</h2>
          <p className="home-section-lead">
            Sports edge, market trend and human control are visualized as one connected decision intelligence system.
          </p>
          <IntelligenceGraphs />
        </div>
      </section>
    </>
  )
}
