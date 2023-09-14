// customHooks.js
import { ref, onMounted } from "vue";

export function useWeatherData(
  initialLatitude: number,
  initialLongitude: number,
) {
  const locationData = ref({
    latitude: initialLatitude || null,
    longitude: initialLongitude || null,
  });

  const fetchData = async (latitude: number, longitude: number) => {
    try {
      // Construct the API URL with provided or current coordinates
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=f2c03022868b4d90ad7160433231309&q=${latitude},${longitude}&aqi=no`;
      // Simulate fetching data from the weather API
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Update locationData with the fetched data
      locationData.value.latitude = data.latitude;
      locationData.value.longitude = data.longitude;
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors here, e.g., set locationData to null or display an error message
    }
  };

  onMounted(() => {
    // Call fetchData with initial coordinates when the component is mounted
    fetchData(initialLatitude, initialLongitude);
  });

  return {
    locationData,
    fetchData,
  };
}
