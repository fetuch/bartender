import { render, screen } from "@testing-library/vue";

import TheSubnav from "@/components/TheSubnav.vue";

describe("TheSubnav", () => {
  describe("when user is on drinks page", () => {
    it("displays drink count", () => {
      render(TheSubnav, {
        data() {
          return {
            onDrinkResultsPage: true,
          };
        },
      });

      const drinkCount = screen.getByText("69");

      expect(drinkCount).toBeInTheDocument();
    });
  });

  describe("when user is not on drinks page", () => {
    it("does NOT display drink count", () => {
      render(TheSubnav, {
        data() {
          return {
            onDrinkResultsPage: false,
          };
        },
      });

      const drinkCount = screen.queryByText("69");

      expect(drinkCount).not.toBeInTheDocument();
    });
  });
});
