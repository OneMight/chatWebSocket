import {
  rootRouter,
  indexRouter,
  authRouter,
  profileRouter,
  conversationRouter,
} from ".";

export const routeTree = rootRouter.addChildren([
  indexRouter,
  authRouter,
  conversationRouter,
  profileRouter,
]);
