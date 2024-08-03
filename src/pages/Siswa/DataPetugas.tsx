import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import ModalProps from "../../Component/ModalProps";
import { useNavigate } from "react-router-dom";
import { DaftarDataPetugas, BankSampah } from "../../midleware/Api";
import { LoginStore } from "../../store/Store";
import { useState, useEffect, useCallback } from "react";
import { ClassData, ItemDataPetugas } from "../../midleware/Utils";
import Swal from "sweetalert2";

const DataPetugas = () => {
  const { token } = LoginStore();
  const [dataPetugas, setDataPetugas] = useState<ItemDataPetugas[]>([]);
  const [dataPetugasDropdown, setDataPetugasDropdown] = useState<any[]>([]);
  const [dataClass, setDataClass] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassId, setSelectedClassId] = useState<number>(1);
  const [selectedPetugasId, setSelectedPetugasId] = useState<number | null>(
    null
  );
  const [selectedDataPetugas, setSelectedDataPetugas] =
    useState<ItemDataPetugas | null>(null);
  const [taskDate, setTaskDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();

  const showModal = (id: string) => {
    const modalElement = document.getElementById(id) as HTMLDialogElement;
    modalElement?.showModal();
  };

  const closeModal = (id: string) => {
    const modalElement = document.getElementById(id) as HTMLDialogElement;
    modalElement?.close();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await DaftarDataPetugas.GetDataPetugas(
        token,
        taskDate || ""
      );
      setDataPetugas(response.data.data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataDropdowns = async () => {
    try {
      const [classResponse, petugasResponse] = await Promise.all([
        BankSampah.GetDataDropdownClass(token),
        DaftarDataPetugas.GetDataPetugasDropdown(token, selectedClassId),
      ]);
      setDataClass(classResponse.data.data.result);
      setDataPetugasDropdown(petugasResponse.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataDropdowns();
  }, [taskDate, selectedClassId]);

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDate(event.target.value);
  };

  const handleChooseClass = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassId(Number(event.target.value));
    setSelectedPetugasId(null);
  };

  const handleChoosePetugas = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPetugasId(Number(event.target.value));
  };

  const handleSubmit = async () => {
    try {
      const selectedClass = dataClass.find(
        (item) => item.id == selectedClassId
      );

      const selectedPetugas = dataPetugasDropdown.find(
        (petugas) => petugas.student.id == selectedPetugasId
      );

      const data = {
        student_id: selectedPetugasId,
        class_id: selectedClassId,
        name: selectedPetugas ? selectedPetugas.student.full_name : "",
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

  const handleEdit = (item: any) => {
    setIsEditMode(true);
    setSelectedDataPetugas(item);
    setSelectedPetugasId(item.student_id);
    setSelectedClassId(item.class_id);
    setTaskDate(item.assignment_date);
    showModal("add-petugas");
  };

  const handleDelete = async (id: number) => {
    try {
      await DaftarDataPetugas.DeleteDataPetugas(token, id);
      fetchData();
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const triggerDelete = (id: number) => {
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

  const clearModalInputs = () => {
    setSelectedPetugasId(null);
    setSelectedClassId(1);
  };

  const handleModalClose = useCallback((event: Event) => {
    if (!(event.target as HTMLDialogElement).open) {
      clearModalInputs();
    }
  }, []);

  useEffect(() => {
    const modal = document.getElementById("add-petugas") as HTMLDialogElement;
    modal?.addEventListener("close", handleModalClose);
    return () => {
      modal?.removeEventListener("close", handleModalClose);
    };
  }, [handleModalClose]);

  return (
    <div className="w-full min-h-screen pt-10">
      <div className="w-full flex justify-end items-center gap-1">
        <input
          type="date"
          className="input input-bordered w-md"
          value={taskDate}
          onChange={handleChangeDate}
        />
        <button
          className="btn btn-ghost bg-white my-3 hover:bg-slate-300"
          onClick={() => {
            setIsEditMode(false);
            setSelectedDataPetugas(null);
            showModal("add-petugas");
          }}
        >
          <FaPlus />
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
                <th>No</th>
                <th>Name</th>
                <th>Kelas</th>
                <th>Tanggal Tugas</th>
                <th>Actions</th>
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
                      className="btn btn-ghost bg-orange-500 text-white btn-sm"
                      onClick={() => handleEdit(item)}
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      className="btn btn-ghost bg-red-500 text-white btn-sm"
                      onClick={() => triggerDelete(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">Tidak ada jadwal pada hari ini</div>
        )}
      </div>
      <div className="w-full flex justify-end">
        <button
          className="btn btn-ghost bg-white my-3 hover:bg-slate-300"
          onClick={() => navigate("/petugas/home")}
          disabled={dataPetugas.length === 0}
        >
          Lanjut
        </button>
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
              {dataPetugasDropdown.map((petugas) => (
                <option key={petugas.id} value={petugas.student.id}>
                  {petugas.student.full_name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex justify-end">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Simpan
            </button>
          </div>
        </div>
      </ModalProps>
    </div>
  );
};

export default DataPetugas;
