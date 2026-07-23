import { buildAutonomySnapshot } from '../../../lib/autonomy-engine'

export const dynamic = 'force-dynamic'

export async function GET() {
  const snapshot = await buildAutonomySnapshot()

  return Response.json(snapshot, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}
