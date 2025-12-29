import { rootRouter, indexRouter, authRouter, profileRouter } from ".";

export const routeTree = rootRouter.addChildren([
  indexRouter,
  authRouter,
  profileRouter,
]);
