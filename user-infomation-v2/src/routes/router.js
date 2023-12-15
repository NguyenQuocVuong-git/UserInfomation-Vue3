import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Home from "../pages/Home.vue";
import store from "@/store/store";
import { jwtDecode } from "jwt-decode";
const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    name: "user",
    path: "/user",
    component: () => import("../components/UserInformation.vue"),
  },
  {
    path: "/create-account",
    name: "createAccount",
    component: () => import("../components/Create.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const routerNext = (name) => {
  let keysToRemove = ["createAccount"];
  const found = keysToRemove.find((element) => element === name);
  if (found) return true;
  return false;
};

router.beforeEach((to, from, next) => {
  const checkUserInState = !store.state.user ? false : true;
  const token = localStorage.getItem("token");
  const userIsLogin = token
    ? jwtDecode(token).exp * 1000 - new Date().valueOf() > 0
      ? checkUserInState
      : false
    : false;
  if (routerNext(to.name)) next();
  else if (to.name !== "login" && !userIsLogin) next({ name: "login" });
  else if (to.name === "login" && userIsLogin) next({ name: "home" });
  else next();
});

export default router;
