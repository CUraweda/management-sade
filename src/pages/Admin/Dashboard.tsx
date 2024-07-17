// import React from "react";
import { FaMoneyBill, FaTrashAlt } from "react-icons/fa";
import ChartMap from "../../Component/ChartMap";
import { useEffect, useState } from "react";
import { DashboardAdmin } from "../../midleware/Api";
import { LoginStore } from "../../store/Store";
import { formatMoney } from "../../utils";
import { FaScaleBalanced } from "react-icons/fa6";

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

  // helper
  const convertWeight = (val: number) => {
    let res = val.toString(),
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
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
          <div className="stat bg-base-100 rounded-lg">
            <div className="stat-figure text-primary">
              <FaTrashAlt size={28} />
            </div>
            <div className="stat-title">Total sampah bulan ini</div>
            <div className="stat-value text-primary">
              {convertWeight(trashMonth)}
            </div>
          </div>
          <div className="stat bg-base-100 rounded-lg">
            <div className="stat-figure text-primary">
              <FaTrashAlt size={28} />
            </div>
            <div className="stat-title">Total sampah hari ini</div>
            <div className="stat-value text-primary">
              {convertWeight(trashDay)}
            </div>
          </div>
          <div className="stat bg-base-100 rounded-lg">
            <div className="stat-figure text-success">
              <FaMoneyBill size={28} />
            </div>
            <div className="stat-title">Total penjualan bulan ini</div>
            <div className="stat-value text-success">
              {formatMoney(salesMonth)}
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="col-span-2">
            <div className="w-full flex justify-end gap-3 flex-wrap mb-3">
              <select className="select select-bordered">
                <option>Jenis Sampah</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
              <input type="date" placeholder="Type here" className="input" />
              -
              <input type="date" placeholder="Type here" className="input" />
            </div>

            <div className="w-full bg-white p-3 rounded-md">
              <ChartMap />
            </div>
          </div>

          <div className="col-span-1">
            <div className="bg-base-100 p-3 rounded-lg">
              <h4 className="text-lg font-bold mb-6">Ringkasan penjualan</h4>

              {salesItems.map((item, i) => (
                <div className="p-3" key={i}>
                  <div className="flex items-center mb-1 justify-between gap-1">
                    <h4 className="text-xl font-bold">{item.name ?? "-"} </h4>
                    <div className="text-sm">
                      {formatMoney(item.price)} / kg
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <div className="badge badge-primary py-3 px-4 text-xl font-medium gap-2">
                      <FaScaleBalanced />
                      {item.total_weight} kg
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
