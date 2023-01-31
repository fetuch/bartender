import axios from "axios";

import type { Category } from "@/api/types";

const getCategories = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/categories`;
  const response = await axios.get<Category[]>(url);
  return response.data;
};

export default getCategories;
