import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useRouter } from "vue-router";
vi.mock("vue-router");

import DrinkFiltersSidebarGlassTypes from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebarGlassTypes.vue";
import { useDrinksStore } from "@/stores/drinks";
import { useUserStore } from "@/stores/user";
import { vi } from "vitest";

describe("DrinkFiltersSidebarGlassTypes", () => {
  const renderDrinkFiltersSidebarGlassTypes = () => {
    const pinia = createTestingPinia();
    const drinksStore = useDrinksStore();
    const userStore = useUserStore();

    render(DrinkFiltersSidebarGlassTypes, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { drinksStore, userStore };
  };

  it("renders unique list of glass types from drinks", async () => {
    const { drinksStore } = renderDrinkFiltersSidebarGlassTypes();
    drinksStore.UNIQUE_GLASS_TYPES = new Set(["Glass 1", "Glass 2"]);

    const button = screen.getByRole("button", { name: /glass types/i });
    await userEvent.click(button);

    const glassTypesListItems = screen.getAllByRole("listitem");
    const glassTypes = glassTypesListItems.map((node) => node.textContent);
    expect(glassTypes).toEqual(["Glass 1", "Glass 2"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for glass types", async () => {
      useRouter.mockReturnValue({ push: vi.fn() });
      const { drinksStore, userStore } = renderDrinkFiltersSidebarGlassTypes();
      drinksStore.UNIQUE_GLASS_TYPES = new Set(["Glass 1", "Glass 2"]);

      const button = screen.getByRole("button", { name: /glass types/i });
      await userEvent.click(button);

      const glass1Checkbox = screen.getByRole("checkbox", {
        name: /glass 1/i,
      });
      await userEvent.click(glass1Checkbox);

      expect(userStore.ADD_SELECTED_GLASS_TYPES).toHaveBeenCalledWith([
        "Glass 1",
      ]);
    });

    it("navigates user to drink results page to see fresh batch of filtered drinks", async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });
      const { drinksStore } = renderDrinkFiltersSidebarGlassTypes();
      drinksStore.UNIQUE_GLASS_TYPES = new Set(["Glass 1"]);

      const button = screen.getByRole("button", { name: /glass types/i });
      await userEvent.click(button);

      const glass1Checkbox = screen.getByRole("checkbox", {
        name: /glass 1/i,
      });
      await userEvent.click(glass1Checkbox);

      expect(push).toHaveBeenCalledWith({ name: "DrinkResults" });
    });
  });
});
