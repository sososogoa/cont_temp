import axiosInstance from "./axiosConfig";
import { User } from "../types/User";
import { AxiosError } from "axios";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get<User[]>("/users");
    return response.data;
  } catch (error) {
    console.error("유저 조회 에러 :", error);
    throw error;
  }
};

export const getUserInfo = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>("/userinfo");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error((error as Error).message);
    }
  }
};
