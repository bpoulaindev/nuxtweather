<script setup lang="ts">
import { storeToRefs } from "pinia";
import Weather from "~/components/weather/Weather.vue";
import { useGeoloc } from "~/stores/geoloc";
import NoLocation from "~/components/noLocation/NoLocation.vue";

useHead({
  title: "NuxtWeather",
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/logo.svg",
    },
  ],
  meta: [
    {
      name: "NuxtWeather",
      content:
        "Obtenez la météo en temps réel avec des prévisions sur la semaine.",
    },
  ],
});
const locationRef = ref({
  coords: {
    latitude: 0,
    longitude: 0,
  },
  hasValidCoords: false,
});

const store = useGeoloc();
const { hasValidCoords, coords } = storeToRefs(store);
</script>

<template>
  <div>
    <Weather v-if="hasValidCoords" :coords="coords" />
    <NoLocation v-else />
  </div>
</template>
