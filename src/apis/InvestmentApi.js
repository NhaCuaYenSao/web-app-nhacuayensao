import { axiosNCYS } from "../configs/AxiosNCYS";

const API_NAME = "investment";

export const investmentApi = {
  async invest(accessToken, data = { productId, amount, cycleCount }) {
    const res = await axiosNCYS.post(`/${API_NAME}/invest`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  },

  async withdrawRate(accessToken, data = { productId }) {
    const res = await axiosNCYS.post(`/${API_NAME}/withdraw-rate`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  },

  async withdrawFull(accessToken, data = { productId }) {
    const res = await axiosNCYS.post(`/${API_NAME}/withdraw-full`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  },
};
