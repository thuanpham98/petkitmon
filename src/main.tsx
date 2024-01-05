import ReactDOM from "react-dom/client";
import "./index.css";
import { RdModule, RdModulesManager } from "@radts/reactjs";
import { AppRepository } from "./applications/services/app-repository";
import { appRouterConfig } from "./router";
import { RouterProvider } from "react-router-dom";

export const rdManager = new RdModulesManager<RdModule>().use(
  new AppRepository(),
);
const router = appRouterConfig();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
