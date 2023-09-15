<script setup lang="ts">
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/vue/20/solid";

const props = defineProps<{
  isNow?: boolean;
  day: string;
  icon: string;
  temps: {
    min: number;
    max: number;
    avg: number;
  };
}>();
</script>

<template>
  <div
    class="flex p-1 items-center w-full justify-between border-t-[1px] border-gray-300/30"
  >
    <span v-if="isNow" class="text-sm sm:text-base"> Auj. </span>
    <span v-if="!isNow" class="text-sm sm:text-base"> {{ day }}. </span>
    <img
      :src="icon"
      alt="Weather icon"
      class="!min-h-[40px] !min-w-[40px] !max-h-[40px] !max-w-[40px] sm:h-8 sm:w-8"
    />
    <div class="flex items-center justify-end">
      <span
        class="flex items-center text-base sm:text-base font-medium w-7 mr-2 sm:mr-2 text-indigo-500 justify-start"
      >
        <ArrowDownIcon class="w-2 h-2 sm:h-6 sm:w-6 mr-1" />
        {{ Math.floor(temps.min) }}°
      </span>
      <span
        class="flex items-center text-base sm:text-base font-medium w-7 text-red-500 justify-start"
      >
        <ArrowUpIcon class="w-2 h-2 sm:h-6 sm:w-6 mr-1" />
        {{ Math.floor(temps.max) }}°
      </span>
    </div>
  </div>
</template>
