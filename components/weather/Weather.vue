<script async setup lang="ts">
import dayjs from "dayjs";
import { ref } from "vue";
import { useComputedClasses } from "utils/computedClasses";
import { storeToRefs } from "pinia";
import { useGeoloc } from "stores/geoloc";
import { useWindowSize } from "@vueuse/core";
import ForecastToday from "~/components/weather/forecast/ForecastToday.vue";
import Forecast10Days from "~/components/weather/forecast/Forecast10Days.vue";
import CurrentWeather2 from "~/components/weather/current/CurrentWeather2.vue";
import { useWeather } from "~/stores/weather";

const geolocStore = useGeoloc();
await geolocStore.fetchGeoloc();
const store = useWeather();
await store.fetchWeather();
const { weather } = storeToRefs(store);
const currentTemp = weather?.value?.current?.temp_c ?? 15;
const currentTime = dayjs(
  weather?.value?.location?.localtime ?? new Date(),
).hour();
const computedClasses = useComputedClasses(
  currentTemp,
  currentTime,
  (weather?.value?.current?.precip_mm ?? 0) > 0.2,
);
const seeForecast = ref(false);
const toggleSeeForecast = () => {
  seeForecast.value = !seeForecast.value;
};
const { width, height } = useWindowSize();
</script>

<template>
  <div
    v-if="weather && computedClasses"
    data-cy="weather-component"
    class="data-test=weather-current h-[calc(100dvh)] max-h-[calc(100dvh)] flex flex-col w-[calc(100dvw)] items-center relative px-2 sm:px-10 bg-cover bg-center bg-no-repeat"
    :class="computedClasses.background"
  >
    <NuxtImg
      class="absolute top-0 left-0 w-full h-full h-[calc(100dvh)] max-h-[calc(100dvh)] w-auto object-cover object-center z-[-1]"
      :src="
        width > 640
          ? computedClasses.background.desktop
          : computedClasses.background.mobile
      "
      gravity="center"
      :height="height"
      :alt="`background image for ${weather.location.name}`"
      provider="cloudinary"
      fit="crop"
    />
    <Settings :computed-classes="computedClasses" />
    <CurrentWeather2
      v-if="weather.current && weather.location"
      :current="weather.current"
      :location="weather.location"
      :computed-classes="computedClasses"
      :see-forecast="seeForecast"
      @toggle-see-forecast="toggleSeeForecast"
    />
    <div
      v-if="weather.forecast"
      :class="{ flex: seeForecast }"
      class="flex w-full overflow-x-scroll overscroll-contain flex-col h-full mb-2 rounded-xl"
    >
      <Transition
        :duration="{
          enter: 300,
          leave: 3000,
        }"
        name="card1"
      >
        <ForecastToday
          v-if="seeForecast"
          :forecast="weather.forecast"
          :computed-classes="computedClasses"
        />
      </Transition>
      <Transition
        :duration="{
          enter: 300,
          leave: 3000,
        }"
        name="card2"
      >
        <Forecast10Days
          v-if="seeForecast"
          :forecast-weather="weather.forecast"
          :computed-classes="computedClasses"
        />
      </Transition>
    </div>
  </div>
</template>

<style>
.card1-enter-active,
.card2-enter-active {
  transition: all 0.3s ease-in-out;
}

.card1-leave-active {
  transition: all 0.3s ease-in-out;
  transition-delay: 0.2s;
}

.card2-leave-active {
  transition: all 0.3s ease-in-out;
  transition-delay: 0.1s;
}

.card1-enter-from,
.card1-leave-to,
.card2-enter-from,
.card2-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
