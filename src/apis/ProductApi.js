import { axiosNCYS } from "../configs/AxiosNCYS";

export const productApi = {
  async getProductByCategory(accessToken, categoryId, options) {
    const params = new URLSearchParams();

    if (options) {
      if (options.page) params.append("page", options.page.toString());
      if (options.limit) params.append("limit", options.limit.toString());
    }

    const res = await axiosNCYS.get(`/product/by-category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });
    return res;
  },

  async getProductByUser(accessToken, options) {
    const params = new URLSearchParams();

    if (options) {
      if (options.page) params.append("page", options.page.toString());
      if (options.limit) params.append("limit", options.limit.toString());
    }

    const res = await axiosNCYS.get("/product/by-seller", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });
    return res;
  },

  async getDetailProductByUser(accessToken, productId) {
    const res = await axiosNCYS.get(
      `/product/detail-by-seller/${parseInt(productId)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  },

  async getProducts(accessToken) {
    const res = await axiosNCYS.get("/product", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  },

  async getDetailProduct(accessToken, id) {
    const res = await axiosNCYS.get(`/product/detail/${parseInt(id)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  },
};
