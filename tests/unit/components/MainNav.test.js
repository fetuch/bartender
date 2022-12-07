import { render, screen } from "@testing-library/vue";

import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays app name", () => {
    render(MainNav);
    const appName = screen.getByText("Bartender App");
    expect(appName).toBeInTheDocument();
  });
});
