import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { createMessage, getChannelMessages } from '@/lib/actions/messages'

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { channelId, content } = await request.json()
  
  try {
    const message = await createMessage(user.id, channelId, content)
    return NextResponse.json(message)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const channelId = searchParams.get('channelId')
  
  if (!channelId) {
    return NextResponse.json(
      { error: 'Channel ID is required' },
      { status: 400 }
    )
  }

  try {
    const messages = await getChannelMessages(Number(channelId))
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

