import { axiosPayOs } from "~/configs/AxiosPayOS";

export const payOsApi = {
  async createOrder(data) {
    const res = await axiosPayOs.post("/v2/payment-requests", data);
    return res;
  },

  async checkTransactionStatus(orderCode = "") {
    const res = await axiosPayOs.get(`/v2/payment-requests/${orderCode}`);
    return res;
  },
};
