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

  async changePasswordApi(
    accessToken,
    data = {
      oldPassword: "1234567",
      newPassword: "123456",
    }
  ) {
    const res = await axiosNCYS.post("/auth/change-password", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  },

  async forgotPasswordApi(
    data = {
      email: "",
      password: "",
    }
  ) {
    const res = await axiosNCYS.post("/auth/forgot-password", data);
    return res;
  },
};
