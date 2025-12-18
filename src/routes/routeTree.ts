import { rootRouter, indexRouter, authRouter } from ".";

export const routeTree = rootRouter.addChildren([indexRouter, authRouter]);
