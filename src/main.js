import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Configuración global para mejorar las transiciones
app.config.globalProperties.$nextTick = app.config.globalProperties.$nextTick;

// Plugin global para manejar transiciones suaves
app.mixin({
  beforeRouteLeave(to, from, next) {
    // Añadir clase de transición al body
    document.body.classList.add("page-transitioning");
    setTimeout(() => {
      document.body.classList.remove("page-transitioning");
    }, 300);
    next();
  },
});

app.use(router).mount("#app");
