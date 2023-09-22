<script setup lang="ts">
import { ref, watchEffect } from "vue";
import dayjs from "dayjs";
import { CalendarDaysIcon } from "@heroicons/vue/20/solid";
import { ComputedClasses } from "utils/types/classes";
import { ForecastTodayData } from "~/utils/types/weather";
import DaysForecast from "~/components/weather/forecast/days_forecast/DaysForecast.vue";

const props = defineProps<{
  forecastWeather: ForecastTodayData["forecast"];
  computedClasses: ComputedClasses;
}>();

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
    class="w-full flex flex-col rounded-xl items-start mt-2 p-1 xs:p-2 h-auto"
    :class="computedClasses.cards?.bg"
  >
    <h3
      class="flex items-center xs:mt-0 pb-1 ml-1/2 text-sm xs:text-base xs:pb-1.5 font-medium xs:font-medium"
      :class="computedClasses.cards?.text"
    >
      <CalendarDaysIcon class="w-2 h-2 xs:h-3 xs:w-3 mr-1" />
      Prévisions sur 10 jours
    </h3>
    <DaysForecast
      v-for="(day, index) in forecastWeather?.forecastday"
      :key="day.date_epoch"
      :is-now="index === 0"
      :text-color="computedClasses.cards?.text"
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
