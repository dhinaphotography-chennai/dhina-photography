import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { customers } from '@/lib/schema'
import { lte, sql } from 'drizzle-orm'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const token = getTokenFromRequest(req)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const decoded = verifyToken(token)
  if (!decoded || decoded.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rows = await db
    .select({ id: customers.id, name: customers.name, email: customers.email, createdAt: customers.createdAt })
    .from(customers)
    .where(
      lte(customers.createdAt, sql`NOW() - INTERVAL '4 days'`)
    )
    .orderBy(customers.createdAt)

  const result = rows.map(c => {
    const daysOld = Math.floor((Date.now() - new Date(c.createdAt).getTime()) / 86_400_000)
    return { ...c, daysOld, daysLeft: 50 - daysOld }
  })

  return NextResponse.json(result)
}
