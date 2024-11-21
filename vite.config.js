import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
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
    include: ["vue-debounce"], // 명시적으로 추가
  },
  compilerOptions: {
    isCustomElement: (tag) =>
      ["v-checkbox-group", "v-list-item-content"].includes(tag),
  },
});
