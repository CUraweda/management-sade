import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import ModalProps from "../../Component/ModalProps";
import { useNavigate } from "react-router-dom";
import { DaftarDataPetugas, BankSampah } from "../../midleware/Api";
import { LoginStore } from "../../store/Store";
import { useState, useEffect, useCallback } from "react";
import {
  ClassData,
  ItemDataPetugas,
  ItemDataPetugasDropdown,
} from "../../midleware/Utils";
import Swal from "sweetalert2";

const DataPetugas = () => {
  const { token } = LoginStore();
  const [dataPetugas, setdataPetugas] = useState<ItemDataPetugas[]>([]);
  const [dataPetugasDropdown, setdataPetugasDropdown] = useState<
    ItemDataPetugasDropdown[]
  >([]);
  const [dataClass, setDataClass] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [selectedPetugasId, setSelectedPetugasId] = useState<number | null>(
    null
  );
  const [selectedDataPetugas, setSelectedDataPetugas] =
    useState<ItemDataPetugas | null>(null);
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  const [date, setDate] = useState(formattedDate);
  const [taskDate, setTaskDate] = useState(formattedDate);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();

  const showModal = (props: string) => {
    let modalElement = document.getElementById(props) as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  const closeModal = (props: string) => {
    let modalElement = document.getElementById(props) as HTMLDialogElement;
    if (modalElement) {
      modalElement.close();
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await DaftarDataPetugas.GetDataPetugas(
        token,
        date || ""
      );
      setdataPetugas(response.data.data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const GetDataPetugasDropdown = async () => {
    try {
      const response = await DaftarDataPetugas.GetDataPetugasDropdown(token);
      setdataPetugasDropdown(response.data.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const GetClass = async () => {
    try {
      const response = await BankSampah.GetDataDropdownClass(token);
      setDataClass(response.data.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    GetDataPetugasDropdown();
    GetClass();
  }, [date]);

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleChoosePetugas = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPetugasId(Number(event.target.value));
  };

  const handleChooseClass = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassId(Number(event.target.value));
    setSelectedPetugasId(null);
  };

  const handleNext = () => {
    navigate("/petugas/home");
  };

  const handleSubmit = async () => {
    try {
      const selectedClass = dataClass.find(
        (item) => item.id === selectedClassId
      );
      const data = {
        student_id: selectedPetugasId,
        class_id: selectedClassId,
        name: selectedPetugasId
          ? dataPetugasDropdown.find((item) => item.id === selectedPetugasId)
              ?.full_name
          : "",
        class_name: selectedClass?.class_name,
        assignment_date: taskDate,
      };

      if (isEditMode && selectedDataPetugas) {
        await DaftarDataPetugas.UpdateDataPetugas(
          token,
          selectedDataPetugas.id,
          data
        );
      } else {
        await DaftarDataPetugas.PosDataPetugas(token, data);
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchData();
      closeModal("add-petugas");
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const handleEdit = (item: ItemDataPetugas) => {
    setIsEditMode(true);
    setSelectedDataPetugas(item);
    setSelectedPetugasId(item.student_id);
    setSelectedClassId(item.class_id);
    setTaskDate(item.assignment_date);
    showModal("add-petugas");
  };

  const trigerDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await DaftarDataPetugas.DeleteDataPetugas(token, id);
      fetchData();
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const clearModalInputs = () => {
    setSelectedPetugasId(null);
    setSelectedClassId(null);
  };

  const handleModalClose = useCallback((event: Event) => {
    const modal = event.target as HTMLDialogElement;
    if (!modal.open) {
      clearModalInputs();
    }
  }, []);

  useEffect(() => {
    const modal = document.getElementById("add-petugas") as HTMLDialogElement;
    if (modal) {
      modal.addEventListener("close", handleModalClose);
    }
    return () => {
      if (modal) {
        modal.removeEventListener("close", handleModalClose);
      }
    };
  }, [handleModalClose]);

  const filteredPetugasDropdown = selectedClassId
    ? dataPetugasDropdown.filter(
        (petugas) =>
          petugas.class ===
          dataClass
            .find((cls) => cls.id === selectedClassId)
            ?.class_name.split(" ")[1]
      )
    : dataPetugasDropdown;

  return (
    <>
      <div className="w-full min-h-screen pt-10">
        <div className="w-full flex justify-end items-center gap-1">
          <label className="form-control w-md">
            <input
              type="date"
              placeholder="Type here"
              className="input input-bordered w-md"
              value={date}
              onChange={handleChangeDate}
            />
          </label>
          <button
            className="btn btn-ghost bg-white my-3 hover:bg-slate-300"
            onClick={() => {
              setIsEditMode(false);
              setSelectedDataPetugas(null);
              showModal("add-petugas");
            }}
          >
            <span>
              <FaPlus />
            </span>
            Tambah
          </button>
        </div>
        <div className="overflow-x-auto bg-white p-3 rounded-md min-h-96">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : dataPetugas.length > 0 ? (
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th className="font-bold text-black">No</th>
                  <th className="font-bold text-black">Name</th>
                  <th className="font-bold text-black">Kelas</th>
                  <th className="font-bold text-black">Tanggal Tugas</th>
                  <th className="font-bold text-black flex items-center justify-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataPetugas.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item?.name}</td>
                    <td>{item?.class?.class_name}</td>
                    <td>{item?.assignment_date}</td>
                    <td className="flex items-center justify-center gap-3">
                      <button
                        className="btn btn-ghost join-item bg-orange-500 text-white btn-sm"
                        onClick={() => handleEdit(item)}
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        className="btn btn-ghost join-item bg-red-500 text-white btn-sm"
                        onClick={() => trigerDelete(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center">
              Tidak ada yang jadwal pada hari ini
            </div>
          )}
        </div>
        <div className="w-full flex justify-end">
          <button
            className="btn btn-ghost bg-white my-3 hover:bg-slate-300"
            onClick={handleNext}
            disabled={dataPetugas.length === 0}
          >
            Lanjut
          </button>
        </div>
      </div>

      <ModalProps id="add-petugas">
        <div className="w-full flex flex-col justify-center items-center">
          <span className="text-xl font-bold">
            {isEditMode ? "Edit Data Petugas" : "Input Data Petugas"}
          </span>
          <div className="w-full flex flex-col gap-2 py-3">
            <label>Pilih Kelas</label>
            <select
              className="select select-bordered"
              value={selectedClassId || ""}
              onChange={handleChooseClass}
            >
              <option value="">Pilih kelas</option>
              {dataClass.map((kelas) => (
                <option key={kelas.id} value={kelas.id}>
                  {kelas.class_name}
                </option>
              ))}
            </select>

            <label>Pilih Petugas</label>
            <select
              className="select select-bordered"
              value={selectedPetugasId || ""}
              onChange={handleChoosePetugas}
              disabled={!selectedClassId}
            >
              <option value="">Pilih petugas</option>
              {filteredPetugasDropdown.length > 0 ? (
                filteredPetugasDropdown.map((petugas) => (
                  <option key={petugas.id} value={petugas.id}>
                    {petugas.full_name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Tidak ada petugas pada kelas tersebut
                </option>
              )}
            </select>
          </div>
          <div className="w-full flex justify-end ">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Simpan
            </button>
          </div>
        </div>
      </ModalProps>
    </>
  );
};

export default DataPetugas;
