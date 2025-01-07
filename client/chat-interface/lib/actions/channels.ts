'use server'

import { executeQuery } from '../db'
import { Channel, ChannelMembership } from '@/types/database'

export async function getChannels() {
  const { data, error } = await executeQuery('SELECT * FROM channels ORDER BY name')
  if (error) throw new Error(error)
  return data as Channel[]
}

export async function getUserChannels(userId: number) {
  const { data, error } = await executeQuery(
    `SELECT c.* 
     FROM channels c 
     JOIN channel_memberships cm ON c.id = cm.channel_id 
     WHERE cm.user_id = $1 
     ORDER BY c.name`,
    [userId]
  )
  if (error) throw new Error(error)
  return data as Channel[]
}

export async function joinChannel(userId: number, channelId: number) {
  const { error } = await executeQuery(
    `INSERT INTO channel_memberships (user_id, channel_id) 
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [userId, channelId]
  )
  if (error) throw new Error(error)
}

