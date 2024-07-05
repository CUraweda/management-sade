// import React from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import ModalProps from "../../Component/ModalProps";
import { BankSampah, ApiSiswa } from "../../midleware/Api";
import { LoginStore } from "../../store/Store";
import { ResultSampah } from "../../midleware/Utils";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const schema = Yup.object({
  code: Yup.string().required("Harga required"),
  name: Yup.string().required("Jenis Sampah required"),
});

const JenisSampah = () => {
  const { token } = LoginStore();
  const [jenisSampah, setSampah] = useState<ResultSampah[]>([]);
  const [idJenisSampah, setIdSampah] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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

  useEffect(() => {
    JenisSampah();
  }, []);

  const JenisSampah = async () => {
    const response = await BankSampah.GetJenisSampah(token, "0", "50");
    const sampah = response.data.data.result;
    setSampah(sampah);
  };

  const getByIdSampah = async (id: string) => {
    setIdSampah(id);
    try {
      const response = await BankSampah.getByIdJenisSampah(token, id);
      showModal("edit-jenis-sampah");
      const sampah = response.data.data;
      formik.setFieldValue("code", sampah?.code);
      formik.setFieldValue("name", sampah?.name);
    } catch (error) {
      console.log(error);
    }
  };

  const CreateJenisSampah = async () => {
    try {
      const { code, name } = formik.values;
      const data = {
        code: code.toString(),
        name,
      };
      await BankSampah.createJenisSampah(token, data);
      JenisSampah();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      formik.resetForm({ values: formik.initialValues });
      closeModal("add-jenis-sampah");
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateJenisSampah = async () => {
    try {
      const { code, name } = formik.values;
      const data = {
        code: code.toString(),
        name,
      };
      await BankSampah.updateJenisSampah(token, idJenisSampah, data);
      JenisSampah();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      formik.resetForm({ values: formik.initialValues });
      closeModal("edit-jenis-sampah");
    } catch (error) {
      console.log(error);
    }
  };

  const trigerDelete = (id: string) => {
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
        DeleteJenisSampah(id);
      }
    });
  };

  const DeleteJenisSampah = async (id: string) => {
    try {
      await BankSampah.deleteJenisSampah(token, id);
      JenisSampah();

      Swal.fire({
        title: "Deleted!",
        text: "Your data has been deleted.",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formatRupiah = (value: string) => {
    const newValue = parseInt(value)
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    }).format(newValue)
  }

  return (
    <>
      <div className="p-5 w-full">
        <span className="text-3xl font-bold">Jenis Sampah</span>
        <div className="divider divider-warning"></div>
        <div className="flex gap-2 justify-end items-end">
          <button
            className="btn btn-ghost bg-blue-500 text-white hover:bg-blue-400"
            onClick={() => showModal("add-jenis-sampah")}
          >
            Tambah
          </button>
        </div>
        <div className="w-full bg-white p-3 rounded-md mt-5">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr className="bg-blue-400">
                  <th>No</th>
                  <th>Jenis Sampah</th>
                  <th>Harga ( perkilogram)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {jenisSampah?.map((item: ResultSampah, index: number) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item?.name}</td>
                    <td>{formatRupiah(item?.code)}</td>
                    <td>
                      <div className="w-full flex justify-start gap-2">
                        <button
                          className="btn btn-ghost join-item bg-orange-500 text-white btn-sm"
                          onClick={() => getByIdSampah(item.id)}
                        >
                          <FaPencilAlt />
                        </button>
                        <button
                          className="btn btn-ghost join-item bg-red-500 text-white btn-sm"
                          onClick={() => trigerDelete(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="w-full flex justify-end mt-5">
            <div className="join grid grid-cols-2 w-1/6 ">
              <button className="join-item btn btn-sm btn-outline">
                Previous page
              </button>
              <button className="join-item btn btn-sm btn-outline">Next</button>
            </div>
          </div> */}
        </div>
        <ModalProps id="add-jenis-sampah">
          <div className="w-full flex justify-center items-center flex-col">
            <span className="text-xl font-bold">Tambah Jenis Sampah</span>
            <form
              onSubmit={formik.handleSubmit}
              className="flex justify-start w-full flex-col gap-3"
            >
              <div className="w-full flex flex-col gap-2">
                <label className="mt-4 font-bold">Jenis Sampah</label>
                <input
                  type="text"
                  placeholder="Jenis Sampah"
                  className={`input input-bordered w-full ${
                    formik.touched.name && formik.errors.name
                      ? "input-error"
                      : ""
                  }`}
                  name="name"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="mt-4 font-bold">Harga ( Perkilogram )</label>
                <input
                  type="number"
                  placeholder="2000"
                  className={`input input-bordered w-full  ${
                    formik.touched.code && formik.errors.code
                      ? "input-error"
                      : ""
                  } `}
                  name="code"
                  value={formik.values.code}
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                />
              </div>

              <button
                className="btn btn-ghost bg-green-500 text-white w-full mt-5"
                onClick={CreateJenisSampah}
              >
                Simpan
              </button>
            </form>
          </div>
        </ModalProps>

        <ModalProps id="edit-jenis-sampah">
          <div className="w-full flex justify-center items-center flex-col">
            <span className="text-xl font-bold">Edit Jenis Sampah</span>
            <form
              onSubmit={formik.handleSubmit}
              className="flex justify-start w-full flex-col gap-3"
            >
              <div className="w-full flex flex-col gap-2">
                <label className="mt-4 font-bold">Jenis Sampah</label>
                <input
                  type="text"
                  placeholder="Jenis Sampah"
                  className={`input input-bordered w-full ${
                    formik.touched.name && formik.errors.name
                      ? "input-error"
                      : ""
                  }`}
                  name="name"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="mt-4 font-bold">Harga ( Perkilogram )</label>
                <input
                  type="number"
                  placeholder="2000"
                  className={`input input-bordered w-full  ${
                    formik.touched.code && formik.errors.code
                      ? "input-error"
                      : ""
                  } `}
                  name="code"
                  value={formik.values.code}
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                />
              </div>

              <button
                className="btn btn-ghost bg-green-500 text-white w-full mt-5"
                onClick={UpdateJenisSampah}
              >
                Simpan
              </button>
            </form>
          </div>
        </ModalProps>
      </div>
    </>
  );
};

export default JenisSampah;
