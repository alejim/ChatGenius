'use server'

import { executeQuery } from '../db'
import { User, UserStatus } from '@/types/database'

export async function getUserById(id: number) {
  const { data, error } = await executeQuery(
    'SELECT * FROM users WHERE id = $1',
    [id]
  )
  if (error) throw new Error(error)
  return data?.[0] as User | undefined
}

export async function updateUserStatus(userId: number, status: string) {
  const { error } = await executeQuery(
    `INSERT INTO user_status (user_id, status) 
     VALUES ($1, $2)
     ON CONFLICT (user_id) 
     DO UPDATE SET status = $2, last_active = CURRENT_TIMESTAMP`,
    [userId, status]
  )
  if (error) throw new Error(error)
}

export async function getOnlineUsers() {
  const { data, error } = await executeQuery(
    `SELECT u.*, us.status 
     FROM users u 
     JOIN user_status us ON u.id = us.user_id 
     WHERE us.last_active > NOW() - INTERVAL '5 minutes'`
  )
  if (error) throw new Error(error)
  return data as (User & { status: string })[]
}

