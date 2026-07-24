import { NextResponse } from 'next/server'
import { buildProductionReadiness } from '../../../lib/production-readiness'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(buildProductionReadiness(), {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
