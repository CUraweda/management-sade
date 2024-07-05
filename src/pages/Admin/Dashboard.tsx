// import React from "react";
import ChartMap from "../../Component/ChartMap";

const Dashboard = () => {
  return (
    <>
      <div className="w-full p-5">
        <div className="w-full flex flex-wrap mt-3">
          <div className="w-full sm:w-1/3  p-3 ">
            <div className="w-full bg-white rounded-md flex justify-center items-center relative  overflow-hidden">
              <div className="w-24 h-52 py-10">
                <div className="w-full h-full bg-green-500 rounded-full blur-xl"></div>
              </div>
              <div className="glass w-full h-52 absolute rounded-md p-4">
                <div className="flex justify-center items-center flex-col">
                  <span className="font-bold text-black">
                    Total Sampah Bulan Ini
                  </span>
                  <div className="flex items-end">
                    <span className="text-[90px] font-bold">300</span>
                    <span className="font-semibold">Gram</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/3  p-3 ">
            <div className="w-full bg-white rounded-md flex justify-center items-center relative  overflow-hidden">
              <div className="w-24 h-52 py-10">
                <div className="w-full h-full bg-green-500 rounded-full blur-xl"></div>
              </div>
              <div className="glass w-full h-52 absolute rounded-md p-4">
                <div className="flex justify-center items-center flex-col">
                  <span className="font-bold text-black">
                    Total Sampah Hari Ini
                  </span>
                  <div className="flex items-end">
                    <span className="text-[90px] font-bold">300</span>
                    <span className="font-semibold">Gram</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/3  p-3 ">
            <div className="w-full bg-white rounded-md flex justify-center items-center relative  overflow-hidden">
              <div className="w-24 h-52 py-10">
                <div className="w-full h-full bg-green-500 rounded-full blur-xl"></div>
              </div>
              <div className="glass w-full h-52 absolute rounded-md p-4">
                <div className="flex justify-center items-center flex-col">
                  <span className="font-bold text-black">
                    Total Penjualan Bulan ini
                  </span>
                  <div className="flex items-end">
                    <p>
                      <span className="font-semibold">Rp. </span>
                      <span className="text-[80px] font-bold">23.000</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end gap-3 p-3 flex-wrap">
          <select
            className="select select-bordered bg-white w-40"
            // onChange={(e) =>
            //   formik.setFieldValue("semester", e.target.value)
            // }
          >
            <option>Jenis Sampah</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>

          <div className="flex justify-center gap-2 items-center ">
            <input
              type="date"
              placeholder="Type here"
              className="input w-full"
            />
            -
            <input
              type="date"
              placeholder="Type here"
              className="input w-full"
            />
          </div>
        </div>

        <div className="w-full p-3 ">
          <div className="w-full bg-white p-3 rounded-md">
            <ChartMap />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
