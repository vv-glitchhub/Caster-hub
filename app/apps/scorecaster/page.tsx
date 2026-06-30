import AppModulePage from '../../../components/AppModulePage'
import { getCasterApp } from '../../../lib/caster-apps'

export default function ScorecasterAppPage() {
  const app = getCasterApp('scorecaster')

  if (!app) {
    return null
  }

  return <AppModulePage app={app} />
}
