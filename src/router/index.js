import { createRouter, createWebHistory } from "vue-router";
import Home from "@/page/Home.vue";
import About from "@/page/About.vue";
import NotFound from "@/page/NotFound.vue";
import ComponentA from "@/components/ComponentA.vue";
import ComponentB from "@/components/ComponentB.vue";
import ComponentC from "@/components/ComponentC.vue";
import Tutorial from "@/page/Tutorial.vue";
import Signin from "@/page/Signin.vue";
import LoginPage from "@/page/LoginPage.vue";
import SignupPage from "@/page/SignupPage.vue";
import AgrrementPolicy from "@/page/AgrrementPolicy.vue";
import DiaryWriting from "@/page/DiaryWriting.vue";
import DiaryView from "@/page/DiaryView.vue";
import DiaryList from "@/page/DiaryList.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/notFound", name: "NotFound", component: NotFound },
  { path: "/componentA", name: "ComponentA", component: ComponentA },
  { path: "/componentB", name: "ComponentB", component: ComponentB },
  { path: "/componentC", name: "ComponentC", component: ComponentC },
  { path: "/diary/tutorial", name: "Tutorial", component: Tutorial },
  { path: "/signin", name: "Signin", component: Signin },
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/signup", name: "SignupPage", component: SignupPage },
  { path: "/agreementPolicy", name: "AgrrementPolicy", component: AgrrementPolicy },
  {path:"/diary/write", name:"DiaryWriting",component:DiaryWriting,  meta: { requiresAuth: true } },
  {path:"/diary/view", name:"DiaryView",component:DiaryView,  meta: { requiresAuth: true } },
  {path:"/diary/common", name:"DiaryList",component:DiaryList,  meta: { requiresAuth: true } },
  {
    path: "/:pathMatch(.*)*",
    name: "CatchAll",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token'); // 토큰이 있는지 확인
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login'); // 로그인하지 않았다면 로그인 페이지로 이동
  } else {
    next(); // 그 외는 그대로 진행
  }
});

export default router;
