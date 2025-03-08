"use client";
import { useAuth } from "@/components/context/AuthContext";
import { redirect } from "next/navigation";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}

export default layout;
