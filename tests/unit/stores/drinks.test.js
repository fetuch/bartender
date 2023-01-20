import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useDrinksStore } from "@/stores/drinks";

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
