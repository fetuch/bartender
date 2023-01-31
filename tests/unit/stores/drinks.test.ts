import type { Mock } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { createDrink } from "../../utils/createDrink";

import { useDrinksStore } from "@/stores/drinks";
import { useUserStore } from "@/stores/user";

vi.mock("axios");

const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores drink listings", () => {
    const store = useDrinksStore();
    expect(store.drinks).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_DRINKS", () => {
    it("makes API request and stores received drinks", async () => {
      axiosGetMock.mockResolvedValue({ data: ["Drink 1", "Drink 2"] });
      const store = useDrinksStore();
      await store.FETCH_DRINKS();
      expect(store.drinks).toEqual(["Drink 1", "Drink 2"]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_GLASS_TYPES", () => {
    it("finds unique glass types from list of drinks", () => {
      const store = useDrinksStore();
      store.drinks = [
        createDrink({ glass: "Glass 1" }),
        createDrink({ glass: "Glass 2" }),
        createDrink({ glass: "Glass 1" }),
      ];

      const result = store.UNIQUE_GLASS_TYPES;

      expect(result).toEqual(new Set(["Glass 1", "Glass 2"]));
    });
  });

  describe("INCLUDE_DRINK_BY_CATEGORY", () => {
    describe("when the user has not selected any categories", () => {
      it("includes drink", () => {
        const userStore = useUserStore();
        userStore.selectedCategories = [];
        const store = useDrinksStore();
        const drink = createDrink({ category: "Shot" });

        const result = store.INCLUDE_DRINK_BY_CATEGORY(drink);

        expect(result).toBe(true);
      });
    });

    it("identifies if drink is associated with given category", () => {
      const userStore = useUserStore();
      userStore.selectedCategories = ["Shot", "Shake"];
      const store = useDrinksStore();
      const drink = createDrink({ category: "Shot" });

      const result = store.INCLUDE_DRINK_BY_CATEGORY(drink);

      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_DRINK_BY_GLASS_TYPE", () => {
    describe("when the user has not selected any glass type", () => {
      it("includes drink", () => {
        const userStore = useUserStore();
        userStore.selectedGlassTypes = [];
        const store = useDrinksStore();
        const drink = createDrink({ glass: "Glass" });

        const result = store.INCLUDE_DRINK_BY_GLASS_TYPE(drink);

        expect(result).toBe(true);
      });
    });

    it("identifies if drink is associated with given glass type", () => {
      const userStore = useUserStore();
      userStore.selectedGlassTypes = ["Glass 1", "Glass 2"];
      const store = useDrinksStore();
      const drink = createDrink({ glass: "Glass 2" });

      const result = store.INCLUDE_DRINK_BY_GLASS_TYPE(drink);

      expect(result).toBe(true);
    });
  });
});
