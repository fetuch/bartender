import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useRouter } from "vue-router";
vi.mock("vue-router");

import DrinkFiltersSidebarCheckboxGroup from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebarCheckboxGroup.vue";

describe("DrinkFiltersSidebarCheckboxGroup", () => {
  const createProps = (props = {}) => ({
    header: "Some header",
    uniqueValues: new Set(["ValueA", "ValueB"]),
    action: vi.fn(),
    ...props,
  });

  const renderDrinkFiltersSidebarCheckboxGroup = (props) => {
    const pinia = createTestingPinia();

    render(DrinkFiltersSidebarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  };

  it("renders unique list of values", async () => {
    const props = createProps({
      header: "Categories",
      uniqueValues: new Set(["Shot", "Shake"]),
    });
    renderDrinkFiltersSidebarCheckboxGroup(props);

    const button = screen.getByRole("button", { name: /categories/i });
    await userEvent.click(button);

    const categoryListItems = screen.getAllByRole("listitem");
    const categories = categoryListItems.map((node) => node.textContent);
    expect(categories).toEqual(["Shot", "Shake"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      useRouter.mockReturnValue({ push: vi.fn() });
      const action = vi.fn();
      const props = createProps({
        header: "Categories",
        uniqueValues: new Set(["Shot", "Shake"]),
        action,
      });
      renderDrinkFiltersSidebarCheckboxGroup(props);

      const button = screen.getByRole("button", { name: /categories/i });
      await userEvent.click(button);

      const shotCheckbox = screen.getByRole("checkbox", {
        name: /shot/i,
      });
      await userEvent.click(shotCheckbox);

      expect(action).toHaveBeenCalledWith(["Shot"]);
    });

    it("navigates user to drink results page to see fresh batch of filtered drinks", async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });
      const props = createProps({
        header: "Categories",
        uniqueValues: new Set(["Shot"]),
      });
      renderDrinkFiltersSidebarCheckboxGroup(props);

      const button = screen.getByRole("button", { name: /categories/i });
      await userEvent.click(button);

      const shotCheckbox = screen.getByRole("checkbox", {
        name: /shot/i,
      });
      await userEvent.click(shotCheckbox);

      expect(push).toHaveBeenCalledWith({ name: "DrinkResults" });
    });
  });
});
