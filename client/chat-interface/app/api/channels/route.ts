import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getChannels, getUserChannels, joinChannel } from '@/lib/actions/channels'

export async function GET(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [allChannels, userChannels] = await Promise.all([
      getChannels(),
      getUserChannels(user.id)
    ])

    const userChannelIds = new Set(userChannels.map(c => c.id))
    const channels = allChannels.map(channel => ({
      ...channel,
      isJoined: userChannelIds.has(channel.id)
    }))

    return NextResponse.json(channels)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch channels' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { channelId } = await request.json()
  
  try {
    await joinChannel(user.id, channelId)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to join channel' },
      { status: 500 }
    )
  }
}

