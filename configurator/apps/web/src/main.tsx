import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { ConfiguratorPage } from "./pages/configure/ConfiguratorPage";
import HomePage from "./pages/HomePage";
import { OperatorPage } from "./pages/operator/OperatorPage";
import { PropertyEditor } from "./pages/operator/PropertyEditor";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/operator", element: <OperatorPage /> },
  { path: "/operator/:id", element: <PropertyEditor /> },
  { path: "/configure/:propertyId", element: <ConfiguratorPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
