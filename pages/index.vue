<script setup lang="ts">
import { useGeolocation } from "@vueuse/core";
import { UseGeolocation } from "@vueuse/components";
import Weather from "~/components/weather/Weather.vue";
// const url = `https://api.weatherapi.com/v1/current.json?key=f2c03022868b4d90ad7160433231309&q=${coords.latitude},${coords.longitude}&aqi=no`;

const { coords, locatedAt, error, resume, pause } = useGeolocation();
const correctCoords = ref({
  latitude: 0,
  longitude: 0,
});

// Define a computed property to get the current coordinates
const currentCoordinates = computed(() => {
  return {
    latitude: coords.value.latitude,
    longitude: coords.value.longitude,
  };
});
watch(coords, async (newCoords, oldCoords) => {
  if (
    typeof newCoords.latitude === "number" &&
    typeof newCoords.longitude === "number"
  ) {
    correctCoords.value = {
      latitude: newCoords.latitude,
      longitude: newCoords.longitude,
    };
    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=f2c03022868b4d90ad7160433231309&q=${correctCoords.value.latitude},${correctCoords.value.longitude}&aqi=no`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
});
</script>

<template>
  <div>
    <Weather />
  </div>
</template>

<style scoped></style>
