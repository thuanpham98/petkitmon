import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import { RdModulesManager } from "@radts/core";
import { AppRepository } from "@/applications/services/app-repository";

export const modManager = new RdModulesManager().use(new AppRepository());

const app = createApp(App);
app.config.errorHandler = (e) => {
  console.error(e);
};
app.use(router);
app.mount("#app");
