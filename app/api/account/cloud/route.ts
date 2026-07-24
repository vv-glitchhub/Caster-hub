import { NextResponse } from 'next/server'
import {
  AccountApiError,
  CASTER_CLOUD_TABLES,
  deleteVerifiedAuthUser,
  selectOwnedRows,
  verifySupabaseUser,
} from '../../../../lib/supabase-account-api'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  try {
    const context = await verifySupabaseUser(request)
    const entries = await Promise.all(
      CASTER_CLOUD_TABLES.map(async (table) => [table, await selectOwnedRows(context, table)] as const),
    )

    return NextResponse.json(
      {
        product: 'caster-os-cloud',
        version: 1,
        exportedAt: new Date().toISOString(),
        user: {
          id: context.user.id,
          email: context.user.email || null,
        },
        data: Object.fromEntries(entries),
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Content-Disposition': `attachment; filename="caster-cloud-export-${new Date().toISOString().slice(0, 10)}.json"`,
        },
      },
    )
  } catch (error) {
    return accountError(error)
  }
}

export async function DELETE(request: Request) {
  try {
    if (process.env.CASTER_ACCOUNT_DELETION_ENABLED !== 'true') {
      throw new AccountApiError('Cloud account deletion is disabled until production lifecycle verification passes.', 503)
    }

    const context = await verifySupabaseUser(request)
    const confirmation = request.headers.get('x-caster-delete-confirmation')
    const confirmedEmail = request.headers.get('x-caster-confirm-email')?.trim().toLowerCase()

    if (confirmation !== 'DELETE-MY-CASTER-ACCOUNT') {
      throw new AccountApiError('Exact account deletion confirmation is required.', 400)
    }
    if (!context.user.email || confirmedEmail !== context.user.email.toLowerCase()) {
      throw new AccountApiError('The confirmed email does not match the authenticated account.', 400)
    }

    await deleteVerifiedAuthUser(context)

    return NextResponse.json(
      {
        deleted: true,
        deletedAt: new Date().toISOString(),
        message: 'The authenticated Caster account and cascading user-owned domain rows were deleted.',
      },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } },
    )
  } catch (error) {
    return accountError(error)
  }
}

function accountError(error: unknown) {
  const status = error instanceof AccountApiError ? error.status : 500
  const message = error instanceof Error ? error.message : 'Unexpected account lifecycle error.'
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    },
  )
}
