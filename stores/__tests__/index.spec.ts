import { afterAll, beforeEach, describe, expect, test, vi } from "vitest";
import { createPinia, setActivePinia, storeToRefs } from "pinia";
import { useGeoloc } from "stores/geoloc";

describe("Geoloc Store", () => {
  const mockedGeolocation = {
    getCurrentPosition: vi.fn((success, _error, _options) => {
      success({
        coords: {
          latitude: 50.63297,
          longitude: 3.05858,
          accuracy: 0,
        },
      });
    }),
    watchPosition: vi.fn(),
  };
  Object.defineProperty(global.navigator, "geolocation", {
    writable: true,
    value: mockedGeolocation,
  });
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  afterAll(() => {
    const geolocStore = useGeoloc();
    geolocStore.$reset();
    Object.defineProperty(global.navigator, "permissions", {
      writable: true,
      value: {
        query: vi
          .fn()
          .mockImplementation(() => Promise.resolve({ state: "granted" })),
      },
    });
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
    const { coords, error } = storeToRefs(geolocStore);
    await geolocStore.fetchGeoloc();
    console.log("error", coords.value, error.value);
    expect(error.value).not.toBeNull();
  });
});
