import { useEffect, useState } from "react";
import Header from "../../Component/Header";
import Store from "../../store/Store";
import Swal from "sweetalert2";
import { GajiApi } from "../../midleware/HrdApi";
import PaginationBar, { IpageMeta } from "../../Component/PaginationBar";
import Search from "../../Component/Form/Search";
import { formatMoney } from "../../utils/String";
import Stat from "../../Component/Stat";

const Gaji = () => {
  const { token } = Store();

  const [filter, setFilter] = useState<any>({
    search: "",
    page: 0,
    limit: 0,
  });

  const [dataList, setDataList] = useState<any[]>([]);
  const [paginate, setPaginate] = useState<IpageMeta>({ page: 0, limit: 0 });
  const getDataList = async () => {
    try {
      const res = await GajiApi.showAll(token, {
        ...filter,
        no_month: "Y",
      });
      const { result, ...data } = res.data.data;

      setDataList(result ?? []);
      setPaginate(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil daftar gaji",
      });
    }
  };

  useEffect(() => {
    getDataList();
    getStatus();
  }, [filter]);

  const [status, setStatus] = useState({
    paid: { length: 0, total: 0 },
    unpaid: { length: 0, total: 0 },
  });
  const getStatus = async () => {
    try {
      const res = await GajiApi.recapByStatus(token);
      setStatus(res.data.data ?? {});
    } catch {}
  };

  return (
    <>
      <Header links={[{ l: "HRD" }]} title="Gaji" />

      <div className="grid grid-cols-2 gap-2 mb-6 mx-4">
        <Stat
          label="Terbayar"
          value={status.paid.length}
          bottomLabel={`Total: ${formatMoney(status.paid.total)}`}
        />
        <Stat
          label="Belum dibayar"
          value={status.unpaid.length}
          bottomLabel={`Total: ${formatMoney(status.unpaid.total)}`}
        />
      </div>

      <div className="flex flex-wrap gap-2 mx-4">
        <Search onEnter={(v) => setFilter({ ...filter, search: v })} />
      </div>

      <div className="overflow-x-auto  mb-6 mx-4 bg-base-100 p-3 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th className="min-w-60">Karyawan</th>
              <th>Status</th>
              <th>Terbayar</th>
              <th>Total kalkulasi</th>
              <th>Gaji tetap</th>
              <th>Tunjangan</th>
              <th>Penghasilan lain</th>
              <th>Utang</th>
              <th>Koperasi</th>
              <th>Fasilitas</th>
              <th>Potongan lain</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((dat, i) => (
              <tr key={i}>
                <td>
                  <p className="text-base">{dat.employee?.full_name ?? ""}</p>
                  <span className="text-base-content/70">
                    {dat.employee?.occupation ?? ""}
                  </span>
                </td>
                <td>
                  <p
                    className={
                      "text-base " +
                      (dat.is_paid ? "text-success" : "text-error")
                    }
                  >
                    {dat.status ?? ""}
                  </p>
                </td>
                <td>
                  <p className="text-base font-semibold">
                    {formatMoney(dat.paid_amount)}
                  </p>
                </td>
                <td>
                  <p className="text-base">{formatMoney(dat.temp_total)}</p>
                </td>
                <td>
                  <p className="text-base text-success whitespace-nowrap">
                    +{formatMoney(dat.fixed_salary)}
                  </p>
                </td>
                <td>
                  <p className="text-base text-success whitespace-nowrap">
                    +{formatMoney(dat.variable_salary)}
                  </p>
                </td>
                <td>
                  <p className="text-base text-success whitespace-nowrap">
                    +{formatMoney(dat.other_income)}
                  </p>
                </td>
                <td>
                  <p className="text-base text-error whitespace-nowrap">
                    {formatMoney(dat.loan)}
                  </p>
                </td>
                <td>
                  <p className="text-base text-error whitespace-nowrap">
                    -{formatMoney(dat.cooperative)}
                  </p>
                </td>
                <td>
                  <p className="text-base text-error whitespace-nowrap">
                    -{formatMoney(dat.facility)}
                  </p>
                </td>
                <td>
                  <p className="text-base text-error whitespace-nowrap">
                    -{formatMoney(dat.other_cut)}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-4 mb-6">
        <PaginationBar
          meta={paginate}
          onNextClick={() => setFilter({ ...filter, page: filter.page + 1 })}
          onPrevClick={() => setFilter({ ...filter, page: filter.page - 1 })}
          onLimitChange={(limit) => setFilter({ ...filter, limit })}
        />
      </div>
    </>
  );
};

export default Gaji;
