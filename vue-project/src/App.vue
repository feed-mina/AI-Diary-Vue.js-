<script>
import { ref, computed } from 'vue'; // 사용하지 않는 reactive, onMounted 삭제
import Home from '@/page/Home.vue';
import About from '@/page/About.vue';
import NotFound from '@/page/NotFound.vue';
import ComponentA from '@/components/ComponentA.vue';
import ComponentB from '@/components/ComponentB.vue';
import ComponentC from '@/components/ComponentC.vue';

export default {
  components: {
    Home,
    About,
    NotFound,
    ComponentA,
    ComponentB,
    ComponentC,
  },
  setup() {
    // 라우터 튜토리얼
    const routes = {
      '/': Home,
      '/about': About,
      '/notFound': NotFound,
      '/componentA': ComponentA,
      '/componentB': ComponentB,
      '/componentC': ComponentC,
    };

    const currentPath = ref(window.location.hash);
    const currentView = computed(() => {
      return routes[currentPath.value.slice(1) || '/'] || NotFound;
    });

    return {
      currentView,
    };
  },
};
</script>

<template>
  <v-app>
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/notFound">잘못된 링크</RouterLink>
      </nav>
    </header>

    <RouterView /> <!-- 현재 경로에 맞는 컴포넌트 렌더링 -->
  </v-app>
</template>
 
<style> 

.vIFandVForSection,
.PropsEXSection,
.formSection,
.componentSection,
.modalSection,
.treeSection,
.fliterSection,
.listSection,
.todoSection{	
    border-radius: 15px;
    border-bottom: 3px solid darkgray;
    width: 100%;
    margin-bottom: 1em;
    padding: 20px 10px;
}


.text-decoration-line-through {
  text-decoration: line-through;
}

.todo-item {
  margin-bottom: 10px;
} 
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
