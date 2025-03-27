'use client';

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { RolesTable } from "@/components/roles-table"
import { PermissionsTable } from "@/components/permissions-table"
import { RoleFormModal } from "@/components/roles-form";

export default function SettingsPage() {
  const [showRoleModal, setShowRoleModal] = useState(false);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings Page</h1>
        <p className="text-muted-foreground">Page for all things settings</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <p className="text-sm text-muted-foreground">General settings.</p>
        </TabsContent>
        <TabsContent value="roles">
          <RolesTable onAddRole={() => setShowRoleModal(true)} ></RolesTable>
          <RoleFormModal open={showRoleModal} onClose={() => setShowRoleModal(false)}></RoleFormModal>
        </TabsContent>
        <TabsContent value="permissions">
          <PermissionsTable></PermissionsTable>
        </TabsContent>
      </Tabs>
    </div>
  )
}
