import { Header } from "@/layouts";
import { Outlet } from "@tanstack/react-router";

export default function App() {
  return (
    <main className="max-w-270 min-h-screen w-full flex justify-between items-center flex-col">
      <Header />
      <Outlet />
    </main>
  );
}
