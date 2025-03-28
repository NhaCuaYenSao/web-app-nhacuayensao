import { axiosNCYS } from "~/configs/AxiosNCYS";

const NAME_API = "cloud";

export const uploadApi = {
  async uploadImage(data, config) {
    return await axiosNCYS.upload(`${NAME_API}/upload`, data , config);
  },
}