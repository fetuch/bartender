import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import axios from "axios";

import DrinkListings from "@/components/DrinkResults/DrinkListings.vue";

vi.mock("axios");

describe("DrinkListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const renderDrinkListings = ($route) => {
    render(DrinkListings, {
      global: {
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
    axios.get.mockResolvedValue({ data: [] });
    const $route = createRoute();

    renderDrinkListings($route);

    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/drinks");
  });

  it("displays maximum of 10 drinks", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const queryParams = { page: "1" };
    const $route = createRoute(queryParams);

    renderDrinkListings($route);

    const drinkListings = await screen.findAllByRole("listitem");
    expect(drinkListings).toHaveLength(10);
  });
});
