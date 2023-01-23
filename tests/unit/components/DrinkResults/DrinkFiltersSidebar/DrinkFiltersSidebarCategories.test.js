import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import DrinkFiltersSidebarCategories from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebarCategories.vue";
import { useDrinksStore } from "@/stores/drinks";
import { useUserStore } from "@/stores/user";

describe("DrinkFiltersSidebarCategories", () => {
  const renderDrinkFiltersSidebarCategories = () => {
    const pinia = createTestingPinia();
    const drinksStore = useDrinksStore();
    const userStore = useUserStore();
    const $router = { push: vi.fn() };

    render(DrinkFiltersSidebarCategories, {
      global: {
        mocks: {
          $router,
        },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { drinksStore, userStore, $router };
  };

  it("renders unique list of categories from drinks", async () => {
    const { drinksStore } = renderDrinkFiltersSidebarCategories();
    drinksStore.UNIQUE_CATEGORIES = new Set(["Shot", "Shake"]);

    const button = screen.getByRole("button", { name: /categories/i });
    await userEvent.click(button);

    const categoryListItems = screen.getAllByRole("listitem");
    const categories = categoryListItems.map((node) => node.textContent);
    expect(categories).toEqual(["Shot", "Shake"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for categories", async () => {
      const { drinksStore, userStore } = renderDrinkFiltersSidebarCategories();
      drinksStore.UNIQUE_CATEGORIES = new Set(["Shot", "Shake"]);

      const button = screen.getByRole("button", { name: /categories/i });
      await userEvent.click(button);

      const shotCheckbox = screen.getByRole("checkbox", {
        name: /shot/i,
      });
      await userEvent.click(shotCheckbox);

      expect(userStore.ADD_SELECTED_CATEGORIES).toHaveBeenCalledWith(["Shot"]);
    });

    it("navigates user to drink results page to see fresh batch of filtered drinks", async () => {
      const { drinksStore, $router } = renderDrinkFiltersSidebarCategories();
      drinksStore.UNIQUE_CATEGORIES = new Set(["Shot"]);

      const button = screen.getByRole("button", { name: /categories/i });
      await userEvent.click(button);

      const shotCheckbox = screen.getByRole("checkbox", {
        name: /shot/i,
      });
      await userEvent.click(shotCheckbox);

      expect($router.push).toHaveBeenCalledWith({ name: "DrinkResults" });
    });
  });
});
