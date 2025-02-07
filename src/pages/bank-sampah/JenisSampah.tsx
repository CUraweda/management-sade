import Swal from "sweetalert2";
import Header from "../../Component/Header";
import Store from "../../store/Store";
import { BankSampahApi } from "../../midleware/Api";
import { useEffect, useState } from "react";
import DateRangePicker from "../../Component/DateRangePicker";
import { formatMoney } from "../../utils/String";

const JenisSampah = () => {
  const { token } = Store();
  const [filter, setFilter] = useState<any>({
    start_date: "",
    end_date: "",
  });

  const [dataList, setDataList] = useState<any[]>([]);
  const getDataList = async () => {
    try {
      const res = await BankSampahApi.getWasteTypes(token, { ...filter });
      setDataList(res.data.data ?? []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil daftar jenis sampah",
      });
    }
  };

  useEffect(() => {
    getDataList();
  }, [filter]);

  return (
    <>
      <Header links={[{ l: "Bank sampah" }]} title="Jenis Sampah" />

      <div className="flex flex-wrap gap-2 mx-4 mb-6">
        <DateRangePicker
          value={{ start: filter.start_date, end: filter.end_date }}
          onChange={({ start, end }) =>
            setFilter({ ...filter, start_date: start, end_date: end })
          }
        />
      </div>

      <div className="overflow-x-auto mb-6 mx-4 bg-base-100 p-3 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>Sampah</th>
              <th>Terkumpul</th>
              <th>Keuntungan (perkiraan)</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((dat, i) => {
              const collections = dat.wastecollections?.length
                ? dat.wastecollections[0].total_weight / 1000
                : 0;
              return (
                <tr key={i}>
                  <td>
                    <p className="font-semibold text-base">{dat.name ?? ""}</p>
                    <span className="text-base-content/70 text-sm">
                      Harga {formatMoney(dat.price)} /kg
                    </span>
                  </td>
                  <td>
                    <p>{collections.toFixed(2)} kg</p>
                  </td>
                  <td>
                    <p className="text-lg font-semibold">
                      {formatMoney(collections * dat.price, { shorten: true })}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default JenisSampah;
