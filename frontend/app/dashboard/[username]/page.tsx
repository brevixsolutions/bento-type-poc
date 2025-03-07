import LogoutButton from "@/components/common/LogoutButton";

interface UserDashboardProps {
  params: Promise<{ username: string }>;
}

export default async function page({ params }: UserDashboardProps) {
  const { username } = await params;
  return (
    <div>
      <p>Dashboard {username}</p>
      <LogoutButton />
    </div>
  );
}
