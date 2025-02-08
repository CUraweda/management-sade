import { useEffect, useState } from "react";
import DateRangePicker from "../../Component/DateRangePicker";
import Search from "../../Component/Form/Search";
import Header from "../../Component/Header";
import PaginationBar, { IpageMeta } from "../../Component/PaginationBar";
import Store from "../../store/Store";
import { KaryawanApi } from "../../midleware/HrdApi";
import Swal from "sweetalert2";
import { formatTime } from "../../utils/Date";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import Stat from "../../Component/Stat";

const Karyawan = () => {
  const { token } = Store();

  const [filter, setFilter] = useState<any>({
    search: "",
    employee_status: "",
    division_id: "",
    probation_start_date: "",
    probation_end_date: "",
    page: 0,
    limit: 0,
  });

  const [dataList, setDataList] = useState<any[]>([]);
  const [paginate, setPaginate] = useState<IpageMeta>({ page: 0, limit: 0 });
  const getDataList = async () => {
    try {
      const res = await KaryawanApi.showAll(token, {
        ...filter,
      });
      const { result, ...data } = res.data.data;

      setDataList(result ?? []);
      setPaginate(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil daftar karyawan",
      });
    }
  };

  useEffect(() => {
    getDataList();
    getDivisions();
    getStatuses();
  }, [filter]);

  const [divisions, setDivisions] = useState<any[]>([]);
  const getDivisions = async () => {
    try {
      const res = await KaryawanApi.recapByDivision(token);
      const data = res.data.data;
      setDivisions(data ?? []);
    } catch (error) {}
  };

  const [statuses, setStatuses] = useState<any[]>([]);
  const getStatuses = async () => {
    try {
      const res = await KaryawanApi.recapStatus(token);
      const data = res.data.data;
      setStatuses(data ?? []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil rekap data divisi",
      });
    }
  };

  return (
    <>
      <Header links={[{ l: "HRD" }]} title="Karyawan" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-6 mx-4">
        {statuses
          .filter((d) => d.employee_status)
          .map((dat, i) => (
            <Stat
              key={i}
              className={
                "cursor-pointer " +
                (filter.employee_status == dat.employee_status
                  ? "border-4 border-primary"
                  : "")
              }
              value={dat.total_data ?? 0}
              label={dat.employee_status ?? "-"}
              onClick={() =>
                setFilter({
                  ...filter,
                  employee_status:
                    filter.employee_status == dat.employee_status
                      ? ""
                      : dat.employee_status,
                })
              }
            />
          ))}
      </div>

      <div className="flex flex-wrap gap-2 mx-4 mb-6">
        <DateRangePicker
          value={{
            start: filter.probation_start_date,
            end: filter.probation_end_date,
          }}
          onChange={({ start, end }) =>
            setFilter({
              ...filter,
              probation_start_date: start,
              probation_end_date: end,
            })
          }
        />

        <Search onEnter={(v) => setFilter({ ...filter, search: v })} />
      </div>

      <div className="overflow-x-auto  mb-6 mx-4 bg-base-100 p-3 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th className="min-w-60">Profil</th>
              <th className="min-w-60">Kontak</th>
              <th>Divisi</th>
              {/* division */}
              <th className="min-w-40">Pekerjaan</th>
              <th className="min-w-60">Status magang</th>
              <th className="min-w-44">Status kontrak</th>
              <th className="min-w-44">Status karyawan</th>
              <th>Akun</th>
              <th>Guru</th>
              <th className="min-w-40">Kelahiran</th>
              <th className="min-w-60">Pendidikan</th>
              <th className="min-w-40">Status</th>
              <th>Agama</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((dat, i) => (
              <tr key={i}>
                <td>
                  <p className="text-base">{dat.full_name ?? "-"}</p>
                  <span className="text-base-content/70">
                    NIK {dat.nik ?? "-"}
                  </span>
                </td>
                <td>
                  <p className="text-base">{dat.phone ?? "-"}</p>
                  <span className="text-base-content/70">
                    {dat.email ?? "-"}
                  </span>
                </td>
                <td>
                  {divisions.find((d) => d.division_id == dat.division_id)
                    ?.name ?? "-"}
                </td>
                <td>
                  <p className="text-base">{dat.occupation ?? "-"}</p>
                  <span className="text-base-content/70">
                    {dat.duty ?? "-"}
                  </span>
                </td>
                <td>
                  {dat.still_in_probation ? (
                    <p className="text-base text-success">Inaktif</p>
                  ) : (
                    <p className="text-base text-error">Inaktif</p>
                  )}
                  <span className="text-base-content/70">
                    {formatTime(dat.probation_start_date, "DD MMM YYYY", {
                      fb: "-",
                    })}{" "}
                    s/d{" "}
                    {formatTime(dat.probation_end_date, "DD MMM YYYY", {
                      fb: "-",
                    })}
                  </span>
                </td>
                <td>
                  {dat.is_on_contract ? (
                    <p className="text-base text-success">Inaktif</p>
                  ) : (
                    <p className="text-base text-error">Inaktif</p>
                  )}
                  <span className="text-base-content/70">
                    Sampai{" "}
                    {formatTime(dat.contract_end_date, "DD MMM YYYY", {
                      fb: "-",
                    })}
                  </span>
                </td>
                <td>
                  <p className="text-base">{dat.employee_status ?? "-"}</p>
                  <span className="text-base-content/70">
                    Mulai{" "}
                    {formatTime(dat.work_start_date, "DD MMM YYYY", {
                      fb: "-",
                    })}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center items-center">
                    {dat.is_teacher ? (
                      <FaCheckCircle className="text-success" size={20} />
                    ) : (
                      <FaCircleXmark className="text-error" size={20} />
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex justify-center items-center">
                    {dat.user_id != null ? (
                      <FaCheckCircle className="text-success" size={20} />
                    ) : (
                      <FaCircleXmark className="text-error" size={20} />
                    )}
                  </div>
                </td>
                <td>
                  <p className="text-base">{dat.pob ?? ""}</p>
                  <span className="text-base-content/70">
                    {formatTime(dat.dob, "DD MMM YYYY", {
                      fb: "-",
                    })}
                  </span>
                </td>
                <td>
                  <p className="text-base">{dat.last_education ?? ""}</p>
                  <span className="text-base-content/70">
                    Jurusan {dat.major ?? "-"}
                  </span>
                </td>
                <td>
                  <p className="text-base">{dat.gender ?? ""}</p>
                  <span className="text-base-content/70">
                    {dat.marital_status ?? "-"}
                  </span>
                </td>
                <td>
                  <p className="text-base">{dat.religion ?? ""}</p>
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

export default Karyawan;
