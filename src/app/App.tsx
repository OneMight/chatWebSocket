import { Header } from "@/layouts";
import { ROUTES } from "@/routesPath";
import { Outlet, useLocation } from "@tanstack/react-router";
import { useAuth } from "./context/UserContext";
import { Spinner } from "@/components";
import { Chat } from "@/components/index";
export default function App() {
  const path = useLocation();
  const condition = path.href !== ROUTES.AUTH;
  const context = useAuth();

  if (context.userLoading) {
    return <Spinner className="size-10" />;
  }
  return (
    <main
      className={`max-w-270 min-h-screen w-full relative flex ${condition ? "justify-start " : "justify-center"} gap-8 p-2 items-center flex-col`}
    >
      {condition && <Header />}
      {condition && <Chat />}
      <Outlet />
    </main>
  );
}
