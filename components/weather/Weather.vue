<script setup lang="ts">
import dayjs from "dayjs";
import { computed, ComputedRef, ref, watchEffect } from "vue";
import { ForecastTodayData } from "~/utils/types/weather";
import ForecastToday from "~/components/weather/forecast/ForecastToday.vue";
import CurrentWeather from "~/components/weather/current/CurrentWeather.vue";
import Forecast10Days from "~/components/weather/forecast/Forecast10Days.vue";
import CurrentWeather2 from "~/components/weather/current/CurrentWeather2.vue";

export interface ComputedClasses {
  background: string;
  text: string;
  iconBg: string;
  button: string;
  ping?: {
    bg: string;
    ping: string;
  };
}

const props = defineProps<{
  coords: {
    latitude: number;
    longitude: number;
  };
}>();
const forecastWeather = ref<ForecastTodayData | null>(null);

watchEffect(async () => {
  try {
    const { data } = await useFetch("/api/weather", {
      method: "POST",
      params: {
        lat: props.coords.latitude,
        lon: props.coords.longitude,
        days: 2,
      },
      pick: ["forecast"],
    });
    forecastWeather.value = data?.value?.forecast as ForecastTodayData;
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
      background: "!bg-[url('/assets/background/purple.png')]",
      text: "text-white",
      iconBg: "bg-white/60",
      button: "bg-purple-50 text-purple-600 hover:bg-purple-100",
      ping: {
        bg: "bg-purple-400",
        ping: "bg-purple-500",
      },
    };
  } else if (currentTemp < 15) {
    return {
      background: "!bg-[url('/assets/background/mint.png')]",
      text: "text-teal-600",
      iconBg: "bg-teal-600/60",
      button: "bg-teal-50 text-teal-600 hover:bg-teal-100",
      ping: {
        bg: "bg-teal-300",
        ping: "bg-teal-400",
      },
    };
  } else if (currentTemp >= 15) {
    return {
      background: "!bg-[url('/assets/background/orange.png')]",
      text: "text-orange-800",
      iconBg: "bg-white/50",
      button: "bg-orange-50 text-orange-600 hover:bg-orange-100",
      ping: {
        bg: "bg-orange-400",
        ping: "bg-orange-500",
      },
    };
  } else {
    return {
      background: "!bg-[url('/assets/background/purple.png')]",
      text: "text-white",
      iconBg: "bg-white/60",
      button: "bg-purple-50 text-purple-600 hover:bg-purple-100",
      ping: {
        bg: "bg-purple-400",
        ping: "bg-purple-500",
      },
    };
  }
}) as ComputedRef<ComputedClasses>;
const seeForecast = ref(false);
const toggleSeeForecast = () => {
  seeForecast.value = !seeForecast.value;
};
</script>
<template>
  <div
    v-if="forecastWeather"
    class="min-h-[calc(100dvh)] flex flex-col w-full items-center relative px-2 sm:px-10 pb-10 bg-cover bg-center bg-no-repeat"
    :class="computedClasses.background"
  >
    <CurrentWeather2
      v-if="forecastWeather.current && forecastWeather.location"
      :current="forecastWeather.current"
      :location="forecastWeather.location"
      :computed-classes="computedClasses"
      :see-forecast="seeForecast"
      @toggle-see-forecast="toggleSeeForecast"
    />
    <Transition :duration="550" name="nested">
      <ForecastToday
        v-if="forecastWeather.forecast && seeForecast"
        :forecast="forecastWeather.forecast"
        :computed-classes="computedClasses"
      />
    </Transition>
    <Forecast10Days
      v-if="false"
      :coords="coords"
      :computed-classes="computedClasses"
    />
  </div>
</template>

<style>
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}

.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
