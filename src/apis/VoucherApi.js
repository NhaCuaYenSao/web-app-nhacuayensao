import { get } from "react-hook-form";
import { axiosNCYS } from "~/configs/AxiosNCYS";

const NAME_API = "voucher";

export const voucherApi = {
  async getAllVouchersAPI(accessToken) {
    const params = new URLSearchParams();

    const res = await axiosNCYS.get(`${NAME_API}/all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });

    return res;
  },

  async addVoucherAPI(data) {
    const res = await axiosNCYS.post(`${NAME_API}/add-to-wallet`, data);

    return res;
  }
}