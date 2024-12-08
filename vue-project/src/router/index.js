import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/page/Home.vue';
import About from '@/page/About.vue';
import NotFound from '@/page/NotFound.vue';
import ComponentA from '@/components/ComponentA.vue';
import ComponentB from '@/components/ComponentB.vue';
import ComponentC from '@/components/ComponentC.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/notFound',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/componentA',
    name: 'ComponentA',
    component: ComponentA,
  },
  {
    path: '/componentB',
    name: 'ComponentB',
    component: ComponentB,
  },
  {
    path: '/componentC',
    name: 'ComponentC',
    component: ComponentC,
  },
  {
    path: '/:pathMatch(.*)*', // 잘못된 경로 처리
    name: 'CatchAll',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(), // HTML5 History 모드
  routes,
});

export default router;
