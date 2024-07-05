import { useEffect, useState, useRef } from "react";
import { BsQrCodeScan } from "react-icons/bs";
import { MdOutlinePersonSearch } from "react-icons/md";
import { Scanner } from "@yudiel/react-qr-scanner";
import { BiSearch } from "react-icons/bi";
import { BankSampah, ApiSiswa } from "../../midleware/Api";
import { ResultSampah } from "../../midleware/Utils";
import { LoginStore } from "../../store/Store";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const schema = Yup.object({
  nis: Yup.string().required("Siswa required"),
  idSampah: Yup.string().required("Jenis Sampah required"),
  berat: Yup.string().required("Berat required"),
  idInClass: Yup.string().required("Berat required"),
  idClass: Yup.string().required("Berat required"),
  namaSiswa: Yup.string().required("required"),
  KelasSiswa: Yup.string().required("required"),
  levelSiswa: Yup.string().required("required"),
  target: Yup.string().required("required"),
});

const HomePetugas = () => {
  const { token } = LoginStore();
  const [totalSampah, setTotalSampah] = useState<string>("");
  const [tipeInput, setInput] = useState<string>("QR");
  const [jenisSampah, setSampah] = useState<ResultSampah[]>([]);
  const [inputQR, setInputQR] = useState<any>(null);
  const [tanggal, setTanggal] = useState<any>("");
  const [jam, setJam] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  const isFirstRun = useRef(true);

  const formik = useFormik({
    initialValues: {
      nis: "",
      idSampah: "",
      berat: "",
      idInClass: "",
      idClass: "",
      namaSiswa: "Nama Siswa",
      KelasSiswa: "X",
      levelSiswa: "level",
      target: "0",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    JenisSampah();
  }, []);

  useEffect(() => {
    TimeWaktu();
    const intervalId = setInterval(() => {
      TimeWaktu();
    }, 20000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const value = inputQR || 0;
    formik.setFieldValue("nis", value[0]?.rawValue);
    GetSiswaByNis(value[0]?.rawValue);
  }, [inputQR]);

  const JenisSampah = async () => {
    const response = await BankSampah.GetJenisSampah(token, "0", "50");
    const sampah = response.data.data.result;
    setSampah(sampah);
  };

  const GetSiswaByNis = async (Nis?: string) => {
    try {
      const { nis } = formik.values;
      const nisSiswa = Nis ? Nis : nis;
      const response = await ApiSiswa.GetSiswaByNis(token, nisSiswa);
      if (response.data.message == "Student not found!") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "NIS Siswa Tidak Ditemukan",
          footer: "Cek lagi penulisan NIS",
        });
      } else {
        const id = response.data.data.id;
        const nama = response.data.data.full_name;
        formik.setFieldValue("namaSiswa", nama);
        GetInclassSiswa(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetInclassSiswa = async (id: number) => {
    try {
      const response = await ApiSiswa.GetInClassSiswaByid(token, id);
      const classId = response.data.data[0]?.class_id;
      formik.setFieldValue("idInClass", response.data.data[0]?.id);
      GetClass(classId);
    } catch (error) {
      console.log(error);
    }
  };

  const GetClass = async (id: number) => {
    try {
      const response = await ApiSiswa.GetClassSiswaByid(token, id);
      formik.setFieldValue("levelSiswa", response.data.data.level);
      formik.setFieldValue("KelasSiswa", response.data.data.class_name);
      formik.setFieldValue("target", response.data.data.waste_target);
    } catch (error) {
      console.log(error);
    }
  };

  const CreateBankSampah = async () => {
    try {
      setLoading(true);
      const { idInClass, idSampah } = formik.values;
      const data = {
        student_class_id: idInClass,
        collection_date: new Date(),
        waste_type_id: parseInt(idSampah),
        weight: parseInt(totalSampah),
      };
      await BankSampah.createRekapSampah(token, data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      formik.resetForm({ values: formik.initialValues });
      setTotalSampah("");
      setInputQR(null);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal Upload Rekap Sampah",
        footer: "silakan coba beberapa saat lagi",
      });
    } finally {
      setLoading(false);
    }
  };

  const TimeWaktu = async () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("id-ID", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("id-ID", {
      hour: "numeric",
      minute: "numeric",
    });
    setTanggal(formattedDate);
    setJam(formattedTime);
  };

  return (
    <>
      <div className="w-full min-h-screen ">
        <div className="w-full flex flex-col sm:flex-row pt-10 min-h-96">
          <div className="w-full h-full sm:w-1/3 flex justify-center items-center p-5">
            <div className="w-full h-96 flex flex-col">
              {tipeInput === "QR" ? (
                <div className="h-5/6 w-full flex justify-center items-center bg-white rounded-md">
                  {inputQR ? (
                    <div className="w-full flex flex-col items-center justify-center">
                      <span className="text-xl font-bold">Data {formik.values.nis}</span>
                      <button
                        className="btn btn-ghost bg-green-500 text-white mt-5"
                        onClick={() => {
                          setInputQR(null),
                            formik.resetForm({ values: formik.initialValues });
                        }}
                      >
                        Scan Ulang
                      </button>
                    </div>
                  ) : (
                    <div className="w-80 h-80 ">
                      <Scanner onScan={(result) => setInputQR(result)} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-5/6 w-full flex justify-center items-center bg-white rounded-md p-5">
                  <div className="join w-full">
                    <input
                      type="text"
                      name="nis"
                      placeholder="NIS"
                      onChange={formik.handleChange}
                      value={formik.values.nis}
                      className="input input-bordered w-full join-item"
                    />
                    <button
                      className="btn btn-ghost bg-blue-500 text-white join-item text-xl"
                      onClick={() => GetSiswaByNis()}
                    >
                      <BiSearch />
                    </button>
                  </div>
                </div>
              )}

              <div className="h-1/6 w-full bg-white rounded-md flex">
                <button
                  className="btn btn-ghost w-1/2 h-full text-xl"
                  onClick={() => setInput("QR")}
                >
                  <BsQrCodeScan />
                </button>
                <button
                  className="btn btn-ghost w-1/2 h-full text-2xl"
                  onClick={() => setInput("NIS")}
                >
                  <MdOutlinePersonSearch />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full h-full sm:w-2/3 p-5 flex justify-center items-center">
            <div className="w-full h-96  bg-color-4 rounded-md pl-5 flex flex-col sm:flex-row items-center">
              <div className="w-full sm:w-1/2 flex flex-col  text-white gap-2 py-5">
                <span className="text-4xl font-bold">
                  {formik.values.namaSiswa}
                </span>
                <span className="text-xl font-semibold">
                  {formik.values.levelSiswa}
                </span>
                <span className="text-md">{formik.values.KelasSiswa}</span>
              </div>

              <div className="w-full sm:w-1/2 h-full relative overflow-hidden">
                <div className="w-80 h-80 bg-color-1 rounded-full absolute right-0 transform translate-x-1/4 -translate-y-1/5 sm:-translate-y-1/4 p-10 shadow-md">
                  <div className="w-full h-full flex justify-center items-center bg-color-2 rounded-full p-8 shadow-md">
                    <div className="w-full h-full flex flex-col justify-center items-center bg-color-3 rounded-full shadow-md">
                      <div className="flex flex-col justify-center items-center gap-1">
                        <span className="">Target</span>
                        <span className="text-5xl font-bold">
                          {formik.values.target}
                        </span>
                        <span className="text-sm ">Kilogram</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:h-96 p-5">
          <div className="w-full flex flex-col sm:flex-row p-5 rounded-md bg-color-4 h-full">
            <div className="w-full sm:w-1/2 h-full pr-0 sm:pr-3">
              <div className="w-full h-full relative">
                <input
                  type="number"
                  placeholder="0"
                  value={totalSampah}
                  onChange={(e) => setTotalSampah(e.target.value)}
                  disabled={!formik.values.idInClass}
                  className={`input w-full text-center bg-color-2 h-full text-[100px] sm:text-[150px] `}
                />
                <span className="absolute bottom-0 right-0 mb-1 mr-1 text-xl font-bold">
                  gram
                </span>
              </div>
            </div>
            <div className="w-full sm:w-1/2 h-full p-3">
              <span className="w-full text-xl sm:text-3xl font-bold text-white flex justify-end">
                {jam} | {tanggal}
              </span>
              <div className="w-full  mt-3">
                <div className="w-full flex flex-col gap-2">
                  <label className="mt-4 font-bold text-white">
                    Jenis Sampah
                  </label>
                  <select
                    className={`select select-bordered bg-white ${
                      totalSampah ? "" : "select-disabled"
                    }`}
                    value={formik.values.idSampah}
                    onChange={(e) =>
                      formik.setFieldValue("idSampah", e.target.value)
                    }
                  >
                    <option value="" id={`pilih-jenis-sampah`}>
                      Pilih Jenis Sampah
                    </option>
                    {jenisSampah.map((item: ResultSampah, index: number) => (
                      <option
                        value={item?.id}
                        key={index}
                        id={`jenis-sampah-${index}`}
                      >
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full flex flex-col gap-2 text-white">
                  <label className="mt-4 font-bold">Berat Sampah</label>
                  <span>{totalSampah ? totalSampah : 0} Gram</span>
                </div>
              </div>
              <div className="w-full flex justify-end mt-5">
                <button
                  className={`btn btn-ghost bg-green-500 text-white w-full ${
                    formik.values.idSampah ? "" : "btn-disabled"
                  }`}
                  onClick={CreateBankSampah}
                >
                  {loading ? (
                    <span className="loading loading-infinity loading-lg"></span>
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePetugas;
