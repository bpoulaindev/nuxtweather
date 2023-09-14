// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  postcss: {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    }
  },
  css: [
    '@/assets/css/main.css',
  ],
  devServer: {
    port: 3000,
    host: 'https://localhost',
    https: true,
  }
})
