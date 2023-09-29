import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), vue()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  alias: {
    "@utils": path.resolve(__dirname, "utils"),
    "@assets": path.resolve(__dirname, "assets"),
    "@components": path.resolve(__dirname, "components"),
    "@stores": path.resolve(__dirname, "stores"),
  },
});
