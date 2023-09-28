import { defineConfig } from "cypress";
import { cypressBrowserPermissionsPlugin } from "cypress-browser-permissions";

export default defineConfig({
  e2e: {
    baseUrl: "https://0.0.0.0:3000",
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      config = cypressBrowserPermissionsPlugin(on, config);
    },
    env: {
      browserPermissions: {
        geolocation: "allow",
      },
    },
  },
});
