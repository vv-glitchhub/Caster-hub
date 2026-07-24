import { NextResponse } from 'next/server'
import { buildReleaseCenterSnapshot } from '../../../lib/release-center'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(buildReleaseCenterSnapshot(), {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
