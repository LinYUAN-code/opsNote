import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mpa from "vite-plugin-mpa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), mpa()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
