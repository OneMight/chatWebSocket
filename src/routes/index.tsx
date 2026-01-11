import {
  createRoute,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { ROUTES } from "./routesPath";
import App from "@/app/App";
import { type AuthContextType } from "@/app/context/UserContext";
import React from "react";

interface MyRouterContext {
  auth: AuthContextType;
}
const rootRouter = createRootRouteWithContext<MyRouterContext>()({
  component: () => <App />,
});

const indexRouter = createRoute({
  getParentRoute: () => rootRouter,
  path: ROUTES.HOME,
  component: React.lazy(() =>
    import("@/pages").then((module) => ({
      default: module.Home,
    })),
  ),
});
const authRouter = createRoute({
  getParentRoute: () => rootRouter,
  path: ROUTES.AUTH,
  component: React.lazy(() =>
    import("@/pages/").then((module) => ({
      default: module.Auth,
    })),
  ),
});
const profileRouter = createRoute({
  getParentRoute: () => rootRouter,
  path: ROUTES.PROFILE,
  component: React.lazy(() =>
    import("@/pages/index").then((module) => ({
      default: module.Profile,
    })),
  ),
});
const conversationRouter = createRoute({
  getParentRoute: () => rootRouter,
  path: ROUTES.POSTPAGE,
  component: React.lazy(() =>
    import("@/pages").then((module) => ({
      default: module.Conversation,
    })),
  ),
});

export {
  rootRouter,
  indexRouter,
  authRouter,
  profileRouter,
  conversationRouter,
};
