import { defineStore } from "pinia";
import dayjs from "dayjs";

interface GeolocStore {
  coords: { latitude: number; longitude: number } | null;
  error: GeolocationPositionError | null;
}

export const useGeoloc = defineStore("geoloc", {
  state: (): GeolocStore => ({
    coords: null,
    error: null,
  }),
  actions: {
    async fetchGeoloc() {
      try {
        // @ts-ignore
        const oldGeoloc = JSON.parse(localStorage.getItem("GEOLOC") ?? "{}");
        if (
          oldGeoloc.coords &&
          oldGeoloc.timestamp > dayjs().subtract(15, "minutes").valueOf()
        ) {
          this.coords = oldGeoloc.coords;
          return;
        }
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });
        if (permission.state === "denied") {
          this.error = {
            code: 1,
            message: "Geolocation permission denied",
          } as GeolocationPositionError;
          return;
        }
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject),
        );
        this.coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        localStorage.setItem(
          "GEOLOC",
          JSON.stringify({
            coords: this.coords,
            timestamp: dayjs().valueOf(),
          }),
        );
      } catch (error) {
        this.error = error as GeolocationPositionError;
      }
    },
  },
});
