import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import { userService } from "../services/user.service";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },

  {
    path: "/chat",
    name: "Chat",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "chat" */ "../views/Chat.vue")
  },
  {
    path: "/notes",
    name: "Notes",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "notes" */ "../views/Notes.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  if (loggedIn && authRequired) {
    console.group("[JWT] Token Validation - Router");
    console.time("[JWT] Token Validation");
    const valid = userService.validateToken(JSON.parse(loggedIn).access);
    console.timeEnd("[JWT] Token Validation");
    console.groupEnd();
    if (!valid) {
      return next("/login");
    } else {
      next();
    }
  } else if (authRequired && !loggedIn) {
    return next("/login");
  } else if (!authRequired) {
    next();
  }
});

export default router;
