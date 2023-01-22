import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import DrinkFiltersSidebarCategories from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebarCategories.vue";
import { useDrinksStore } from "@/stores/drinks";

describe("DrinkFiltersSidebarCategories", () => {
  const renderDrinkFiltersSidebarCategories = () => {
    const pinia = createTestingPinia();
    const drinksStore = useDrinksStore();

    render(DrinkFiltersSidebarCategories, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { drinksStore };
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
});
