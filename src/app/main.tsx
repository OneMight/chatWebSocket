import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/app/styles/index.css";
import { ProviderRouter, QueryProvider } from "@/app/providers/";
import { Suspense } from "react";
import { UserProvider } from "./providers/UserProvider";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={"loading"}>
      <QueryProvider>
        <UserProvider>
          <ProviderRouter />
        </UserProvider>
      </QueryProvider>
    </Suspense>
  </StrictMode>,
);
