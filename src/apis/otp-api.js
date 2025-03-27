import { axiosNCYS } from "../configs/AxiosNCYS";

export const sendOtp = async (data = { email: "" }) => {
  const res = await axiosNCYS.post("/otp/send", data);
  return res;
};

export const verifyOtp = async (data = { email: "", otp: "" }) => {
  const res = await axiosNCYS.post("/otp/verify", data);
  return res;
};
