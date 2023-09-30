import { vi } from "vitest";

export const initTestEnvironment = (forceError: boolean) => {
  const mockedGeolocation = {
    getCurrentPosition: vi.fn((success, _error, _options) => {
      if (forceError) {
        _error(new Error("Geolocation error"));
      } else {
        success({
          coords: {
            latitude: 50.63297,
            longitude: 3.05858,
            accuracy: 0,
          },
        });
      }
    }),
    watchPosition: vi.fn((success, _error, _options) => {
      if (forceError) {
        _error(new Error("Geolocation error"));
      } else {
        success({
          coords: {
            latitude: 50.63297,
            longitude: 3.05858,
            accuracy: 0,
          },
        });
      }
    }),
  };
  const localStorageMock = (function () {
    let store = {} as Record<string, string>;
    return {
      getItem: function (key: string) {
        return store[key];
      },
      setItem: function (key: string, value: string) {
        store[key] = value.toString();
      },
      clear: function () {
        store = {};
      },
      removeItem: function (key: string) {
        delete store[key];
      },
    };
  })();
  Object.defineProperty(global, "localStorage", {
    writable: true,
    value: localStorageMock,
  });
  Object.defineProperty(global.navigator, "geolocation", {
    writable: true,
    value: mockedGeolocation,
  });
  return { localStorageMock, mockedGeolocation };
};
