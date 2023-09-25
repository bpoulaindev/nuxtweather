<script setup lang="ts">
import { ref, computed, Ref } from "vue";
import { Theme } from "utils/types/theme";
import { storeToRefs } from "pinia";
import { ComputedClasses } from "~/utils/types/classes";
import { useTheme } from "~/stores/theme";

const props = defineProps<{
  computedClasses: ComputedClasses;
}>();

// const theme = ref<Theme>((localStorage.getItem("theme") as Theme) ?? "default");
const store = useTheme();
const { theme } = storeToRefs(store);

const tabs = computed(() => [
  {
    name: "Par défaut",
    id: "default",
    current: theme.value === "default",
    classes:
      theme.value === "default"
        ? `${props.computedClasses.button} ${props.computedClasses.ring}`
        : "bg-gray-50 text-gray-600 hover:bg-gray-100 !ring-0 !ring-offset-0 !focus:none !outline-0",
  },
  {
    name: "Abricot",
    id: "apricot",
    current: theme.value === "apricot",
    classes:
      "bg-orange-50 text-orange-600 hover:bg-orange-100 ring-orange-300 ring-offset-orange-50",
  },
  {
    name: "Menthe",
    id: "mint",
    current: theme.value === "mint",
    classes:
      "bg-teal-50 text-teal-600 hover:bg-teal-100 ring-teal-300 ring-offset-teal-50",
  },
  {
    name: "Lavande",
    id: "lavender",
    current: theme.value === "lavender",
    classes:
      "bg-purple-100 text-purple-800 hover:bg-purple-100 ring-purple-300 ring-offset-purple-50",
  },
  {
    name: "Cerise",
    id: "cherry",
    current: theme.value === "cherry",
    classes:
      "bg-red-100 text-red-800 hover:bg-red-100 ring-red-300 ring-offset-red-50",
  },
  {
    name: "Océan",
    id: "ocean",
    current: theme.value === "ocean",
    classes:
      "bg-blue-100 text-blue-800 hover:bg-blue-100 ring-blue-300 ring-offset-blue-50",
  },
]);
const changeTheme = (theme: Theme) => {
  store.setTheme(theme);
};
</script>

<template>
  <div>
    <nav class="flex flex-wrap" aria-label="Tabs">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        class="relative rounded-lg px-2 py-1 mb-2 mr-2 text-sm xs:text-base font-semibold shadow-sm whitespace-nowrap outline-0"
        :class="[tab.current && 'ring-2 ring-offset-2 active', tab.classes]"
        :aria-current="tab.current ? 'page' : undefined"
        :autofocus="tab.current"
        @click="changeTheme(tab.id as Theme)"
      >
        {{ tab.name }}
      </button>
    </nav>
  </div>
</template>
