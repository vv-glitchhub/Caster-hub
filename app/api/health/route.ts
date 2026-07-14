export const dynamic = 'force-dynamic'

export async function GET() {
  const stockcasterUrl = process.env.STOCKCASTER_URL || 'https://stockcaster.vercel.app'

  return Response.json(
    {
      app: 'Caster Hub',
      status: 'ok',
      deployment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown',
      commit: process.env.VERCEL_GIT_COMMIT_SHA || null,
      modules: {
        scorecaster: 'production-alpha',
        stockcaster: 'production-alpha',
        carcaster: 'local-mvp',
        travelcaster: 'local-mvp',
      },
      integrations: {
        scorecasterHealth: 'https://scorecaster.vercel.app/api/health',
        stockcasterHealth: `${stockcasterUrl}/api/health`,
        sharedAuth: 'planned-after-scorecaster-validation',
      },
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}
