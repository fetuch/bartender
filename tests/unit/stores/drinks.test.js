import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useDrinksStore } from "@/stores/drinks";
import { useUserStore } from "@/stores/user";

vi.mock("axios");

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
      axios.get.mockResolvedValue({ data: ["Drink 1", "Drink 2"] });
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

  describe("UNIQUE_CATEGORIES", () => {
    it("finds unique categories from list of drinks", () => {
      const store = useDrinksStore();
      store.drinks = [
        { category: "Shot" },
        { category: "Shake" },
        { category: "Shot" },
      ];

      const result = store.UNIQUE_CATEGORIES;

      expect(result).toEqual(new Set(["Shot", "Shake"]));
    });
  });

  describe("UNIQUE_GLASS_TYPES", () => {
    it("finds unique glass types from list of drinks", () => {
      const store = useDrinksStore();
      store.drinks = [
        { glass: "Glass 1" },
        { glass: "Glass 2" },
        { glass: "Glass 1" },
      ];

      const result = store.UNIQUE_GLASS_TYPES;

      expect(result).toEqual(new Set(["Glass 1", "Glass 2"]));
    });
  });

  describe("FILTERED_DRINKS_BY_CATEGORIES", () => {
    it("identifies drinks that are associated with the given categories", () => {
      const drinksStore = useDrinksStore();
      drinksStore.drinks = [
        { category: "Shot" },
        { category: "Shake" },
        { category: "Beer" },
      ];
      const userStore = useUserStore();
      userStore.selectedCategories = ["Shot", "Beer"];

      const result = drinksStore.FILTERED_DRINKS_BY_CATEGORIES;

      expect(result).toEqual([{ category: "Shot" }, { category: "Beer" }]);
    });

    describe("when the user has not selected any categories", () => {
      it("returns all drinks", () => {
        const drinksStore = useDrinksStore();
        drinksStore.drinks = [
          { category: "Shot" },
          { category: "Shake" },
          { category: "Beer" },
        ];
        const userStore = useUserStore();
        userStore.selectedCategories = [];

        const result = drinksStore.FILTERED_DRINKS_BY_CATEGORIES;

        expect(result).toEqual([
          { category: "Shot" },
          { category: "Shake" },
          { category: "Beer" },
        ]);
      });
    });
  });

  describe("FILTERED_DRINKS_BY_GLASS_TYPES", () => {
    it("identifies drinks that are associated with the given glass type", () => {
      const drinksStore = useDrinksStore();
      drinksStore.drinks = [
        { glass: "Glass 1" },
        { glass: "Glass 2" },
        { glass: "Glass 3" },
      ];
      const userStore = useUserStore();
      userStore.selectedGlassTypes = ["Glass 1", "Glass 3"];

      const result = drinksStore.FILTERED_DRINKS_BY_GLASS_TYPES;

      expect(result).toEqual([{ glass: "Glass 1" }, { glass: "Glass 3" }]);
    });

    describe("when the user has not selected any glass type", () => {
      it("returns all drinks", () => {
        const drinksStore = useDrinksStore();
        drinksStore.drinks = [
          { glass: "Glass 1" },
          { glass: "Glass 2" },
          { glass: "Glass 3" },
        ];
        const userStore = useUserStore();
        userStore.selectedGlassTypes = [];

        const result = drinksStore.FILTERED_DRINKS_BY_GLASS_TYPES;

        expect(result).toEqual([
          { glass: "Glass 1" },
          { glass: "Glass 2" },
          { glass: "Glass 3" },
        ]);
      });
    });
  });

  describe("INCLUDE_DRINK_BY_CATEGORY", () => {
    describe("when the user has not selected any categories", () => {
      it("includes drink", () => {
        const userStore = useUserStore();
        userStore.selectedCategories = [];
        const store = useDrinksStore();
        const drink = { category: "Shot" };

        const result = store.INCLUDE_DRINK_BY_CATEGORY(drink);

        expect(result).toBe(true);
      });
    });

    it("identifies if drink is associated with given category", () => {
      const userStore = useUserStore();
      userStore.selectedCategories = ["Shot", "Shake"];
      const store = useDrinksStore();
      const drink = { category: "Shot" };

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
        const drink = { glass: "Glass" };

        const result = store.INCLUDE_DRINK_BY_GLASS_TYPE(drink);

        expect(result).toBe(true);
      });
    });

    it("identifies if drink is associated with given glass type", () => {
      const userStore = useUserStore();
      userStore.selectedGlassTypes = ["Glass 1", "Glass 2"];
      const store = useDrinksStore();
      const drink = { glass: "Glass 2" };

      const result = store.INCLUDE_DRINK_BY_GLASS_TYPE(drink);

      expect(result).toBe(true);
    });
  });
});
