import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { createPinia, setActivePinia, storeToRefs } from "pinia";
import { useGeoloc } from "stores/geoloc";
import { useWeather } from "stores/weather";
import { initTestEnvironment } from "stores/__tests__/init";

describe("Weather Store", () => {
  const { localStorageMock, mockedGeolocation } = initTestEnvironment();
  Object.defineProperty(global, "localStorage", { value: localStorageMock });
  Object.defineProperty(global.navigator, "geolocation", {
    writable: true,
    value: mockedGeolocation,
  });
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  afterEach(() => {
    global.localStorage.removeItem("GEOLOC");
    global.localStorage.removeItem("WEATHER");
    const geolocStore = useGeoloc();
    geolocStore.$reset();
  });
  test("fetchWeather should set weather", async () => {
    Object.defineProperty(global.navigator, "permissions", {
      writable: true,
      value: {
        query: vi
          .fn()
          .mockImplementation(() => Promise.resolve({ state: "granted" })),
      },
    });
    const weatherStore = useWeather();
    const { weather } = storeToRefs(weatherStore);
    await weatherStore.fetchWeather();
    expect(weather.value).not.toBeNull();
  });
});
