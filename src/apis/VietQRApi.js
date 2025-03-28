import { axiosVietQr } from "../configs/axios-viet-qr";

export const vietQrApi = {
  async getAllBanks() {
    const res = await axiosVietQr.get("/banks");
    return res;
  },
};
