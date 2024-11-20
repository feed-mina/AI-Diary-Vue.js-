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
});
