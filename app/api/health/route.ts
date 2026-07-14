export const dynamic = 'force-dynamic'

export async function GET() {
  return Response.json(
    {
      app: 'Caster Hub',
      status: 'ok',
      deployment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown',
      commit: process.env.VERCEL_GIT_COMMIT_SHA || null,
      modules: {
        scorecaster: 'production-alpha-auth-cloud',
        stockcaster: 'production-alpha-local-first',
        carcaster: 'local-mvp',
        travelcaster: 'local-mvp',
      },
      integrations: {
        scorecasterHealth: 'https://scorecaster.vercel.app/api/health',
        stockcasterHealth: `${process.env.STOCKCASTER_URL || 'https://stockcaster.vercel.app'}/api/health`,
        sharedAuth: 'validate-scorecaster-before-reuse',
        sharedCloudPattern: 'scorecaster-auth-rls-reference',
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
