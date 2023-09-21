<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{
  isNow?: boolean;
  time: number;
  icon: string;
  temp: number;
  textColor?: string;
}>();
const hour = dayjs.unix(props.time).hour();
</script>

<template>
  <div class="flex flex-col p-1 mr-1 items-center justify-center min-h-full">
    <span
      v-if="isNow"
      class="text-xs xs:text-sm sm:text-base font-bold xs:font-semibold"
      :class="textColor"
    >
      Maint.
    </span>
    <span
      v-if="!isNow"
      class="text-xs xs:text-sm sm:text-base font-semibold"
      :class="textColor"
    >
      {{ hour < 10 ? `0${hour}` : hour }} h
    </span>
    <img
      :src="icon"
      alt="Weather icon"
      class="mt-1/2 !min-h-[30px] !min-w-[30px] !max-h-[30px] !max-w-[30px] xs:!min-h-[40px] xs:!min-w-[40px] xs:!max-h-[40px] xs:!max-w-[40px] sm:h-8 sm:w-8"
    />
    <span class="text-base xs:text-lg font-semibold mt-1/2" :class="textColor">
      {{ Math.floor(temp) }}°
    </span>
  </div>
</template>
