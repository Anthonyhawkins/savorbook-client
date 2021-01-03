import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import About from "../views/About.vue";
import Account from "../views/Account.vue";

import Publish from "../views/publish/Publish.vue";
import RecipeEdit from "../views/publish/RecipeEdit.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/publish",
    name: "Publish",
    component: Publish,
    meta: { requiresAuth: true }
  },
  {
    path: "/publish/recipe/new",
    name: "RecipeEdit",
    component: RecipeEdit
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const userData = JSON.parse(localStorage.getItem('user'))
  if (to.matched.some(record => record.meta.requiresAuth) && !userData) {
    // route to home if not authenticated / loggedin
    next('/')
  } else {
    // continue with desired route
    next()
  }
})

export default router;
