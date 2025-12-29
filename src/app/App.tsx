import { Header } from "@/layouts";
import { ROUTES } from "@/routesPath";
import { Outlet, useLocation } from "@tanstack/react-router";
export default function App() {
  const path = useLocation();
  const condition = path.href !== ROUTES.AUTH;
  return (
    <main
      className={`max-w-270 min-h-screen w-full flex ${condition ? "justify-start " : "justify-center"} gap-8 p-2 items-center flex-col`}
    >
      {condition ? <Header /> : ""}
      <Outlet />
    </main>
  );
}
