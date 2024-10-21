import axiosInstance from "./axiosConfig";

export const getExampleData = async () => {
  try {
    const response = await axiosInstance.get("/example");
    return response.data;
  } catch (error) {
    console.error("Error fetching example data:", error);
    throw error;
  }
};
