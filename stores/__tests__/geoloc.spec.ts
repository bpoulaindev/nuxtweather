import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { createPinia, setActivePinia, storeToRefs } from "pinia";
import { useGeoloc } from "@stores/geoloc";
import { initTestEnvironment } from "@stores/__tests__/init";

describe("Geoloc Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  afterEach(() => {
    global.localStorage.removeItem("GEOLOC");
    const geolocStore = useGeoloc();
    geolocStore.$reset();
  });
  test("fetchGeoloc should set coords", async () => {
    const { localStorageMock, mockedGeolocation } = initTestEnvironment(false);
    Object.defineProperty(global, "localStorage", { value: localStorageMock });
    Object.defineProperty(global.navigator, "geolocation", {
      writable: true,
      value: mockedGeolocation,
    });
    const geolocStore = useGeoloc();
    const { coords } = storeToRefs(geolocStore);
    await geolocStore.fetchGeoloc();
    expect(coords.value).not.toBeNull();
  });
  test("fetchGeoloc should set error", async () => {
    const { localStorageMock, mockedGeolocation } = initTestEnvironment(true);
    Object.defineProperty(global, "localStorage", { value: localStorageMock });
    Object.defineProperty(global.navigator, "geolocation", {
      writable: true,
      value: mockedGeolocation,
    });
    const geolocStore = useGeoloc();
    const { error } = storeToRefs(geolocStore);
    await geolocStore.fetchGeoloc();
    expect(error.value).not.toBeNull();
  });
});
