import AgentContextPanel from '../../components/AgentContextPanel'
import AgentPreview from '../../components/AgentPreview'
import CommandCenter from '../../components/CommandCenter'
import MemoryPanel from '../../components/MemoryPanel'
import Spacing from '../../components/Spacing'
import { generateAgentRecommendations } from '../../lib/agent-engine'
import { loadMemorySummary } from '../../lib/memory-service'

const prompts = [
  ['Today', 'What should I focus on today?'],
  ['Money', 'How should I plan my next financial goal?'],
  ['Project', 'What is the next step for Caster OS?'],
  ['Health', 'How do I recover and stay consistent?'],
]

const agentStats = [
  ['Profile', 'Context'],
  ['Memory', 'Active'],
  ['Goals', 'Tracked'],
  ['Agent', 'V1'],
]

export default async function AgentPage() {
  const memorySummary = await loadMemorySummary()
  const recommendations = await generateAgentRecommendations()

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />

        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster AI Agent</p>
          <h1 className="home-title">Think.</h1>
          <h2 className="home-subtitle">Then move.</h2>
          <p className="home-lead">
            A context-aware AI layer that reads profile, memory, widgets, goals and active projects before recommending the next action.
          </p>

          <div className="home-highlight-grid">
            {agentStats.map(([value, label]) => (
              <div key={label} className="motion-surface home-highlight-card">
                <p className="home-card-title">{value}</p>
                <p className="home-card-text">{label}</p>
              </div>
            ))}
          </div>

          <div className="home-actions">
            <a className="primary-button" href="/dashboard">Open Dashboard</a>
            <a className="secondary-button" href="/">Back Home</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Ask Caster</p>
          <h2 className="section-title">One agent for the next decision.</h2>
          <p className="home-section-lead">
            Instead of showing every possible option, the agent turns current context into a focused recommendation.
          </p>

          <Spacing>
            <div className="home-core-grid">
              <AgentPreview />
              <div className="motion-surface home-core-card">
                <div className="home-core-pill">Quick Prompts</div>
                <div className="home-core-items">
                  {prompts.map(([tag, text]) => (
                    <div key={tag} className="home-core-item">
                      <strong>{tag}</strong>
                      <br />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Spacing>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Agent Engine</p>
          <h2 className="section-title">Recommendations are now generated from the agent engine.</h2>
          <p className="home-section-lead">
            The first engine uses memory state, launch phase and product direction to produce next actions.
          </p>
          <div className="home-module-grid">
            {recommendations.map((item) => (
              <div key={item.title} className="motion-surface home-module-card">
                <p className="home-module-label">Confidence {Math.round(item.confidence * 100)}%</p>
                <h3 className="home-module-title">{item.title}</h3>
                <p className="home-module-text">{item.reason}</p>
                <p className="home-module-link">{item.nextAction}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Memory Context</p>
          <h2 className="section-title">Agent context now comes from the memory service.</h2>
          <p className="home-section-lead">
            Source: {memorySummary.source}. Connected: {memorySummary.connected ? 'Yes' : 'No'}.
          </p>
          <Spacing>
            <div className="home-core-grid">
              <MemoryPanel />
              <div className="motion-surface home-core-card">
                <div className="home-core-pill">Memory Summary</div>
                <Spacing size="md">
                  <p className="home-section-lead">{memorySummary.data}</p>
                </Spacing>
              </div>
            </div>
          </Spacing>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Context Layer</p>
          <h2 className="section-title">The agent becomes useful when it knows the system.</h2>
          <Spacing>
            <div className="home-core-grid">
              <AgentContextPanel />
              <div className="motion-surface home-core-card">
                <div className="home-core-pill">Next Engine Step</div>
                <div className="home-core-items">
                  <div className="home-core-item">Live prompt context</div>
                  <div className="home-core-item">Real model call</div>
                  <div className="home-core-item">Action history</div>
                  <div className="home-core-item">Feedback loop</div>
                </div>
              </div>
            </div>
          </Spacing>
        </div>
      </section>

      <section className="home-section">
        <div className="home-core-grid home-container">
          <div>
            <p className="section-label">Agent Command Layer</p>
            <h2 className="section-title">Caster AI sits on top of the same core engines.</h2>
            <p className="home-section-lead">
              The agent should not be a chatbot. It should be the decision interface for probability, risk, behavior and action quality.
            </p>
          </div>
          <CommandCenter />
        </div>
      </section>
    </main>
  )
}
