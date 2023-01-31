import { nextTick } from "vue";
import { render, screen } from "@testing-library/vue";

import TheHeadline from "@/components/DrinkSearch/TheHeadline.vue";

describe("TheHeadline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("displays introductory hading verb", () => {
    render(TheHeadline);

    const actionPhrase = screen.getByRole("heading", {
      name: /Create your next drink at Bartender/i,
    });
    expect(actionPhrase).toBeInTheDocument();
  });

  it("changes heading verb at a consistent interval", () => {
    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);

    render(TheHeadline);

    expect(mock).toHaveBeenCalled();
  });

  it("swaps heading verb after interval", async () => {
    render(TheHeadline);
    vi.advanceTimersToNextTimer();

    await nextTick();
    const actionPhrase = screen.getByRole("heading", {
      name: /find your next drink at Bartender/i,
    });

    expect(actionPhrase).toBeInTheDocument();
  });

  it("removes interval when component disappears", () => {
    const clearInterval = vi.fn();
    vi.stubGlobal("clearInterval", clearInterval);

    const { unmount } = render(TheHeadline);
    unmount();

    expect(clearInterval).toHaveBeenCalled();
  });
});
