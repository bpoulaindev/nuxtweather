// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";

export default defineNuxtConfig({
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
  modules: ["nuxt-svgo"],
  css: ["@/assets/css/main.css"],
  devServer: {
    port: 3000,
    host: "https://localhost",
    https: true,
  },
});
