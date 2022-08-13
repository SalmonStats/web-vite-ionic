import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import ViteYaml from "@modyfi/vite-plugin-yaml";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  plugins: [Vue(), VitePWA(), ViteYaml()],
  define: {
    import.meta.env.VITE_APP_URL: "https://api.splatnet2.com/v1",
  },
});
