import type { Mock } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { createCategory } from "../../utils/createCategory";

import { useCategoriesStore } from "@/stores/categories";
// import { useUserStore } from "@/stores/user";

vi.mock("axios");

const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores all categories that drink may belong to", () => {
    const store = useCategoriesStore();
    expect(store.categories).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_CATEGORIES", () => {
    it("makes API request and stores received categories", async () => {
      axiosGetMock.mockResolvedValue({ data: [{ id: 1, name: "Shot" }] });
      const store = useCategoriesStore();
      await store.FETCH_CATEGORIES();
      expect(store.categories).toEqual([{ id: 1, name: "Shot" }]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_CATEGORIES", () => {
    it("finds unique categories from collection of categories", () => {
      const store = useCategoriesStore();
      store.categories = [
        createCategory({ name: "Shot" }),
        createCategory({ name: "Shake" }),
      ];

      const result = store.UNIQUE_CATEGORIES;

      expect(result).toEqual(["Shot", "Shake"]);
    });
  });
});
