import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    product: 'Caster shared profile',
    version: 1,
    mode: 'local-first',
    status: 'usable',
    storesCredentials: false,
    storesSessions: false,
    localStorageKey: 'caster-shared-profile-v1',
    connectedApplications: {
      scorecaster: 'https://scorecaster.vercel.app/',
      stockcaster: 'https://stockcaster-seven.vercel.app/',
      carcaster: '/apps/carcaster',
      travelcaster: '/apps/travelcaster',
    },
    cloudActivationRequirements: [
      'reviewed shared identity provider',
      'verified redirect domains',
      'Row Level Security',
      'two-user isolation test',
      'account export and deletion',
      'duplicate-safe local-to-cloud migration',
    ],
    guardrails: [
      'Caster Hub does not copy application passwords or sessions.',
      'The local profile contains preferences only.',
      'Cloud synchronization remains disabled until security checks pass.',
    ],
    generatedAt: new Date().toISOString(),
  }, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
