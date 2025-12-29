import { Button, Input } from "@/components";
import Logo from "@/assets/logo-icon.svg?react";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/routesPath";
import { useNavigate } from "@tanstack/react-router";
import ExitIcon from "@/assets/exit-icon.svg?react";
import { handleGetToken } from "@/utils/getCookieToken";
import { useVerifyToken } from "@/api/users/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function Header() {
  const navigate = useNavigate();
  const handleDirectAuth = () => {
    navigate({
      to: ROUTES.AUTH,
    });
  };

  const accessToken = handleGetToken("accessToken");
  const { isSuccess, user, userError, userLoading } =
    useVerifyToken(accessToken);
  if (userLoading || userError) {
    <p>loading</p>;
  }
  return (
    <>
      <header className="w-full flex justify-between items-center">
        <Link
          to={ROUTES.HOME}
          className="flex flex-row justify-between items-center gap-1 text-xl font-bold hover:text-hover-orange transition-all "
        >
          <div className="size-10 flex items-center justify-center">
            <Logo
              className="size-full"
              viewBox="10 0 44 44"
              aria-label="CozyCorner Logo"
            />
          </div>

          <h1>CozyCorner</h1>
        </Link>

        <Input
          className="w-md hidden md:block"
          placeholder="Search discussions..."
        />
        {isSuccess ? (
          <Link to={`${ROUTES.PROFILE}/${user?.id}`}>
            <Avatar>
              <AvatarImage src={user?.image} />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Button
            onClick={() => handleDirectAuth()}
            className="hover:shadow-xl cursor-pointer"
          >
            <ExitIcon />
            Join us
          </Button>
        )}
      </header>
    </>
  );
}
