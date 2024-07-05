import { useEffect, useState, useRef } from "react";
import { LoginStore, useProps } from "../../store/Store";
import { ApiSiswa, Kelas } from "../../midleware/Api";
import { Class, InclassStudent } from "../../midleware/Utils";
import GeneratorQr from "../../Component/GeneratorQr";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/sade.png";
import { FaPrint } from "react-icons/fa";

const ExportQr = () => {
  const { token } = LoginStore();
  const { idKelas, tahun, setIdKelas, setTahun } = useProps();
  const [siswa, setSiswa] = useState<InclassStudent[]>([]);
  const [kelas, setKelas] = useState<Class[]>([]);
  const componentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getDataSiswa();
    getDataKelas();
  }, []);

  useEffect(() => {
    getDataSiswa();
  }, [idKelas, tahun]);

  const getDataSiswa = async () => {
    const response = await ApiSiswa.GetSiswaByClass(token, idKelas, tahun);
    const dataSiswa = response.data.data;
    setSiswa(dataSiswa);
  };
  const getDataKelas = async () => {
    const response = await Kelas.GetAllKelas(token);
    const dataKelas = response.data.data.result;
    setKelas(dataKelas);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Exported QR Codes",
    onAfterPrint: () => alert("Print dokument successfully!"),
    pageStyle:
      "@page { size: auto; margin: 10mm; } body { width: auto; } .card { page-break-inside: avoid; }",
  });

  return (
    <>
      <div className="w-full p-5">
        <div className="flex gap-2 justify-end items-end">
          <label className="form-control w-md">
            <span className="label-text">Kelas</span>
            <select
              className="select select-bordered w-md"
              value={idKelas}
              onChange={(e) => setIdKelas(e.target.value)}
            >
              <option>pilih kelas</option>
              {kelas?.map((item: Class, index: number) => (
                <option value={item?.id} key={index} id={`kelas-${index}`}>
                  {item?.class_name}
                </option>
              ))}
            </select>
          </label>
          <label className="form-control w-md">
            <span className="label-text">Tahun Pelajaran</span>
            <select
              className="select select-bordered w-md"
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
            >
              <option id="2023/2024">pilih tahun</option>
              <option value={"2023/2024"} id="2023/2024">
                2023/2024
              </option>
              <option value={"2024/2025"} id="2024/2025">
                2024/2025
              </option>
            </select>
          </label>

          <button onClick={handlePrint} className="btn btn-primary ">
            <FaPrint /> Cetak
          </button>
        </div>

        <div
          className="w-full flex justify-center items-start flex-wrap min-h-screen overflow-hidden py-5 gap-2"
          ref={componentRef}
        >
          {siswa?.map((item: InclassStudent, index: number) => (
            <div
              className="card bg-white w-80 h-96 border p-5 mt-5"
              key={index}
              style={{ pageBreakInside: "avoid" }}
            >
              <div className="flex justify-center items-center flex-col">
                <div className="w-full flex gap-2 mb-5">
                  <div className="w-16 mb-3">
                    <img src={logo} alt="" />
                  </div>
                  <span className="text-xl text-black font-bold">
                    Kartu Bank Sampah Siswa
                  </span>
                </div>
                <GeneratorQr
                  size={150}
                  nis={item.student.nis ? item.student.nis : "0"}
                />

                <div className="card-body items-center text-center text-black">
                  <h2 className="card-title">{item.student.full_name}</h2>
                  <p>{item.student.nis}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExportQr;
