<script setup lang="ts">
import RainSVG from "assets/icons/rain.svg";
import WaterSVG from "assets/icons/water.svg";
import WindSVG from "assets/icons/wind.svg";
import { CurrentWeatherData, LocationData } from "utils/types/weather";

const props = defineProps<{
  location: LocationData;
  current: CurrentWeatherData;
  computedClasses: {
    background: string;
    text: string;
    iconBg: string;
  };
}>();
</script>

<template>
  <div class="mt-4 sm:mt-10 flex flex-col w-full items-center">
    <span class="text-2xl sm:text-3xl" :class="computedClasses.text"
      >{{ location.name }},</span
    >
    <span class="text-xl sm:text-2xl" :class="computedClasses.text">{{
      location.country
    }}</span>

    <span
      class="text-6xl sm:text-8xl font-normal sm:font-light mt-2"
      :class="computedClasses.text"
    >
      {{ current.temp_c }}°
    </span>
    <div class="flex items-center mt-1/2">
      <img
        :src="current.condition.icon"
        :alt="current.condition.text"
        class="w-4 h-4 sm:h-8 sm:w-8 mr-1"
      />
      <span
        class="text-xl sm:text-2xl font-light pr-2"
        :class="computedClasses.text"
      >
        {{ current.condition.text }}
      </span>
    </div>
    <span
      class="px-2 py-1 text-base sm:text-xl font-light mt-1 rounded-lg font-semibold sm:font-medium border-2"
      :class="[
        current.feelslike_c >= current.temp_c
          ? 'bg-red-50/70 text-red-800 border-red-200'
          : 'bg-indigo-50/70 text-indigo-800 border-indigo-200',
      ]"
    >
      Ressenti {{ current.feelslike_c }}°C
    </span>
    <div
      class="p-2 w-full flex bg-white/40 rounded-xl mt-1 items-center justify-between sm:justify-around"
    >
      <div class="flex items-center">
        <div
          class="flex items-center justify-center p-1 rounded-lg shadow-sm"
          :class="computedClasses.iconBg"
        >
          <WindSVG class="!w-3 !h-3 text-indigo-500 !mb-0 [&>*]:!mb-0" />
        </div>
        <span class="text-sm sm:text-xl font-medium ml-1">
          {{ current.wind_kph }} km/h
        </span>
      </div>
      <div class="flex items-center">
        <div
          class="flex items-center justify-center p-1 rounded-lg shadow-sm"
          :class="computedClasses.iconBg"
        >
          <WaterSVG class="!w-3 !h-3 text-indigo-500 !mb-0 [&>*]:!mb-0" />
        </div>
        <span class="text-sm sm:text-xl font-medium ml-1">
          {{ current.humidity }}%
        </span>
      </div>
      <div class="flex items-center">
        <div
          class="flex items-center justify-center p-1 rounded-lg shadow-sm"
          :class="computedClasses.iconBg"
        >
          <RainSVG class="!w-3 !h-3 text-indigo-500 !mb-0 [&>*]:!mb-0" />
        </div>
        <span class="text-sm sm:text-xl font-medium ml-1">
          {{ current.precip_mm }}mm
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
