import { test, describe, beforeEach } from "vitest";
import { expect } from "chai";
import { useComputedClasses } from "@utils/computedClasses";
import { createPinia, setActivePinia } from "pinia";
import { useTheme } from "@stores/theme";
import { Theme } from "@utils/types/theme";
import { initTestEnvironment } from "@stores/__tests__/init";

describe("useComputedClasses", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  test("returns themed classes for default theme", () => {
    const { localStorageMock } = initTestEnvironment(false);
    const pinia = createPinia();

    Object.defineProperty(global, "localStorage", { value: localStorageMock });
    const currentTemp = 52;
    const currentTime = 12;
    const isRaining = false;
    const theme = "default";
    const store = useTheme();
    store.setTheme(theme);

    const computedClasses = useComputedClasses(
      currentTemp,
      currentTime,
      isRaining,
    );

    expect(computedClasses.value.text).equal("text-red-800");
  });

  test("returns themed classes for lavender theme", () => {
    const currentTemp = 10;
    const currentTime = 22;
    const isRaining = false;
    const theme = "lavender" as Theme;
    const store = useTheme();
    store.setTheme(theme);

    const computedClasses = useComputedClasses(
      currentTemp,
      currentTime,
      isRaining,
    );

    expect(computedClasses.value.text).equal("text-purple-800");
  });
});
