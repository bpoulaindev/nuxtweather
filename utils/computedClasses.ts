import { computed, ComputedRef } from "vue";
import { ComputedClasses } from "utils/types/classes";
import { storeToRefs } from "pinia";
import { useTheme } from "~/stores/theme";

export const useComputedClasses = (
  currentTemp: number,
  currentTime: number,
  isRaining?: boolean,
) =>
  computed(() => {
    const store = useTheme();
    const { theme } = storeToRefs(store);
    const themedClasses = {
      purple: {
        background: "!bg-[url('/assets/background/purple.png')]",
        text: "text-purple-800",
        iconBg: "bg-white/60",
        button:
          "bg-purple-50 text-purple-600 hover:bg-purple-100 focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-purple-100",
        ring: "ring-purple-300",
        ping: {
          bg: "bg-purple-400",
          ping: "bg-purple-500",
        },
        cards: {
          bg: "bg-purple-50",
          text: "text-purple-800",
        },
        settings: {
          trigger: "focus:ring-purple-300",
          icon: "text-purple-800 group-hover:text-purple-700",
          arrow: "!fill-purple-50",
        },
      },
      mint: {
        background: "!bg-[url('/assets/background/mint.png')]",
        text: "text-teal-600",
        iconBg: "bg-teal-600/60",
        button:
          "bg-teal-50 text-teal-600 hover:bg-teal-100 focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-teal-50",
        ring: "ring-teal-300",
        ping: {
          bg: "bg-teal-300",
          ping: "bg-teal-400",
        },
        cards: {
          bg: "bg-teal-50",
          text: "text-teal-900",
        },
        settings: {
          trigger: "focus:ring-teal-300",
          icon: "text-teal-600 group-hover:text-teal-700",
          arrow: "!fill-teal-50",
        },
      },
      orange: {
        background: "!bg-[url('/assets/background/orange.png')]",
        text: "text-orange-800",
        iconBg: "bg-white/50",
        button:
          "bg-orange-50 text-orange-600 hover:bg-orange-100 focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-orange-50",
        ring: "ring-orange-300",
        ping: {
          bg: "bg-orange-400",
          ping: "bg-orange-500",
        },
        cards: {
          bg: "bg-orange-50",
          text: "text-orange-800",
        },
        settings: {
          trigger: "focus:ring-orange-300",
          icon: "text-orange-600 group-hover:text-orange-700",
          arrow: "!fill-orange-50",
        },
      },
    };
    if (theme.value !== "default") {
      return themedClasses[theme.value];
    } else if (currentTime > 19 || currentTime < 8) {
      return themedClasses.purple;
    } else if (currentTemp < 15 || isRaining) {
      return themedClasses.mint;
    } else if (currentTemp >= 15) {
      return themedClasses.orange;
    } else {
      return themedClasses.purple;
    }
  }) as ComputedRef<ComputedClasses>;
