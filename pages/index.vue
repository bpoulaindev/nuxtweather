<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'
import { UseGeolocation} from "@vueuse/components";

const { coords, locatedAt, error, resume, pause } = useGeolocation()
// console.log('bah alors ?', { coords} , locatedAt, error, resume, pause)
</script>

<template>
  <UseGeolocation v-slot="{coords}">
      Latitude: {{ coords.latitude }}
      Longitude: {{ coords.longitude }}
  </UseGeolocation>
</template>

<style scoped>

</style>