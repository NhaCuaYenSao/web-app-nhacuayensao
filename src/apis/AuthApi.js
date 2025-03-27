import { axiosNCYS } from "../configs/AxiosNCYS";

export const authApi = {
  async loginAPI(data) {
    const res = await axiosNCYS.post("/auth/login", data);
    return res;
  },

  async logoutAPI(accessToken) {
    const res = await axiosNCYS.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  },

  async registerAPI(
    data = {
      email: "",
      phoneNumber: "",
      password: "",
    }
  ) {
    const res = await axiosNCYS.post("/auth/register", data);
    return res;
  },
};
