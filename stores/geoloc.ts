import { defineStore } from "pinia";
import dayjs from "dayjs";

interface GeolocStore {
  coords: { latitude: number; longitude: number } | null;
  error: GeolocationPositionError | null;
  permission: PermissionStatus["state"];
}

export const useGeoloc = defineStore("geoloc", {
  state: (): GeolocStore => ({
    coords: null,
    error: null,
    permission: "prompt",
  }),
  actions: {
    async initializeState() {
      console.log("initializing state");
      try {
        this.recycleLocalStorage();
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });
        console.log("initializing state", permission.state);
        this.permission = permission.state;
      } catch (error) {
        this.error = error as GeolocationPositionError;
        console.error("Error reading permission:", error);
      }
    },
    async fetchGeoloc() {
      console.log("fetching geoloc");
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 20 * 60 * 1000,
      };
      try {
        if (this.permission !== "denied") {
          console.log("permission was granted or prompt");
          this.recycleLocalStorage();
          if (!this.coords) {
            const position = await this.getPosition(options);
            console.log("position fetched", position);
            this.coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
          }
          this.updateLocalStorage();
        } else {
          console.log("permission was denied");
          this.error = {
            code: 1,
            message: "Geolocation permission denied",
          } as GeolocationPositionError;
        }
      } catch (error) {
        this.error = error as GeolocationPositionError;
        console.error("Error fetching geolocation:", error);
      }
    },
    getPosition(options: PositionOptions) {
      console.log("launching getPosition");
      return new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.watchPosition(resolve, reject, options);
      });
    },
    updateLocalStorage() {
      try {
        localStorage.setItem(
          "GEOLOC",
          JSON.stringify({
            coords: this.coords,
            timestamp: dayjs().valueOf(),
          }),
        );
      } catch (error) {
        console.error("Error updating local storage:", error);
      }
    },
    recycleLocalStorage() {
      const oldGeoloc = JSON.parse(localStorage.getItem("GEOLOC") ?? "{}");
      if (
        oldGeoloc.coords &&
        oldGeoloc.timestamp > dayjs().subtract(20, "minutes").valueOf()
      ) {
        console.log("recycling local storage");
        this.coords = oldGeoloc.coords;
      } else {
        console.log("local storage is empty or too old");
      }
    },
  },
});
