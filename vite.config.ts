import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";
// import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/sqmtt_client/",
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    server: {
        host: true,
        port: 5173,
        strictPort: true,
        // https: {
        //     key: fs.readFileSync("./cert/server.pem"),
        //     cert: fs.readFileSync("./cert/server.pem"),
        // },
    },
    plugins: [
        react(),
        svgr(),
        VitePWA({
            workbox: {
                globPatterns: [
                    "**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,wav,mp3,gltf,bin,eot,ttf,woff,woff2,txt,json}",
                ],
                maximumFileSizeToCacheInBytes: 25097152,
            },
            includeAssets: ["**/*"],
            manifest: {
                name: "SmartehMqtt",
                short_name: "SmartehMqtt",
                description: "SmartehMqtt MQTT Dashboard",
                theme_color: "#001528",
                icons: [
                    {
                        src: "favicon-96x96.png",
                        sizes: "96x96",
                        type: "image/png",
                    },
                    {
                        src: "web-app-manifest-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "apple-touch-icon.png",
                        sizes: "180x180",
                        type: "image/png",
                    },
                    {
                        src: "web-app-manifest-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
});
