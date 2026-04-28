import type { LoginData } from "../types/authTypes";
import { tokenService } from "../utils/tokenService";
import { axiosInstance } from "./axiosInstance";
import { API_ENDPOINTS } from "./constants";

export const login = async (data: LoginData) => {
  const res = await axiosInstance.post(API_ENDPOINTS.LOGIN, data);
  tokenService.setAccessToken(res.data.token);
  return res.data;
};
