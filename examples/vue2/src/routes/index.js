import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const baseRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue'),
  },
];

export default function initRouter() {
  return new VueRouter({
    mode: 'history',
    routes: baseRoutes,
  });
}
