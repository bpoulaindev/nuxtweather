<script setup lang="ts">
import dayjs from "dayjs";
import { ForecastData, HourForecast } from "~/utils/types/weather";
import SmallForecast from "~/components/weather/forecast/small_forecast/SmallForecast.vue";

const props = defineProps<{
  forecast: ForecastData;
  computedClasses: {
    background: string;
    text: string;
    iconBg: string;
  };
}>();
console.log("pitié", props.forecast);
const now = dayjs();
const timestampForHour = now.set("minute", 0).set("second", 0);
const timestamp = timestampForHour.unix();
</script>

<template>
  <div
    v-if="forecast"
    class="w-full flex rounded-xl bg-white/30 items-center mt-2 p-2 overflow-x-auto overflow-hidden"
  >
    <div
      v-for="day in forecast.forecastday"
      :key="day.date_epoch"
      class="flex w-auto items-center"
    >
      <SmallForecast
        v-for="hour in day.hour.filter(
          (data: HourForecast) => data.time_epoch >= timestamp,
        )"
        :key="hour.time_epoch"
        :is-now="hour.time_epoch === timestamp"
        :time="hour.time_epoch"
        :icon="hour.condition.icon"
        :temp="hour.temp_c"
      />
    </div>
  </div>
</template>

<style scoped></style>
