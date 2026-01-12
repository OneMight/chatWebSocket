import { useAuth } from "@/app/context/UserContext";
import { Spinner } from "@/core/index";
import { ProfileTitle } from "@/modules/profile/index";
import { UserTabs } from "@/modules/profile/index";

export const Profile = () => {
  const context = useAuth();
  if (context?.userLoading || context?.userError) {
    return <Spinner className="size-10" />;
  }
  return (
    <main className="w-full flex flex-col gap-10 items-center justify-center">
      <ProfileTitle />
      <UserTabs />
    </main>
  );
};
