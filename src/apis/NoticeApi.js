import { axiosNCYS } from "../configs/AxiosNCYS";

const NAME_API = "notice";

export const noticeApi = {
  async getAllNoticesAPI(accessToken, options) {
    const params = new URLSearchParams();

    if (options) {
      if (options.page) params.append("page", options.page.toString());
      if (options.limit) params.append("limit", options.limit.toString());
    }

    const res = await axiosNCYS.get(`/${NAME_API}/notice-by-user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });

    return res;
  },

  async getNoticeDetailAPI(accessToken, noticeId) {
    const res = await axiosNCYS.get(`/${NAME_API}/detail/${noticeId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res;
  },
};
