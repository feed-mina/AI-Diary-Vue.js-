import { createRouter, createWebHistory } from 'vue-router';
import Home from '../page/Home.vue';
import About from '../page/About.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
