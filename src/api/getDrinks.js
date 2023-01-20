import axios from "axios";

const getDrinks = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/drinks`;
  const response = await axios.get(url);
  return response.data;
};

export default getDrinks;
