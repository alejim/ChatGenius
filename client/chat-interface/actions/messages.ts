'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'

export async function insertMessage(channelId: string, userId: string, content: string) {
  try {
    await sql`
      INSERT INTO messages (user_id, channel_id, content)
      VALUES (${userId}, ${channelId}, ${content})
    `
    revalidatePath('/chat')
    return { success: true }
  } catch (error) {
    console.error('Error inserting message:', error)
    return { success: false, error: 'Failed to send message' }
  }
}

export async function getChannelMessages(channelId: string) {
  try {
    const { rows } = await sql`
      SELECT 
        m.id,
        m.content,
        m.sent_at as timestamp,
        m.user_id,
        u.username,
        EXISTS(
          SELECT 1 
          FROM messages t 
          WHERE t.parent_message_id = m.id
        ) as is_thread_starter
      FROM messages m
      JOIN users u ON m.user_id = u.id
      WHERE m.channel_id = ${channelId}
      ORDER BY m.sent_at DESC
      LIMIT 50
    `
    return { success: true, messages: rows }
  } catch (error) {
    console.error('Error fetching messages:', error)
    return { success: false, error: 'Failed to fetch messages' }
  }
}

