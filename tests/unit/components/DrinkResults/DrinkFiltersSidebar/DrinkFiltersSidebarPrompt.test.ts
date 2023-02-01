import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useUserStore } from "@/stores/user";

import DrinkFiltersSidebarPrompt from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebarPrompt.vue";

describe("DrinkFiltersSidebarPrompt", () => {
  describe("when user clicks Clear Filters button", () => {
    it("sends message to clear all of user's drink search filters", async () => {
      const pinia = createTestingPinia();
      const userStore = useUserStore();

      render(DrinkFiltersSidebarPrompt, {
        global: {
          plugins: [pinia],
        },
      });

      const button = screen.getByRole("button", { name: /clear filters/i });
      await userEvent.click(button);

      expect(userStore.CLEAR_USER_DRINK_FILTER_SELECTIONS).toHaveBeenCalled();
    });
  });
});
