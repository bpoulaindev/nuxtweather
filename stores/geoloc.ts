import { defineStore } from "pinia";
import { useGeolocation } from "@vueuse/core";
import { computed, ref, watch } from "vue";

export const useGeoloc = defineStore("geoloc", () => {
  const { coords } = useGeolocation();
  const correctCoords = ref({
    latitude: 0,
    longitude: 0,
  });
  const hasValidCoords = computed(() => {
    return (
      typeof correctCoords.value.latitude === "number" &&
      typeof correctCoords.value.longitude === "number" &&
      correctCoords.value.latitude !== 0 &&
      correctCoords.value.longitude !== 0
    );
  });
  watch(coords, (newCoords, oldCoords) => {
    if (
      typeof newCoords?.latitude === "number" &&
      typeof newCoords?.longitude === "number"
    ) {
      correctCoords.value = {
        latitude: newCoords.latitude,
        longitude: newCoords.longitude,
      };
    }
  });
  return { hasValidCoords, coords: correctCoords };
});
