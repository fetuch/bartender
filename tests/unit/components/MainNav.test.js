import { render, screen } from "@testing-library/vue";

import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays app name", () => {
    render(MainNav);
    const appName = screen.getByText("Bartender App");
    expect(appName).toBeInTheDocument();
  });

  it("displays menu items for navigation", () => {
    render(MainNav);
    const navigationMenuItems = screen.getAllByRole("listitem");
    const navigationMenuTexts = navigationMenuItems.map(
      (item) => item.textContent
    );
    expect(navigationMenuTexts).toEqual(["Drinks", "Ingredients"]);
  });
});
