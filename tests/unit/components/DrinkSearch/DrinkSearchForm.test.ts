import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { useRouter } from "vue-router";

vi.mock("vue-router");

import DrinkSearchForm from "@/components/DrinkSearch/DrinkSearchForm.vue";
const useRouterMock = useRouter as Mock;

describe("DrinkSearchForm", () => {
  describe("when user submits form", () => {
    it("directs user to drink results page with user's search parameters", async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });

      render(DrinkSearchForm, {
        global: {
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
