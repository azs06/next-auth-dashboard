"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  permissions: z.array(z.string()).min(1, "At least one permission is required"),
});

type RoleFormData = z.infer<typeof schema>;

export function RoleFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const [permissions, setPermissions] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RoleFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });

  const selectedPermissions = watch("permissions");

  useEffect(() => {
    if (open) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/permissions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
        .then((res) => res.json())
        .then(setPermissions);
      reset();
    }
  }, [open, reset]);

  const togglePermission = (id: string) => {
    const newPermissions = selectedPermissions.includes(id)
      ? selectedPermissions.filter((pid) => pid !== id)
      : [...selectedPermissions, id];
    setValue("permissions", newPermissions);
  };

  const onSubmit = async (data: RoleFormData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create role");

      toast({ title: "Success", description: "Role created!" });
      onClose();
    } catch (err) {
      console.error("Error creating role:", err);
      toast({
        title: "Error",
        description: "Could not create role",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Role</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input {...register("name")} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <Label>Description</Label>
            <Input {...register("description")} />
          </div>
          <div>
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-auto border rounded-md p-2">
              {permissions.map((perm) => (
                <label key={perm.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedPermissions.includes(perm.id.toString())}
                    onCheckedChange={() => togglePermission(perm.id.toString())}
                  />
                  <span>{perm.name}</span>
                </label>
              ))}
            </div>
            {errors.permissions && (
              <p className="text-sm text-red-500">{errors.permissions.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Role</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
