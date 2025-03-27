import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteSvgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("./127.0.0.1-key.pem"),
      cert: fs.readFileSync("./127.0.0.1.pem"),
    },
  },
  plugins: [
    react(),
    // mkcert(),
    viteSvgr(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Nhà của Yến sào",
        short_name: "NCYS",
        description: "Ứng dụng Nhà của Yến sào",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "icons/logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: "~",
        replacement: "/src",
      },
    ],
  },
});
