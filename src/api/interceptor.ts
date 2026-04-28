import { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import { tokenService } from "../utils/tokenService";
import { axiosInstance } from "./axiosInstance";
import { AUTH_EXCLUDE_ROUTES } from "./constants";

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const isPublicRoute = AUTH_EXCLUDE_ROUTES.some((route) =>
      config.url?.includes(route),
    );

    if (!isPublicRoute) {
      const token = tokenService.getAccessToken();

      if (token) {
        config.headers ??= new AxiosHeaders();
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Received:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });

    return response;
  },
  (error) => {
    console.error("API Error:", error.response || error.message);

    return Promise.reject(error);
  },
);
