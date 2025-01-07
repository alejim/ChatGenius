import { executeQuery } from './db'
import { UserSession } from '@/types/database'
import { cookies } from 'next/headers'

export async function getCurrentUser() {
  const sessionToken = cookies().get('session_token')?.value

  if (!sessionToken) return null

  const { data, error } = await executeQuery(
    `SELECT u.* 
     FROM users u 
     JOIN user_sessions us ON u.id = us.user_id 
     WHERE us.session_token = $1 
     AND us.expires_at > CURRENT_TIMESTAMP`,
    [sessionToken]
  )

  if (error || !data?.[0]) return null

  return data[0]
}

export async function createSession(userId: number) {
  const sessionToken = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

  const { error } = await executeQuery(
    `INSERT INTO user_sessions (user_id, session_token, expires_at) 
     VALUES ($1, $2, $3)`,
    [userId, sessionToken, expiresAt]
  )

  if (error) throw new Error(error)

  cookies().set('session_token', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt
  })
}

