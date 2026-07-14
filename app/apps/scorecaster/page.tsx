import AppModulePage from '../../../components/AppModulePage'
import ScorecasterLiveStatus from '../../../components/ScorecasterLiveStatus'
import { getCasterApp } from '../../../lib/caster-apps'

export const dynamic = 'force-dynamic'

export default function ScorecasterAppPage() {
  const app = getCasterApp('scorecaster')

  if (!app) {
    return null
  }

  return (
    <>
      <AppModulePage app={app} />
      <ScorecasterLiveStatus />
    </>
  )
}
