import { axiosVietQr } from "../configs/axios-viet-qr";

export const getAllBanks = async () => {
  const res = await axiosVietQr.get("/banks");
  return res;
};
