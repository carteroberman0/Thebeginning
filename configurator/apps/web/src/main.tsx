import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { MarketingLayout } from "@/components/marketing/site";
import { ConfiguratorPage } from "./pages/configure/ConfiguratorPage";
import HomePage from "./pages/HomePage";
import HowItWorksPage from "./pages/HowItWorksPage";
import MarketplacePage from "./pages/MarketplacePage";
import PricingPage from "./pages/PricingPage";
import { OperatorPage } from "./pages/operator/OperatorPage";
import { PropertyEditor } from "./pages/operator/PropertyEditor";

const router = createBrowserRouter([
  {
    element: <MarketingLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/how-it-works", element: <HowItWorksPage /> },
      { path: "/marketplace", element: <MarketplacePage /> },
      { path: "/pricing", element: <PricingPage /> },
    ],
  },
  { path: "/operator", element: <OperatorPage /> },
  { path: "/operator/:id", element: <PropertyEditor /> },
  { path: "/configure/:propertyId", element: <ConfiguratorPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
