'use client';

import { useEffect, useState } from "react";
import { UserForm } from "@/components/user-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChangePasswordForm } from "@/components/change-password-form";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        router.push("/login"); // redirect to login if not authenticated
      } else {
        const userData = await res.json();
        setUser(userData);
      }
    };

    fetchProfile();
  }, [router]);

  const handleDelete = async () => {
    if (!user?.id) return;

    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        alert("Failed to delete account.");
      } else {
        alert("Account deleted successfully.");
        localStorage.removeItem("token"); // logout
        router.push("/login");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Something went wrong.");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>
        <UserForm 
          onSuccess={() => {
            alert("Profile updated successfully!");
            router.refresh(); // refresh page after update
          }} 
          initialData={{
            name: user.name,
            email: user.email,
            username: user.username,
            password: "", // no password initially
            roleId: user.roleId?.toString() || "", // ensure roleId is string
          }} 
        />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <ChangePasswordForm userId={user.id} />
      </div>

      <div className="pt-4">
        <Button variant="destructive" onClick={handleDelete} className="w-full">
          Delete My Account
        </Button>
      </div>
    </div>
  );
}
