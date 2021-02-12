import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

import JwtService from "@/services/jwtService.js";
import ApiService from "@/services/apiService.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue")
  },
  {
    path: "/publish",
    name: "Publish",
    component: () => import("@/views/publish/Publish.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/Signup.vue")
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("@/views/Account.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/publish/recipes",
    name: "RecipeList",
    component: () => import("@/views/publish/RecipeList.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/publish/recipes/new",
    name: "RecipeNew",
    component: () => import("@/views/publish/RecipeEdit.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/publish/recipes/:id",
    name: "RecipeShow",
    component: () => import("@/views/publish/RecipeShow.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/publish/recipes/:id/edit",
    name: "RecipeEdit",
    component: () => import("@/views/publish/RecipeEdit.vue"),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const token = JwtService.getToken();
  //Not Logged In
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    // route to home if not authenticated / loggedin
    next("/");

    //Logged In
  } else {
    //if we have a token, ensure the auth header and user is set
    if (token) {
      ApiService.setHeader(token);
      store.dispatch("setUser", token);
    }

    // continue with desired route
    next();
  }
});

export default router;
