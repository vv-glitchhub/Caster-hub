import AppModulePage from '../../../components/AppModulePage'
import { getCasterApp } from '../../../lib/caster-apps'

export default function CarcasterAppPage() {
  const app = getCasterApp('carcaster')

  if (!app) {
    return null
  }

  return <AppModulePage app={app} />
}
