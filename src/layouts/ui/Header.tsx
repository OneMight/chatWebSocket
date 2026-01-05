import { Button, Spinner, UserMenu } from "@/components";
import Logo from "@/assets/logo-icon.svg?react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/routesPath";
import ExitIcon from "@/assets/exit-icon.svg?react";
import { useAuth } from "@/app/context/UserContext";
import { SearchInput } from "@/components";
export default function Header() {
  const navigate = useNavigate();
  const handleDirectAuth = () => {
    navigate({
      to: ROUTES.AUTH,
    });
  };
  const context = useAuth();
  if (context?.userLoading || context?.userError) {
    return <Spinner className="size-10" />;
  }
  return (
    <header className="w-full flex justify-between items-center relative">
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
      <SearchInput />
      {context?.isAuthenticated ? (
        <UserMenu />
      ) : (
        <Button
          onClick={handleDirectAuth}
          className="hover:shadow-xl cursor-pointer"
        >
          <ExitIcon />
          Join us
        </Button>
      )}
    </header>
  );
}
