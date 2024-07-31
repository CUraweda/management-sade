// import React from "react";
import { FaLongArrowAltRight, FaMoneyBill, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BankSampah, DashboardAdmin } from "../../midleware/Api";
import { LoginStore } from "../../store/Store";
import { formatMoney } from "../../utils";
import { FaScaleBalanced } from "react-icons/fa6";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import moment from "moment";

type TchartShow = "trash" | "income";

const Dashboard = () => {
  const { token } = LoginStore();

  // cards
  const [trashMonth, setTrashMonth] = useState(0),
    [trashDay, setTrashDay] = useState(0),
    [salesMonth, setSalesMonth] = useState(0),
    [salesItems, setSalesItems] = useState<any[]>([]);

  const getCards = async () => {
    try {
      const res = await DashboardAdmin.getCards(token);
      const data = res.data;

      setTrashMonth(data.trash?.this_month ?? 0);
      setTrashDay(data.trash?.today ?? 0);
      setSalesMonth(data.sales?.total ?? 0);
      setSalesItems(data.sales?.details ?? []);
    } catch {}
  };

  useEffect(() => {
    getCards();
  }, []);

  // charts
  const [wasteTypes, setWasteTypes] = useState<any[]>([]),
    [classes, setClasses] = useState<any[]>([]);

  const [chartWasteTypeId, setChartWasteTypeId] = useState(""),
    [chartClassId, setChartClassId] = useState(""),
    [chartStartDate, setChartStartDate] = useState(""),
    [chartEndDate, setChartEndDate] = useState(""),
    [chartShow, setChartShow] = useState<TchartShow>("trash");

  const getWasteTypes = async () => {
    try {
      const res = await BankSampah.GetJenisSampah(token, "0", "100000");
      setWasteTypes(res.data?.data?.result ?? []);
    } catch {}
  };

  const getClasses = async () => {
    try {
      const response = await BankSampah.GetDataDropdownClass(token);
      setClasses(response.data.data.result);
    } catch {}
  };

  useEffect(() => {
    getWasteTypes();
    getClasses();
  }, []);

  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    chart: {
      type: "area",
      height: 400,
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Perolehan Sampah",
      align: "left",
    },

    // labels: monthDataSeries1.dates,
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      opposite: false,
    },
    legend: {
      horizontalAlign: "right",
    },
  });

  const [chartSeries, setChartSeries] = useState<
    { name: string; data: number[] }[]
  >([]);

  const enumerateDaysBetweenDates = (from: string, to: string) => {
    let dates: string[] = [];

    let currentDate = moment(from).startOf("day");
    let endDate = moment(to).startOf("day");

    while (currentDate.isSameOrBefore(endDate)) {
      currentDate = currentDate.add(1, "days");
      dates.push(currentDate.format("YYYY-MM-DD"));
    }

    return dates;
  };

  const getCharts = async () => {
    let chartTitle: string =
        chartShow == "trash" ? "Perolehan Sampah" : "Perolehan Pendapatan",
      seriesTitle: string =
        chartShow == "trash" ? "Sampah (gram)" : "Pendapatan (Rp)",
      dates: any[] = [],
      values: any[] = [];

    try {
      if (chartWasteTypeId) {
        const res = await DashboardAdmin.getChartByWaste(
          token,
          chartWasteTypeId,
          chartStartDate,
          chartEndDate,
          chartClassId
        );

        values =
          res.data?.map((d: any) =>
            chartShow == "trash"
              ? parseFloat(d.weight?.toFixed(2) ?? 0)
              : d.price
          ) ?? [];

        if (chartStartDate && chartEndDate) {
          const tempDates =
            res.data?.map((d: any) =>
              d.date ? moment(d.date).format("YYYY-MM-DD") : ""
            ) ?? [];
          dates = enumerateDaysBetweenDates(chartStartDate, chartEndDate);

          const tempVal = [...dates].reduce((acc: any[], cur: any) => {
            if (tempDates.includes(cur))
              acc.push(values[tempDates.indexOf(cur)]);
            else acc.push(0);
            return acc;
          }, []);

          values = tempVal;
        } else dates = res.data?.map((d: any) => d.date) ?? [];
      } else {
        const res = await DashboardAdmin.getChart(
          token,
          chartStartDate,
          chartEndDate,
          chartClassId
        );

        values =
          res.data?.map((d: any) =>
            chartShow == "trash"
              ? parseFloat(d.total_weight?.toFixed(2) ?? 0)
              : d.total_price
          ) ?? [];

        if (chartStartDate && chartEndDate) {
          const tempDates = res.data?.map((d: any) => d.date) ?? [];
          dates = enumerateDaysBetweenDates(chartStartDate, chartEndDate);

          const tempVal = [...dates].reduce((acc: any[], cur: any) => {
            if (tempDates.includes(cur))
              acc.push(values[tempDates.indexOf(cur)]);
            else acc.push(0);
            return acc;
          }, []);
          values = tempVal;
        } else dates = res.data?.map((d: any) => d.date) ?? [];
      }
      setChartOptions({
        ...chartOptions,
        title: {
          ...chartOptions.title,
          text: chartTitle,
        },
        labels: dates,
      });
      setChartSeries([{ name: seriesTitle, data: values }]);
    } catch {}
  };

  useEffect(() => {
    getCharts();
  }, [chartShow, chartWasteTypeId, chartStartDate, chartEndDate]);

  // helper
  const convertWeight = (val: number) => {
    let res = val.toFixed(2),
      unit = "gram";

    if (val > 1000) {
      res = (val / 1000).toFixed(2);
      unit = "kg";
    }

    return (
      <>
        {res}
        <span className="text-base font-normal">{unit}</span>
      </>
    );
  };

  return (
    <>
      <div className="w-full p-5">
        <div className="w-full flex flex-wrap gap-3 mt-3">
          <div className="stat w-fit grow bg-base-100 rounded-lg">
            <div className="stat-figure text-primary">
              <FaTrashAlt size={28} />
            </div>
            <div className="stat-title">Total sampah bulan ini</div>
            <div className="stat-value text-primary overflow-x-auto overflow-y-hidden">
              {/* {convertWeight(trashMonth)} */}
              {trashMonth}
              <span className="text-base font-normal">gram</span>
            </div>
          </div>
          <div className="stat w-fit grow bg-base-100 rounded-lg">
            <div className="stat-figure text-primary">
              <FaTrashAlt size={28} />
            </div>
            <div className="stat-title">Total sampah hari ini</div>
            <div className="stat-value text-primary overflow-x-auto overflow-y-hidden">
              {/* {convertWeight(trashDay)} */}
              {trashDay}
              <span className="text-base font-normal">gram</span>
            </div>
          </div>
          <div className="stat w-fit grow bg-base-100 rounded-lg">
            <div className="stat-figure text-success">
              <FaMoneyBill size={28} />
            </div>
            <div className="stat-title">Total penjualan bulan ini</div>
            <div className="stat-value text-success overflow-x-auto overflow-y-hidden">
              {formatMoney(salesMonth)}
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="col-span-2">
            <div className="w-full flex items-center justify-end gap-3 flex-wrap mb-3">
              <select
                value={chartClassId}
                onChange={(e) => setChartClassId(e.target.value)}
                className="select select-bordered"
              >
                <option value="" selected>
                  Kelas
                </option>
                {classes.map((dat, i) => (
                  <option key={i} value={dat.id}>
                    {dat.level} {dat.class_name}
                  </option>
                ))}
              </select>
              <select
                value={chartShow}
                onChange={(e) => setChartShow(e.target.value as TchartShow)}
                className="select select-bordered"
              >
                <option value="trash">Perolehan sampah</option>
                <option value="income">Perolehan pendapatan</option>
              </select>
              <select
                value={chartWasteTypeId}
                onChange={(e) => setChartWasteTypeId(e.target.value)}
                className="select select-bordered"
              >
                <option value="">Jenis sampah</option>
                {wasteTypes.map((dat, i) => (
                  <option value={dat.id} key={i}>
                    {dat.code ?? ""} - {dat.name ?? ""}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={chartStartDate}
                  onChange={(e) => setChartStartDate(e.target.value)}
                  className="input input-bordered"
                />
                <FaLongArrowAltRight className="text-gray-500" />
                <input
                  type="date"
                  value={chartEndDate}
                  onChange={(e) => setChartEndDate(e.target.value)}
                  className="input input-bordered"
                />
              </div>
            </div>

            <div className="w-full bg-white p-3 rounded-md">
              <div id="chart" className="">
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="area"
                  height={450}
                />
              </div>
              <div id="html-dist"></div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="bg-base-100 p-3 rounded-lg">
              <h4 className="text-lg font-bold mb-6">Ringkasan penjualan</h4>

              {salesItems.map((item, i) => (
                <div className="px-3" key={i}>
                  <div className="flex items-center mb-1 justify-between gap-1">
                    <h4 className="text-xl font-bold">{item.name ?? "-"} </h4>
                    <div className="text-sm">
                      {formatMoney(item.price)} / kg
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <div className="badge badge-primary py-3 px-4 text-xl font-medium gap-2">
                      <FaScaleBalanced />
                      {convertWeight(item.total_weight)}
                    </div>
                    <div className="badge badge-success py-3  px-4 text-xl text-white font-medium gap-2">
                      <FaMoneyBill />
                      {formatMoney(item.total_price)}
                    </div>
                  </div>
                  <div className="divider"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
