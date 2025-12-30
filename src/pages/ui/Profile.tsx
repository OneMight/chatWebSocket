import { useAuth } from "@/app/context/UserContext";
import { ProfileTitle } from "@/layouts";
import { UserTabs } from "@/layouts/ui/UserTabs";

export const Profile = () => {
  const context = useAuth();
  if (context?.userLoading || context?.userError) {
    return <p>loading</p>;
  }
  return (
    <main className="w-full flex flex-col gap-10 items-center justify-center">
      <ProfileTitle />
      <UserTabs />
    </main>
  );
};
