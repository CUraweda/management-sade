import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { BankSampah } from "../../midleware/Api";
import { LoginStore } from "../../store/Store";
import Swal from "sweetalert2";
import {
  ClassData,
  WasteCollectionItem,
  WasteTypeData,
} from "../../midleware/Utils";
import { FaArrowDownShortWide } from "react-icons/fa6";

const RekapSampah = () => {
  const { token } = LoginStore();
  const [rekapSampah, setRekapSampah] = useState<WasteCollectionItem[]>([]);
  const [dataWasteType, setDataWasteType] = useState<WasteTypeData[]>([]);
  const [dataClass, setDataClass] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedWasteType, setSelectedWasteType] = useState<string>("");
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [sorting, setSorting] = useState<boolean>(false);
  const [trigerSorting, setTrigerSorting] = useState<boolean>(false);
  const [listWaste, setListWaste] = useState<WasteCollectionItem[]>([]);

  useEffect(() => {
    fetchData();
    GetWasteType();
    GetClass();
  }, [selectedWasteType, selectedClassId, fromDate, toDate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await BankSampah.GetRekapBankSampah(
        token,
        selectedWasteType,
        selectedClassId,
        fromDate || "",
        toDate || ""
      );
      const rekap = response.data.data.result
      setRekapSampah(rekap);

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const GetWasteType = async () => {
    setLoading(true);
    try {
      const response = await BankSampah.GetDataDropdownWasteType(token);
      setDataWasteType(response.data.data.result);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const GetClass = async () => {
    setLoading(true);
    try {
      const response = await BankSampah.GetDataDropdownClass(token);
      setDataClass(response.data.data.result);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const worksheetData = rekapSampah.map((item, index) => ({
      No: index + 1,
      Nama: item.studentclass.student.full_name,
      Kelas: item.studentclass.student.class,
      "Jenis Sampah": item.wastetype?.name ?? "Tidak ada data",
      "Tanggal Timbang": new Date(item.collection_date).toLocaleDateString(),
      "Total (gram)": item.weight,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Bank Sampah");

    const wscols = [
      { wch: 5 },
      { wch: 20 },
      { wch: 15 },
      { wch: 20 },
      { wch: 15 },
      { wch: 10 },
    ];
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "rekap_bank_sampah.xlsx");
  };

  const handleChangeFromDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
    setCurrentPage(1);
  };

  const handleChangeToDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
    setCurrentPage(1);
  };

  const handleChangeWasteType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedWasteType(event.target.value);
    setCurrentPage(1);
  };

  const handleChangeClass = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassId(event.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(rekapSampah.length / itemsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    // rekapSampah.sort((a, b) => b.weight - a.weight)
    const currentItems = rekapSampah.slice(indexOfFirstItem, indexOfLastItem);
    console.log(sorting);
    sorting
    ? currentItems.sort((a, b) => a.weight - b.weight)
    : currentItems.sort((a, b) => b.weight - a.weight); 
    setListWaste(currentItems)
    // setSorting(!sorting);
    
   
  }, [trigerSorting, rekapSampah, indexOfFirstItem, indexOfLastItem]);

  const HandleSorting = () => {
    setSorting(!sorting);
    setTrigerSorting(!trigerSorting)
  };



  return (
    <div className="p-5 w-full">
      <span className="text-3xl font-bold">Rekap Bank Sampah</span>
      <div className="divider divider-warning"></div>
      <div className="flex gap-2 justify-end items-end flex-wrap">
        <label className="form-control w-md">
          <span className="label-text">Jenis Sampah</span>
          <select
            className="select select-bordered w-md"
            onChange={handleChangeWasteType}
            value={selectedWasteType}
          >
            <option value="">Pilih Jenis Sampah</option>
            {dataWasteType.map((item, index) => (
              <option value={item.id} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="form-control w-md">
          <span className="label-text">Kelas</span>
          <select
            className="select select-bordered w-md"
            onChange={handleChangeClass}
            value={selectedClassId}
          >
            <option value="">Pilih Kelas</option>
            {dataClass.map((item, index) => (
              <option value={item.id} key={index}>
                {item.class_name}
              </option>
            ))}
          </select>
        </label>
        <label className="form-control w-md">
          <span className="label-text">Dari</span>
          <input
            type="date"
            placeholder="Type here"
            className="input input-bordered w-md"
            value={fromDate}
            onChange={handleChangeFromDate}
          />
        </label>
        <label className="form-control w-md">
          <span className="label-text">Sampai</span>
          <input
            type="date"
            placeholder="Type here"
            className="input input-bordered w-md"
            value={toDate}
            onChange={handleChangeToDate}
          />
        </label>
        <button
          className="btn btn-ghost bg-blue-500 text-white hover:bg-blue-400"
          onClick={handleExport}
        >
          Eksport Data
        </button>
      </div>
      <div className="w-full bg-white p-3 rounded-md mt-5">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <table id="rekapTable" className="table table-zebra">
              <thead>
                <tr className="bg-blue-400">
                  <th>No</th>
                  <th>Nama</th>
                  <th>Kelas</th>
                  <th>Jenis Sampah</th>
                  <th>Tanggal Timbang</th>
                  <th>
                    <div className="flex gap-2 w-full justify-start items-center">
                      <span>Total (gram) </span>
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={HandleSorting}
                      >
                        <FaArrowDownShortWide />
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listWaste.map((item, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{item.studentclass.student.full_name}</td>
                    <td>{item.studentclass.student.class}</td>
                    <td>{item.wastetype?.name ?? "Tidak ada data"}</td>
                    <td>
                      {new Date(item.collection_date).toLocaleDateString()}
                    </td>
                    <td>{item.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="w-full flex justify-end mt-5">
          <div className="gap-1 flex items-center">
            <button
              className="btn btn-sm btn-outline"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Kembali
            </button>
            <span>
              Page {currentPage} of{" "}
              {Math.ceil(rekapSampah.length / itemsPerPage)}
            </span>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= rekapSampah.length}
            >
              Lanjut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekapSampah;
