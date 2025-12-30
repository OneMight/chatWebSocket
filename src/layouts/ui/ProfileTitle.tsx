import { useAuth } from "@/app/context/UserContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import LocationIcon from "@/assets/location-icon.svg?react";
import SettingsIcon from "@/assets/settings-icon.svg?react";
import { Button } from "@/components";
export const ProfileTitle = () => {
  const context = useAuth();
  const user = context?.user;
  return (
    <article className="flex flex-row gap-10 p-4 items-start justify-center bg-white-color w-full">
      <div>
        <Avatar className="w-30 h-30 border-4 rounded-full shadow-2xl border-bg-app">
          <AvatarImage src={`${user?.image}`}></AvatarImage>
        </Avatar>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-2xl font-bold">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-text-subtitle">@{user?.username}</p>
        </div>
        <p>
          Works in {user?.company.name} in {user?.company.department} department
          as {user?.company.title}
        </p>
        <div className="flex flex-row gap-2 items-center text-text-subtitle">
          <LocationIcon />
          {user?.address.country}
        </div>
      </div>
      <Button className="bg-transparent hover:bg-transparent hover:shadow-transparent hover:text-hover-orange text-black-text cursor-pointer flex flex-row gap-2 items-center">
        <SettingsIcon />
        Edit Profile
      </Button>
    </article>
  );
};
