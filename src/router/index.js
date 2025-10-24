import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import UserData from "../views/UserData.vue";
import Question from "../views/Question.vue";
import Result from "../views/Result.vue";
import Thanks from "../views/Thanks.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { transition: "slide-left" },
  },
  {
    path: "/datos",
    name: "UserData",
    component: UserData,
    meta: { transition: "slide-left" },
  },
  {
    path: "/pregunta/:questionNumber",
    name: "Question",
    component: Question,
    props: true,
    meta: { transition: "slide-left" },
  },
  {
    path: "/resultado",
    name: "Result",
    component: Result,
    meta: { transition: "slide-left" },
  },
  {
    path: "/gracias",
    name: "Thanks",
    component: Thanks,
    meta: { transition: "slide-left" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// Prevenir el flash blanco durante navegación
router.beforeEach((to, from, next) => {
  // Pequeño delay para permitir que las imágenes se carguen
  if (from.name) {
    setTimeout(() => {
      next();
    }, 100);
  } else {
    next();
  }
});

export default router;
