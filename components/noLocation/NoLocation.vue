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
    class="h-[calc(100dvh)] max-h-[calc(100dvh)] flex flex-col w-[calc(100dvw)] items-center relative px-2 sm:px-10 bg-cover bg-center bg-no-repeat !bg-[url('/assets/background/home_xl.png')]"
  >
    <h1 class="flex items-center mt-10 text-orange-800">
      <img
        alt="Nuxt Weather Logo"
        src="/logo.png"
        class="w-4 h-4 xs:w-5 xs:h-5 mr-1 xs:mr-2"
      />
      <span class="text-3xl xs:text-5xl font-semibold font-sentient"
        >NuxtWeather</span
      >
    </h1>
    <div class="flex flex-col w-full items-center mt-10 sm:px-10">
      <MapPinIcon
        class="w-6 h-6 xs:w-10 xs:h-10 text-orange-800 animate-bounce"
      />
      <div class="p-2 w-auto rounded-xl bg-white shadow-xl mt-5">
        <p class="text-sm xs:text-base text-gray-600 text-center">
          Cette application web a besoin de votre position pour fonctionner.
          Merci d'accepter la géolocalisation pour continuer.
        </p>
      </div>
    </div>
    <LocationError v-if="error?.code === 1" :error="error" />
  </div>
</template>
