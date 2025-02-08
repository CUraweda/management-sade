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
};

export default Options;
