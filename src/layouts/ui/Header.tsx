import { Button, Input } from "@/components";
import Logo from "@/assets/logo-icon.svg?react";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/routesPath";
import ExitIcon from "@/assets/exit-icon.svg?react";
export default function Header() {
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
        <Button className="hover:shadow-xl cursor-pointer">
          <ExitIcon />
          Join us
        </Button>
      </header>
    </>
  );
}
