import { createRoute, createRootRoute } from "@tanstack/react-router";
import { ROUTES } from "..";
import { Auth, Home } from "@/pages";
import App from "@/app/App";

const rootRouter = createRootRoute({
  component: () => <App />,
});

const indexRouter = createRoute({
  getParentRoute: () => rootRouter,
  path: ROUTES.HOME,
  component: Home,
});
const authRouter = createRoute({
  getParentRoute: () => rootRouter,
  path: ROUTES.AUTH,
  component: Auth,
});

export { rootRouter, indexRouter, authRouter };
