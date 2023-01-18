import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import DrinkSearchForm from "@/components/DrinkSearch/DrinkSearchForm.vue";

describe("DrinkSearchForm", () => {
  describe("when user submits form", () => {
    it("directs user to drink results page with user's search parameters", async () => {
      const push = vi.fn();
      const $router = { push };

      render(DrinkSearchForm, {
        global: {
          mocks: {
            $router,
          },
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const ingredientsInput = screen.getByRole("textbox", {
        name: /ingredients/i,
      });
      await userEvent.type(ingredientsInput, "gin");

      const submitButton = screen.getByRole("button", {
        name: /search/i,
      });
      await userEvent.click(submitButton);

      expect(push).toHaveBeenCalledWith({
        name: "DrinkResults",
        query: { ingredients: "gin" },
      });
    });
  });
});
