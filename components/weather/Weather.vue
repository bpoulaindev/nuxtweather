<script setup lang="ts">
import dayjs from "dayjs";
import { ref } from "vue";
import { useComputedClasses } from "utils/computedClasses";
import { storeToRefs } from "pinia";
import ForecastToday from "~/components/weather/forecast/ForecastToday.vue";
import Forecast10Days from "~/components/weather/forecast/Forecast10Days.vue";
import CurrentWeather2 from "~/components/weather/current/CurrentWeather2.vue";
import { useWeather } from "~/stores/weather";

const props = defineProps<{
  coords: {
    latitude: number;
    longitude: number;
  };
}>();
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
</script>
<template>
  <div
    v-if="weather && computedClasses"
    class="h-[calc(100dvh)] max-h-[calc(100dvh)] flex flex-col w-[calc(100dvw)] items-center relative px-2 sm:px-10 bg-cover bg-center bg-no-repeat"
    :class="computedClasses.background"
  >
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
