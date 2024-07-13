// import React from "react";
import * as XLSX from "xlsx";
const RekapSampah = () => {
  const data = [
    {
      no: 1,
      nama: "Cy Ganderton",
      kelas: "9",
      jenisSampah: "Botol",
      tanggalTimbang: "2 Juni 2024",
      total: 240,
    },
    {
      no: 2,
      nama: "Alice Johnson",
      kelas: "10",
      jenisSampah: "Kertas",
      tanggalTimbang: "5 Juni 2024",
      total: 300,
    },
    {
      no: 3,
      nama: "Bob Smith",
      kelas: "11",
      jenisSampah: "Plastik",
      tanggalTimbang: "8 Juni 2024",
      total: 150,
    },
    {
      no: 4,
      nama: "Diana Prince",
      kelas: "12",
      jenisSampah: "Logam",
      tanggalTimbang: "10 Juni 2024",
      total: 400,
    },
    {
      no: 5,
      nama: "Bruce Wayne",
      kelas: "9",
      jenisSampah: "Kaca",
      tanggalTimbang: "12 Juni 2024",
      total: 220,
    },
  ];

  const dropdownJenisSampah = [
    {
      value: 1,
      label: "Kuningan",
    },
    {
      value: 2,
      label: "Hidengan",
    },
  ];

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Bank Sampah");
    XLSX.writeFile(workbook, "rekap_bank_sampah.xlsx");
  };

  return (
    <>
      <div className="p-5 w-full">
        <span className="text-3xl font-bold">Rekap Bank Sampah</span>
        <div className="divider divider-warning"></div>
        <div className="flex gap-2 justify-end items-end">
          <label className="form-control w-md">
            <span className="label-text">Jenis Sampah</span>
            <select className="select select-bordered w-md">
              {dropdownJenisSampah.map((sampah) => (
                <option value={sampah.value}>{sampah.label}</option>
              ))}
            </select>
          </label>
          <label className="form-control w-md">
            <span className="label-text">Kelas</span>
            <select className="select select-bordered w-md">
              {dropdownJenisSampah.map((ihi) => (
                <option value={ihi.value}>{ihi.label}</option>
              ))}
            </select>
          </label>
          <label className="form-control w-md">
            <span className="label-text">Dari</span>
            <input
              type="date"
              placeholder="Type here"
              className="input input-bordered w-md"
            />
          </label>
          <label className="form-control w-md">
            <span className="label-text">Sampai</span>
            <input
              type="date"
              placeholder="Type here"
              className="input input-bordered w-md"
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
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr className="bg-blue-400">
                  <th>No</th>
                  <th>Nama</th>
                  <th>Kelas</th>
                  <th>Jenis Sampah</th>
                  <th>Tanggal Timbang</th>
                  <th>Total (gram)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr>
                    <th>{item.no}</th>
                    <td>{item.nama}</td>
                    <td>{item.kelas}</td>
                    <td>{item.jenisSampah}</td>
                    <td>{item.tanggalTimbang}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex justify-end mt-5">
            <div className="join grid grid-cols-2 w-1/6 ">
              <button className="join-item btn btn-sm btn-outline">
                Previous page
              </button>
              <button className="join-item btn btn-sm btn-outline">Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RekapSampah;
