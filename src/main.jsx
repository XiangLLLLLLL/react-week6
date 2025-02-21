import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/scss/all.scss";
import { RouterProvider } from "react-router";
import router from "./assets/rotes/index.jsx";
import { store } from "./assets/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
