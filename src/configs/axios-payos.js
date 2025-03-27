import axios from "axios";

const request = axios.create({
  baseURL: "https://api-merchant.payos.vn",
  headers: {
    "x-client-id": "9c0593da-2801-4396-8513-87172180c400",
    "x-api-key": "b35a4dd9-2e8b-4acf-8c30-f2ffe341a0e7",
  },
});

export const get = async (path, options) => {
  const response = await request.get(path, options);
  return response.data;
};

export const post = async (path, data, options) => {
  const response = await request.post(path, data, options);
  return response.data;
};
