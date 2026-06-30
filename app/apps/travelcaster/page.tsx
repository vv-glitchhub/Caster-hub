import AppModulePage from '../../../components/AppModulePage'
import { getCasterApp } from '../../../lib/caster-apps'

export default function TravelcasterAppPage() {
  const app = getCasterApp('travelcaster')

  if (!app) {
    return null
  }

  return <AppModulePage app={app} />
}
