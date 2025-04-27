// components/user-form.tsx
"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roleId: z.string().min(1, "Role is required"),
  id: z.string().optional(),
});

export type FormData = z.infer<typeof schema>;

export function UserForm({
  onSuccess,
  initialData,
  disablePassword = false,
  disableRoleSelect = false,
}: {
  onSuccess: () => void;
  initialData?: FormData;
  disablePassword?: boolean;
  disableRoleSelect?: boolean;
}) {
  const [roles, setRoles] = useState([]);
  const { toast } = useToast();
  const [enablePasswordInput, setEnablePasswordInput] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      name: "",
      email: "",
      username: "",
      password: "",
      roleId: "",
    },
  });

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      const data = await res.json();
      setRoles(data);
    };

    fetchRoles();
    reset(initialData); // set if editing
  }, [initialData, reset]);

  const onSubmit = async (formData: FormData) => {
    try {
      const token = localStorage.getItem("token");
      const url =
        initialData && initialData.id
          ? `${process.env.NEXT_PUBLIC_API_URL}/users/${initialData.id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/users`;

      const method = initialData && initialData.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save user");

      toast({
        title: "Success",
        description: `User ${method === "POST" ? "created" : "updated"}!`,
      });
      onSuccess();
    } catch (err) {
      console.error("Error saving user:", err);
      toast({
        title: "Error",
        description: "Something went wrong while saving the user",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" {...register("email")} />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Label>Username</Label>
        <Input {...register("username")} />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>
      {!disablePassword && (
        <div>
            <div className="flex items-center space-x-2">
            <Checkbox id="set-password" checked={enablePasswordInput} onCheckedChange={(v) => setEnablePasswordInput(!!v)} />
            <Label htmlFor="set-password">Change Password</Label>
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" disabled={!enablePasswordInput} {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>
      )}
      {!disableRoleSelect && (
        <div>
          <Label>Role</Label>
          <Select
            onValueChange={(val) => setValue("roleId", val)}
            defaultValue={initialData?.roleId || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.roleId && (
            <p className="text-sm text-red-500">{errors.roleId.message}</p>
          )}
        </div>
      )}

      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  );
}
