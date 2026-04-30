import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosPromise,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { tokenService } from "../utils/tokenService";
import { axiosInstance } from "./axiosInstance";
import { AUTH_EXCLUDE_ROUTES } from "./constants";
import type { RetryableRequestConfig } from "../types/authTypes";

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

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (
  error: AxiosError | null | unknown,
  token: string | null,
) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Received:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });

    return response;
  },
  async (error: AxiosError) => {
    console.error("API Error:", error.response || error.message);
    const originalRequest = error.config as RetryableRequestConfig;

    //if not 401 exit early
    if (error.response?.status !== 401) return Promise.reject(error);

    //Prevents infinite retry loops
    if (originalRequest?._retry) {
      return Promise.reject(error);
    }

    // if referesh in progress - queue the requests
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          promise: (token: string | null) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;
    try {
      const refreshToken = tokenService.getAccessToken();

      const res = await axiosInstance.post("/refresh", {
        refreshToken,
      });
      const newAccessToken = res.data.accessToken;
      tokenService.setAccessToken(newAccessToken);

      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    } catch (err) {
      processQueue(err, null);

      tokenService.clear();

      window.location.href = "/login";

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
