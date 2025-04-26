'use client';
// [userId]/edit/page.tsx
// This file is responsible for rendering the edit user page.
import { useEffect, useState } from "react";
import { UserForm } from "@/components/user-form";
import { useRouter } from "next/navigation";

export default function EditUserPage({ params }: { params: { userId: string } }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        router.push("/not-found");
      } else {
        const userData = await res.json();
        setUser(userData);
      }
    };

    fetchUser();
  }, [params.userId, router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit User</h1>
      <UserForm open={true} initialData={user} />
    </div>
  );
}
