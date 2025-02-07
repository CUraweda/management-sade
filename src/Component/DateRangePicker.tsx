import { RiCalendar2Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import moment from "moment";
import Select from "./Form/Select";
import Options from "../data/Options";
import Input from "./Form/Input";

export interface DateRange {
  start?: string;
  end?: string;
}

interface Props {
  value: DateRange;
  onChange: (val: DateRange) => void;
}

const DateRangePicker = ({ value, onChange }: Props) => {
  const [option, setOption] = useState<string>("");

  useEffect(() => {
    let start = "",
      end = "";

    if (option == "this_year") {
      start = moment().startOf("year").format("YYYY-MM-DD");
      end = moment().endOf("year").add(1, "day").format("YYYY-MM-DD");
    } else if (option == "this_month") {
      start = moment().startOf("month").format("YYYY-MM-DD");
      end = moment().endOf("month").add(1, "day").format("YYYY-MM-DD");
    } else if (option == "this_day") {
      start = moment().format("YYYY-MM-DD");
      end = moment().add(1, "day").format("YYYY-MM-DD");
    }

    onChange({
      start,
      end,
    });
  }, [option]);

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        role="button"
        type="button"
        className={
          "btn " + (value.end && value.start ? "btn-primary animate-pulse" : "")
        }
      >
        <RiCalendar2Line size={24} />
        Tanggal
      </button>
      <div
        tabIndex={0}
        className="dropdown-content bg-base-100 rounded-box z-[1] w-52 p-4 pb-2 shadow-lg "
      >
        <Select
          keyValue="value"
          keyDisplay="label"
          options={[...Options.dateRange, { label: "Kustom", value: "custom" }]}
          value={option}
          onChange={(e) => setOption(e.target.value)}
        />

        {option == "custom" && (
          <>
            <Input
              label="Awal"
              type="date"
              value={value.start}
              onChange={(e) => {
                onChange({ start: e.target.value, end: value.end });
              }}
            />
            <Input
              label="Akhir"
              type="date"
              value={value.end}
              onChange={(e) => {
                onChange({ start: value.start, end: e.target.value });
              }}
            />
          </>
        )}
        {/* <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="date_range_filter_type"
            role="tab"
            className="tab"
            aria-label="Periode"
            checked={mode == "period"}
            onChange={() => setMode("period")}
          />
          <div role="tabpanel" className="tab-content !py-0">
           
          </div>

          <input
            type="radio"
            name="date_range_filter_type"
            role="tab"
            className="tab"
            aria-label="Rentang tanggal"
            checked={mode == "range"}
            onChange={() => setMode("range")}
          />
          <div role="tabpanel" className="tab-content !py-0">
            <Input
              label="Awal"
              type="date"
              value={value.start}
              onChange={(e) => {
                onChange({ start: e.target.value, end: value.end });
              }}
            />
            <Input
              label="Akhir"
              type="date"
              value={value.end}
              onChange={(e) => {
                onChange({ start: value.start, end: e.target.value });
              }}
            />
          </div>
        </div>
        {value.start && value.end && (
          <button
            onClick={() => {
              if (mode == "period") setPeriod("");
              else onChange({ start: "", end: "" });
            }}
            type="button"
            className="btn btn-error btn-sm mt-3 w-full"
          >
            Reset
          </button>
        )} */}
      </div>
    </div>
  );
};

export default DateRangePicker;
