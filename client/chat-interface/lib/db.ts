import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'

export async function executeQuery(query: string, params: any[] = []) {
  noStore()
  try {
    const result = await sql.query(query, params)
    return { data: result.rows, error: null }
  } catch (error) {
    console.error('Database query error:', error)
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

