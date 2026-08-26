import { NextRequest, NextResponse } from 'next/server'
import { getFinlandAreaRanking, type LandcasterPropertyType } from '../../../../lib/landcaster-statfin'

export const runtime = 'nodejs'

const allowed = new Set<LandcasterPropertyType>(['one_room', 'two_room', 'three_plus', 'terraced'])

export async function GET(request: NextRequest) {
  const propertyType = (request.nextUrl.searchParams.get('propertyType') ?? 'two_room') as LandcasterPropertyType
  const limit = Number(request.nextUrl.searchParams.get('limit') ?? '12')

  if (!allowed.has(propertyType)) {
    return NextResponse.json({ error: 'Tuntematon asuntotyyppi.' }, { status: 400 })
  }

  try {
    const result = await getFinlandAreaRanking(propertyType, Number.isFinite(limit) ? limit : 12)
    return NextResponse.json(result, { headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' } })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Suomen aluevertailu epäonnistui'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
