import axios from "axios";
import { ENV } from "~/constants/env";

export const refreshAxios = axios.create({
  baseURL: ENV.API_NCYS,
  withCredentials: true,
});

export const axiosJWT = {
  async refreshTokenAPI(id) {
    const res = await refreshAxios.post("/auth/refresh", {
      userId: parseInt(id),
    });
    return res.data;
  },
};
