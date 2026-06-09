import { getCasterMemory } from '../lib/caster-memory'

const categoryLabels: Record<string, string> = {
  profile: 'Profile',
  goal: 'Goal',
  project: 'Project',
  preference: 'Preference',
  widget: 'Widget',
  agent: 'Agent',
}

export default function MemoryPanel() {
  const memories = getCasterMemory()

  return (
    <div className="motion-surface home-core-card">
      <div className="home-core-pill">Memory Layer</div>
      <div className="home-core-items">
        {memories.map((memory) => (
          <div key={memory.id} className="home-core-item">
            <strong>{categoryLabels[memory.category] ?? memory.category}</strong>
            <br />
            {memory.title}
          </div>
        ))}
      </div>
    </div>
  )
}
