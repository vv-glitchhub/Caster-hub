import { NextResponse } from 'next/server'
import { buildDailyCasterBrief } from '../../../lib/daily-brief'

export const dynamic = 'force-dynamic'

export async function GET() {
  const brief = await buildDailyCasterBrief()
  return NextResponse.json(brief, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
