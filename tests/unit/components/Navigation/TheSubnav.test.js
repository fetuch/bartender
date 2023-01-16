import { render, screen } from "@testing-library/vue";

import TheSubnav from "@/components/Navigation/TheSubnav.vue";

describe("TheSubnav", () => {
  const renderTheSubnav = (routeName) => {
    render(TheSubnav, {
      global: {
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
  };

  describe("when user is on drinks page", () => {
    it("displays drink count", () => {
      const routeName = "DrinkResults";

      renderTheSubnav(routeName);

      const drinkCount = screen.getByText("69");

      expect(drinkCount).toBeInTheDocument();
    });
  });

  describe("when user is not on drinks page", () => {
    it("does NOT display drink count", () => {
      const routeName = "Home";

      renderTheSubnav(routeName);

      const drinkCount = screen.queryByText("69");

      expect(drinkCount).not.toBeInTheDocument();
    });
  });
});
