import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/page/Home.vue';
import About from '@/page/About.vue';
import NotFound from '@/page/NotFound.vue';
import ComponentA from '@/components/ComponentA.vue';
import ComponentB from '@/components/ComponentB.vue';
import ComponentC from '@/components/ComponentC.vue';
import Tutorial from '@/page/Tutorial.vue';
import Signin from '@/page/Signin.vue';
import SignUp from '@/page/SignUp.vue';
import KakaoLogin from '@/page/KakaoLogin.vue';
import LoginNew from '@/page/LoginNew.vue';
import DiaryView from '@/page/DiaryView.vue';
import DiaryWriting from '@/page/DiaryWriting.vue';

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
    path: "/diary/tutorial",
    name: "Tutorial", 
    component:Tutorial 
  },
  { path: "/signin",
    name: "Signin",
    component:Signin 
  },
  { path: "/signup", 
    name: "SignUp", 
    component:SignUp 
  },
  {
     path: "/oauth/kakao/callback", 
    name: "KakaoLogin", 
    component:KakaoLogin 
  },
  { 
    path: "/login", 
    name: "LoginNew", 
    component:LoginNew 
  },
  { path: "/diary/list", 
    name: "DiaryView", 
    component:DiaryView 
  },
  { path: "/diary/write", 
    name: "DiaryWriting", 
    component:DiaryWriting 
  },
  // { path: "/", name: "", component: },
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
