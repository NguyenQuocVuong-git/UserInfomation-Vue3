import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../page/Login.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("../page/Home.vue"),
    },
    {
      path: "/create-account",
      name: "createAccount",
      component: () => import("../components/Create.vue"),
    },
  ],
});

const routerNext = (name) => {
  let keysToRemove = ["createAccount"];
  const found = keysToRemove.find((element) => element === name);
  if (found) return true;
  return false;
};

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const time = token ? jwtDecode(token).exp * 1000 - new Date().valueOf() : 0;
  if (routerNext(to.name)) next();
  else if (to.name !== "login" && time <= 0) next({ name: "login" });
  else if (to.name === "login" && time > 0) next({ name: "home" });
  else next();
});
export default router;
