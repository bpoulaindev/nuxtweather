import { defineStore } from "pinia";
import { ForecastTodayData } from "utils/types/weather";
import dayjs from "dayjs";
import { useGeoloc } from "~/stores/geoloc";

interface LocalWeatherStore {
  weather: ForecastTodayData | null;
  timestamp: number;
}

export const useWeather = defineStore("weather", {
  state: () => ({
    weather: null as ForecastTodayData | null,
  }),
  actions: {
    async fetchWeather() {
      const { coords, hasValidCoords } = useGeoloc();
      const oldWeather = JSON.parse(localStorage.getItem("WEATHER") ?? "{}");
      if (
        oldWeather.weather &&
        oldWeather.timestamp > dayjs().subtract(15, "minutes").valueOf()
      ) {
        this.weather = oldWeather.weather;
        return;
      }
      try {
        const { data } = await useFetch("/api/weather", {
          method: "POST",
          params: {
            lat: coords?.latitude ?? "50",
            lon: coords?.longitude ?? "3,6",
            days: 10,
          },
          pick: ["forecast"],
        });
        this.weather = data?.value?.forecast as ForecastTodayData;
        localStorage.setItem(
          "WEATHER",
          JSON.stringify({
            weather: this.weather,
            timestamp: dayjs().valueOf(),
          } as LocalWeatherStore),
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
});