import { DaftarDataPetugas } from "../../midleware/Api";
import { useState, useEffect } from "react";
import { LoginStore } from "../../store/Store";
import { ItemDataPetugas } from "../../midleware/Utils";
import * as XLSX from "xlsx";

const DaftarPetugas = () => {
  const { token } = LoginStore();
  const [dataPetugas, setdataPetugas] = useState<ItemDataPetugas[]>([]);

  // const currentDate = new Date();
  // const formattedDate = currentDate.toISOString().split("T")[0];
  const [date, setDate] = useState("");
  const [filterType, setFilterType] = useState("");
  useEffect(() => {
    fetchData();
  }, [date, filterType]);

  const fetchData = async () => {
    // setLoading(true);
    try {
      const response = await DaftarDataPetugas.GetAllDataPetugas(
        token,
        date,
        filterType
      );
      // const data = response.data.data.result;
      // const dataFilter = data.filter((value) => value.assignment_date == date);
      setdataPetugas(response.data.data.result);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  const handleExportData = () => {
    const formattedData = dataPetugas.map((item, index) => ({
      No: index + 1,
      Nama: item.name,
      Kelas: item.class.class_name,
      "Tanggal Tugas": item.assignment_date,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Petugas");

    const date = new Date().toISOString().split("T")[0];

    const wscols = [
      { wch: 5 },
      { wch: 20 },
      { wch: 15 },
      { wch: 20 },
      { wch: 15 },
    ];
    worksheet["!cols"] = wscols;
    XLSX.writeFile(workbook, `Data_Petugas_${date}.xlsx`);
  };
  return (
    <>
      <div className="p-5 w-full">
        <span className="text-3xl font-bold">Daftar Petugas</span>
        <div className="divider divider-warning"></div>
        <div className="flex gap-2 justify-end items-end">
          <label className="form-control w-md">
            <span className="label-text">Tanggal</span>
            <input
              type="date"
              placeholder="Type here"
              className="input input-bordered w-md"
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <label className="form-control w-md">
            <span className="label-text">Filter</span>
            <select
              className="select select-bordered w-md"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Filter</option>
              <option value="day">Perhari</option>
              <option value="week">Perminggu</option>
              <option value="month">Perbulan</option>
              <option value="year">Pertahun</option>
            </select>
          </label>

          <button
            className="btn btn-ghost bg-blue-500 text-white hover:bg-blue-400"
            onClick={handleExportData}
          >
            Eksport Data
          </button>
        </div>
        <div className="w-full bg-white p-3 rounded-md mt-5">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr className="bg-blue-400">
                  <th>No</th>
                  <th>Nama</th>
                  <th>Kelas</th>
                  <th>Tanggal Tugas</th>
                </tr>
              </thead>
              <tbody>
                {dataPetugas.map((item: ItemDataPetugas, index: number) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.class.class_name}</td>
                    <td>{item.assignment_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DaftarPetugas;
