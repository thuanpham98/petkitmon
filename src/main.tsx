import ReactDOM from "react-dom/client";
import "./index.css";
import { RdModule, RdModulesManager } from "@radts/reactjs";
import { AppRepository } from "./applications/services/app-repository";
import { appRouterConfig } from "./router";
import { RouterProvider } from "react-router-dom";

console.debug("version 1.0.1");
const rdManager = new RdModulesManager<RdModule>().use(new AppRepository());
const router = appRouterConfig(rdManager);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
