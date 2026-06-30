import { getMemoryWriteReadiness } from '../lib/memory-service'

export default function MemoryWriteReadinessCard() {
  const readiness = getMemoryWriteReadiness()

  return (
    <div className="motion-surface home-core-card">
      <div className="home-core-pill">Memory Write</div>
      <div className="home-core-items">
        <div className="home-core-item">
          <strong>{readiness.canRead ? 'Read ready' : 'Read paused'}</strong>
          <br />
          Memory API GET
        </div>
        <div className="home-core-item">
          <strong>{readiness.canWrite ? 'Write ready' : 'Write pending'}</strong>
          <br />
          Memory API POST
        </div>
        <div className="home-core-item">
          <strong>Mode</strong>
          <br />
          {readiness.mode}
        </div>
        <div className="home-core-item">
          <strong>Detail</strong>
          <br />
          {readiness.detail}
        </div>
      </div>
    </div>
  )
}
