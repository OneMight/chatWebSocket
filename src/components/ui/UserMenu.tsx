import { useAuth } from "@/app/context/UserContext";
import ProfileIcon from "@/assets/profile-icon.svg?react";
import ExitIcon from "@/assets/exit-icon.svg?react";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/routesPath";
import { Button } from "./Button";
import { useNavigate } from "@tanstack/react-router";
import { deleteCookieToken } from "@/utils/deleteCookieToken";
export const UserMenu = () => {
  const context = useAuth();
  const navigate = useNavigate();
  const handleExit = () => {
    deleteCookieToken("accessToken");
    deleteCookieToken("refreshToken");
    context?.handleIsAuth(false);
    navigate({
      to: ROUTES.HOME,
    });
  };
  return (
    <nav
      className="min-w-48 shadow-2xl p-3 bg-white-color
     flex flex-col gap-2 rounded-xl absolute top-12 right-2 z-10"
    >
      <div>
        <p>{context?.user?.username}</p>
      </div>
      <Link
        className="text-black-text flex flex-row gap-2
         items-center hover:text-hover-orange "
        to={`${ROUTES.PROFILE}/${context?.user?.id}`}
      >
        <ProfileIcon />
        My Profile
      </Link>
      {context?.isAuthenticated && (
        <Button
          className="bg-transparent text-black-text
         hover:text-hover-orange hover:bg-transparent cursor-pointer
          transition-all w-13 flex items-center justify-between p-0 has-[>svg]:px-0"
          onClick={handleExit}
        >
          <ExitIcon className="text-hover-orange" />
          <p>Exit</p>
        </Button>
      )}
    </nav>
  );
};
