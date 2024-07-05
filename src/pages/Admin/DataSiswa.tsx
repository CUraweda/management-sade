import { useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import GeneratorQr from "../../Component/GeneratorQr";
import { LoginStore, useProps } from "../../store/Store";
import { ApiSiswa, Kelas } from "../../midleware/Api";
import { Class, DataSiswa, InclassStudent } from "../../midleware/Utils";
import ModalProps from "../../Component/ModalProps";
import { useNavigate } from "react-router-dom";
import * as htmlToImage from "html-to-image";

const DataSiswaKlass = () => {
  const { token } = LoginStore();
  const { setIdKelas, setTahun} = useProps();
  const navigate = useNavigate();
  const [siswa, setSiswa] = useState<InclassStudent[]>([]);
  const [kelas, setKelas] = useState<Class[]>([]);
  const [idKelas, setIdKelass] = useState<string>("1");
  const [tahunPel, setTahunPel] = useState<string>("2023/2024");
  const [dataSiswa, setDataSiswa] = useState<DataSiswa>();

  useEffect(() => {
    getDataSiswa();
    getDataKelas();
  }, [idKelas, tahunPel]);

  const showModal = (props: string) => {
    let modalElement = document.getElementById(props) as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  const getDataSiswa = async () => {
    const response = await ApiSiswa.GetSiswaByClass(token, idKelas, tahunPel);
    const dataSiswa = response.data.data;
    setSiswa(dataSiswa);
  };

  const getDataKelas = async () => {
    const response = await Kelas.GetAllKelas(token);
    const dataKelas = response.data.data.result;
    setKelas(dataKelas);
  };

  const exportToPng = async (name: string) => {
    const element = document.getElementById("exportableElement");
    if (element) {
      const dataUrl = await htmlToImage.toPng(element);
      const link = document.createElement("a");
      link.download = `QR-Code-${name}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const handleExport = () => {
    setIdKelas(idKelas)
    setTahun(tahunPel)
    navigate('/admin/export-qr')

  }

  return (
    <>
      <div className="p-5 w-full">
        <span className="text-3xl font-bold">Daftar Siswa</span>
        <div className="divider divider-warning"></div>
        <div className="flex gap-2 justify-end items-end">
          <label className="form-control w-md">
            <span className="label-text">Kelas</span>
            <select
              className="select select-bordered w-md"
              value={idKelas}
              onChange={(e) => setIdKelass(e.target.value)}
            >
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
              value={tahunPel}
              onChange={(e) => setTahunPel(e.target.value)}
            >
              <option value={"2023/2024"} id="2023/2024">
                2023/2024
              </option>
              <option value={"2024/2025"} id="2024/2025">
                2024/2025
              </option>
            </select>
          </label>

          <button className="btn btn-ghost bg-blue-500 text-white hover:bg-blue-400" onClick={handleExport}>
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

                  <th>Kode QR</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {siswa?.map((item: InclassStudent, index: number) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item?.student.full_name}</td>

                    <td>
                      <div className="w-12">
                        <GeneratorQr size={50} nis={item?.student.nis} />
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm bg-green-500 text-white text-xl"
                        onClick={() => {
                          showModal("kartu-siswa"), setDataSiswa(item.student);
                        }}
                      >
                        <FaAddressCard />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ModalProps id="kartu-siswa">
          <div className="w-full flex flex-col justify-center items-center">
            <div
              className="w-full flex flex-col justify-center items-center bg-white py-5"
              id="exportableElement"
            >
              <span className="text-xl font-bold mb-5">
                Kartu Bank Sampah Siswa
              </span>
              <GeneratorQr
                size={200}
                nis={dataSiswa?.nis ? dataSiswa.nis : "0"}
              />
              <div className="w-full mt-5 flex flex-col items-center font-bold">
                <span>{dataSiswa?.full_name}</span>
                <span>{dataSiswa?.nis}</span>
              </div>
            </div>
            <button
              className="btn btn-ghost bg-green-500 text-white mt-5"
              onClick={() =>
                exportToPng(
                  dataSiswa?.full_name ? dataSiswa.full_name : "kartu siswa"
                )
              }
            >
              Download
            </button>
          </div>
        </ModalProps>
      </div>
    </>
  );
};

export default DataSiswaKlass;
