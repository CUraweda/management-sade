import { useEffect, useState } from "react";
import DateRangePicker from "../../Component/DateRangePicker";
import Search from "../../Component/Form/Search";
import Header from "../../Component/Header";
import PaginationBar, { IpageMeta } from "../../Component/PaginationBar";
import Store from "../../store/Store";
import { TrainingApi } from "../../midleware/HrdApi";
import Swal from "sweetalert2";
import { formatTime } from "../../utils/Date";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark, FaEye } from "react-icons/fa6";
import Stat from "../../Component/Stat";
import { Dialog, useDialog } from "../../Component/Dialog";

const Training = () => {
  const { token } = Store();
  const { openDialog } = useDialog();
  const dialogListAttendance = "list-training-attendance";

  const [filter, setFilter] = useState<any>({
    search: "",
    status: "",
    start_date: "",
    end_date: "",
    page: 0,
    limit: 0,
  });

  const [dataId, setDataId] = useState<number | null>(null);
  const [dataList, setDataList] = useState<any[]>([]);
  const [paginate, setPaginate] = useState<IpageMeta>({ page: 0, limit: 0 });
  const getDataList = async () => {
    try {
      const res = await TrainingApi.showAll(token, {
        ...filter,
      });
      const { result, ...data } = res.data.data;

      setDataList(result ?? []);
      setPaginate(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil daftar training",
      });
    }
  };

  useEffect(() => {
    getDataList();
    getStatuses();
  }, [filter]);

  const [statuses, setStatuses] = useState<any[]>([]);
  const getStatuses = async () => {
    try {
      const res = await TrainingApi.recapByStatus(token);
      const data = res.data.data;
      setStatuses(data ?? []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil rekap data status training",
      });
    }
  };

  const [attendances, setAttendances] = useState<any[]>([]);
  useEffect(() => {
    setAttendances([]);
    if (dataId)
      setAttendances(
        dataList.find((dl) => dl.id == dataId)?.trainingattendances ?? []
      );
  }, [dataId]);

  useEffect(() => {
    console.log(attendances);
  }, [attendances]);

  return (
    <>
      <Header links={[{ l: "HRD" }]} title="Training" />

      <Dialog
        title="Bukti kehadiran"
        onClose={() => setDataId(null)}
        id={dialogListAttendance}
      >
        {attendances.map((dat, i) => (
          <div className="mb-4 border p-4 rounded-xl" key={i}>
            <img
              src={(
                import.meta.env.VITE_REACT_API_HRD_URL + dat.img_path
              ).replace("api/", "")}
              alt=""
              className="w-full mb-2"
            />
            <p className="text-base font-bold">{dat.title ?? ""}</p>
            <span className="text-base-content/70">
              {dat.description ?? ""}
            </span>
          </div>
        ))}
      </Dialog>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-6 mx-4">
        {statuses
          .filter((d) => d.status)
          .map((dat, i) => (
            <Stat
              key={i}
              className={
                "cursor-pointer " +
                (filter.status == dat.status ? "border-4 border-primary" : "")
              }
              value={dat.total_data ?? 0}
              label={dat.status ?? "-"}
              onClick={() =>
                setFilter({
                  ...filter,
                  status: filter.status == dat.status ? "" : dat.status,
                })
              }
            />
          ))}
      </div>

      <div className="flex flex-wrap gap-2 mx-4 mb-6">
        <DateRangePicker
          value={{
            start: filter.start_date,
            end: filter.end_date,
          }}
          onChange={({ start, end }) =>
            setFilter({
              ...filter,
              start_date: start,
              end_date: end,
            })
          }
        />

        <Search onEnter={(v) => setFilter({ ...filter, search: v })} />
      </div>

      <div className="overflow-x-auto  mb-6 mx-4 bg-base-100 p-3 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th className="min-w-60">Pelatihan</th>
              <th className="min-w-60">Tujuan</th>
              <th className="min-w-40">Lokasi</th>
              <th className="min-w-60">Status</th>
              <th>Aktif</th>
              <th className="min-w-60">Pengusul</th>
              <th className="min-w-60">Karyawan</th>
              <th>Bukti kehadiran</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((dat, i) => (
              <tr key={i}>
                <td>
                  <p className="text-base font-semibold">{dat.title ?? "-"}</p>
                </td>
                <td>
                  <p className="line-clamp-3">{dat.purpose ?? "-"}</p>
                </td>
                <td>
                  <p className="text-base">{dat.location ?? "-"}</p>
                </td>
                <td>
                  <p className="text-base font-semibold">{dat.status ?? "-"}</p>
                  <span className="text-base-content/70">
                    {formatTime(dat.start_date, "DD MMM YYYY", {
                      fb: "-",
                    })}{" "}
                    s/d{" "}
                    {formatTime(dat.end_date, "DD MMM YYYY", {
                      fb: "-",
                    })}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center items-center">
                    {dat.is_active ? (
                      <FaCheckCircle className="text-success" size={20} />
                    ) : (
                      <FaCircleXmark className="text-error" size={20} />
                    )}
                  </div>
                </td>
                <td>
                  <p className="text-base">{dat.proposer?.full_name ?? "-"}</p>
                  <span className="text-base-content/70">
                    {dat.proposer?.occupation ?? "-"}
                  </span>
                </td>
                <td>
                  <p className="text-base">{dat.employee?.full_name ?? "-"}</p>
                  <span className="text-base-content/70">
                    {dat.employee?.occupation ?? "-"}
                  </span>
                </td>
                <td>
                  <button
                    disabled={!dat.trainingattendances?.length}
                    onClick={() => {
                      setDataId(dat.id);
                      openDialog(dialogListAttendance);
                    }}
                    className="btn btn-sm btn-square"
                  >
                    <FaEye />
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

export default Training;
