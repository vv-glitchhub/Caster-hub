import { NextRequest, NextResponse } from 'next/server'
import { searchPostalAreas } from '../../../../lib/landcaster-statfin'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') ?? ''
  try {
    const result = await searchPostalAreas(query, 15)
    return NextResponse.json(result, { headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' } })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Postal area search failed'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
