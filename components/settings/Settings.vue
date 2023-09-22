<script setup lang="ts">
import {
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "radix-vue";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/vue/20/solid";
import { ComputedClasses } from "~/utils/types/classes";
import ThemesSwitcher from "~/components/settings/themes_switcher/ThemesSwitcher.vue";

const props = defineProps<{
  computedClasses: ComputedClasses;
}>();
</script>

<template>
  <PopoverRoot class="w-auto">
    <PopoverTrigger
      class="rounded-full group absolute cursor-pointer top-1 right-1 w-[35px] h-[35px] inline-flex items-center justify-center focus:ring-2 outline-none"
      aria-label="Update dimensions"
      :class="computedClasses.settings.trigger"
    >
      <Cog6ToothIcon
        class="w-4 h-4 rounded-full"
        :class="computedClasses.settings.icon"
      />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        side="bottom"
        :side-offset="5"
        :class="computedClasses.cards.bg"
        class="rounded-xl p-3 w-[calc(90dvw)] over500:w-[490px] mr-1 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
      >
        <div class="flex flex-col gap-2.5">
          <h3 class="text-lg font-semibold" :class="computedClasses.text">
            Préférences
          </h3>
          <ThemesSwitcher :computed-classes="computedClasses" />
        </div>
        <PopoverClose
          class="rounded-full inline-flex items-center justify-center absolute top-1 right-1 outline-none cursor-pointer"
          aria-label="Close"
          :class="computedClasses.button"
        >
          <XMarkIcon class="h-3 w-3" :class="computedClasses.settings.icon" />
        </PopoverClose>
        <PopoverArrow class="!-mr-2" :class="computedClasses.settings.arrow" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
