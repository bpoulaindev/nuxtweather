<script setup lang="ts">
import dayjs from "dayjs";
import { ref, watchEffect, computed, ComputedRef } from "vue";
import { ForecastTodayData } from "utils/types/weather";
import { useForecastTodayWeather } from "~/utils/weatherHook";
import ForecastToday from "~/components/weather/forecast/ForecastToday.vue";
import CurrentWeather from "~/components/weather/current/CurrentWeather.vue";
import Forecast10Days from "~/components/weather/forecast/Forecast10Days.vue";

const props = defineProps<{
  coords: {
    latitude: number;
    longitude: number;
  };
}>();

const forecastWeather = ref<ForecastTodayData | null>(null);

watchEffect(async () => {
  try {
    forecastWeather.value = await useForecastTodayWeather(
      props.coords.latitude,
      props.coords.longitude,
      2,
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const computedClasses = computed(() => {
  const currentTemp = forecastWeather?.value?.current.temp_c ?? 15;
  const currentTime = dayjs(forecastWeather?.value?.location.localtime).hour();
  if (currentTime > 19 || currentTime < 8) {
    return {
      background: "bg-gradient-to-br from-indigo-800/40 to-indigo-800/80",
      text: "text-white",
      iconBg: "bg-white/60",
    };
  } else if (currentTemp < 15) {
    return {
      background: "bg-gradient-to-br from-indigo-100/40 to-indigo-300/80",
      text: "text-indigo-800",
      iconBg: "bg-indigo-800/60",
    };
  } else if (currentTemp >= 15) {
    return {
      background: "bg-gradient-to-br from-orange-100/40 to-orange-300/80",
      text: "text-orange-800",
      iconBg: "bg-white/90",
    };
  } else {
    return {
      background: "bg-gradient-to-br from-indigo-800/40 to-indigo-800/80",
      text: "text-white",
      iconBg: "bg-white/60",
    };
  }
}) as ComputedRef<{
  background: string;
  text: string;
  iconBg: string;
}>;
</script>
<template>
  <div
    v-if="forecastWeather"
    class="min-h-[calc(100dvh)] flex flex-col w-full items-center px-2 sm:px-10 pb-10"
    :class="computedClasses.background"
  >
    <CurrentWeather
      :current="forecastWeather.current"
      :location="forecastWeather.location"
      :computed-classes="computedClasses"
    />
    <ForecastToday
      :forecast="forecastWeather.forecast"
      :computed-classes="computedClasses"
    />
    <Forecast10Days :coords="coords" :computed-classes="computedClasses" />
  </div>
</template>
