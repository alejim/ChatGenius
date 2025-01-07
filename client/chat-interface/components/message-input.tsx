import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from 'lucide-react'
import { FormEvent, useState } from "react"
import { insertMessage } from "../actions/messages"

interface MessageInputProps {
  channelId: string
  userId: string
}

export function MessageInput({ channelId, userId }: MessageInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      const result = await insertMessage(channelId, userId, message)
      if (result.success) {
        setMessage("")
      } else {
        // You might want to show an error toast here
        console.error('Failed to send message')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="min-h-[2.5rem] resize-none"
      />
      <Button type="submit" size="icon">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}

