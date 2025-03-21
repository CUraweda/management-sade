import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ServiceApi } from "../../midleware/TicketingApi";
import Header from "../../Component/Header";
import { formatMoney } from "../../utils/String";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { removeEmptyProp } from "../../utils/Object";
import PaginationBar, { IpageMeta } from "../../Component/PaginationBar";
import Stat from "../../Component/Stat";
import Search from "../../Component/Form/Search";

const Layanan = () => {
  const [filter, setFilter] = useState<any>({
    page: 1,
    limit: 10,
  });

  const [paginate, setPaginate] = useState<IpageMeta>({ page: 1, limit: 10 });
  const [dataList, setDataList] = useState<any[]>([]);
  const getDataList = async () => {
    try {
      const res = await ServiceApi.showAll({
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
        title: "Gagal mengambil daftar layanan",
      });
    }
  };

  const [recaps, setRecaps] = useState<Record<string, any[]>>({
    by_location: [],
    by_category: [],
  });
  const getRecaps = async () => {
    try {
      const res = await ServiceApi.recap();
      const { by_location = [], by_category = [] } = res.data.data;
      setRecaps({ by_location, by_category });
    } catch {}
  };

  useEffect(() => {
    getDataList();
    getRecaps();
  }, [filter]);

  return (
    <>
      <Header links={[{ l: "Ticketing" }]} title="Layanan" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2  mb-6 mx-4">
        {recaps.by_location.map((dat, i) => (
          <Stat
            key={i}
            value={dat._count?.services ?? 0}
            label={dat.title ?? "-"}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-6 mx-4">
        {recaps.by_category.map((dat, i) => (
          <Stat
            key={i}
            titleStyle={{ color: dat.hex_color }}
            value={dat._count?.services ?? 0}
            label={dat.name ?? "-"}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mx-4 mb-6">
        <Search
          onEnter={(v) =>
            setFilter({ ...filter, search: v ? `title:${v}` : "" })
          }
        />
      </div>

      <div className="overflow-x-auto  mb-6 mx-4 bg-base-100 p-3 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th className="min-w-60">Nama</th>
              <th>Lokasi</th>
              <th>Biaya</th>
              <th>Pendapatan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((dat, i) => (
              <tr key={i}>
                <td>
                  <p className="text-base line-clamp-2">{dat.title ?? ""}</p>
                  {dat.category && (
                    <div
                      className="badge text-white"
                      style={{ backgroundColor: dat.category.hex_color }}
                    >
                      {dat.category.name}
                    </div>
                  )}
                </td>
                <td>
                  <p className="text-base line-clamp-1">
                    {dat.location?.title ?? ""}
                  </p>
                </td>
                <td>
                  <p className="text-base">{formatMoney(dat.price)}</p>
                  <span className="text-base-content/70">
                    per {dat.price_unit ?? ""}
                  </span>
                </td>
                <td>
                  <p className="text-lg font-semibold">
                    {formatMoney(dat.income)}
                  </p>
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

export default Layanan;
