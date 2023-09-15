import { ForecastTodayData, WeatherData } from "~/utils/types/weather";

export const useCurrentWeather = async (
  latitude: number,
  longitude: number,
) => {
  const runtimeConfig = useRuntimeConfig();
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Accept-Encoding": "gzip",
      "content-type": "application/json",
    },
  };
  const url = `https://api.weatherapi.com/v1/current.json?key=${
    runtimeConfig.public.WEATHER_API_KEY ?? ""
  }&q=${latitude},${longitude}&aqi=no&lang=fr`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()) as WeatherData;
};

export const useForecastTodayWeather = async (
  latitude: number,
  longitude: number,
  days?: number,
) => {
  const runtimeConfig = useRuntimeConfig();
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Accept-Encoding": "gzip",
      "content-type": "application/json",
    },
  };
  // https://api.weatherapi.com/v1/forecast.json?key=f2c03022868b4d90ad7160433231309&q=Lille&days=1&aqi=no&alerts=no
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${
    runtimeConfig.public.WEATHER_API_KEY ?? ""
  }&q=${latitude},${longitude}&days=${days ?? 1}&aqi=no&alerts=no&lang=fr`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()) as ForecastTodayData;
};
