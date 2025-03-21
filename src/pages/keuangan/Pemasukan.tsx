import { useEffect, useState } from "react";
import Header from "../../Component/Header";
import Swal from "sweetalert2";
import { KeuanganApi } from "../../midleware/Api";
import PaginationBar, { IpageMeta } from "../../Component/PaginationBar";
import Store from "../../store/Store";
import Search from "../../Component/Form/Search";
import { formatMoney } from "../../utils/String";

const Pemasukan = () => {
  const { token } = Store();
  const [filter, setFilter] = useState<any>({
    search_query: "",
    page: 0,
    limit: 0,
  });

  const [dataList, setDataList] = useState<any[]>([]);
  const [paginate, setPaginate] = useState<IpageMeta>({ page: 0, limit: 0 });
  const getDataList = async () => {
    try {
      const res = await KeuanganApi.getPaymentPosts(token, { ...filter });
      const { result, ...data } = res.data.data;

      setDataList(result ?? []);
      setPaginate(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil daftar pos pembayaran",
      });
    }
  };

  useEffect(() => {
    getDataList();
  }, [filter]);

  return (
    <>
      <Header links={[{ l: "Keuangan" }]} title="Pemasukan" />

      <div className="flex flex-wrap gap-2 mx-4 mb-6">
        <Search onEnter={(v) => setFilter({ ...filter, search_query: v })} />
      </div>

      <div className="overflow-x-auto mb-6 mx-4 bg-base-100 p-3 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th className="min-w-60">Pos</th>
              <th className="min-w-60">Pemasukan</th>
              <th className="min-w-40">Tertunda</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((dat, i) => (
              <tr key={i}>
                <td>
                  <p className="text-base">{dat.name ?? ""}</p>
                  <span className="text-base-content/70 text-sm">
                    {dat.desc ?? ""}
                  </span>
                </td>
                <td>
                  <p className="text-lg text-success font-semibold">
                    +{formatMoney(dat.paid ?? 0)}
                  </p>
                </td>
                <td>
                  <p className="text-lg text-error font-semibold">
                    {formatMoney(dat.pending ?? 0)}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>{" "}
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

export default Pemasukan;
