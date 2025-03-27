import axios from "axios";

const request = axios.create({
  baseURL: "https://api.vietqr.io/v2",
});

export const axiosVietQr = {
  async get(path, options) {
    const response = await request.get(path, options);
    return response.data;
  },
  async post(path, data, options) {
    const response = await request.post(path, data, options);
    return response.data;
  },
};
