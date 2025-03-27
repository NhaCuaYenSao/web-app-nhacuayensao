import { axiosNCYS } from "../configs/AxiosNCYS";

export const categoryApi = {
  async getCategoryProduct(accessToken) {
    const res = await axiosNCYS.get("/category/find-by-type/PRODUCT", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  },
};
