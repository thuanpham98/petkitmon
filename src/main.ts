import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.config.errorHandler = (e) => {
  console.error(e);
};
app.mount("#app");
