import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/app/styles/index.css";
import { ProviderRouter } from "@/app/providers/ProviderRouter";
import { Suspense } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={"loading"}>
      <ProviderRouter />
    </Suspense>
  </StrictMode>,
);
