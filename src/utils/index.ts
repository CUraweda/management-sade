export const formatMoney = (
  number: number,
  locale = "id-ID",
  currency = "IDR"
) => {
  let formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(number);

  if (formatted.includes(",")) {
    formatted = formatted.replace(/,00$/, "");
  }

  return formatted;
};
