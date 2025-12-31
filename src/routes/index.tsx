import {
  createRoute,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { ROUTES } from "../routesPath";
import { Auth, Home, Profile } from "@/pages";
import App from "@/app/App";
import { type AuthContextType } from "@/app/context/UserContext";

interface MyRouterContext {
  auth: AuthContextType;
}
const rootRouter = createRootRouteWithContext<MyRouterContext>()({
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
