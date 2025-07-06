import axios from "axios";

const API = "http://localhost:8080/api/precios/cultivo";

export const getPrice = async (cultivoId) => {
  try {
    const res = await axios.get(`${API}/${cultivoId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching price:", error.response?.data || error.message);
    throw error;
  }
};
