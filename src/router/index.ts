import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/completed',
    name: 'Completed',
    component: () => import('../pages/CompletedPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
