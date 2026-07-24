import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(
    {
      feature: 'Caster Cloud Domains V1',
      status: 'migration-required',
      domains: {
        carcaster: {
          tables: ['caster_vehicle_profiles', 'caster_vehicle_events'],
          localModeAvailable: true,
          cloudSyncEnabled: false,
        },
        travelcaster: {
          tables: ['caster_trips', 'caster_trip_items'],
          localModeAvailable: true,
          cloudSyncEnabled: false,
        },
      },
      requirements: [
        'Apply supabase/caster_cloud_domains_v1.sql',
        'Configure authenticated Supabase client',
        'Pass two-user RLS isolation tests',
        'Add explicit local-to-cloud import confirmation',
        'Add account export and deletion coverage',
      ],
      safety: {
        automaticBooking: false,
        payments: false,
        vehicleControl: false,
        backgroundMigration: false,
      },
      generatedAt: new Date().toISOString(),
    },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
