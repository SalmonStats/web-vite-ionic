import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import Vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import ViteYaml from "@modyfi/vite-plugin-yaml";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  return {
    server: {
      port: 8000,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["vue", "@ionic/vue"],
          },
        },
      },
    },
    resolve: {
      alias: [{ find: "@", replacement: "/src" }],
    },
    plugins: [
      Vue(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["assets/**/*.png"],
        manifest: {
          name: "Salmon Stats",
          short_name: "Salmon Stats",
          theme_color: "#ffffff",
          icons: [
            {
              src: "/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
      }),
      ViteYaml(),
      splitVendorChunkPlugin(),
    ],
    define: {
      VITE_APP_URL: JSON.stringify(process.env.VITE_APP_URL),
    },
  };
});
