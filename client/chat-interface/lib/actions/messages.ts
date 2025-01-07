'use server'

import { executeQuery } from '../db'
import { Message } from '@/types/database'

export async function getChannelMessages(channelId: number, limit = 50) {
  const { data, error } = await executeQuery(
    `SELECT m.*, u.username, u.email 
     FROM messages m 
     JOIN users u ON m.user_id = u.id 
     WHERE m.channel_id = $1 
     ORDER BY m.sent_at DESC 
     LIMIT $2`,
    [channelId, limit]
  )
  if (error) throw new Error(error)
  return data as (Message & { username: string; email: string })[]
}

export async function createMessage(userId: number, channelId: number, content: string) {
  const { data, error } = await executeQuery(
    `INSERT INTO messages (user_id, channel_id, content) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [userId, channelId, content]
  )
  if (error) throw new Error(error)
  return data?.[0] as Message
}

export async function getThreadMessages(parentMessageId: number) {
  const { data, error } = await executeQuery(
    `SELECT m.*, u.username, u.email 
     FROM messages m 
     JOIN users u ON m.user_id = u.id 
     WHERE m.parent_message_id = $1 
     ORDER BY m.sent_at ASC`,
    [parentMessageId]
  )
  if (error) throw new Error(error)
  return data as (Message & { username: string; email: string })[]
}

