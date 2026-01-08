import { Header } from "@/layouts";
import { ROUTES } from "@/routesPath";
import { Outlet, useLocation } from "@tanstack/react-router";
import { useAuth } from "./context/UserContext";
import { Spinner } from "@/components";
import { Suspense } from "react";
import React from "react";
const Chat = React.lazy(() =>
  import("@/layouts/").then((module) => ({ default: module.Chat })),
);
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
      {condition && (
        <Suspense fallback={<Spinner />}>
          <Chat />
        </Suspense>
      )}

      <Outlet />
    </main>
  );
}
