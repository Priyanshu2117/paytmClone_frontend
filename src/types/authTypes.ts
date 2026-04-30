import type { InternalAxiosRequestConfig } from "axios";

export interface LoginData {
  username: String;
  password: String;
}

export type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};
