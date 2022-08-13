import { defineConfig, loadEnv } from "vite";
import Vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import ViteYaml from "@modyfi/vite-plugin-yaml";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  return {
    resolve: {
      alias: [{ find: "@", replacement: "/src" }],
    },
    plugins: [Vue(), VitePWA(), ViteYaml()],
    define: {
      VITE_APP_URL: JSON.stringify(process.env.VITE_APP_URL),
    },
  }
});
