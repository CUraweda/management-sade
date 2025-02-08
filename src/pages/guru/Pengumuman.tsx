import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PengumumanApi } from "../../midleware/Api";
import Store from "../../store/Store";
import Header from "../../Component/Header";
import PaginationBar, { IpageMeta } from "../../Component/PaginationBar";
import { formatTime } from "../../utils/Date";
import Search from "../../Component/Form/Search";
import DateRangePicker from "../../Component/DateRangePicker";
import { FaDownload } from "react-icons/fa6";
import ClassPicker from "../../Component/ClassPicker";

const Pengumuman = () => {
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
      const res = await PengumumanApi.showAll(token, {
        with_assign: "N",
        ...filter,
      });
      const { result, ...data } = res.data.data;

      setDataList(result ?? []);
      setPaginate(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil data",
      });
    }
  };

  useEffect(() => {
    getDataList();
  }, [filter]);

  const downloadFile = async (id: string) => {
    try {
      const res = await PengumumanApi.downloadFile(token, id);
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

      <div className="flex flex-wrap gap-2 mx-4 mb-6">
        <DateRangePicker
          value={{ start: filter.start_date, end: filter.end_date }}
          onChange={({ start, end }) =>
            setFilter({ ...filter, start_date: start, end_date: end })
          }
        />

        <Search onEnter={(v) => setFilter({ ...filter, search_query: v })} />

        <ClassPicker
          value={filter.class_id}
          onChange={(id) => setFilter({ ...filter, class_id: id })}
        />
      </div>

      <div className="overflow-x-auto mb-6 mx-4 bg-base-100 p-3 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>Pengumuman</th>
              <th>Kelas</th>
              <th>Lampiran</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((dat, i) => (
              <tr key={i}>
                <td>
                  <span className="text-base-content/70 text-xs">
                    {formatTime(dat.date_start, "DD MMM YYYY")} ⟶{" "}
                    {formatTime(dat.date_end, "DD MMM YYYY")}
                  </span>
                  <p className="max-w-lg">{dat.announcement_desc ?? ""}</p>
                </td>
                <td>
                  <p>{dat.class?.class_name ?? ""}</p>
                </td>
                <td>
                  <button
                    disabled={!dat.file_path}
                    onClick={() => downloadFile(dat.id)}
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

export default Pengumuman;
