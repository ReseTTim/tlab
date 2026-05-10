import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home.vue'),
  },
  {
    path: '/show/:id',
    name: 'show',
    component: () => import('@/pages/show.vue'),
  },
  { 
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/error.vue'),
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
