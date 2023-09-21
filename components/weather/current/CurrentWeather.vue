<script setup lang="ts">
import RainSVG from "assets/icons/rain.svg";
import WaterSVG from "assets/icons/water.svg";
import WindSVG from "assets/icons/wind.svg";
import { CurrentWeatherData, LocationData } from "~/utils/types/weather";
import SmallCurrent from "~/components/weather/current/small_current/SmallCurrent.vue";

const props = defineProps<{
  location: LocationData;
  current: CurrentWeatherData;
  computedClasses: {
    background: string;
    text: string;
    iconBg: string;
  };
}>();
const weatherStats = [
  {
    icon: "../../../../assets/icons/wind.svg",
    value: `${props.current.wind_kph} km/h`,
  },
  {
    icon: "../../../../assets/icons/water.svg",
    value: `${props.current.humidity} %`,
  },
  {
    icon: "../../../../assets/icons/rain.svg",
    value: `${props.current.precip_mm} mm`,
  },
];
</script>

<template>
  <div
    v-if="location && current && computedClasses"
    class="mt-4 sm:mt-10 flex flex-col w-full items-center"
  >
    <span class="text-2xl sm:text-3xl" :class="computedClasses.text"
      >{{ location.name }},</span
    >
    <span class="text-xl sm:text-2xl" :class="computedClasses.text">{{
      location.country
    }}</span>

    <span
      class="text-7xl sm:text-8xl font-normal sm:font-light mt-1"
      :class="computedClasses.text"
    >
      {{ current.temp_c }}°
    </span>
    <div class="flex items-center mt-1 justify-between">
      <p
        class="flex items-center text-sm xs:text-base sm:text-2xl font-light pr-2"
        :class="computedClasses.text"
      >
        <img
          :src="current.condition.icon"
          :alt="current.condition.text"
          class="w-4 h-4 sm:h-8 sm:w-8 mr-1 inline-flex"
        />
        {{ current.condition.text }}
      </p>
      <span
        v-if="current.feelslike_c !== current.temp_c"
        class="px-1 py-0.5 text-sm xs:text-base sm:text-xl font-light rounded-lg font-semibold sm:font-medium border-2 whitespace-nowrap"
        :class="[
          current.feelslike_c >= current.temp_c
            ? 'bg-red-50/70 text-red-800 border-red-200'
            : 'bg-indigo-50/70 text-indigo-800 border-indigo-200',
        ]"
      >
        Ressenti {{ current.feelslike_c }}°C
      </span>
    </div>
    <div
      class="p-2 w-full flex bg-white/60 rounded-xl mt-1 items-center justify-between sm:justify-around"
    >
      <SmallCurrent
        v-for="item in weatherStats"
        :key="item.icon"
        :classes="{
          text: '',
          iconBg: computedClasses.iconBg,
        }"
        :icon="item.icon"
        :value="item.value"
      />
    </div>
  </div>
</template>

<style scoped></style>
