import { axiosNCYS } from "../configs/AxiosNCYS";

export const walletApi = {
  async getWalletByUserIdAPI(accessToken) {
    const res = await axiosNCYS.get(`/wallet/get-wallet-by-user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  },

  async withdrawAPI(accessToken, data) {
    const res = await axiosNCYS.post(`/wallet/withdraw`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  },

  async depositAPI(accessToken, data) {
    const res = await axiosNCYS.post(`/wallet/deposit`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  },
};
