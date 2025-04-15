'use client";'

import { UserForm } from "@/components/user-form";
import { notFound } from "next/navigation";

export default async function EditUserPage({
  params,
}: {
  params: { userId: string };
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/users/${params.userId}`);

  if (!res.ok) {
    // return notFound();
  }

  console.log({ res });

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit User</h1>
      {params.userId}
    </div>
  );
}
