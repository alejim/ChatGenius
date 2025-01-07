import { ScrollArea } from "@/components/ui/scroll-area"
import { Message } from "./message"
import { useEffect, useState } from "react"
import { getChannelMessages } from "../actions/messages"

interface MessageListProps {
  channelId: string
  onThreadSelect: (messageId: string) => void
}

export function MessageList({ channelId, onThreadSelect }: MessageListProps) {
  const [messages, setMessages] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await getChannelMessages(channelId)
      if (result.success) {
        setMessages(result.messages)
        setError(null)
      } else {
        setError(result.error)
      }
    }

    fetchMessages()
    const interval = setInterval(fetchMessages, 5000) // Poll every 5 seconds

    return () => clearInterval(interval)
  }, [channelId])

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="flex flex-col gap-2 py-4">
        {messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            content={message.content}
            timestamp={new Date(message.timestamp)}
            user={{
              id: message.user_id,
              username: message.username
            }}
            isThreadStarter={message.is_thread_starter}
            onThreadSelect={() => onThreadSelect(message.id)}
          />
        ))}
      </div>
    </ScrollArea>
  )
}

