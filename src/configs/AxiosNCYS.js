import axios from "axios";
import { ENV } from "~/constants/env";
import { localStoreTokenService } from "~/utils/LocalStoreTokenService";
import { refreshTokenAPI } from "./AxiosRefresh";
import { jwtDecode } from "jwt-decode";

const request = axios.create({
  baseURL: ENV.API_NCYS,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export const axiosNCYS = {
  async get(path, options) {
    const response = await request.get(path, options);
    return response.data;
  },

  async post(path, data, options) {
    const response = await request.post(path, data, options);
    return response.data;
  },

  async delete(path, options) {
    const response = await request.delete(path, options);
    return response.data;
  },

  async upload(path, data, options) {
    const response = await request.post(path, data, {...options, headers: { "Content-Type": "multipart/form-data" }});
    return response.data;
  }
};

request.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = localStoreTokenService.getAccessToken();

      // Thêm token vào header nếu có
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;

        const date = new Date();
        const decoded = jwtDecode(accessToken);
        const isExpired = decoded.exp < date.getTime() / 1000;

        if (isExpired) {
          const refreshToken = localStoreTokenService.getRefreshToken();
          if (!refreshToken) throw new Error("No refresh token found");

          const res = await refreshTokenAPI(Number(decoded.sub), refreshToken);
          const resAccessToken = res.data.token.accessToken;
          const resRefreshToken = res.data.token.refreshToken;

          if (resAccessToken && resRefreshToken) {
            // Lưu token mới
            localStoreTokenService.setAccessToken(resAccessToken);
            localStoreTokenService.setRefreshToken(resRefreshToken);

            // Cập nhật header với token mới
            config.headers.Authorization = `Bearer ${resAccessToken}`;
          }
        }
      }

      return config;
    } catch (error) {
      console.error("Refresh token error:", error);
      // Clear tokens nếu có lỗi
      localStoreTokenService.setAccessToken(null);
      localStoreTokenService.setRefreshToken(null);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
