import { StrictMode } from "react";
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
