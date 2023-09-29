<script setup lang="ts">
import { storeToRefs } from "pinia";
import { MapPinIcon } from "@heroicons/vue/24/solid";
import { useWindowSize } from "@vueuse/core/index";
import { useGeoloc } from "~/stores/geoloc";
import LocationError from "~/components/noLocation/location_error/LocationError.vue";

const props = defineProps<{
  storePermission: PermissionStatus["state"];
}>();
const store = useGeoloc();
const promptGeoloc = async () => await store.updatePermission();
const { error, permission } = storeToRefs(store);
const { width, height } = useWindowSize();
const dynamicSrc = computed(() => {
  return width.value > 640
    ? "https://tgkqesqgdthatxyd.public.blob.vercel-storage.com/home_xl-Y0NbJmq6ClaQ0w84T05wtl6PgcCcln.webp"
    : "https://tgkqesqgdthatxyd.public.blob.vercel-storage.com/home-WoEWQRF1osyhleczdxHEnM4OOHoVm3.webp";
});
</script>

<template>
  <div
    class="h-[calc(100dvh)] max-h-[calc(100dvh)] flex flex-col w-[calc(100dvw)] items-center relative px-2 sm:px-10"
  >
    <img
      :src="dynamicSrc"
      alt="background image for home screen"
      class="ease-out duration-500 absolute top-0 left-0 h-[calc(100dvh)] max-h-[calc(100dvh)] w-auto object-cover object-center z-[-1]"
    />
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
      <button
        type="button"
        class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="promptGeoloc"
      >
        Accéder à ma position
        <MapPinIcon class="-mr-0.5 h-3 w-3" aria-hidden="true" />
      </button>
      <div class="p-2 w-auto rounded-xl bg-white shadow-xl mt-5">
        <p class="text-sm xs:text-base text-gray-600 text-center">
          Cette application web a besoin de votre position pour fonctionner.
          Merci d'accepter la géolocalisation pour continuer.
        </p>
      </div>
    </div>
    <LocationError v-if="error" :error="error" />
  </div>
</template>
