"use client";

import { UsersTable } from "@/components/users-table";
import { UserFormModal } from "@/components/user-form-modal";
import { useState } from "react";

export default function UsersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage your users and their permissions.
        </p>
      </div>
      <UsersTable onAddUser={() => setModalOpen(true)} />
      <UserFormModal open={modalOpen} onClose={() => setModalOpen(false)} ></UserFormModal>  
    </div>
  );
}
