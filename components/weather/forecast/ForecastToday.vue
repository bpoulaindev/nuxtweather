<script setup lang="ts">
import dayjs from "dayjs";
import { ComputedClasses } from "@utils/types/classes";
import { ForecastData, HourForecast } from "@utils/types/weather";
import SmallForecast from "@components/weather/forecast/small_forecast/SmallForecast.vue";

const props = defineProps<{
  forecast: ForecastData;
  computedClasses: ComputedClasses;
}>();
const now = dayjs();
const timestampForHour = now.set("minute", 0).set("second", 0);
const timestamp = timestampForHour.unix();
</script>

<template>
  <div
    class="w-full flex rounded-xl items-center p-1 xs:p-2 overflow-x-auto !overflow-y-visible max-h-[100px] xs:max-h-[120px] min-h-[100px] xs:min-h-[120px] h-full"
    :class="computedClasses.cards?.bg"
    data-cy="forecast-today"
  >
    <div
      v-for="day in forecast.forecastday.slice(0, 3)"
      :key="day.date_epoch"
      class="flex w-auto items-center h-full"
    >
      <SmallForecast
        v-for="hour in day.hour.filter(
          (data: HourForecast) => data.time_epoch >= timestamp,
        )"
        :key="hour.time_epoch"
        data-cy="small-forecast"
        :text-color="computedClasses.cards?.text"
        :is-now="hour.time_epoch === timestamp"
        :time="hour.time_epoch"
        :icon="hour.condition.icon"
        :temp="hour.temp_c"
      />
    </div>
  </div>
</template>
