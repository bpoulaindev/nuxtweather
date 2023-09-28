// @vitest-environment nuxt
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { createPinia, setActivePinia, storeToRefs } from "pinia";
import { useGeoloc } from "stores/geoloc";
import { useWeather } from "stores/weather";
import { initTestEnvironment } from "stores/__tests__/init";
import { mockNuxtImport } from "nuxt-vitest/utils";
import dayjs from "dayjs";
import { createTestingPinia } from "@pinia/testing";

/* mockNuxtImport("useFetch", () => {
  return () => ({
    pending: false,
    error: undefined,
    myData: {
      forecast: "coucou",
    },
  });
}); */

describe("Weather Store", () => {
  const { localStorageMock, mockedGeolocation } = initTestEnvironment();
  Object.defineProperty(global, "localStorage", { value: localStorageMock });
  Object.defineProperty(global.navigator, "geolocation", {
    writable: true,
    value: mockedGeolocation,
  });
  beforeEach(() => {
    setActivePinia(createPinia());
    /* Object.defineProperty(global.navigator, "permissions", {
          writable: true,
          value: {
            query: vi
              .fn()
              .mockImplementation(() => Promise.resolve({ state: "granted" })),
          },
        }); */
    /* global.localStorage.setItem(
          "GEOLOC",
          JSON.stringify({
            coords: { latitude: 50, longitude: 3 },
            timestamp: dayjs().valueOf(),
          }),
        ); */
    const pinia = createTestingPinia();
    const geolocStore = useGeoloc(pinia);
    geolocStore.coords = {
      latitude: 50,
      longitude: 3,
    };
    /* mockNuxtImport("useFetch", () => {
                                                                          return () => {
                                                                            return { value: "mocked storage" };
                                                                          };
                                                                        }); */
  });
  afterEach(() => {
    global.localStorage.removeItem("GEOLOC");
    global.localStorage.removeItem("WEATHER");
    const geolocStore = useGeoloc();
    geolocStore.$reset();
  });
  test("fetchWeather should set weather", async () => {
    const weatherStore = useWeather();
    const { weather } = storeToRefs(weatherStore);
    await weatherStore.fetchWeather();
    expect(weather.value).not.toBeNull();
  });
});
