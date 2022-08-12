import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import NavigationView from "@/views/NavigationView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/results",
  },
  {
    path: "/",
    component: NavigationView,
    children: [
      {
        path: "results",
        component: () => import("@/views/ResultsView.vue"),
      },
      {
        path: "results/:result_id",
        component: () => import("@/views/ResultView.vue"),
      },
      {
        path: "schedules",
        component: () => import("@/views/SchedulesView.vue"),
      },
      {
        path: "search",
        component: () => import("@/views/SearchView.vue"),
      },
      {
        path: "users",
        component: () => import("@/views/UsersView.vue"),
      },
      {
        path: "login",
        component: () => import("@/views/SignInView.vue"),
      },
      {
        path: "charts",
        component: () => import("@/views/ChartsView.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
