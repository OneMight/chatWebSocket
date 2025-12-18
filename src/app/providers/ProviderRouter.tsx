import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@/routes/routeTree";
const routes = createRouter({ routeTree });

export const ProviderRouter = () => {
  return <RouterProvider router={routes} />;
};
