export interface Option {
  value: string;
  label: string;
}

const Options: Record<string, Option[]> = {
  dateRange: [
    { value: "this_year", label: "Tahun ini" },
    { value: "this_month", label: "Bulan ini" },
    { value: "this_day", label: "Hari ini" },
  ],
  sexes: [
    { value: "P", label: "Perempuan" },
    { value: "L", label: "Laki-laki" },
  ],
  timeCycle: [
    { value: "daily", label: "Harian" },
    { value: "monthly", label: "Bulanan" },
  ],
  statusClass: [
    { value: "0", label: "Reguler" },
    { value: "1", label: "ABK Tidak Dengan Pendamping" },
    { value: "2", label: "ABK Dengan Pendamping" },
  ],
  paymentType: [
    { value: "bank_transfer", label: "Transfer bank" },
    { value: "manual_transfer", label: "Transfer manual" },
  ],
  transactionStatus: [
    { value: "canceled", label: "Dibatalkan" },
    { value: "pending", label: "Tertunda" },
    { value: "settlement", label: "Selesai" },
  ],
};

export default Options;
