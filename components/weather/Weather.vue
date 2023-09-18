<script setup lang="ts">
import dayjs from "dayjs";
import { ref, watchEffect, computed, ComputedRef } from "vue";
import { ForecastTodayData } from "~/utils/types/weather";
import ForecastToday from "~/components/weather/forecast/ForecastToday.vue";
import CurrentWeather from "~/components/weather/current/CurrentWeather.vue";
import Forecast10Days from "~/components/weather/forecast/Forecast10Days.vue";
import { useForecastTodayWeather } from "~/utils/weatherHook";

const props = defineProps<{
  coords: {
    latitude: number;
    longitude: number;
  };
}>();

const forecastWeather = ref<ForecastTodayData | null>(null);

watchEffect(async () => {
  try {
    const test = await $fetch(`http://localhost:3000/api/weather_current`, {
      params: {
        lat: props.coords.latitude,
        lon: props.coords.longitude,
        days: 2,
      },
      method: "GET",
    });
    console.log("pitié pitié", test);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const computedClasses = computed(() => {
  const currentTemp = forecastWeather?.value?.current?.temp_c ?? 15;
  const currentTime = dayjs(
    forecastWeather?.value?.location?.localtime ?? new Date(),
  ).hour();
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
      iconBg: "bg-white/50",
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
      v-if="forecastWeather.current && forecastWeather.location"
      :current="forecastWeather.current"
      :location="forecastWeather.location"
      :computed-classes="computedClasses"
    />
    <ForecastToday
      v-if="forecastWeather.forecast"
      :forecast="forecastWeather.forecast"
      :computed-classes="computedClasses"
    />
    <Forecast10Days :coords="coords" :computed-classes="computedClasses" />
  </div>
</template>
