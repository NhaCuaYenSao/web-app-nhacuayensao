import { axiosNCYS } from "../configs/AxiosNCYS";

export const OTPAPI = {
  async sendOtp(data = { email: "" }) {
    const res = await axiosNCYS.post("/otp/send", data);
    return res;
  },

  async verifyOtp(data = { email: "", otp: "" }) {
    const res = await axiosNCYS.post("/otp/verify", data);
    return res;
  },
};
