<script>
/* eslint-disable vue/multi-word-component-names */
import { ref, computed } from 'vue'; // 사용하지 않는 reactive, onMounted 삭제
import NotFound from '@/page/NotFound.vue';

export default {
  name: 'Tutorial', // 규칙 무시
  setup() {
    const routes = {
      '/notFound': NotFound,
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
  <h1>튜토리얼</h1>
</template>
