import { NextResponse } from 'next/server'
import { buildProductExcellence } from '../../../lib/product-excellence'

export const dynamic = 'force-dynamic'

export async function GET() {
  const products = buildProductExcellence()
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    definition: 'A product reaches 100 percent only when code, deployment, security, data providers, account lifecycle and acceptance tests are verified.',
    products,
  }, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  })
}
