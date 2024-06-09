import axios from "axios";
import { API_BASE_URL } from "./constants";

export const getColoringImages = async () => {
  const response = await axios.get(`${API_BASE_URL}/coloring-images`);
  return response.data;
};
export const getColoringImage = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/coloring-images/${id}`);
  return response.data;
};
