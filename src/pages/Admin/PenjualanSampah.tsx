import React, { useEffect, useState } from "react";
import { BankSampah } from "../../midleware/Api";
import { LoginStore } from "../../store/Store";
import { PenjualanSampahData, WasteTypeData } from "../../midleware/Utils";
import * as XLSX from "xlsx";

const PenjualanSampah: React.FC = () => {
  // const today = new Date();
  // const formattedDate = today.toISOString().split("T")[0];
  const { token } = LoginStore();
  const [data, setData] = useState<PenjualanSampahData[]>([]);
  const [sampah, setJenisSampah] = useState<WasteTypeData[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [jenis, setJenis] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [startDate, setStartDate] = useState("2024-03-04");
  const [endDate, setEndDate] = useState("2024-03-04");

  const fetchData = async (
    page: number,
    limit: number,
    sortField?: string | null,
    sortOrder?: "asc" | "desc"
  ) => {
    try {
      const response = await BankSampah.GetPenjualanSampah(
        token,
        page,
        limit,
        sortField,
        jenis,
        sortOrder,
        startDate,
        endDate
      );
      const result: any = response.data;
      setData(result.data.result);
      setPage(result.page);
      setLimit(result.limit);
      setTotalRows(result.totalRows);
      setTotalPage(result.totalPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getListJenisSampah = async () => {
    try {
      const response = await BankSampah.GetDataDropdownWasteType(token);
      const result: any = response.data;
      const sortedResult = result.data.result.sort(
        (a: any, b: any) => a.id - b.id
      );
      const topId = sortedResult[0]?.id;
      setJenisSampah(sortedResult);
      setJenis(topId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleExportData = () => {
    const formattedData = data.map((item) => ({
      ID: item.id,
      "Jenis Sampah": item.name,
      Harga: item.price,
      "Total Berat (kg)": (item.total_weight / 1000).toFixed(2),
      "Total Harga": item.total_price,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Penjualan Sampah");

    const date = new Date().toISOString().split("T")[0];

    const wscols = [
      { wch: 5 },
      { wch: 20 },
      { wch: 15 },
      { wch: 20 },
      { wch: 15 },
    ];
    worksheet["!cols"] = wscols;
    XLSX.writeFile(workbook, `Penjualan_Sampah_${date}.xlsx`);
  };

  const formatting = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const formatWeight = (weightInGrams: number): string => {
    return `${(weightInGrams / 1000).toFixed(2)} kg`;
  };

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    fetchData(page, limit, field, order);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    if (newLimit > 0) {
      setLimit(newLimit);
    }
  };

  useEffect(() => {
    getListJenisSampah();
  }, []);

  useEffect(() => {
    fetchData(page, limit, sortField, sortOrder);
  }, [page, limit, sortField, sortOrder, startDate, endDate, jenis]);

  return (
    <>
      <div className="p-5 w-full">
        <span className="text-3xl font-bold">Rekap Penjualan Bank Sampah</span>
        <div className="divider divider-warning"></div>
        <div className="flex gap-2 justify-end items-end">
          <label className="form-control w-md">
            <span className="label-text">Jenis Sampah</span>
            <select
              className="select select-bordered w-md"
              value={jenis}
              onChange={(e) => setJenis(parseInt(e.target.value))}
            >
              {sampah.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control w-md">
            <span className="label-text">Dari</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input input-bordered w-md"
            />
          </label>
          <label className="form-control w-md">
            <span className="label-text">Sampai</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input input-bordered w-md"
            />
          </label>

          <button
            className="btn btn-ghost bg-blue-500 text-white hover:bg-blue-400"
            onClick={handleExportData}
          >
            Export
          </button>
        </div>
        <div className="w-full bg-white p-3 rounded-md mt-5">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr className="bg-blue-400">
                  <th>No</th>
                  <th onClick={() => handleSort("name")}>Jenis Sampah</th>
                  <th onClick={() => handleSort("price")}>Harga</th>
                  <th onClick={() => handleSort("total_weight")}>
                    Total Sampah (kilogram)
                  </th>

                  <th onClick={() => handleSort("total_price")}>Total Harga</th>
                </tr>
              </thead>
              <tbody>
                {data.map((listpenjualan, index) => (
                  <tr key={index}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{listpenjualan.name}</td>
                    <td>{formatting(listpenjualan.price)}</td>
                    <td>{formatWeight(listpenjualan.total_weight)}</td>
                    <td>{formatting(listpenjualan.total_price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex justify-end mt-5">
            <div className="join grid grid-cols-2 w-1/6 ">
              <button
                className="join-item btn btn-sm btn-outline"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
              >
                Previous page
              </button>
              <button
                className="join-item btn btn-sm btn-outline"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PenjualanSampah;
