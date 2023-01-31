import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import type { Drink, Ingredient } from "@/api/types";
import { createDrink } from "../../../utils/createDrink";

import DrinkListing from "@/components/DrinkResults/DrinkListing.vue";

describe("DrinkListing", () => {
  const renderDrinkListing = (drink: Drink) => {
    render(DrinkListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        drink: {
          ...drink,
        },
      },
    });
  };

  it("renders drink name", () => {
    const drink = createDrink({ name: "Jamaica Kiss" });
    renderDrinkListing(drink);
    expect(screen.getByText("Jamaica Kiss")).toBeInTheDocument();
  });

  it("renders drink category", () => {
    const drink = createDrink({ category: "Shot" });
    renderDrinkListing(drink);
    expect(screen.getByText(/Shot/)).toBeInTheDocument();
  });

  it("renders drink ingredients", () => {
    const drink = createDrink({
      ingredients: [
        {
          name: "Lager",
        } as Ingredient,
        {
          name: "Campari",
        } as Ingredient,
      ],
    });
    renderDrinkListing(drink);
    expect(screen.getByText(/Lager/)).toBeInTheDocument();
    expect(screen.getByText(/Campari/)).toBeInTheDocument();
  });
});
