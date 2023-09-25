<script setup lang="ts">
import { storeToRefs } from "pinia";
import { MapPinIcon } from "@heroicons/vue/24/outline";
import { useGeoloc } from "~/stores/geoloc";
import LocationError from "~/components/noLocation/location_error/LocationError.vue";

const store = useGeoloc();
store.fetchGeoloc();
const { error } = storeToRefs(store);
</script>

<template>
  <div
    class="h-[calc(100dvh)] max-h-[calc(100dvh)] flex flex-col w-[calc(100dvw)] items-center relative px-2 sm:px-10 bg-cover bg-center bg-no-repeat !bg-[url('/assets/background/home.png')]"
  >
    <h1 class="flex items-center mt-10 text-orange-800">
      <img alt="Nuxt Weather Logo" src="/logo.png" class="w-5 h-5 mr-2" />
      <span class="text-5xl font-semibold font-sentient">NuxtWeather</span>
    </h1>
    <div class="flex flex-col w-full items-center mt-10 px-10">
      <MapPinIcon class="w-10 h-10 text-orange-800 animate-bounce" />
      <p class="text-lg text-gray-600 mt-2 text-center">
        Cette application web a besoin de votre position pour fonctionner.
      </p>
      <p class="text-lg text-gray-600 mt-2 text-center">
        Merci d'accepter la géolocalisation pour continuer.
      </p>
    </div>
    <LocationError v-if="error" :error="error" />
  </div>
</template>
