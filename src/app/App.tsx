import { Header } from "@/layouts";
import { Outlet } from "@tanstack/react-router";

export default function App() {
  return (
    <main className="max-w-270 min-h-screen w-full flex justify-start gap-8 p-2 items-center flex-col">
      <Header />
      <Outlet />
    </main>
  );
}
