import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import { useRoute } from "vue-router";
vi.mock("vue-router");

import TheSubnav from "@/components/Navigation/TheSubnav.vue";
import { useDrinksStore } from "@/stores/drinks";

const useRouteMock = useRoute as Mock;

describe("TheSubnav", () => {
  const renderTheSubnav = () => {
    const pinia = createTestingPinia();
    const drinksStore = useDrinksStore();

    render(TheSubnav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { drinksStore };
  };

  describe("when user is on drinks page", () => {
    it("displays drink count", async () => {
      useRouteMock.mockReturnValue({ name: "DrinkResults" });

      const { drinksStore } = renderTheSubnav();
      const numberOfDrinks = 11;

      // @ts-expect-error: Getter is read only.
      drinksStore.FILTERED_DRINKS = Array(numberOfDrinks).fill({});

      const drinkCount = await screen.findByText(numberOfDrinks);

      expect(drinkCount).toBeInTheDocument();
    });
  });

  describe("when user is not on drinks page", () => {
    it("does NOT display drink count", () => {
      useRouteMock.mockReturnValue({ name: "Home" });

      const { drinksStore } = renderTheSubnav();
      const numberOfDrinks = 11;
      // @ts-expect-error: Getter is read only.
      drinksStore.FILTERED_DRINKS = Array(numberOfDrinks).fill({});

      const drinkCount = screen.queryByText(numberOfDrinks);

      expect(drinkCount).not.toBeInTheDocument();
    });
  });
});
