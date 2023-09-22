import { defineStore } from "pinia";
import { Theme } from "~/utils/types/theme";

export const useTheme = defineStore("theme", {
  state: () => ({
    theme: (localStorage.getItem("THEME") ?? "default") as Theme,
  }),
  actions: {
    setTheme(theme: Theme) {
      console.log("received new theme", theme);
      localStorage.setItem("THEME", theme);
      this.theme = theme;
    },
  },
});
