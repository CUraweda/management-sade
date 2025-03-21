import { useEffect, useState } from "react";
import Header from "../../Component/Header";
import Swal from "sweetalert2";
import PaginationBar, { IpageMeta } from "../../Component/PaginationBar";
import Search from "../../Component/Form/Search";
import { PaymentApi } from "../../midleware/PmbApi";
import Options, { Option } from "../../data/Options";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { formatMoney } from "../../utils/String";
import Select from "../../Component/Form/Select";
import { Dialog, useDialog } from "../../Component/Dialog";

const fullPaymentOptions: Option[] = [
  { value: "Y", label: "Pembayaran penuh" },
  { value: "N", label: "Bukan pembayaran penuh" },
];

const Pembayaran = () => {
  const { openDialog } = useDialog();
  const dialogViewProof = "dialog-view-proof";

  const [filter, setFilter] = useState<any>({
    search_query: "",
    payment_type: "",
    transaction_status: "",
    full_payment: "",
    page: 0,
    limit: 0,
  });

  const [dataList, setDataList] = useState<any[]>([]);
  const [paginate, setPaginate] = useState<IpageMeta>({ page: 0, limit: 0 });
  const getDataList = async () => {
    try {
      const res = await PaymentApi.showAll({
        ...filter,
      });
      const { result, ...data } = res.data.data;

      setDataList(result ?? []);
      setPaginate(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil daftar pembayaran",
      });
    }
  };

  useEffect(() => {
    getDataList();
  }, [filter]);

  const [proofBuffer, setProofBuffer] = useState<any>(null);
  const getProofBuffer = async (path: string) => {
    try {
      const res = await PaymentApi.getBuff(path);
      setProofBuffer(res.data);

      openDialog(dialogViewProof);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengunduh bukti bayar",
      });
    }
  };

  return (
    <>
      <Header links={[{ l: "PMB" }]} title="Pembayaran" />

      <Dialog
        title="Bukti bayar"
        id={dialogViewProof}
        onClose={() => setProofBuffer(null)}
      >
        <img src={`data:image/png;base64,${proofBuffer}`} alt="" />
      </Dialog>

      <div className="flex flex-wrap gap-2 mx-4 mb-6">
        <Search onEnter={(v) => setFilter({ ...filter, search_query: v })} />

        <div>
          <Select
            placeholder="Metode pembayaran"
            keyValue="value"
            keyDisplay="label"
            value={filter.payment_type}
            options={Options.paymentType}
            onChange={(e) =>
              setFilter({ ...filter, payment_type: e.target.value })
            }
          />
        </div>

        <div>
          <Select
            placeholder="Semua"
            keyValue="value"
            keyDisplay="label"
            value={filter.full_payment}
            options={fullPaymentOptions}
            onChange={(e) =>
              setFilter({ ...filter, full_payment: e.target.value })
            }
          />
        </div>

        <div>
          <Select
            placeholder="Status"
            keyValue="value"
            keyDisplay="label"
            value={filter.transaction_status}
            options={Options.transactionStatus}
            onChange={(e) =>
              setFilter({ ...filter, transaction_status: e.target.value })
            }
          />
        </div>
      </div>

      <div className="overflow-x-auto  mb-6 mx-4 bg-base-100 p-3 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th className="min-w-60">Pengguna</th>
              <th>Pembayaran</th>
              <th>Pembayaran penuh</th>
              <th>Total</th>
              <th className="min-w-40">Status</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((dat, i) => (
              <tr key={i}>
                <td>
                  <p className="text-base">{dat.user?.full_name ?? ""}</p>
                  <span className="text-base-content/70">
                    {dat.user?.email ?? ""}
                  </span>
                </td>
                <td>
                  <p className="text-base whitespace-nowrap">
                    {Options.paymentType.find(
                      (o) => o.value == dat.payment_type
                    )?.label ?? ""}
                  </p>
                  <span className="text-base-content/70">
                    {dat.order_id ?? ""}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center">
                    {dat.full_payment ? (
                      <FaCheckCircle className="text-success" size={20} />
                    ) : (
                      <FaCircleXmark className="text-error" size={20} />
                    )}
                  </div>
                </td>
                <td>
                  <p className="text-lg  font-semibold">
                    {formatMoney(dat.gross_amount ?? 0)}
                  </p>
                </td>
                <td>
                  <p className="text-base">
                    {Options.transactionStatus.find(
                      (o) => o.value == dat.transaction_status
                    )?.label ?? ""}
                  </p>
                  {dat.payment_proof && (
                    <button
                      onClick={() => getProofBuffer(dat.payment_proof)}
                      className="link text-primary"
                    >
                      Bukti bayar
                    </button>
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
          onNextClick={() => setFilter({ ...filter, page: filter.page + 1 })}
          onPrevClick={() => setFilter({ ...filter, page: filter.page - 1 })}
          onLimitChange={(limit) => setFilter({ ...filter, limit, page: 0 })}
        />
      </div>
    </>
  );
};

export default Pembayaran;
