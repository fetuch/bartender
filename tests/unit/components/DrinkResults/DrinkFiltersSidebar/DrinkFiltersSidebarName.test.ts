import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useUserStore } from "@/stores/user";

import DrinkFiltersSidebarName from "@/components/DrinkResults/DrinkFiltersSidebar/DrinkFiltersSidebarName.vue";

describe("DrinkFiltersSidebarName", () => {
  const renderDrinkFiltersSidebaSkills = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();

    render(DrinkFiltersSidebarName, {
      global: {
        plugins: [pinia],
      },
    });

    return { userStore };
  };

  it("populates search input from store", async () => {
    const { userStore } = renderDrinkFiltersSidebaSkills();
    userStore.nameSearchTerm = "cuba";
    const input = await screen.findByRole<HTMLInputElement>("textbox");
    expect(input.value).toBe("cuba");
  });

  it("writes user input to store", async () => {
    const { userStore } = renderDrinkFiltersSidebaSkills();
    userStore.nameSearchTerm = "";
    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "c");
    await userEvent.click(document.body);

    expect(userStore.UPDATE_NAME_SEARCH_TERM).toHaveBeenCalledWith("c");
  });

  it("removes whitespace from user input", async () => {
    const { userStore } = renderDrinkFiltersSidebaSkills();
    userStore.nameSearchTerm = "";
    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "   Cuba Libre   ");
    await userEvent.click(document.body);

    expect(userStore.UPDATE_NAME_SEARCH_TERM).toHaveBeenCalledWith(
      "Cuba Libre"
    );
  });
});
