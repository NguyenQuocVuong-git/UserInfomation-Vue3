import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Home from "../pages/Home.vue";
import UserInformation from "../components/UserInformation.vue";
import CreateAccount from "../components/Create.vue";
import About from "../pages/About.vue";
import NotFound from "../pages/NotFound.vue";
import axios from "@/axios";
const routes = [
  {
    name: "home",
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
    component: UserInformation,
  },
  {
    path: "/create-account",
    name: "createAccount",
    component: CreateAccount,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
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
  if (routerNext(to.name)) next();
  else {
    const _id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    axios
      .post("user/checkToken", { token, _id })
      .then(() => {
        if (to.name === "login") next({ name: "home" });
        else next();
      })
      .catch(() => {
        if (to.name !== "login") return router.replace("/login");
        else next();
      });
  }
});

export default router;
