import { StrictMode, type ReactElement } from "react";
import { createRoot } from "react-dom/client";
import "@/app/styles/index.css";
import {
  ProviderRouter,
  QueryProvider,
  ProviderApollo,
} from "@/app/providers/";
import { Suspense } from "react";
import { UserProvider } from "./providers/UserProvider";
import { Spinner } from "@/components";
import { render, type RenderOptions } from "@testing-library/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Spinner className="size-10" />}>
      <QueryProvider>
        <ProviderApollo>
          <UserProvider>
            <ProviderRouter />
          </UserProvider>
        </ProviderApollo>
      </QueryProvider>
    </Suspense>
  </StrictMode>,
);
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: QueryProvider, ...options });

export * from "@testing-library/react";
export { customRender as render };
