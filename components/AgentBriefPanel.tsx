import Spacing from './Spacing'
import { createAgentBrief } from '../lib/agent-engine'

export default async function AgentBriefPanel() {
  const brief = await createAgentBrief()

  return (
    <div className="motion-surface home-core-card">
      <div className="home-core-pill">Agent Brief</div>
      <Spacing size="md">
        <p className="home-section-lead">
          {brief}
        </p>
      </Spacing>
    </div>
  )
}
