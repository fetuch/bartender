import axios from "axios";

import getDrinks from "@/api/getDrinks";

vi.mock("axios");

describe("getDrinks", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
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
