import { UsersTable } from "@/components/users-table"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage your users and their permissions.</p>
      </div>
      <UsersTable />
    </div>
  )
}

