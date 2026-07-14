import AppModulePage from '../../../components/AppModulePage'
import StockcasterLiveStatus from '../../../components/StockcasterLiveStatus'
import { getCasterApp } from '../../../lib/caster-apps'

export const dynamic = 'force-dynamic'

export default function StockcasterAppPage() {
  const app = getCasterApp('stockcaster')

  if (!app) {
    return null
  }

  return (
    <>
      <AppModulePage app={app} />
      <StockcasterLiveStatus />
    </>
  )
}
