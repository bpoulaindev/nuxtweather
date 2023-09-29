import { computed, ComputedRef } from "vue";
import { ComputedClasses } from "utils/types/classes";
import { storeToRefs } from "pinia";
import { useTheme } from "~/stores/theme";

const imageUrls = {
  ocean:
    "https://tgkqesqgdthatxyd.public.blob.vercel-storage.com/ocean-eipC2DUW1BSgxMcRBeUr7n9exaIHfP.webp",
  cherry:
    "https://tgkqesqgdthatxyd.public.blob.vercel-storage.com/cherry-arknCb1e3L7w7oh6rX7zo0Hc8pckdt.webp",
  lavender:
    "https://tgkqesqgdthatxyd.public.blob.vercel-storage.com/lavender-9OEWii8FFxztE571po0qkPyjE1cmbX.webp",
  apricot:
    "https://tgkqesqgdthatxyd.public.blob.vercel-storage.com/apricot-XKi587rMme0vxXhPW59hkuuIRYPlKr.webp",
  apricot_xl:
    "https://tgkqesqgdthatxyd.public.blob.vercel-storage.com/apricot_xl-npOKlquWurlNW7nzkyTePKDwiwmeLM.webp",
  cherry_xl:
    "https://tgkqesqgdthatxyd.public.blob.vercel-storage.com/cherry_xl-UWSV67lZd0bY41lR3kTq7ChD8yKR7z.webp",
  ocean_xl:
    "https://tgkqesqgdthatxyd.public.blob.vercel-storage.com/ocean_xl-CIWlODmVApzQugWcbttaQkbRVhNuEl.webp",
  mint_xl:
    "https://tgkqesqgdthatxyd.public.blob.vercel-storage.com/mint_xl-H09yo6KxuLDrY08cC5b3IscVZMjxYx.webp",
  home: "https://tgkqesqgdthatxyd.public.blob.vercel-storage.com/home-WoEWQRF1osyhleczdxHEnM4OOHoVm3.webp",
  mint: "https://tgkqesqgdthatxyd.public.blob.vercel-storage.com/mint-ipK9wTg4wxRxZHoILZQXGD6x4gKKDq.webp",
  home_xl:
    "https://tgkqesqgdthatxyd.public.blob.vercel-storage.com/home_xl-Y0NbJmq6ClaQ0w84T05wtl6PgcCcln.webp",
  lavender_xl:
    "https://tgkqesqgdthatxyd.public.blob.vercel-storage.com/lavender_xl-7M7Zs5iRkGczuXVLJmknOxNWVxKzu0.webp",
};

export const useComputedClasses = (
  currentTemp: number,
  currentTime: number,
  isRaining?: boolean,
) =>
  computed(() => {
    const store = useTheme();
    const { theme } = storeToRefs(store);
    const themedClasses = {
      ocean: {
        background: {
          mobile: imageUrls.ocean,
          desktop: imageUrls.ocean_xl,
        },
        text: "text-blue-800",
        iconBg: "bg-white/60",
        button:
          "bg-blue-50 text-blue-600 hover:bg-blue-100 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-blue-100",
        ring: "ring-blue-300",
        ping: {
          bg: "bg-blue-400",
          ping: "bg-blue-500",
        },
        cards: {
          bg: "bg-blue-50",
          text: "text-blue-800",
        },
        settings: {
          trigger: "focus:ring-blue-300",
          icon: "text-blue-600 group-hover:text-blue-700",
          arrow: "!fill-blue-50",
        },
      },
      cherry: {
        background: {
          mobile: imageUrls.cherry,
          desktop: imageUrls.cherry_xl,
        },
        text: "text-red-800",
        iconBg: "bg-white/60",
        button:
          "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-red-100",
        ring: "ring-red-300",
        ping: {
          bg: "bg-red-400",
          ping: "bg-red-500",
        },
        cards: {
          bg: "bg-red-50",
          text: "text-red-800",
        },
        settings: {
          trigger: "focus:ring-red-300",
          icon: "text-red-600 group-hover:text-red-700",
          arrow: "!fill-red-50",
        },
      },
      lavender: {
        background: {
          mobile: imageUrls.lavender,
          desktop: imageUrls.lavender_xl,
        },
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
        background: {
          mobile: imageUrls.mint,
          desktop: imageUrls.mint_xl,
        },
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
      apricot: {
        background: {
          mobile: imageUrls.apricot,
          desktop: imageUrls.apricot_xl,
        },
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
      return themedClasses.lavender;
    } else if (currentTemp < 15 || isRaining) {
      return themedClasses.mint;
    } else if (currentTemp >= 15) {
      return themedClasses.apricot;
    } else if (currentTemp >= 25) {
      return themedClasses.cherry;
    } else {
      return themedClasses.lavender;
    }
  }) as ComputedRef<ComputedClasses>;
