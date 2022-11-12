import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mpa from "vite-plugin-mpa";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    react(),
    mpa({
      open: "/home/index",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
