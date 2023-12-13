import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
// import Home from '../pages/Home.vue';
// import store from '@/store/store';
import WebSocket from '../pages/WebSocketChat.vue';

const routes = [
  {
    name: "Home",
    path: "/",
    component: WebSocket,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.name !== "Login" && !store.state.user) next({ name: "Login" });
//   else if (to.name === "Login" && store.state.user) next({ name: "Home" });
//   else next();
// });

export default router;
