<template>
  <div>
    <h1>Weather Information</h1>
    <p v-if="loading">Loading...</p>
    <div v-else>
      <p v-if="error">{{ error }}</p>
      <p v-else>Location: {{ location.latitude }}, {{ location.longitude }}</p>
      <p>Weather Data: {{ weatherData }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const location = ref({});
    const weatherData = ref({});
    const error = ref(null);
    const loading = ref(true);

    onMounted(async () => {
      try {
        const response = await axios.get("/api/geolocation");
        location.value = response.data.location;

        const weatherResponse = await axios.get("/api/weather");
        weatherData.value = weatherResponse.data.weatherData;

        loading.value = false;
      } catch (err) {
        error.value = "Error fetching data";
        loading.value = false;
      }
    });

    return {
      location,
      weatherData,
      error,
      loading,
    };
  },
};
</script>
