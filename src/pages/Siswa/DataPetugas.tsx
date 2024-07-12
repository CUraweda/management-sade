// import React from "react";
import { FaPlus } from "react-icons/fa";
import ModalProps from "../../Component/ModalProps";
import { useNavigate } from "react-router-dom";

const DataPetugas = () => {
  const navigate = useNavigate();
  const showModal = (props: string) => {
    let modalElement = document.getElementById(props) as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  const handleNext = () => {
    navigate('/petugas/home')
  }

  return (
    <>
      <div className="w-full min-h-screen pt-10">
        <div className="w-full flex justify-end">
          <button
            className="btn btn-ghost bg-white my-3 hover:bg-slate-300"
            onClick={() => showModal("add-petugas")}
          >
            <span>
              <FaPlus />
            </span>
            Tambah
          </button>
        </div>
        <div className="overflow-x-auto bg-white p-3 rounded-md min-h-96">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th className="font-bold text-black">No</th>
                <th className="font-bold text-black">Name</th>
                <th className="font-bold text-black">Kelas</th>
                <th className="font-bold text-black">Tanggal Tugas</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-end">
          <button className="btn btn-ghost bg-white my-3 hover:bg-slate-300" onClick={handleNext}>
            Lanjut
          </button>
        </div>
      </div>

      <ModalProps id="add-petugas">
        <div className="w-full flex flex-col justify-center items-center">
          <span className="text-xl font-bold">Input Data Petugas</span>
          <div className="w-full flex flex-col gap-2">
            <label className="mt-4 font-bold">Kelas</label>
            <select
              className="select select-bordered bg-white"
              // onChange={(e) =>
              //   formik.setFieldValue("semester", e.target.value)
              // }
            >
              <option>
                Pilih Kelas
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="mt-4 font-bold">Nama</label>
            <select
              className="select select-bordered bg-white"
              // onChange={(e) =>
              //   formik.setFieldValue("semester", e.target.value)
              // }
            >
              <option>
                Pilih Nama
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>
          <div className="mt-5 w-full">
            <button className="btn btn-ghost bg-green-500 text-white w-full">Simpan</button>
          </div>
        </div>
      </ModalProps>
    </>
  );
};

export default DataPetugas;
