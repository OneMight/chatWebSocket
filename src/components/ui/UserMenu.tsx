import { useAuth } from "@/app/context/UserContext";
import ProfileIcon from "@/assets/profile-icon.svg?react";
import ExitIcon from "@/assets/exit-icon.svg?react";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/routesPath";
import { Button } from "./Button";
import { useNavigate } from "@tanstack/react-router";
import { deleteCookieToken } from "@/utils/deleteCookieToken";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
export const UserMenu = () => {
  const context = useAuth();
  const navigate = useNavigate();
  const handleExit = () => {
    deleteCookieToken("accessToken");
    deleteCookieToken("refreshToken");
    context?.setAccessToken("");

    navigate({
      to: ROUTES.HOME,
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer hover:shadow-xl w-10 bg-transparent hover:bg-transparent shadow-transparent">
        <Avatar>
          <AvatarImage alt="user-image" src={context?.user?.image} />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-48 shadow-2xl p-3 bg-white-color
     flex flex-col gap-2 rounded-xl absolute top-6 right-0 z-10"
      >
        <DropdownMenuLabel>
          <p>{context?.user?.username}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-xl hover:bg-bg-app px-1 py-2 transition-colors">
          <Link
            className="text-black-text flex flex-row gap-2
         items-center hover:text-hover-orange "
            to={ROUTES.PROFILE}
            params={{ userId: String(context?.user?.id) }}
          >
            <ProfileIcon aria-label="profile-icon" />
            My Profile
          </Link>
        </DropdownMenuItem>
        {context?.isAuthenticated && (
          <DropdownMenuItem className="rounded-xl hover:bg-bg-app transition-colors ">
            <Button
              className="bg-transparent text-black-text
         hover:text-hover-orange hover:bg-transparent cursor-pointer
          transition-all flex items-center w-full gap-2 justify-start p-0 has-[>svg]:px-1 "
              onClick={handleExit}
            >
              <ExitIcon aria-label="exit-icon" className="text-hover-orange" />
              <p>Exit</p>
            </Button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
