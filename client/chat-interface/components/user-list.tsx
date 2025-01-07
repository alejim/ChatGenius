import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface User {
  id: string
  username: string
  avatarUrl?: string
  isOnline: boolean
}

interface UserListProps {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  return (
    <ScrollArea className="h-[50%]">
      <div className="px-2 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Users</h2>
        <div className="space-y-2">
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-3 px-4 py-1">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatarUrl} alt={user.username} />
                  <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div
                  className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background ${
                    user.isOnline ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </div>
              <span className="text-sm font-medium">{user.username}</span>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}

