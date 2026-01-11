import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@/routes/routeTree";
import { useAuth } from "../context/UserContext";

const routes = createRouter({
  routeTree,
  context: {
    auth: null!,
  },
});

export const ProviderRouter = () => {
  const auth = useAuth();

  return <RouterProvider router={routes} context={{ auth }} />;
};
