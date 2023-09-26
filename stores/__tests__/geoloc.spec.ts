import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { createPinia, setActivePinia, storeToRefs } from "pinia";
import { useGeoloc } from "stores/geoloc";
import { initTestEnvironment } from "stores/__tests__/init";

describe("Geoloc Store", () => {
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
    const geolocStore = useGeoloc();
    geolocStore.$reset();
  });
  test("fetchGeoloc should set coords", async () => {
    Object.defineProperty(global.navigator, "permissions", {
      writable: true,
      value: {
        query: vi
          .fn()
          .mockImplementation(() => Promise.resolve({ state: "granted" })),
      },
    });
    const geolocStore = useGeoloc();
    const { coords } = storeToRefs(geolocStore);
    await geolocStore.fetchGeoloc();
    expect(coords.value).not.toBeNull();
  });
  test("fetchGeoloc should set error", async () => {
    Object.defineProperty(global.navigator, "permissions", {
      writable: true,
      value: {
        query: vi
          .fn()
          .mockImplementation(() => Promise.resolve({ state: "denied" })),
      },
    });
    const geolocStore = useGeoloc();
    const { error } = storeToRefs(geolocStore);
    await geolocStore.fetchGeoloc();
    expect(error.value).not.toBeNull();
  });
});
