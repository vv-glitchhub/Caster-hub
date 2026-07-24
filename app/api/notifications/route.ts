import { NextResponse } from 'next/server'
import { buildNotificationSnapshot } from '../../../lib/notification-center'

export const dynamic = 'force-dynamic'

export async function GET() {
  const snapshot = await buildNotificationSnapshot()

  return NextResponse.json(snapshot, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
