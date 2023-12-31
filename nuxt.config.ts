import path from "path";

export default {
  ssr: true,
  target: "server",
  serverMiddleware: [
    { path: "/api/geoweather", handler: "~/middleware/geoweather.global.ts" },
    { path: "/", handler: "~/middleware/geoweather.global.ts" },
  ],
  geolocation: {
    watch: true, // Enable continuous location watching
  },
  alias: {
    "@utils": path.resolve(__dirname, "utils"),
    "@assets": path.resolve(__dirname, "assets"),
    "@components": path.resolve(__dirname, "components"),
    "@stores": path.resolve(__dirname, "stores"),
  },
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  plugins: [],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    weatherApiKey: process.env.NUXT_WEATHER_API_KEY,
  },
  modules: ["nuxt-svgo", "@pinia/nuxt"],
  css: ["@/assets/css/main.css"],
  devServer: {
    port: 3000,
    host: "localhost",
    https: true,
  },
  experimental: {
    renderJsonPayloads: false,
  },
};
