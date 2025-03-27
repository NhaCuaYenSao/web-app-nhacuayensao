export const formatCurrency = (amount) => {
  const numStr = amount?.toString() || "0";
  if (numStr.length <= 9) {
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const truncated = numStr.slice(0, 9);
  return truncated.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "...";
};

export const formatNumber = (number, locale = "vi-VN") => {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(number);
};
