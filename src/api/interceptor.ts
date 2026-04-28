import { axiosInstance } from "./axiosInstance";

axiosInstance.interceptors.request.use(
  (config) => {
    //modify the request here
    console.log("Request send", {
      url: config.url,
      method: config.method,
      data: config.data,
    });
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
