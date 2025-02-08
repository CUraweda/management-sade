import { useEffect, useState } from "react";
import Header from "../../Component/Header";
import Swal from "sweetalert2";
import { KeuanganApi } from "../../midleware/Api";
import Store from "../../store/Store";
import PaginationBar, { IpageMeta } from "../../Component/PaginationBar";
import { formatTime } from "../../utils/Date";
import DateRangePicker from "../../Component/DateRangePicker";
import Search from "../../Component/Form/Search";
import ClassPicker from "../../Component/ClassPicker";
import Select from "../../Component/Form/Select";
import { FaFileExcel } from "react-icons/fa6";

const Laporan = () => {
  const { token } = Store();
  const [filter, setFilter] = useState<any>({
    search_query: "",
    payment_category_id: "",
    class_id: "",
    student_id: "",
    start_paid: "",
    end_paid: "",
    status: "",
    nis_prefix: "",
    page: 0,
    limit: 0,
  });

  const [dataList, setDataList] = useState<any[]>([]);
  const [paginate, setPaginate] = useState<IpageMeta>({ page: 0, limit: 0 });
  const getDataList = async () => {
    try {
      const res = await KeuanganApi.getReports(token, { ...filter });
      const { result, ...data } = res.data.data;

      setDataList(result ?? []);
      setPaginate(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil daftar laporan",
      });
    }
  };

  useEffect(() => {
    getDataList();
  }, [filter]);

  const exportDataList = async () => {
    try {
      const res = await KeuanganApi.exportReports(token, { ...filter });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "Laporan Pembayaran Siswa.xlsx");
      document.body.appendChild(link);

      link.click();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal mengekspor data laporan",
      });
    }
  };

  return (
    <>
      <Header links={[{ l: "Keuangan" }]} title="Laporan" />

      <div className="flex flex-wrap gap-2 mx-4 mb-6">
        <DateRangePicker
          value={{ start: filter.start_paid, end: filter.end_paid }}
          onChange={({ start, end }) =>
            setFilter({ ...filter, start_paid: start, end_paid: end })
          }
        />

        <Search onEnter={(v) => setFilter({ ...filter, search_query: v })} />

        <ClassPicker
          value={filter.class_id}
          onChange={(id) => setFilter({ ...filter, class_id: id })}
        />

        <div>
          <Select
            placeholder="Status"
            value={filter.status}
            options={["Lunas", "Belum Lunas"]}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          />
        </div>

        <button onClick={exportDataList} className="btn btn-success text-white">
          <FaFileExcel size={18} />
          Export
        </button>
      </div>

      <div className="overflow-x-auto mb-6 mx-4 bg-base-100 p-3 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th className="min-w-60">Siswa</th>
              <th className="min-w-60">Tagihan</th>
              <th className="min-w-40">Status</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((dat, i) => (
              <tr key={i}>
                <td>
                  <p className="text-base">{dat.student?.full_name ?? ""}</p>
                  <span className="text-base-content/70 text-sm">
                    {dat.student?.nis ?? ""}
                  </span>
                </td>
                <td>
                  <p className="font-semibold text-base">
                    {dat.studentpaymentbill?.name ?? ""}
                  </p>
                  <span className="text-base-content/70 text-sm">
                    {dat.studentpaymentbill?.paymentpost?.name ?? ""} -{" "}
                    {dat.studentpaymentbill?.paymentpost?.billing_cycle ?? ""}
                  </span>
                </td>
                <td>
                  <p
                    className={
                      "font-semibold text-base " +
                      (dat.status == "Lunas" ? "text-success" : "text-error")
                    }
                  >
                    {dat.status ?? ""}
                  </p>
                  <span>
                    {formatTime(dat.paidoff_at, "DD MMM YYYY, HH:mm")}
                  </span>
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

export default Laporan;
