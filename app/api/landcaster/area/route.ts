import { NextRequest, NextResponse } from 'next/server'
import { getPostalAreaAnalysis, type LandcasterPropertyType } from '../../../../lib/landcaster-statfin'

export const runtime = 'nodejs'

const allowed = new Set<LandcasterPropertyType>(['one_room', 'two_room', 'three_plus', 'terraced'])

export async function GET(request: NextRequest) {
  const postalCode = (request.nextUrl.searchParams.get('postalCode') ?? '').trim()
  const propertyType = (request.nextUrl.searchParams.get('propertyType') ?? 'two_room') as LandcasterPropertyType

  if (!/^\d{5}$/.test(postalCode)) {
    return NextResponse.json({ error: 'Anna viisinumeroinen postinumero.' }, { status: 400 })
  }
  if (!allowed.has(propertyType)) {
    return NextResponse.json({ error: 'Tuntematon asuntotyyppi.' }, { status: 400 })
  }

  try {
    const result = await getPostalAreaAnalysis(postalCode, propertyType)
    return NextResponse.json(result, { headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' } })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Alueanalyysi epäonnistui'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
