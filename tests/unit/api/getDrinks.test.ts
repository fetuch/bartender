import type { Mock } from "vitest";
import axios from "axios";

import getDrinks from "@/api/getDrinks";

vi.mock("axios");

const axiosGetMock = axios.get as Mock;

describe("getDrinks", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          name: "Margarita",
        },
      ],
    });
  });

  it("fetches drinks that users can browse", async () => {
    await getDrinks();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/drinks");
  });

  it("extracts drinks from response", async () => {
    const drinks = await getDrinks();
    expect(drinks).toEqual([{ id: 1, name: "Margarita" }]);
  });
});
