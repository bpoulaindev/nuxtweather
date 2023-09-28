<template>
  <div class="flex items-center">
    <div
      class="flex items-center justify-center p-1 rounded-lg shadow-sm"
      :class="classes.iconBg"
    >
      <component
        :is="svgIcon"
        class="!w-2.5 !h-2.5 xs:!w-3 xs:!h-3 text-indigo-500 !mb-0 [&>*]:!mb-0"
      />
    </div>
    <span class="text-sm sm:text-xl font-medium ml-1" :class="classes?.text">
      {{ value }}
    </span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  classes: {
    text?: string;
    iconBg: string;
  };
  icon: string;
  value: string;
}>();
const svgIcon = defineAsyncComponent(() => {
  /* @vite-ignore */
  return import(
    /* @vite-ignore */
    props.icon
  );
});
</script>
