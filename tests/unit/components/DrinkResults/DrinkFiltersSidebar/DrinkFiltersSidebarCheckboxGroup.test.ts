import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user";

import { useRouter } from "vue-router";
vi.mock("vue-router");

import DrinkFiltersSidebarCheckboxGroup from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebarCheckboxGroup.vue";
const useRouterMock = useRouter as Mock;

describe("DrinkFiltersSidebarCheckboxGroup", () => {
  interface DrinkFiltersSidebarCheckboxGroupProps {
    uniqueValues: Set<string>;
    action: Mock;
  }

  const createProps = (
    props: Partial<DrinkFiltersSidebarCheckboxGroupProps> = {}
  ) => ({
    uniqueValues: new Set(["ValueA", "ValueB"]),
    action: vi.fn(),
    ...props,
  });

  const renderDrinkFiltersSidebarCheckboxGroup = (
    props: DrinkFiltersSidebarCheckboxGroupProps
  ) => {
    // use real methods - { stubActions: false }
    // to fullfill CLEAR_USER_DRINK_FILTER_SELECTIONS test
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();

    render(DrinkFiltersSidebarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
      },
    });

    return { userStore };
  };

  it("renders unique list of values", () => {
    const props = createProps({
      uniqueValues: new Set(["Shot", "Shake"]),
    });
    renderDrinkFiltersSidebarCheckboxGroup(props);

    const categoryListItems = screen.getAllByRole("listitem");
    const categories = categoryListItems.map((node) => node.textContent);
    expect(categories).toEqual(["Shot", "Shake"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() });
      const action = vi.fn();
      const props = createProps({
        uniqueValues: new Set(["Shot", "Shake"]),
        action,
      });
      renderDrinkFiltersSidebarCheckboxGroup(props);

      const shotCheckbox = screen.getByRole("checkbox", {
        name: /shot/i,
      });
      await userEvent.click(shotCheckbox);

      expect(action).toHaveBeenCalledWith(["Shot"]);
    });

    it("navigates user to drink results page to see fresh batch of filtered drinks", async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });
      const props = createProps({
        uniqueValues: new Set(["Shot"]),
      });
      renderDrinkFiltersSidebarCheckboxGroup(props);

      const shotCheckbox = screen.getByRole("checkbox", {
        name: /shot/i,
      });
      await userEvent.click(shotCheckbox);

      expect(push).toHaveBeenCalledWith({ name: "DrinkResults" });
    });
  });

  describe("when user clears drink filters", () => {
    it("unchecks any checked checkboxes", async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() });
      const props = createProps({
        uniqueValues: new Set(["Shot"]),
      });
      const { userStore } = renderDrinkFiltersSidebarCheckboxGroup(props);

      const categoriesCheckboxBeforeAction = screen.getByRole<HTMLInputElement>(
        "checkbox",
        {
          name: /shot/i,
        }
      );
      await userEvent.click(categoriesCheckboxBeforeAction);

      expect(categoriesCheckboxBeforeAction.checked).toBe(true);

      userStore.CLEAR_USER_DRINK_FILTER_SELECTIONS();

      const categoriesCheckboxAfterAction =
        await screen.findByRole<HTMLInputElement>("checkbox", {
          name: /shot/i,
        });
      expect(categoriesCheckboxAfterAction.checked).toBe(false);
    });
  });
});
