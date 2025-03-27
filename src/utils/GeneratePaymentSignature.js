import CryptoJS from "crypto-js";

export const generatePaymentSignature = (params, checksumKey) => {
  // Sort params alphabetically and create string
  const dataString = [
    `amount=${params.amount}`,
    `cancelUrl=${params.cancelUrl}`,
    `description=${params.description}`,
    `orderCode=${params.orderCode}`,
    `returnUrl=${params.returnUrl}`,
  ].join("&");

  // Create HMAC SHA256 hash using crypto-js
  const checksum = CryptoJS.HmacSHA256(dataString, checksumKey).toString();
  return checksum;
};
