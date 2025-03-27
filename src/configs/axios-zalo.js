import axios from "axios";

const request = axios.create({
  baseURL: "https://payment-mini.zalo.me/api/transaction",
});

export const get = async (path, data, options) => {
  const response = await request.get(path, {
    data,
    ...options,
  });
  return response.data;
};

export const post = async (path, data, options) => {
  const response = await request.post(path, data, options);
  return response.data;
};
