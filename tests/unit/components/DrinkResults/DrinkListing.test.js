import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import DrinkListing from "@/components/DrinkResults/DrinkListing.vue";

describe("DrinkListing", () => {
  const createDrinkProps = (drinkProps = {}) => ({
    name: "Margarita",
    category: "Ordinary Drink",
    ingredients: [
      {
        name: "Tequila",
        measure: "1 1/2 oz",
      },
      {
        name: "Orange",
        measure: "1",
      },
    ],
    ...drinkProps,
  });

  const renderDrinkListing = (drinkProps) => {
    render(DrinkListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        drink: {
          ...drinkProps,
        },
      },
    });
  };

  it("renders drink name", () => {
    const drinkProps = createDrinkProps({ name: "Jamaica Kiss" });
    renderDrinkListing(drinkProps);
    expect(screen.getByText("Jamaica Kiss")).toBeInTheDocument();
  });

  it("renders drink category", () => {
    const drinkProps = createDrinkProps({ category: "Shot" });
    renderDrinkListing(drinkProps);
    expect(screen.getByText(/Shot/)).toBeInTheDocument();
  });

  it("renders drink ingredients", () => {
    const drinkProps = createDrinkProps({
      ingredients: [
        {
          name: "Lager",
        },
        {
          name: "Campari",
        },
      ],
    });
    renderDrinkListing(drinkProps);
    expect(screen.getByText(/Lager/)).toBeInTheDocument();
    expect(screen.getByText(/Campari/)).toBeInTheDocument();
  });
});
