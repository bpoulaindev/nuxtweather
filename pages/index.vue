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
const { coords, error, permission } = storeToRefs(store);
onMounted(async () => {
  await store.initializeState();
  watch(permission, async (newPermission) => {
    console.log("triggering watch", permission.value, newPermission);
    if (newPermission === "granted") {
      await store.fetchGeoloc();
    }
  });
});
</script>

<template>
  <Suspense>
    <Suspense v-if="permission === 'granted'">
      <client-only>
        <Weather />
      </client-only>

      <template #fallback>
        <div
          class="flex w-[calc(100dvw)] h-calc(100dvh)] items-center justify-center bg-red-300"
        >
          <h3>Chargement...</h3>
        </div>
      </template>
    </Suspense>
    <Suspense v-else>
      <client-only>
        <NoLocation :store-permission="permission" />
      </client-only>

      <template #fallback>
        <div
          class="flex w-[calc(100dvw)] h-calc(100dvh)] items-center justify-center bg-red-300"
        >
          <h3>Chargement ENCORE...</h3>
        </div>
      </template>
    </Suspense>
  </Suspense>
</template>
