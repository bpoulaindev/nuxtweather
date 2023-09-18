import path from "path";
import { NuxtConfig } from "@nuxt/types";

export const config: NuxtConfig = {
  alias: {
    utils: path.resolve(__dirname, "utils"),
  },
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    },
  },
  server: {
    port: 4000,
  },
  modules: ["nuxt-svgo"],
  css: ["@/assets/css/main.css"],
  serverMiddleware: [
    {
      path: "/api/weather_current.ts",
      handler: "~/server/middleware/middleware.ts",
    },
  ],
  proxy: {
    prefix: "/api/weather_current.ts",
  },
};
