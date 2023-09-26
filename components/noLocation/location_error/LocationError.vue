<script setup lang="ts">
import { XCircleIcon } from "@heroicons/vue/20/solid";

const props = defineProps<{
  error: {
    code: number;
    message: string;
  };
}>();
</script>

<template>
  <div class="w-full flex flex-col mt-4">
    <div class="rounded-md bg-red-50 p-2">
      <div class="flex flex-col">
        <div class="flex items-center justify-center">
          <XCircleIcon class="h-3 w-3 mr-1 text-red-400" aria-hidden="true" />
          <h3 class="text-sm font-medium text-red-800">
            Accès à la géolocalisation refusé
          </h3>
        </div>
        <span class="mt-2 text-sm text-red-700 text-center">
          Vous avez refusé l'accès à la géolocalisation. Merci de l'accepter
          pour continuer.
        </span>
      </div>
    </div>
  </div>
</template>
