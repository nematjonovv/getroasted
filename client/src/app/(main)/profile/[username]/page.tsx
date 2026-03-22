import ProfileCard from "@/src/features/profle/components/ProfileCard";
type Props = {
  params: Promise<{ username: string }>
}
async function ProfilePage({ params }: Props) {
  const { username } = await params
  return (
    <div className="flex flex-col justify-center pt-10">
      <ProfileCard username={username} />
      <div className="w-full min-h-screen">
        
      </div>
    </div>
  );
}

export default ProfilePage;