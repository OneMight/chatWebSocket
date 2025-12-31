import { Header } from "@/layouts";
import { ROUTES } from "@/routesPath";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useAuth } from "./context/UserContext";
import { deleteCookieToken } from "@/utils/deleteCookieToken";
import { useEffect } from "react";
export default function App() {
  const path = useLocation();
  const condition = path.href !== ROUTES.AUTH;
  const context = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof context?.user?.message === "string") {
      deleteCookieToken("accessToken");
      deleteCookieToken("refreshToken");
      context.setAccessToken("");

      navigate({
        to: ROUTES.HOME,
      });
    }
  }, [context?.user?.message, navigate, context]);
  if (context.userLoading) {
    return <p>Loading session...</p>;
  }
  return (
    <main
      className={`max-w-270 min-h-screen w-full flex ${condition ? "justify-start " : "justify-center"} gap-8 p-2 items-center flex-col`}
    >
      {condition ? <Header /> : ""}
      <Outlet />
    </main>
  );
}
