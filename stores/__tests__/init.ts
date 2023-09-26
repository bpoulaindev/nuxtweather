import { vi } from "vitest";

export const initTestEnvironment = () => {
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
  const localStorageMock = (function () {
    let store = {};
    return {
      getItem: function (key) {
        return store[key];
      },
      setItem: function (key, value) {
        store[key] = value.toString();
      },
      clear: function () {
        store = {};
      },
      removeItem: function (key) {
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
