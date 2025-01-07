'use client'

import { useState } from "react"
import { ChannelList } from "./components/channel-list"
import { UserList } from "./components/user-list"
import { MessageList } from "./components/message-list"
import { MessageInput } from "./components/message-input"
import { Message } from "./components/message"
import { Separator } from "@/components/ui/separator"

// Mock data - replace with actual data from Flask backend
const mockData = {
  channels: [
    { id: "1", name: "general", isJoined: true },
    { id: "2", name: "random", isJoined: true },
    { id: "3", name: "announcements", isJoined: false },
  ],
  users: [
    { id: "1", username: "john_doe", isOnline: true },
    { id: "2", username: "jane_smith", isOnline: false },
  ],
  messages: [
    {
      id: "1",
      content: "Hello everyone!",
      timestamp: new Date(),
      user: { id: "1", username: "john_doe" },
      isThreadStarter: true,
    },
    // Add more mock messages as needed
  ],
}

// Mock current user - replace with actual user data from auth context
const currentUser = { id: "1" };

export default function Chat() {
  const [activeChannelId, setActiveChannelId] = useState(mockData.channels[0].id)
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null)

  const handleSendMessage = (content: string) => {
    // Implement message sending logic here
    console.log("Sending message:", content)
  }

  return (
    <div className="flex h-screen">
      {/* Left panel: Channels and Users */}
      <div className="w-64 border-r">
        <ChannelList
          channels={mockData.channels}
          activeChannelId={activeChannelId}
          onChannelSelect={setActiveChannelId}
        />
        <Separator />
        <UserList users={mockData.users} />
      </div>

      {/* Middle panel: Messages */}
      <div className="flex-1 flex flex-col">
        <MessageList
          channelId={activeChannelId}
          onThreadSelect={setActiveThreadId}
        />
        <MessageInput 
          channelId={activeChannelId}
          userId={currentUser.id} // You'll need to get this from your auth context
        />
      </div>

      {/* Right panel: Thread view */}
      {activeThreadId && (
        <div className="w-80 border-l">
          <div className="p-4">
            <h2 className="font-semibold">Thread</h2>
          </div>
          <Separator />
          <MessageList
            channelId={activeChannelId}
            onThreadSelect={() => {}}
          />
          <MessageInput 
            channelId={activeChannelId}
            userId={currentUser.id}
          />
        </div>
      )}
    </div>
  )
}

