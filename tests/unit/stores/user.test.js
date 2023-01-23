import { createPinia, setActivePinia } from "pinia";

import { useUserStore } from "@/stores/user";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("keeps track of if user is logged in", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it("stores categories that the user would like to filter drinks by", () => {
    const store = useUserStore();
    expect(store.selectedCategories).toEqual([]);
  });

  it("stores glass types that the user would like to filter drinks by", () => {
    const store = useUserStore();
    expect(store.selectedGlassTypes).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("loginUser", () => {
    it("logs the user in", () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe("ADD_SELECTED_CATEGORIES", () => {
    it("updates categories the user has chosen to filter drinks by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_CATEGORIES(["Cat1", "Cat2"]);
      expect(store.selectedCategories).toEqual(["Cat1", "Cat2"]);
    });
  });

  describe("ADD_SELECTED_GLASS_TYPES", () => {
    it("updates glass types the user has chosen to filter drinks by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_GLASS_TYPES(["Glass1", "Glass2"]);
      expect(store.selectedGlassTypes).toEqual(["Glass1", "Glass2"]);
    });
  });
});
