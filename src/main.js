import "./assets/styles/tailwind.css"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ApiService from "./services/apiService.js"

ApiService.init()

const app = createApp(App)

app.config.devtools = true
app.use(store)
app.use(router)
app.mount("#app")
