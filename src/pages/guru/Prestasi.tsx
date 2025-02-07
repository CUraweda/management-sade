import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PrestasiApi } from "../../midleware/Api";
import Store from "../../store/Store";
import Header from "../../Component/Header";
import PaginationBar, { IpageMeta } from "../../Component/PaginationBar";
import { formatTime } from "../../utils/Date";
import Search from "../../Component/Form/Search";
import DateRangePicker from "../../Component/DateRangePicker";
import { FaDownload } from "react-icons/fa6";
import ClassPicker from "../../Component/ClassPicker";

const Prestasi = () => {
  const { token } = Store();
  const [filter, setFilter] = useState<any>({
    search_query: "",
    class_id: "",
    start_date: "",
    end_date: "",
    page: 0,
    limit: 0,
  });

  const [dataList, setDataList] = useState<any[]>([]);
  const [paginate, setPaginate] = useState<IpageMeta>({ page: 0, limit: 0 });
  const getDataList = async () => {
    try {
      const res = await PrestasiApi.showAll(token, {
        with_assign: "N",
        ...filter,
      });
      const { result, ...data } = res.data.data;

      setDataList(result ?? []);
      setPaginate(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil daftar prestasi",
      });
    }
  };

  useEffect(() => {
    getDataList();
  }, [filter]);

  const downloadFile = async (path: string) => {
    try {
      const res = await PrestasiApi.downloadFile(token, path);
      const blob = new Blob([res.data], { type: "application/pdf" });
      window.open(URL.createObjectURL(blob), "_blank");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengunduh file",
      });
    }
  };

  return (
    <>
      <Header links={[{ l: "Guru" }]} title="Pengumuman" />

      <div className="flex flex-wrap gap-2 mx-6 mb-6">
        <Search onEnter={(v) => setFilter({ ...filter, search_query: v })} />

        <ClassPicker
          value={filter.class_id}
          onChange={(id) => setFilter({ ...filter, class_id: id })}
        />

        <DateRangePicker
          value={{ start: filter.start_date, end: filter.end_date }}
          onChange={({ start, end }) =>
            setFilter({ ...filter, start_date: start, end_date: end })
          }
        />
      </div>

      <div className="overflow-x-auto mb-6 mx-6 bg-base-100 p-3 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>Prestasi</th>
              <th>Tanggal</th>
              <th>Sertifikat</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((dat, i) => (
              <tr key={i}>
                <td>
                  <p className="font-bold max-w-lg">
                    {dat.achievement_desc ?? ""}
                  </p>
                  <span className="text-base-content/70 text-sm">
                    {dat.student?.full_name ?? ""}
                  </span>
                </td>
                <td>
                  <p>{formatTime(dat.issued_at, "DD MMM YYYY")}</p>
                </td>
                <td>
                  <button
                    disabled={!dat.certificate_path}
                    onClick={() => downloadFile(dat.certificate_path)}
                    className="btn btn-sm btn-primary btn-square"
                  >
                    <FaDownload />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-6 mb-6">
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

export default Prestasi;
