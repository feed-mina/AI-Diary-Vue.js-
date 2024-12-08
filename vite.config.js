import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from 'vite-plugin-vuetify';
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }), // Vuetify 플러그인 추가
  ],
  resolve: {
    alias: {
      "@": "/src", // 경로 별칭 설정
      "lodash-es": "lodash-es/lodash.js",
    },
  },
  build: {
    rollupOptions: {
      external: ["vuetify"],
    },
  },
  optimizeDeps: {
    include: ["vue-debounce",'vuetify'], // 명시적으로 추가
  },
  compilerOptions: {
    isCustomElement: (tag) =>
      ["v-checkbox-group", "v-list-item-content"].includes(tag),
  },
});
