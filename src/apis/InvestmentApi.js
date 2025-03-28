import { axiosNCYS } from "../configs/AxiosNCYS";

const API_NAME = "investment";

export const investmentApi = {
  async invest(
    accessToken,
    voucherId,
    data = { productId, amount, cycleCount }
  ) {
    let path = `/${API_NAME}/invest`;
    if (voucherId !== "none") {
      path += `?voucherId=${voucherId}`;
    }
    const res = await axiosNCYS.post(path, data, {
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
