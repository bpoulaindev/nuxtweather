<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useGeolocation } from "@vueuse/core";
import CurrentWeather from "~/components/weather/Weather.vue";

useHead({
  title: "Vuxt Weather",
  meta: [
    {
      name: "Vuxt Weather",
      content:
        "Obtenez la météo en temps réel avec des prévisions sur la semaine.",
    },
  ],
});
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

// Use onMounted to ensure that the watch function is set up after component initialization.
onMounted(() => {
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
});
</script>

<template>
  <div>
    <CurrentWeather v-if="hasValidCoords" :coords="correctCoords" />
  </div>
</template>
