import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import axios from "axios";

import DrinkListings from "@/components/DrinkResults/DrinkListings.vue";

vi.mock("axios");

describe("DrinkListings", () => {
  it("fetches drinks", () => {
    axios.get.mockResolvedValue({ data: [] });
    render(DrinkListings);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/drinks");
  });

  it("creates a drink listing for every drink", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });

    render(DrinkListings, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const drinkListings = await screen.findAllByRole("listitem");
    expect(drinkListings).toHaveLength(15);
  });
});
