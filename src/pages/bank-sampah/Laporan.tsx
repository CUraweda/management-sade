import { useEffect, useState } from "react";
import Header from "../../Component/Header";
import Store from "../../store/Store";
import Swal from "sweetalert2";
import { BankSampahApi } from "../../midleware/Api";
import PaginationBar, { IpageMeta } from "../../Component/PaginationBar";
import { formatTime } from "../../utils/Date";
import Search from "../../Component/Form/Search";
import ClassPicker from "../../Component/ClassPicker";
import DateRangePicker from "../../Component/DateRangePicker";
import Select from "../../Component/Form/Select";

const Laporan = () => {
  const { token } = Store();
  const [filter, setFilter] = useState<any>({
    search_query: "",
    waste_type_id: "",
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
      const res = await BankSampahApi.getCollections(token, { ...filter });
      const { result, ...data } = res.data.data;

      setDataList(result ?? []);
      setPaginate(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil daftar setoran bank sampah",
      });
    }
  };

  useEffect(() => {
    getDataList();
    getWasteTypes();
  }, [filter]);

  const [wasteTypes, setWasteTypes] = useState<any[]>([]);
  const getWasteTypes = async () => {
    try {
      const res = await BankSampahApi.getWasteTypesMinimal(token, {
        limit: 2000,
      });
      const { result } = res.data.data;
      setWasteTypes(result ?? []);
    } catch (error) {}
  };

  return (
    <>
      <Header links={[{ l: "Bank sampah" }]} title="Laporan" />

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

        <div>
          <Select
            placeholder="Jenis sampah"
            keyValue="id"
            keyDisplay="name"
            value={filter.waste_type_id}
            options={wasteTypes}
            onChange={(e) =>
              setFilter({ ...filter, waste_type_id: e.target.value })
            }
          />
        </div>
      </div>

      <div className="overflow-x-auto mb-6 mx-4 bg-base-100 p-3 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th className="min-w-40">Bobot masuk</th>
              <th>Jenis sampah</th>
              <th className="min-w-60">Siswa</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((dat, i) => (
              <tr key={i}>
                <td>
                  <p className="font-bold text-base max-w-lg">
                    {((dat.weight ?? 0) / 1000).toFixed(3)} kg
                  </p>
                  <span className="text-base-content/70 text-sm">
                    {formatTime(dat.collection_date, "DD MMM YYYY HH:mm")}
                  </span>
                </td>
                <td>
                  <p className="line-clamp-1">{dat.wastetype?.name ?? ""}</p>
                </td>
                <td>
                  <p>{dat.studentclass?.student?.full_name ?? ""}</p>
                  <span className="text-base-content/70 text-sm">
                    {dat.studentclass?.student?.nis ?? ""}{" "}
                    {dat.studentclass?.class?.class_name ?? ""}
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
