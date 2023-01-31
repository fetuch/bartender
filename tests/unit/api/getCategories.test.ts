import type { Mock } from "vitest";
import axios from "axios";

import getCategories from "@/api/getCategories";

vi.mock("axios");

const axiosGetMock = axios.get as Mock;

describe("getCategories", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          name: "Beer",
        },
      ],
    });
  });

  it("fetches categories that drinks belongs to", async () => {
    await getCategories();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/categories");
  });

  it("extracts categories from response", async () => {
    const categories = await getCategories();
    expect(categories).toEqual([
      {
        id: 1,
        name: "Beer",
      },
    ]);
  });
});
