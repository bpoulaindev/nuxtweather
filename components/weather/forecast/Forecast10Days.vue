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
    class="w-full flex flex-col rounded-xl items-start mt-2 p-2 h-auto"
    :class="computedClasses.cards?.bg"
  >
    <h3
      class="flex items-center -mt-1/2 xs:mt-0 pb-1 text-sm xs:text-base xs:pb-1.5 font-medium xs:font-normal"
      :class="computedClasses.cards?.text"
    >
      <CalendarDaysIcon class="w-2 h-2 xs:h-3 xs:w-3 mr-1" />
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
