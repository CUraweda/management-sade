import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { DaycareApi } from "../../midleware/TicketingApi";
import Header from "../../Component/Header";
import { formatMoney } from "../../utils/String";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { removeEmptyProp } from "../../utils/Object";
import PaginationBar, { IpageMeta } from "../../Component/PaginationBar";
import Search from "../../Component/Form/Search";
import Options from "../../data/Options";

const Daycare = () => {
  const [filter, setFilter] = useState<any>({
    page: 1,
    limit: 10,
  });

  const [paginate, setPaginate] = useState<IpageMeta>({ page: 1, limit: 10 });
  const [dataList, setDataList] = useState<any[]>([]);
  const getDataList = async () => {
    try {
      const res = await DaycareApi.prices({
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
        title: "Gagal mengambil daftar layanan harga",
      });
    }
  };

  useEffect(() => {
    getDataList();
  }, [filter]);

  return (
    <>
      <Header links={[{ l: "Ticketing" }]} title="Layanan Daycare" />

      <div className="flex flex-wrap gap-2 mx-4 mb-6">
        <Search
          onEnter={(v) =>
            setFilter({
              ...filter,
              search: v ? `title:${v}+billing_cycle:${v}` : "",
            })
          }
        />
      </div>

      <div className="overflow-x-auto  mb-6 mx-4 bg-base-100 p-3 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th className="min-w-40">Nama</th>
              <th>Biaya</th>
              <th>Banyak reservasi</th>
              <th>Pendapatan</th>
              <th>Ketersediaan</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((dat, i) => (
              <tr key={i}>
                <td>
                  <p className="text-base line-clamp-2">{dat.title ?? ""}</p>
                  <span className="text-base-content/70">
                    {
                      Options.timeCycle.find(
                        (o) => o.value == dat.invoice_cycle
                      )?.label
                    }
                  </span>
                </td>
                <td>
                  <p className="text-base">{formatMoney(dat.price)}</p>
                </td>
                <td>
                  <p className="text-base">{dat._count?.bookings ?? 0}</p>
                </td>
                <td>
                  <p className="text-lg font-semibold">
                    {formatMoney(dat.income)}
                  </p>
                </td>
                <td>
                  <div className="flex justify-center items-center">
                    {dat.is_available ? (
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

export default Daycare;
