import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import TheSubnav from "@/components/Navigation/TheSubnav.vue";
import { useDrinksStore } from "@/stores/drinks";

describe("TheSubnav", () => {
  const renderTheSubnav = (routeName) => {
    const pinia = createTestingPinia();
    const drinksStore = useDrinksStore();

    render(TheSubnav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route: {
            name: routeName,
          },
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { drinksStore };
  };

  describe("when user is on drinks page", () => {
    it("displays drink count", async () => {
      const routeName = "DrinkResults";

      const { drinksStore } = renderTheSubnav(routeName);
      const numberOfDrinks = 11;
      drinksStore.FILTERED_DRINKS = Array(numberOfDrinks).fill({});

      const drinkCount = await screen.findByText(numberOfDrinks);

      expect(drinkCount).toBeInTheDocument();
    });
  });

  describe("when user is not on drinks page", () => {
    it("does NOT display drink count", () => {
      const routeName = "Home";

      const { drinksStore } = renderTheSubnav(routeName);
      const numberOfDrinks = 11;
      drinksStore.FILTERED_DRINKS = Array(numberOfDrinks).fill({});

      const drinkCount = screen.queryByText(numberOfDrinks);

      expect(drinkCount).not.toBeInTheDocument();
    });
  });
});
