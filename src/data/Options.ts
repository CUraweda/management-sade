interface Option {
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
};

export default Options;
