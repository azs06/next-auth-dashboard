
import { RolesTable } from "@/components/roles-table"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Roles</h1>
        <p className="text-muted-foreground">Mange Roles And Permissions</p>
      </div>
      <RolesTable></RolesTable>
    </div>
  )
}