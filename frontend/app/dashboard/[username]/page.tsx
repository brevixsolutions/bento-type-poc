interface UserDashboardProps {
  params: Promise<{ username: string }>;
}

export default async function page({ params }: UserDashboardProps) {
  const { username } = await params;
  return <div>Dashboard {username}</div>;
}
