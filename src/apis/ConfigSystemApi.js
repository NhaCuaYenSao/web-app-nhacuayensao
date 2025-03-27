import { axiosNCYS } from "../configs/AxiosNCYS";

export const configSystemApi = {
  async getConfigSystemAPI(accessToken, options) {
    const res = await axiosNCYS.get("/system-config", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  },
};
