<script setup lang="ts">
import { ref, watchEffect } from "vue";
import dayjs from "dayjs";
import { CalendarDaysIcon } from "@heroicons/vue/20/solid";
import { ForecastTodayData } from "~/utils/types/weather";
import DaysForecast from "~/components/weather/forecast/days_forecast/DaysForecast.vue";
import { ComputedClasses } from "~/components/weather/Weather.vue";

const props = defineProps<{
  coords: {
    latitude: number;
    longitude: number;
  };
  computedClasses: ComputedClasses;
}>();

const forecastWeather = ref<ForecastTodayData | null>(null);

watchEffect(async () => {
  try {
    const { data } = await useFetch("/api/weather", {
      method: "POST",
      params: {
        lat: props.coords.latitude,
        lon: props.coords.longitude,
        days: 10,
      },
      pick: ["forecast"],
    });
    forecastWeather.value = data?.value?.forecast as ForecastTodayData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
const enToFrDays = {
  Mon: "Lun",
  Tue: "Mar",
  Wed: "Mer",
  Thu: "Jeu",
  Fri: "Ven",
  Sat: "Sam",
  Sun: "Dim",
};
const today = dayjs().day();
</script>

<template>
  <div
    v-if="coords && forecastWeather"
    class="w-full flex flex-col rounded-xl bg-white/80 items-start mt-2 p-2 h-auto"
  >
    <h3 class="flex items-center pb-1">
      <CalendarDaysIcon class="w-2 h-2 mr-1" />
      Prévisions sur 10 jours
    </h3>
    <DaysForecast
      v-for="day in forecastWeather?.forecast?.forecastday"
      :key="day.date_epoch"
      :is-now="dayjs(day.date).day() === today"
      :day="
        enToFrDays[dayjs(day.date).format('ddd') as keyof typeof enToFrDays]
      "
      :icon="day.day.condition.icon"
      :temps="{
        min: day.day.mintemp_c,
        max: day.day.maxtemp_c,
        avg: day.day.avgtemp_c,
      }"
    />
  </div>
</template>

<style scoped></style>
