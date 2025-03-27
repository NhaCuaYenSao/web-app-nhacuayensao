import axios from "axios";
import { ENV } from "~/constants/env";

export const refreshAxios = axios.create({
  baseURL: ENV.API_NCYS,
});

export const refreshTokenAPI = async (id, refreshToken) => {
  const res = await refreshAxios.post("/auth/refresh", {
    userId: parseInt(id),
    refreshToken,
  });
  return res.data;
};
