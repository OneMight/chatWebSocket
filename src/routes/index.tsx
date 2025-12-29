import { createRoute, createRootRoute } from "@tanstack/react-router";
import { ROUTES } from "../routesPath";
import { Auth, Home, Profile } from "@/pages";
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
const profileRouter = createRoute({
  getParentRoute: () => rootRouter,
  path: ROUTES.PROFILE,
  component: Profile,
});

export { rootRouter, indexRouter, authRouter, profileRouter };
