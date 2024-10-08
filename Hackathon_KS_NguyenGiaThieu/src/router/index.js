import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      name: "dashboard",
      component: () =>
        import(/** webpackChunkName:"dashboard" */ "../views/Dashboard.vue"),
      children: [],
    },
    {
      path: "/admin/managerCategory",
      name: "managerCategory",
      component: () =>
        import(
          /** webpackChunkName:"managerCategory" */ "../views/ManagerCategory.vue"
        ),
    },
    {
      path: "/admin/managerProduct",
      name: "managerProduct",
      component: () =>
        import(
          /** webpackChunkName:"managerProduct" */ "../views/ManagerProduct.vue"
        ),
    },
  ],
});

export default router;
