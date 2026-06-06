import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import router from "./router/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <span className="loading loading-dots loading-lg text-blue-600" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
