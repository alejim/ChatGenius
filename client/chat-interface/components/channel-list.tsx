import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Hash, Lock } from 'lucide-react'

interface Channel {
  id: string
  name: string
  isJoined: boolean
}

interface ChannelListProps {
  channels: Channel[]
  activeChannelId: string
  onChannelSelect: (channelId: string) => void
}

export function ChannelList({ channels, activeChannelId, onChannelSelect }: ChannelListProps) {
  const joinedChannels = channels.filter(c => c.isJoined)
  const availableChannels = channels.filter(c => !c.isJoined)

  return (
    <ScrollArea className="h-[50%]">
      <div className="px-2 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Channels</h2>
        <div className="space-y-1">
          {joinedChannels.map((channel) => (
            <Button
              key={channel.id}
              variant={channel.id === activeChannelId ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onChannelSelect(channel.id)}
            >
              <Hash className="mr-2 h-4 w-4" />
              {channel.name}
            </Button>
          ))}
        </div>
        {availableChannels.length > 0 && (
          <>
            <Separator className="my-2" />
            <h3 className="mb-2 px-4 text-sm font-semibold">Available Channels</h3>
            <div className="space-y-1">
              {availableChannels.map((channel) => (
                <Button
                  key={channel.id}
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground"
                  onClick={() => onChannelSelect(channel.id)}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {channel.name}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </ScrollArea>
  )
}

