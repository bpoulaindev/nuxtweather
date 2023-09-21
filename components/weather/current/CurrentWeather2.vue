<script setup lang="ts">
import dayjs from "dayjs";
import locale from "dayjs/locale/fr";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { Ref } from "vue";
import { CurrentWeatherData, LocationData } from "~/utils/types/weather";
import { ComputedClasses } from "~/components/weather/Weather.vue";

const props = defineProps<{
  location: LocationData;
  current: CurrentWeatherData;
  computedClasses: ComputedClasses;
  seeForecast: boolean;
}>();
dayjs.extend(LocalizedFormat);
const emit = defineEmits<{
  (e: "toggleSeeForecast"): void;
}>();
const computedText = computed(() => {
  return props.seeForecast ? "Masquer les prévisions" : "Voir les prévisions";
});
</script>

<template>
  <div
    v-if="location && current && computedClasses"
    class="mt-4 sm:mt-10 flex flex-col w-full items-center pb-2"
  >
    <span
      class="text-3xl xs:text-4xl sm:text-6xl font-semibold font-literata"
      :class="computedClasses.text"
      >{{ location.name }}</span
    >
    <span
      class="text-lg xs:text-xl sm:text-3xl font-base capitalize font-literata mt-1/2"
      :class="computedClasses.text"
      >{{ dayjs().locale("fr").format("LLLL").split(`${dayjs().year()}`)?.[0] }}
    </span>
    <span
      class="flex items-start text-9xl xs:text-10xl font-semibold sm:font-light font-sentient pl-3 xs:pl-4"
      :class="computedClasses.text"
    >
      {{ current.temp_c }}
      <span class="text-7xl inline-flex mt-1">°</span>
    </span>
    <button
      type="button"
      class="relative rounded-lg px-2 py-1 text-sm xs:text-base font-semibold shadow-sm"
      :class="computedClasses.button"
      @click="emit('toggleSeeForecast')"
    >
      {{ computedText }}
      <span
        v-if="!seeForecast"
        class="absolute -top-0.5 -right-0.5 flex h-2 w-2"
      >
        <span
          class="animate-ping-slow absolute inline-flex h-full w-full rounded-full opacity-75"
          :class="computedClasses.ping?.bg"
        ></span>
        <span
          class="relative inline-flex rounded-full h-2 w-2"
          :class="computedClasses.ping?.ping"
        ></span>
      </span>
    </button>
  </div>
</template>
