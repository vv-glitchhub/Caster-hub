import { getSupabaseStatus } from '../lib/supabase'

export default function SupabaseStatusCard() {
  const status = getSupabaseStatus()

  return (
    <div className="motion-surface home-core-card">
      <div className="home-core-pill">Supabase</div>
      <div className="home-core-items">
        <div className="home-core-item">
          <strong>{status.connected ? 'Connected' : 'Local Mode'}</strong>
          <br />
          {status.label}
        </div>
        <div className="home-core-item">
          <strong>Status</strong>
          <br />
          {status.detail}
        </div>
        <div className="home-core-item">
          <strong>Env</strong>
          <br />
          NEXT_PUBLIC_SUPABASE_URL
        </div>
        <div className="home-core-item">
          <strong>Next</strong>
          <br />
          Connect memory tables
        </div>
      </div>
    </div>
  )
}
