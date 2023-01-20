import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import DrinkListings from "@/components/DrinkResults/DrinkListings.vue";
import { useDrinksStore } from "@/stores/drinks";

vi.mock("axios");

describe("DrinkListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const renderDrinkListings = ($route) => {
    const pinia = createTestingPinia();

    render(DrinkListings, {
      global: {
        plugins: [pinia],
        mocks: {
          $route,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it("fetches drinks", () => {
    const $route = createRoute();

    renderDrinkListings($route);

    const drinksStore = useDrinksStore();
    expect(drinksStore.FETCH_DRINKS).toHaveBeenCalled();
  });

  it("displays maximum of 10 drinks", async () => {
    const queryParams = { page: "1" };
    const $route = createRoute(queryParams);

    renderDrinkListings($route);
    const drinksStore = useDrinksStore();
    drinksStore.drinks = Array(15).fill({});

    const drinkListings = await screen.findAllByRole("listitem");
    expect(drinkListings).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("displays page number 1", () => {
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);

      renderDrinkListings($route);

      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("displays page number", () => {
      const queryParams = { page: "3" };
      const $route = createRoute(queryParams);

      renderDrinkListings($route);

      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when user is on first page", () => {
    it("does not show link to previous page", async () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);

      renderDrinkListings($route);
      const drinksStore = useDrinksStore();
      drinksStore.drinks = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("shows link to next page", async () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);

      renderDrinkListings($route);
      const drinksStore = useDrinksStore();
      drinksStore.drinks = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when user is on last page", () => {
    it("does not show link to next page", async () => {
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);

      renderDrinkListings($route);
      const drinksStore = useDrinksStore();
      drinksStore.drinks = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it("shows link to previous page", async () => {
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);

      renderDrinkListings($route);
      const drinksStore = useDrinksStore();
      drinksStore.drinks = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
