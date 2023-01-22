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
      it("returns all jobs", () => {
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
});
