import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { DoctorApi } from "../../midleware/TicketingApi";
import Header from "../../Component/Header";
import { formatMoney } from "../../utils/String";
import { FaCheckCircle, FaChevronDown } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { removeEmptyProp } from "../../utils/Object";
import PaginationBar, { IpageMeta } from "../../Component/PaginationBar";
import Stat from "../../Component/Stat";
import Search from "../../Component/Form/Search";
import { Dialog, useDialog } from "../../Component/Dialog";

const Spesialis = () => {
  const { openDialog } = useDialog();
  const dialogDetailDoctor = "detail-doctor";

  const [filter, setFilter] = useState<any>({
    page: 1,
    limit: 10,
  });

  const [paginate, setPaginate] = useState<IpageMeta>({ page: 1, limit: 10 });
  const [dataList, setDataList] = useState<any[]>([]);
  const getDataList = async () => {
    try {
      const res = await DoctorApi.showAll({
        ...removeEmptyProp(filter),
      });
      const { items, ...meta } = res.data.data;

      setDataList(items ?? []);
      setPaginate({
        ...meta,
        totalPage: meta.total_pages ?? 0,
        totalRows: meta.total_items ?? 0,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil daftar spesialis",
      });
    }
  };

  const [recaps, setRecaps] = useState<Record<string, any[]>>({
    by_location: [],
    by_category: [],
  });
  const getRecaps = async () => {
    try {
      const res = await DoctorApi.recap();
      const { by_location = [], by_category = [] } = res.data.data;
      setRecaps({ by_location, by_category });
    } catch {}
  };

  useEffect(() => {
    getDataList();
    getRecaps();
  }, [filter]);

  const [data, setData] = useState<any>(null);
  useEffect(() => {
    if (data) openDialog(dialogDetailDoctor);
  }, [data]);

  return (
    <>
      <Header links={[{ l: "Ticketing" }]} title="Spesialis" />

      <Dialog
        title={data?.first_name ?? "Detail"}
        onClose={() => setData(null)}
        id={dialogDetailDoctor}
      >
        {data?.services?.map((serv: any, i: number) => (
          <div className="mb-4 border-b p-4" key={i}>
            <p className="text-base">{serv.service?.title ?? ""}</p>
            <span className="text-base-content/70">
              Bayaran: {formatMoney(serv.salary)}
            </span>
          </div>
        ))}
      </Dialog>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2  mb-6 mx-4">
        {recaps.by_location.map((dat, i) => (
          <Stat
            key={i}
            value={dat._count?.doctors ?? 0}
            label={dat.title ?? "-"}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-6 mx-4">
        {recaps.by_category.map((dat, i) => (
          <Stat
            key={i}
            value={dat._count?.id ?? 0}
            label={dat.category ?? "-"}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mx-4 mb-6">
        <Search
          onEnter={(v) =>
            setFilter({
              ...filter,
              search: v ? `first_name:${v}+last_name:${v}` : "",
            })
          }
        />
      </div>

      <div className="overflow-x-auto  mb-6 mx-4 bg-base-100 p-3 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th className="min-w-60">Nama</th>
              <th>Lokasi</th>
              <th>Layanan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((dat, i) => (
              <tr key={i}>
                <td>
                  <p className="text-base line-clamp-2">
                    {dat.first_name ?? ""} {dat.last_name ?? ""}
                  </p>
                  <span className="text-base-content/70">
                    {dat.category ?? ""}
                  </span>
                </td>
                <td>
                  <p className="text-base line-clamp-1">
                    {dat.location?.title ?? ""}
                  </p>
                </td>
                <td>
                  <button onClick={() => setData(dat)} className="btn btn-sm">
                    {dat.services?.length}
                    <FaChevronDown />
                  </button>
                </td>
                <td>
                  {dat.is_active ? (
                    <FaCheckCircle className="text-success" size={20} />
                  ) : (
                    <FaCircleXmark className="text-error" size={20} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-4 mb-6">
        <PaginationBar
          meta={paginate}
          initialPage={1}
          onNextClick={() => setFilter({ ...filter, page: filter.page + 1 })}
          onPrevClick={() => setFilter({ ...filter, page: filter.page - 1 })}
          onLimitChange={(limit) => setFilter({ ...filter, limit })}
        />
      </div>
    </>
  );
};

export default Spesialis;
