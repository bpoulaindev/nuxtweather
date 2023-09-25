import { defineStore } from "pinia";
import { useGeolocation } from "@vueuse/core";
import { computed, ref, watch } from "vue";

export const useGeoloc = defineStore("geoloc", {
  state: () => ({
    coords: {
      latitude: 0,
      longitude: 0,
    } as {
      latitude: number;
      longitude: number;
    },
    error: null as GeolocationPositionError | null,
    hasValidCoords: false,
  }),
  actions: {
    fetchGeoloc() {
      const { coords, error } = useGeolocation();
      watch(error, (newError, oldError) => {
        if (newError) {
          this.error = newError;
        }
      });
      watch(coords, (newCoords, oldCoords) => {
        if (
          typeof newCoords?.latitude === "number" &&
          typeof newCoords?.longitude === "number"
        ) {
          this.coords = {
            latitude: newCoords.latitude,
            longitude: newCoords.longitude,
          };
          this.hasValidCoords = true;
        }
      });
    },
  },
});
