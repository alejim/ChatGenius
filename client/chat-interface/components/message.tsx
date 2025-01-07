import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"

interface MessageProps {
  id: string
  content: string
  timestamp: Date
  user: {
    id: string
    username: string
    avatarUrl?: string
  }
  isThreadStarter?: boolean
  onThreadSelect?: () => void
}

export function Message({ content, timestamp, user, isThreadStarter, onThreadSelect }: MessageProps) {
  return (
    <div className="group flex items-start gap-3 px-4 py-2 hover:bg-accent/50">
      <Avatar className="h-8 w-8 cursor-pointer">
        <AvatarImage src={user.avatarUrl} alt={user.username} />
        <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{user.username}</span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm">{content}</p>
      </div>
      {isThreadStarter && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onThreadSelect}
          className="opacity-0 group-hover:opacity-100"
        >
          View Thread
        </Button>
      )}
    </div>
  )
}

