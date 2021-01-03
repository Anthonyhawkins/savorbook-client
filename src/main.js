import './assets/styles/tailwind.css';
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ApiClient from "./services/apiClient.js"

ApiClient.init()

const app = createApp(App)

app.config.devtools = true
app.use(store)
app.use(router)
app.mount("#app");
