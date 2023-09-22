<script setup lang="ts">
import { storeToRefs } from "pinia";
import Weather from "~/components/weather/Weather.vue";
import { useGeoloc } from "~/stores/geoloc";

useHead({
  title: "Nuxt Weather",
  meta: [
    {
      name: "Nuxt Weather",
      content:
        "Obtenez la météo en temps réel avec des prévisions sur la semaine.",
    },
  ],
});
const store = useGeoloc();
const { hasValidCoords, coords } = storeToRefs(store);
</script>

<template>
  <div>
    <Weather v-if="hasValidCoords" :coords="coords" />
  </div>
</template>
