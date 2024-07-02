import React, { useState } from "react";
import { BsQrCodeScan } from "react-icons/bs";
import { MdOutlinePersonSearch } from "react-icons/md";

const HomePetugas = () => {
    const [totalSampah, setTotalSampah] = useState<string>("")
  return (
    <>
      <div className="w-full min-h-screen ">
        <div className="w-full flex flex-col sm:flex-row pt-10 min-h-96">
          <div className="w-full h-full sm:w-1/3 flex justify-center items-center p-5">
            <div className="w-full h-96 flex flex-col">
              <div className="h-5/6 w-full flex justify-center items-center bg-white rounded-md">
                ssdf
              </div>
              <div className="h-1/6 w-full bg-white rounded-md flex">
             
                <button className="btn btn-ghost w-1/2 h-full text-xl"><BsQrCodeScan /></button>
                <button className="btn btn-ghost w-1/2 h-full text-2xl"><MdOutlinePersonSearch /></button>
              </div>
            </div>
            
          </div>
          <div className="w-full h-full sm:w-2/3 p-5 flex justify-center items-center">
            <div className="w-full h-96  bg-color-4 rounded-md pl-5 flex flex-col sm:flex-row items-center">

              <div className="w-full sm:w-1/2 flex flex-col  text-white gap-2 py-5">
                <span className="text-4xl font-bold">Nur Cahyanto</span>
                <span className="text3xl">IX A</span>
              </div>

              <div className="w-full sm:w-1/2 h-full relative overflow-hidden">
                <div className="w-80 h-80 bg-color-1 rounded-full absolute right-0 transform translate-x-1/4 -translate-y-1/5 sm:-translate-y-1/4 p-10 shadow-md">
                  <div className="w-full h-full flex justify-center items-center bg-color-2 rounded-full p-8 shadow-md">
                    <div className="w-full h-full flex flex-col justify-center items-center bg-color-3 rounded-full shadow-md">
                      <div className="flex flex-col justify-center items-center gap-1">
                        <span className="">Juli</span>
                        <span className="text-5xl font-bold">120</span>
                        <span className="text-sm ">Gram</span>
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
                  className="input w-full text-center bg-color-2 h-full text-[100px] sm:text-[150px]"
                />
                <span className="absolute bottom-0 right-0 mb-1 mr-1 text-xl font-bold">
                  gram
                </span>
              </div>
            </div>
            <div className="w-full sm:w-1/2 h-full p-3">
              <span className="w-full text-xl sm:text-3xl font-bold text-white flex justify-end">
                12.42 | 02 Juli 2024
              </span>
              <div className="w-full  mt-3">
                <div className="w-full flex flex-col gap-2">
                  <label className="mt-4 font-bold text-white">
                    Jenis Sampah
                  </label>
                  <select
                    className="select select-bordered bg-white"
                    // onChange={(e) =>
                    //   formik.setFieldValue("semester", e.target.value)
                    // }
                  >
                    <option>Pilih Jenis Sampah</option>
                    <option value={1}>Plastik</option>
                    <option value={2}>Botol</option>
                  </select>
                </div>
                <div className="w-full flex flex-col gap-2 text-white">
                  <label className="mt-4 font-bold">Berat Sampah</label>
                  <span>{totalSampah ? totalSampah : 0} Gram</span>
                </div>
              </div>
              <div className="w-full flex justify-end mt-5">
                <button className="btn btn-ghost bg-green-500 text-white w-full">
                  Simpan
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
