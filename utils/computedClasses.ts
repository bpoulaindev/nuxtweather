import { computed, ComputedRef } from "vue";
import dayjs from "dayjs";
import { ComputedClasses } from "~/components/weather/Weather.vue";

export const useComputedClasses = (
  currentTemp: number,
  currentTime: number,
  isRaining?: boolean,
) =>
  computed(() => {
    if (currentTime > 19 || currentTime < 8) {
      return {
        background: "!bg-[url('/assets/background/purple.png')]",
        text: "text-white",
        iconBg: "bg-white/60",
        button: "bg-purple-50 text-purple-600 hover:bg-purple-100",
        ping: {
          bg: "bg-purple-400",
          ping: "bg-purple-500",
        },
        cards: {
          bg: "bg-purple-50",
          text: "text-purple-600",
        },
      };
    } else if (currentTemp < 15 || isRaining) {
      return {
        background: "!bg-[url('/assets/background/mint.png')]",
        text: "text-teal-600",
        iconBg: "bg-teal-600/60",
        button: "bg-teal-50 text-teal-600 hover:bg-teal-100",
        ping: {
          bg: "bg-teal-300",
          ping: "bg-teal-400",
        },
        cards: {
          bg: "bg-teal-50",
          text: "text-teal-900",
        },
      };
    } else if (currentTemp >= 15) {
      return {
        background: "!bg-[url('/assets/background/orange.png')]",
        text: "text-orange-800",
        iconBg: "bg-white/50",
        button: "bg-orange-50 text-orange-600 hover:bg-orange-100",
        ping: {
          bg: "bg-orange-400",
          ping: "bg-orange-500",
        },
        cards: {
          bg: "bg-orange-50",
          text: "text-orange-800",
        },
      };
    } else {
      return {
        background: "!bg-[url('/assets/background/purple.png')]",
        text: "text-white",
        iconBg: "bg-white/60",
        button: "bg-purple-50 text-purple-600 hover:bg-purple-100",
        ping: {
          bg: "bg-purple-400",
          ping: "bg-purple-500",
        },
        cards: {
          bg: "bg-purple-50",
          text: "text-purple-600",
        },
      };
    }
  }) as ComputedRef<ComputedClasses>;
