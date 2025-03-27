import { get, post } from "../configs/axios-zalo";

export const updateOrderStatusAPI = async (data) => {
  const res = await post(`/303232492239435592/bank-callback-payment`, data);
  return res;
};

export const getOrderStatusAPI = async (params) => {
  console.log({ params });
  const paramsObject = new URLSearchParams();

  if (params) {
    if (params.orderId) {
      console.log(1);
      paramsObject.append("orderId", params.orderId.toString());
    }
    if (params.appId) {
      console.log(2);
      paramsObject.append("appId", params.appId.toString());
    }

    if (params.mac) {
      console.log(3);
      paramsObject.append("mac", params.mac.toString());
    }
  }
  const res = await get(
    `/get-status?appId=${miniAppId}&orderId=${checkoutSdkOrderId}&privateKey=${ENV.PRIVATE_KEY_SDK}`,
    {
      params,
    }
  );
  return res;
};
