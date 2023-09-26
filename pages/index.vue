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

const store = useGeoloc();
const { coords, error } = storeToRefs(store);
</script>

<template>
  <div>
    <NoLocation v-if="coords === null" />
    <Weather v-else :coords="coords" />
  </div>
</template>
