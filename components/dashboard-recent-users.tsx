import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "active",
    date: "2 hours ago",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "active",
    date: "5 hours ago",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "inactive",
    date: "1 day ago",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "active",
    date: "2 days ago",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "inactive",
    date: "3 days ago",
  },
]

export function RecentUsers() {
  return (
    <div className="space-y-4">
      {recentUsers.map((user) => (
        <div key={user.id} className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-gray-300"}`} />
            <span className="text-xs text-muted-foreground">{user.date}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

