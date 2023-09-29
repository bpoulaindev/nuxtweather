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
      const { coords } = useGeoloc();
      console.log("please make it work", coords);
      if (!coords) {
        return;
      }
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
        console.log("weather has been retrieved", data?.value);
        this.weather = data?.value?.forecast as ForecastTodayData;
        localStorage.setItem(
          "WEATHER",
          JSON.stringify({
            weather: data?.value?.forecast,
            timestamp: dayjs().valueOf(),
          } as LocalWeatherStore),
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
});
