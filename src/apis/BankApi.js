import { axiosNCYS } from "../configs/AxiosNCYS";

const NAME = "bank";

export const bankApi = {
  async createBank(accessToken, data) {
    const res = await axiosNCYS.post(`/${NAME}/create`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  },

  async getAllBanksByUser(accessToken) {
    const res = await axiosNCYS.get(`/${NAME}/by-user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  },

  async deleteBank(accessToken, id) {
    const res = await axiosNCYS.delete(`/${NAME}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  },
};
