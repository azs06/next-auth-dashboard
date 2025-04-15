
import { UserForm } from "@/components/user-form";
import { notFound } from "next/navigation";

export default async function EditUserPage({ params }: { params: { userId: string } }) {
  const res = await fetch(`${process.env.API_URL}/users/${params.userId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const user = await res.json();

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit User</h1>
      <UserForm initialData={user} />
    </div>
  );
}
