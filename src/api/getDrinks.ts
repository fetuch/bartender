import axios from "axios";

import type { Drink } from "@/api/types";

const getDrinks = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/drinks`;
  const response = await axios.get<Drink[]>(url);
  return response.data;
};

export default getDrinks;
