import { HmacSHA256 } from "crypto-js";

export const createMAC = (params, privateKey) => {
  const dataMac = Object.keys(params)
    .sort()
    .map(
      (key) =>
        `${key}=${
          typeof params[key] === "object"
            ? JSON.stringify(params[key])
            : params[key]
        }`
    )
    .join("&");

  return HmacSHA256(dataMac, privateKey);
};
