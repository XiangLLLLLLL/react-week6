import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/scss/all.scss";
import { RouterProvider } from "react-router";
import router from "./assets/rotes/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
