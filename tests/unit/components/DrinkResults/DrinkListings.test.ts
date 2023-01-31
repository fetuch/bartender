import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useRoute } from "vue-router";
vi.mock("vue-router");

import DrinkListings from "@/components/DrinkResults/DrinkListings.vue";
import { useDrinksStore } from "@/stores/drinks";
import { useCategoriesStore } from "@/stores/categories";

vi.mock("axios");
const useRouteMock = useRoute as Mock;

describe("DrinkListings", () => {
  const renderDrinkListings = () => {
    const pinia = createTestingPinia();
    const drinksStore = useDrinksStore();
    const categoriesStore = useCategoriesStore();
    // @ts-expect-error: Getter is read only.
    drinksStore.FILTERED_DRINKS = Array(15).fill({});

    render(DrinkListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    return { categoriesStore, drinksStore };
  };

  it("fetches drinks", () => {
    useRouteMock.mockReturnValue({ query: {} });

    const { drinksStore } = renderDrinkListings();

    expect(drinksStore.FETCH_DRINKS).toHaveBeenCalled();
  });

  it("fetches categories", () => {
    useRouteMock.mockReturnValue({ query: {} });

    const { categoriesStore } = renderDrinkListings();

    expect(categoriesStore.FETCH_CATEGORIES).toHaveBeenCalled();
  });

  it("displays maximum of 10 drinks", async () => {
    useRouteMock.mockReturnValue({ query: { page: "1" } });

    const { drinksStore } = renderDrinkListings();
    // @ts-expect-error: Getter is read only.
    drinksStore.FILTERED_DRINKS = Array(15).fill({});

    const drinkListings = await screen.findAllByRole("listitem");
    expect(drinkListings).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("displays page number 1", () => {
      useRouteMock.mockReturnValue({ query: { page: undefined } });

      renderDrinkListings();
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("displays page number", () => {
      useRouteMock.mockReturnValue({ query: { page: "3" } });

      renderDrinkListings();

      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when user is on first page", () => {
    it("does not show link to previous page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "1" } });

      const { drinksStore } = renderDrinkListings();
      // @ts-expect-error: Getter is read only.
      drinksStore.FILTERED_DRINKS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("shows link to next page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "1" } });

      const { drinksStore } = renderDrinkListings();
      // @ts-expect-error: Getter is read only.
      drinksStore.FILTERED_DRINKS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when user is on last page", () => {
    it("does not show link to next page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "2" } });

      const { drinksStore } = renderDrinkListings();
      // @ts-expect-error: Getter is read only.
      drinksStore.FILTERED_DRINKS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it("shows link to previous page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "2" } });

      const { drinksStore } = renderDrinkListings();
      // @ts-expect-error: Getter is read only.
      drinksStore.FILTERED_DRINKS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
