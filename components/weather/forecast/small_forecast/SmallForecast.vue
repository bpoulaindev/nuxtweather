<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{
  isNow?: boolean;
  time: number;
  icon: string;
  temp: number;
}>();
const hour = dayjs.unix(props.time).hour();
</script>

<template>
  <div class="flex flex-col p-1 mr-1 items-center justify-center min-h-full">
    <span v-if="isNow" class="text-sm sm:text-base font-semibold">
      Maint.
    </span>
    <span v-if="!isNow" class="text-sm sm:text-base font-semibold">
      {{ hour < 10 ? `0${hour}` : hour }} h
    </span>
    <img
      :src="icon"
      alt="Weather icon"
      class="!min-h-[40px] !min-w-[40px] !max-h-[40px] !max-w-[40px] sm:h-8 sm:w-8"
    />
    <span class="text-base xs:text-lg font-medium mt-1/2">
      {{ Math.floor(temp) }}°
    </span>
  </div>
</template>
