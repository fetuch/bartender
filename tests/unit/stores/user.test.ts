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

  it("store's user's search term for drink name", () => {
    const store = useUserStore();
    expect(store.nameSearchTerm).toBe("");
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const store = useUserStore();
      store.LOGIN_USER();
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

  describe("UPDATE_NAME_SEARCH_TERM", () => {
    it("receives search term for drink name the user has entered", () => {
      const store = useUserStore();
      store.nameSearchTerm = "";
      store.UPDATE_NAME_SEARCH_TERM("Margarita");
      expect(store.nameSearchTerm).toBe("Margarita");
    });
  });

  describe("CLEAR_USER_DRINK_FILTER_SELECTIONS", () => {
    it("removes all drink filters that user has chosen", () => {
      const store = useUserStore();
      store.selectedCategories = ["Random category"];
      store.selectedGlassTypes = ["Random glass type"];

      store.CLEAR_USER_DRINK_FILTER_SELECTIONS();

      expect(store.selectedCategories).toEqual([]);
      expect(store.selectedGlassTypes).toEqual([]);
    });
  });
});
