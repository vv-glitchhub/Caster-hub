import AppModulePage from '../../../components/AppModulePage'
import { getCasterApp } from '../../../lib/caster-apps'

export default function StockcasterAppPage() {
  const app = getCasterApp('stockcaster')

  if (!app) {
    return null
  }

  return <AppModulePage app={app} />
}
